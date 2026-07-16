import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const OWNER_EMAIL = "stuffwork1314@gmail.com";

function b64url(input: string) {
  // btoa is available in the Worker runtime
  return btoa(unescape(encodeURIComponent(input)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}

function buildRawEmail(opts: {
  to: string;
  fromName: string;
  replyTo: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  senderSubject: string;
  message: string;
}) {
  const boundary = "----lovable" + Math.random().toString(36).slice(2);
  const textBody =
    `New contact message from your portfolio\n\n` +
    `Name:    ${opts.senderName}\n` +
    `Email:   ${opts.senderEmail}\n` +
    `Subject: ${opts.senderSubject || "(none)"}\n\n` +
    `${opts.message}\n`;
  const htmlBody =
    `<div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">` +
    `<h2 style="margin:0 0 12px">New portfolio message</h2>` +
    `<p style="margin:0 0 4px"><b>Name:</b> ${esc(opts.senderName)}</p>` +
    `<p style="margin:0 0 4px"><b>Email:</b> <a href="mailto:${esc(opts.senderEmail)}">${esc(opts.senderEmail)}</a></p>` +
    `<p style="margin:0 0 12px"><b>Subject:</b> ${esc(opts.senderSubject || "(none)")}</p>` +
    `<div style="padding:12px 14px;background:#f1f5f9;border-radius:8px;white-space:pre-wrap">${esc(opts.message)}</div>` +
    `</div>`;

  const rfc =
    `From: ${opts.fromName} <${opts.to}>\r\n` +
    `To: ${opts.to}\r\n` +
    `Reply-To: ${opts.replyTo}\r\n` +
    `Subject: ${opts.subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: multipart/alternative; boundary="${boundary}"\r\n\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
    `${textBody}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
    `${htmlBody}\r\n` +
    `--${boundary}--`;

  return b64url(rfc);
}

async function sendGmail(payload: {
  senderName: string;
  senderEmail: string;
  senderSubject: string;
  message: string;
}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    console.error("[contact] Gmail keys missing");
    return { ok: false, error: "email-config-missing" as const };
  }

  const raw = buildRawEmail({
    to: OWNER_EMAIL,
    fromName: "Portfolio Contact",
    replyTo: payload.senderEmail,
    subject: `[Portfolio] ${payload.senderSubject || `Message from ${payload.senderName}`}`,
    senderName: payload.senderName,
    senderEmail: payload.senderEmail,
    senderSubject: payload.senderSubject,
    message: payload.message,
  });

  const res = await fetch(
    "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[contact] Gmail send failed", res.status, body);
    return { ok: false, error: "email-send-failed" as const };
  }
  return { ok: true as const };
}

function validate(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const subject = typeof raw.subject === "string" ? raw.subject.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  if (!name || name.length > 100) return null;
  if (!email || email.length > 255) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (subject.length > 200) return null;
  if (!message || message.length > 5000) return null;
  // Block CR/LF and other control chars in header-bound fields to prevent
  // email header injection (e.g. sneaking in Bcc: attacker@... via subject).
  const HEADER_UNSAFE = /[\r\n\u0000-\u001f\u007f]/;
  if (HEADER_UNSAFE.test(name) || HEADER_UNSAFE.test(subject) || HEADER_UNSAFE.test(email)) {
    return null;
  }
  return { name, email, subject: subject || null, message };
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "invalid-json" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const parsed = validate(body);
        if (!parsed) {
          return new Response(JSON.stringify({ error: "invalid-input" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const supabase = createClient<Database>(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLISHABLE_KEY!,
          {
            auth: {
              storage: undefined,
              persistSession: false,
              autoRefreshToken: false,
            },
          },
        );

        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert(parsed);

        if (dbError) {
          console.error("[contact] DB insert failed", dbError);
          return new Response(JSON.stringify({ error: "store-failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Fire the email — DB row already saved, so email failure is non-fatal.
        const emailResult = await sendGmail({
          senderName: parsed.name,
          senderEmail: parsed.email,
          senderSubject: parsed.subject ?? "",
          message: parsed.message,
        });

        return new Response(
          JSON.stringify({ ok: true, emailed: emailResult.ok }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
