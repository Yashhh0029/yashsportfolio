import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import {
  Brain, Cpu, Code2, Database, Cloud, Rocket, Github, Linkedin, Mail, Download,
  ArrowRight, Sparkles, Zap, Activity, Shield, Mic, Bot, HeartPulse, ExternalLink,
  ChevronRight, Terminal, Layers, LineChart, GitBranch, Star, Award, GraduationCap,
  Briefcase, Target, FlaskConical, Wand2, Radar, Waves, X, Menu, ArrowUpRight,
} from "lucide-react";

import codingPhoto from "@/assets/yash-coding.jpeg";
import formalPhoto from "@/assets/yash-formal.jpeg";
import casualPhoto from "@/assets/yash-casual.jpeg";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Yash — AI & ML Engineer | Intelligent Systems Portfolio" },
      { name: "description", content: "Portfolio of Yash — AI & ML Engineer. Building intelligent systems: production ML pipelines, NLP, speech intelligence, and applied research including a Human Digital Twin." },
      { property: "og:title", content: "Yash — AI & ML Engineer" },
      { property: "og:description", content: "AI command center portfolio featuring Climora, Smart Spam AI, Nexus Speech AI, JARVIS, and the Human Digital Twin research concept." },
    ],
  }),
});

/* ============================================================ */
/* BOOT SEQUENCE                                                */
/* ============================================================ */

const BOOT_LINES = [
  "Initializing AI Core...",
  "Loading Intelligent Systems...",
  "Loading Projects...",
  "Loading Experience...",
  "Loading Research...",
];

function BootSequence({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (step < BOOT_LINES.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 550);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, oklch(0.14 0.05 250) 0%, oklch(0.08 0.02 250) 70%)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[520px] h-[520px] max-w-[90vw] max-h-[90vw]">
          <div className="absolute inset-0 rounded-full border border-cyan/20 animate-spin-slow" />
          <div className="absolute inset-6 rounded-full border border-electric/15 animate-spin-slower" />
          <div className="absolute inset-16 rounded-full border border-neon-purple/10 animate-spin-slow" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xl px-6">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.div key="boot" exit={{ opacity: 0, y: -20 }} className="text-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="mx-auto mb-8 w-16 h-16 rounded-2xl glass-strong flex items-center justify-center glow-cyan"
              >
                <Brain className="w-8 h-8 text-cyan" />
              </motion.div>
              <p className="font-mono text-xs text-cyan/70 mb-4 tracking-[0.3em] uppercase">Yash.AI // Boot</p>
              <div className="space-y-2 font-mono text-sm text-left inline-block mx-auto min-w-[260px]">
                {BOOT_LINES.map((line, i) => (
                  <div key={i} className={"flex items-center gap-3 transition-opacity " + (i < step ? "opacity-100" : "opacity-30")}>
                    <span className={"w-1.5 h-1.5 rounded-full " + (i < step ? "bg-cyan glow-cyan" : "bg-muted")} />
                    <span className={i < step ? "text-foreground" : "text-muted-foreground"}>{line}</span>
                    {i < step && <span className="ml-auto text-[10px] text-cyan/70">OK</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <motion.p className="font-mono text-xs text-cyan tracking-[0.4em] uppercase mb-4"
                initial={{ letterSpacing: "0.2em", opacity: 0 }} animate={{ letterSpacing: "0.4em", opacity: 1 }}>
                System Ready
              </motion.p>
              <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-2">Yash Portfolio</h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-2">AI &amp; ML Engineer</p>
              <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-8">
                Building intelligent systems that <span className="text-cyan">learn</span>,{" "}
                <span className="text-electric">predict</span>,{" "}
                <span className="text-neon-purple">understand</span>, and{" "}
                <span className="text-soft-orange">evolve</span>.
              </p>
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong glow-cyan font-mono text-sm uppercase tracking-widest text-foreground overflow-hidden"
              >
                <span className="absolute inset-0 shimmer" />
                <span className="relative">Enter Experience</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ============================================================ */
/* BACKGROUND: particles + mouse light                          */
/* ============================================================ */

function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 24000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.5 + 0.5) * dpr,
    }));

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX * dpr;
      mouse.current.y = e.clientY * dpr;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // mouse glow
      if (mouse.current.x > 0) {
        const g = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 260 * dpr);
        g.addColorStop(0, "rgba(120, 220, 255, 0.10)");
        g.addColorStop(1, "rgba(120, 220, 255, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = "rgba(120, 220, 255, 0.55)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 130 * dpr;
          if (d2 < max * max) {
            const alpha = 1 - Math.sqrt(d2) / max;
            ctx.strokeStyle = `rgba(120, 190, 255, ${alpha * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden />
      <div className="fixed inset-0 -z-20 grid-bg opacity-30 pointer-events-none" aria-hidden />
    </>
  );
}

/* ============================================================ */
/* NAV                                                          */
/* ============================================================ */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,95vw)]"
      >
        <div className="glass-strong rounded-2xl px-4 md:px-6 py-3 flex items-center gap-4">
          <button onClick={() => go("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg glass flex items-center justify-center glow-cyan">
              <Brain className="w-4 h-4 text-cyan" />
            </div>
            <span className="font-display font-bold text-sm tracking-widest">YASH.AI</span>
          </button>
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={"relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors " +
                  (active === n.id ? "text-cyan" : "text-muted-foreground hover:text-foreground")}
              >
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded-lg bg-cyan/10 border border-cyan/30 -z-10" />
                )}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => go("contact")} className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs font-medium hover:glow-cyan transition-all">
              Let's talk <ArrowUpRight className="w-3 h-3" />
            </button>
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg glass" aria-label="Open menu">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
        <motion.div className="h-[2px] bg-gradient-to-r from-cyan via-electric to-neon-purple origin-left mt-1 rounded-full" style={{ scaleX }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden bg-background/90 backdrop-blur-xl flex flex-col p-8"
          >
            <button onClick={() => setOpen(false)} className="self-end p-2" aria-label="Close menu"><X /></button>
            <div className="flex-1 flex flex-col justify-center gap-3">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="text-2xl font-display text-left px-6 py-3 rounded-xl glass hover:text-cyan">
                  {n.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================ */
/* HERO                                                         */
/* ============================================================ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 15 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 120, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-24 flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-purple/10 blur-[120px]" />
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan/90">AI Core Online</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            <span className="block">Hi, I'm</span>
            <span className="block text-gradient">Yash.</span>
            <TypeSwitch words={["AI Engineer", "ML Architect", "Speech AI Builder", "Research Explorer"]} />
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            I build intelligent systems that <span className="text-foreground">learn</span>,{" "}
            <span className="text-foreground">predict</span>,{" "}
            <span className="text-foreground">understand</span> and{" "}
            <span className="text-foreground">evolve</span> — from atmospheric forecasting to speech intelligence,
            spam defense, and offline AI assistants.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTA onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} primary>
              <Rocket className="w-4 h-4" /> Explore Projects
            </CTA>
            <CTA onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <Mail className="w-4 h-4" /> Contact Me
            </CTA>
            <CTA>
              <Download className="w-4 h-4" /> Download Resume
            </CTA>
          </div>
          <div className="mt-10 grid grid-cols-3 max-w-md gap-4 pt-6 border-t border-cyan/10">
            {[
              { k: "5+", v: "Systems shipped" },
              { k: "20+", v: "Technologies" },
              { k: "AI/ML", v: "Core focus" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-display font-bold text-gradient">{s.k}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Portrait HUD */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[4/5] max-w-md mx-auto w-full"
          style={{ perspective: 1000 }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative w-full h-full">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden glass-strong glow-cyan">
              <img src={codingPhoto} alt="Yash coding on a Victus laptop — AI & ML Engineer" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute inset-0 scanline pointer-events-none opacity-40" />
              {/* HUD overlays */}
              <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] font-mono text-cyan/90">
                <span>ID: YSH-001</span>
                <span className="animate-blink">● LIVE</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-3 text-xs font-mono">
                <div className="flex items-center gap-2 mb-1"><Activity className="w-3 h-3 text-cyan" /> Neural uptime</div>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-cyan to-electric"
                    initial={{ width: 0 }} animate={{ width: "94%" }} transition={{ duration: 2, delay: 0.5 }} />
                </div>
              </div>
              {/* Corners */}
              {["top-2 left-2", "top-2 right-2 rotate-90", "bottom-2 left-2 -rotate-90", "bottom-2 right-2 rotate-180"].map((p) => (
                <span key={p} className={"absolute w-5 h-5 border-t-2 border-l-2 border-cyan " + p} />
              ))}
            </div>
            {/* Orbit */}
            <div className="absolute -inset-8 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-cyan/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-dashed border-neon-purple/20 animate-spin-slower" />
            </div>
            <FloatingChip icon={<Brain className="w-3 h-3" />} label="TensorFlow" className="top-6 -left-4" />
            <FloatingChip icon={<Zap className="w-3 h-3" />} label="PyTorch" className="top-1/3 -right-6" />
            <FloatingChip icon={<Code2 className="w-3 h-3" />} label="Python" className="bottom-16 -left-6" />
            <FloatingChip icon={<Cloud className="w-3 h-3" />} label="FastAPI" className="bottom-4 -right-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingChip({ icon, label, className = "" }: { icon: ReactNode; label: string; className?: string }) {
  return (
    <motion.div
      className={"absolute glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono animate-float " + className}
      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
    >
      <span className="text-cyan">{icon}</span> {label}
    </motion.div>
  );
}

function TypeSwitch({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 font-display font-medium text-cyan/90">
      <AnimatePresence mode="wait">
        <motion.span key={words[i]}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }} className="inline-block">
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="text-cyan animate-blink ml-1">▮</span>
    </span>
  );
}

function CTA({ children, onClick, primary = false }: { children: ReactNode; onClick?: () => void; primary?: boolean }) {
  return (
    <motion.button
      onClick={onClick} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
      className={
        "group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all " +
        (primary
          ? "bg-gradient-to-r from-cyan to-electric text-background glow-cyan"
          : "glass hover:border-cyan/40 hover:glow-cyan")
      }
    >
      {children}
    </motion.button>
  );
}

/* ============================================================ */
/* Reusable Section header                                      */
/* ============================================================ */

function SectionHeader({ tag, title, subtitle, icon }: { tag: string; title: ReactNode; subtitle?: string; icon?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      className="mb-16 text-center max-w-3xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4">
        {icon || <Sparkles className="w-3 h-3 text-cyan" />}
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan/90">{tag}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}

/* ============================================================ */
/* ABOUT                                                        */
/* ============================================================ */

function About() {
  const timeline = [
    { year: "Foundations", title: "Discovered Code", body: "Started programming — falling for algorithms, math and the elegance of systems that reason." },
    { year: "Awakening", title: "Met Machine Learning", body: "Moved from writing rules to teaching data. Built intuition through classical ML, then deep learning." },
    { year: "Craft", title: "Shipping AI", body: "Started deploying real systems — from atmospheric intelligence to spam defense — end-to-end, not just notebooks." },
    { year: "Now", title: "Applied Research", body: "Pushing into speech intelligence, offline AI assistants, and the Human Digital Twin research concept." },
  ];
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Identity" title={<>The engineer behind <span className="text-gradient">the systems</span></>}
          subtitle="Curious mind, engineer's hands, researcher's patience." icon={<Brain className="w-3 h-3 text-cyan" />} />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-strong glow-cyan">
              <img src={formalPhoto} alt="Yash — professional portrait" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center"><GraduationCap className="w-5 h-5 text-cyan" /></div>
                  <div>
                    <div className="font-display font-semibold">Currently Studying</div>
                    <div className="text-xs text-muted-foreground">B.Tech · Computer Science · AI/ML focus</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <Stat label="CGPA" value="9.71" />
                  <Stat label="Projects" value="5+" />
                  <Stat label="Focus" value="AI/ML" />
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <InfoCard icon={<Target className="w-4 h-4" />} title="Mission">
                Build AI that measurably improves how people work, learn and live — not tech demos, real products.
              </InfoCard>
              <InfoCard icon={<Sparkles className="w-4 h-4" />} title="Vision">
                A future where intelligent systems collaborate with humans across health, language and everyday work.
              </InfoCard>
              <InfoCard icon={<Briefcase className="w-4 h-4" />} title="Objective">
                Join a team shipping ambitious ML products — where research, engineering and product intersect.
              </InfoCard>
              <InfoCard icon={<HeartPulse className="w-4 h-4" />} title="Interests">
                Speech AI, Healthcare AI, Generative AI, Explainable AI, Offline / On-device intelligence.
              </InfoCard>
            </div>

            <div className="glass-strong rounded-3xl p-6">
              <h3 className="font-display font-semibold mb-6 flex items-center gap-2 text-lg">
                <GitBranch className="w-4 h-4 text-cyan" /> The Journey
              </h3>
              <div className="relative pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-electric to-neon-purple" />
                {timeline.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="relative mb-6 last:mb-0">
                    <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-cyan glow-cyan ring-4 ring-background" />
                    <div className="text-[10px] font-mono uppercase tracking-widest text-cyan/80">{t.year}</div>
                    <div className="font-display font-semibold text-foreground">{t.title}</div>
                    <div className="text-sm text-muted-foreground">{t.body}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-lg font-display font-bold text-gradient">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan">{icon}</div>
        <div className="font-display font-semibold">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </motion.div>
  );
}

/* ============================================================ */
/* PROJECTS                                                     */
/* ============================================================ */

type Project = {
  id: string;
  name: string;
  tagline: string;
  theme: string;
  accent: "cyan" | "orange" | "purple" | "electric";
  icon: ReactNode;
  overview: string;
  problem?: string;
  architecture: string[];
  features: string[];
  stack: string[];
  challenges?: string[];
  roadmap: string[];
  deployment?: string;
  github?: string;
  demo?: string;
  concept?: boolean;
  metrics?: { label: string; value: string }[];
  visual: "climora" | "spam" | "speech" | "jarvis" | "twin";
};

const PROJECTS: Project[] = [
  {
    id: "climora",
    name: "Climora",
    tagline: "Atmospheric Intelligence for accurate, hybrid forecasting.",
    theme: "Atmospheric Intelligence",
    accent: "cyan",
    icon: <Cloud className="w-5 h-5" />,
    visual: "climora",
    overview:
      "Climora is a weather intelligence system that fuses physical forecasts with ML corrections to produce sharper, location-aware predictions and rich atmospheric analytics.",
    problem:
      "Traditional forecasts trade accuracy for coverage. Users want reliable hyper-local predictions with reasoning — not just numbers.",
    architecture: [
      "Data ingestion from open weather APIs and satellite feeds",
      "Feature engineering pipeline (temporal, spatial, seasonal)",
      "Hybrid model: physics-derived priors + gradient boosted ML residuals",
      "Deep learning module (LSTM / temporal CNN) for short-term nowcasting",
      "FastAPI inference layer with cached tile responses",
      "React dashboard with animated radar, forecasts and comparative charts",
    ],
    features: [
      "7-day location-aware forecasts",
      "Hyper-local nowcasting (0–6h)",
      "Interactive radar & atmospheric charts",
      "Model confidence + explanations",
      "Responsive dashboard with dark HUD styling",
    ],
    stack: ["Python", "PyTorch", "Scikit-learn", "FastAPI", "React", "TypeScript", "TailwindCSS", "Docker"],
    challenges: [
      "Balancing physics-based priors with ML residuals to avoid overfitting seasonal drift",
      "Latency budget for interactive tiles vs. deep model inference",
    ],
    roadmap: [
      "Satellite-image based rainfall segmentation",
      "Air-quality + pollen forecasting layer",
      "Push alerts with personalized thresholds",
    ],
    deployment: "Dockerized services, edge-cached tiles, ready for cloud deploy.",
    metrics: [
      { label: "Forecast horizon", value: "7d" },
      { label: "Nowcast", value: "0–6h" },
      { label: "Stack", value: "Hybrid ML" },
    ],
  },
  {
    id: "smart-spam",
    name: "Smart Spam AI",
    tagline: "Explainable multi-model spam & threat defense.",
    theme: "Cybersecurity",
    accent: "orange",
    icon: <Shield className="w-5 h-5" />,
    visual: "spam",
    overview:
      "Smart Spam AI is a defense-grade classifier that combines transformer semantics with classical baselines and rule heuristics for robust, explainable threat detection.",
    architecture: [
      "Input normalization + language detection",
      "DistilBERT contextual embeddings",
      "Naive Bayes + Linear SVM ensemble baselines",
      "Heuristic feature layer (URL entropy, sender graph, obfuscation)",
      "Meta-classifier voting & confidence calibration",
      "Explainable-AI layer with token-level attributions",
    ],
    features: [
      "Multi-model ensemble (transformer + classical + heuristics)",
      "Live threat dashboard with severity meter",
      "Explainable per-message attributions",
      "Batch scan + streaming API",
    ],
    stack: ["Python", "HuggingFace Transformers", "PyTorch", "Scikit-learn", "FastAPI", "React"],
    roadmap: [
      "Multilingual coverage expansion",
      "Adversarial training against obfuscation",
      "On-device distilled inference",
    ],
    deployment: "FastAPI + containerized inference, ready for horizontal scaling.",
    metrics: [
      { label: "Models", value: "3+" },
      { label: "Signals", value: "20+" },
      { label: "Explain", value: "Token-level" },
    ],
  },
  {
    id: "nexus-speech",
    name: "Nexus Speech AI",
    tagline: "Voice intelligence: transcribe, translate, understand.",
    theme: "Voice Intelligence",
    accent: "electric",
    icon: <Mic className="w-5 h-5" />,
    visual: "speech",
    overview:
      "Nexus Speech AI turns any voice input into structured, actionable intelligence — transcription, translation, summarization and intent extraction in one pipeline.",
    architecture: [
      "Audio capture + WebRTC streaming",
      "Whisper-based multilingual transcription",
      "LLaMA-based reasoning and summarization",
      "Real-time waveform + spectrum visualization",
      "FastAPI backend with streaming responses",
      "React front-end with live captions",
    ],
    features: [
      "Live multilingual transcription",
      "On-the-fly translation",
      "Meeting summaries & action items",
      "Speaker diarization & sentiment cues",
    ],
    stack: ["Whisper", "LLaMA", "PyTorch", "FastAPI", "WebRTC", "React", "TypeScript"],
    roadmap: [
      "On-device inference for privacy mode",
      "Custom voice cloning for accessibility",
      "Real-time meeting copilot",
    ],
    deployment: "Streamed inference, containerized, GPU-optional.",
    metrics: [
      { label: "Languages", value: "90+" },
      { label: "Latency", value: "Streaming" },
      { label: "Modes", value: "STT+MT" },
    ],
  },
  {
    id: "jarvis",
    name: "JARVIS",
    tagline: "A personal offline-first AI assistant.",
    theme: "Iron Man HUD",
    accent: "cyan",
    icon: <Bot className="w-5 h-5" />,
    visual: "jarvis",
    overview:
      "JARVIS is a modular, offline-capable AI assistant with voice, memory, emotion cues and a blue holographic interface — designed to feel like your own operating system.",
    architecture: [
      "Voice front-end (wake word + STT)",
      "Local LLM reasoning core (LLaMA-family)",
      "Long-term memory store with retrieval",
      "Emotion engine for tone-adaptive responses",
      "Module system: skills, integrations, automations",
      "Holographic UI with animated visuals",
    ],
    features: [
      "Voice + text interaction",
      "Contextual memory across sessions",
      "Emotion-aware responses",
      "Modular skills (weather, tasks, code, search)",
      "Offline-first mode",
    ],
    stack: ["Python", "LLaMA", "Whisper", "FastAPI", "React", "Framer Motion"],
    roadmap: [
      "Full offline model quantization",
      "Vision module for screen understanding",
      "Cross-device continuity",
    ],
    deployment: "Runs locally with optional cloud sync.",
    metrics: [
      { label: "Mode", value: "Offline-first" },
      { label: "Memory", value: "Persistent" },
      { label: "Modules", value: "Extensible" },
    ],
  },
  {
    id: "human-digital-twin",
    name: "Human Digital Twin",
    tagline: "A research concept for personalized medical intelligence.",
    theme: "Medical Intelligence",
    accent: "purple",
    icon: <HeartPulse className="w-5 h-5" />,
    visual: "twin",
    concept: true,
    overview:
      "A research concept: a personalized, continuously-updating digital model of a human — combining wearables, EHR, genomics and imaging — to simulate interventions before they happen.",
    architecture: [
      "Multi-modal ingestion (wearables, imaging, labs, genomics)",
      "Physiological simulation core",
      "Personalized ML predictors (risk, response, trajectory)",
      "Explainable clinician-facing dashboard",
      "Privacy layer with on-device federation",
    ],
    features: [
      "Continuous health trajectory prediction",
      "What-if intervention simulation",
      "Personalized risk scoring",
      "Explainable, clinician-approved reasoning",
    ],
    stack: ["Research concept", "Physiological modelling", "Federated ML", "Explainable AI"],
    roadmap: [
      "Prototype cardio-respiratory subsystem",
      "Federated training pilot",
      "Clinician-in-the-loop evaluation",
      "Regulatory & ethics framework",
    ],
    metrics: [
      { label: "Status", value: "Research" },
      { label: "Focus", value: "Health AI" },
      { label: "Modality", value: "Multi-modal" },
    ],
  },
];

function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="projects" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Portfolio" title={<>Systems in <span className="text-gradient">production</span> and research</>}
          subtitle="Each project is an immersive system, not a card. Click to enter." icon={<Layers className="w-3 h-3 text-cyan" />} />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

const ACCENT: Record<Project["accent"], { text: string; glow: string; bg: string; ring: string }> = {
  cyan:     { text: "text-cyan",         glow: "glow-cyan",   bg: "bg-cyan/10",         ring: "ring-cyan/40" },
  electric: { text: "text-[color:var(--electric)]", glow: "glow-cyan", bg: "bg-[color:var(--electric)]/10", ring: "ring-[color:var(--electric)]/40" },
  purple:   { text: "text-[color:var(--neon-purple)]", glow: "glow-purple", bg: "bg-[color:var(--neon-purple)]/10", ring: "ring-[color:var(--neon-purple)]/40" },
  orange:   { text: "text-[color:var(--soft-orange)]", glow: "glow-orange", bg: "bg-[color:var(--soft-orange)]/10", ring: "ring-[color:var(--soft-orange)]/40" },
};

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const a = ACCENT[p.accent];
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
      className={"group relative text-left glass-strong rounded-3xl p-6 overflow-hidden ring-1 ring-transparent hover:" + a.ring + " transition-all"}
    >
      <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
        <ProjectVisual variant={p.visual} accent={p.accent} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={"w-9 h-9 rounded-xl glass flex items-center justify-center " + a.text + " " + a.glow}>{p.icon}</div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{p.theme}</span>
        </div>
        {p.concept && (
          <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full bg-[color:var(--neon-purple)]/20 text-[color:var(--neon-purple)] border border-[color:var(--neon-purple)]/40">
            Research Concept
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={"text-2xl font-display font-bold mb-1 " + a.text}>{p.name}</h3>
          <p className="text-sm text-muted-foreground">{p.tagline}</p>
        </div>
        <div className={"shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center group-hover:" + a.glow + " transition-all"}>
          <ArrowUpRight className={"w-4 h-4 " + a.text} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 5).map((s) => (
          <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full glass border border-cyan/20">{s}</span>
        ))}
        {p.stack.length > 5 && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full glass">+{p.stack.length - 5}</span>}
      </div>
    </motion.button>
  );
}

function ProjectVisual({ variant, accent }: { variant: Project["visual"]; accent: Project["accent"] }) {
  const a = ACCENT[accent];
  if (variant === "climora") return (
    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--cyan)]/15 via-background to-[color:var(--electric)]/10">
      {[...Array(30)].map((_, i) => (
        <span key={i} className="absolute w-0.5 h-4 bg-cyan/40 rounded-full"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animation: `float ${3 + i % 4}s ease-in-out ${i * 0.1}s infinite` }} />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M0,120 Q100,80 200,110 T400,90" stroke="var(--cyan)" strokeWidth="2" fill="none" />
        <path d="M0,140 Q100,100 200,130 T400,110" stroke="var(--electric)" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
  if (variant === "spam") return (
    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--soft-orange)]/15 via-background to-red-500/5">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Radar className={"w-40 h-40 animate-spin-slow " + a.text + " opacity-60"} />
      </div>
    </div>
  );
  if (variant === "speech") return (
    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--electric)]/15 via-background to-[color:var(--cyan)]/10 flex items-center justify-center">
      <div className="flex items-end gap-1 h-24">
        {[...Array(28)].map((_, i) => (
          <motion.span key={i} className="w-1.5 bg-gradient-to-t from-cyan to-electric rounded-full"
            animate={{ height: [8, 40 + Math.random() * 50, 12] }}
            transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.05 }} />
        ))}
      </div>
    </div>
  );
  if (variant === "jarvis") return (
    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--cyan)]/15 via-background to-blue-500/10 flex items-center justify-center">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 rounded-full border border-cyan/40 animate-spin-slow" />
        <div className="absolute inset-4 rounded-full border border-dashed border-cyan/30 animate-spin-slower" />
        <div className="absolute inset-10 rounded-full glass-strong flex items-center justify-center glow-cyan">
          <Brain className="w-8 h-8 text-cyan" />
        </div>
        <span className="absolute inset-0 rounded-full border border-cyan/60 animate-pulse-ring" />
      </div>
    </div>
  );
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-purple)]/20 via-background to-pink-500/10 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-40 h-40 opacity-80">
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--neon-purple)" strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="var(--neon-purple)" strokeWidth="1" opacity="0.7" />
        <path d="M100 40 v120 M40 100 h120" stroke="var(--neon-purple)" strokeWidth="0.5" opacity="0.4" />
        <HeartPulse x="80" y="80" width="40" height="40" color="var(--neon-purple)" />
      </svg>
    </div>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const a = ACCENT[p.accent];
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEsc);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onEsc); };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-background/90 backdrop-blur-xl overflow-y-auto">
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className="min-h-full container mx-auto px-4 md:px-8 py-8">
        <div className="glass-strong rounded-3xl overflow-hidden">
          <div className="relative h-64 md:h-80">
            <ProjectVisual variant={p.visual} accent={p.accent} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <button onClick={onClose} aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-cyan">
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={"w-11 h-11 rounded-xl glass flex items-center justify-center " + a.text + " " + a.glow}>{p.icon}</div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{p.theme}</span>
                  {p.concept && <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full bg-[color:var(--neon-purple)]/20 text-[color:var(--neon-purple)] border border-[color:var(--neon-purple)]/40">Research Concept</span>}
                </div>
                <h3 className={"text-4xl md:text-5xl font-display font-bold " + a.text}>{p.name}</h3>
                <p className="text-muted-foreground mt-1 max-w-2xl">{p.tagline}</p>
              </div>
              {p.metrics && (
                <div className="flex gap-2">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="glass rounded-xl px-4 py-2 text-center">
                      <div className={"text-lg font-display font-bold " + a.text}>{m.value}</div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Block title="Overview" icon={<Sparkles className="w-4 h-4" />}>{p.overview}</Block>
              {p.problem && <Block title="Problem" icon={<Target className="w-4 h-4" />}>{p.problem}</Block>}
              <Block title="Architecture" icon={<Layers className="w-4 h-4" />}>
                <ol className="space-y-2">
                  {p.architecture.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className={"font-mono text-xs " + a.text + " min-w-[24px]"}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ol>
              </Block>
              <Block title="Features" icon={<Zap className="w-4 h-4" />}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {p.features.map((f) => (
                    <div key={f} className="glass rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                      <ChevronRight className={"w-3 h-3 " + a.text} /> {f}
                    </div>
                  ))}
                </div>
              </Block>
              {p.challenges && (
                <Block title="Engineering Challenges" icon={<FlaskConical className="w-4 h-4" />}>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {p.challenges.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </Block>
              )}
              <Block title={p.concept ? "Research Roadmap" : "Future Roadmap"} icon={<Rocket className="w-4 h-4" />}>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  {p.roadmap.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </Block>
            </div>

            <aside className="space-y-6">
              <div className="glass rounded-2xl p-5">
                <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-widest text-muted-foreground">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className={"text-[11px] font-mono px-2.5 py-1 rounded-full glass border " + a.ring}>{s}</span>
                  ))}
                </div>
              </div>
              {p.deployment && (
                <div className="glass rounded-2xl p-5">
                  <h4 className="font-display font-semibold mb-2 text-sm uppercase tracking-widest text-muted-foreground">Deployment</h4>
                  <p className="text-sm text-muted-foreground">{p.deployment}</p>
                </div>
              )}
              {!p.concept && (
                <div className="space-y-2">
                  <a href={p.github ?? "#"} target="_blank" rel="noreferrer"
                    className="flex items-center justify-between glass rounded-xl px-4 py-3 hover:glow-cyan transition-all">
                    <span className="flex items-center gap-2 text-sm"><Github className="w-4 h-4" /> View on GitHub</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a href={p.demo ?? "#"} target="_blank" rel="noreferrer"
                    className={"flex items-center justify-between glass rounded-xl px-4 py-3 hover:" + a.glow + " transition-all"}>
                    <span className="flex items-center gap-2 text-sm"><Rocket className="w-4 h-4" /> Live Demo</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
        <span className="text-cyan">{icon}</span> {title}
      </h4>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

/* ============================================================ */
/* SKILLS - orbiting AI core                                    */
/* ============================================================ */

const SKILLS = [
  { name: "Python",       cat: "Programming", icon: <Code2 className="w-4 h-4" />, desc: "Core language for ML pipelines, APIs and tooling.", used: "Every project" },
  { name: "TypeScript",   cat: "Programming", icon: <Code2 className="w-4 h-4" />, desc: "Type-safe front-ends and Node services.", used: "Portfolio · Dashboards" },
  { name: "PyTorch",      cat: "AI",          icon: <Brain className="w-4 h-4" />, desc: "Deep learning training + inference.", used: "Speech AI · Spam AI" },
  { name: "TensorFlow",   cat: "AI",          icon: <Brain className="w-4 h-4" />, desc: "Model experimentation & Keras workflows.", used: "Research · Prototypes" },
  { name: "HuggingFace",  cat: "AI",          icon: <Sparkles className="w-4 h-4" />, desc: "Transformers, tokenizers, datasets.", used: "Smart Spam AI" },
  { name: "Whisper",      cat: "AI",          icon: <Waves className="w-4 h-4" />, desc: "Multilingual speech-to-text.", used: "Nexus Speech AI" },
  { name: "LLaMA",        cat: "AI",          icon: <Bot className="w-4 h-4" />, desc: "Local LLM reasoning and generation.", used: "JARVIS · Nexus" },
  { name: "Scikit-learn", cat: "AI",          icon: <LineChart className="w-4 h-4" />, desc: "Classical ML baselines & ensembling.", used: "Spam AI · Climora" },
  { name: "FastAPI",      cat: "Backend",     icon: <Cpu className="w-4 h-4" />, desc: "High-perf Python inference APIs.", used: "All ML services" },
  { name: "PostgreSQL",   cat: "Backend",     icon: <Database className="w-4 h-4" />, desc: "Relational storage & analytics.", used: "Dashboards" },
  { name: "React",        cat: "Frontend",    icon: <Layers className="w-4 h-4" />, desc: "Component UIs with modern hooks.", used: "All dashboards" },
  { name: "Tailwind",     cat: "Frontend",    icon: <Wand2 className="w-4 h-4" />, desc: "Design-system-first styling.", used: "This site + more" },
  { name: "Docker",       cat: "Deployment",  icon: <Cloud className="w-4 h-4" />, desc: "Reproducible container deploys.", used: "Every backend" },
  { name: "Git",          cat: "Tools",       icon: <GitBranch className="w-4 h-4" />, desc: "Version control & collaboration.", used: "Daily" },
  { name: "Linux",        cat: "Tools",       icon: <Terminal className="w-4 h-4" />, desc: "Server ops & dev environments.", used: "Servers · GPUs" },
];

const CATEGORIES = ["Programming", "AI", "Backend", "Frontend", "Tools", "Deployment"] as const;

function Skills() {
  const [active, setActive] = useState<(typeof SKILLS)[number] | null>(null);
  const [cat, setCat] = useState<string>("All");

  const list = useMemo(() => cat === "All" ? SKILLS : SKILLS.filter((s) => s.cat === cat), [cat]);

  return (
    <section id="skills" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Capabilities" title={<>The <span className="text-gradient">AI Core</span></>}
          subtitle="Skills orbit the core. Hover a node to inspect it." icon={<Cpu className="w-3 h-3 text-cyan" />} />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={"px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all " +
                (cat === c ? "bg-cyan/20 text-cyan border border-cyan/40 glow-cyan" : "glass hover:border-cyan/30")}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          {/* Orbit */}
          <div className="relative aspect-square max-w-[560px] mx-auto w-full">
            <div className="absolute inset-8 rounded-full border border-cyan/20 animate-spin-slow" />
            <div className="absolute inset-24 rounded-full border border-dashed border-electric/20 animate-spin-slower" />
            <div className="absolute inset-40 rounded-full border border-neon-purple/20 animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-28 h-28 rounded-full glass-strong glow-cyan flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-cyan/40 animate-pulse-ring" />
                <Brain className="w-10 h-10 text-cyan" />
              </div>
            </div>
            {list.map((s, i) => {
              const angle = (i / list.length) * Math.PI * 2;
              const radius = 42 + (i % 3) * 6; // percent
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return (
                <motion.button key={s.name}
                  onMouseEnter={() => setActive(s)} onClick={() => setActive(s)}
                  className={"absolute -translate-x-1/2 -translate-y-1/2 glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono transition-all " +
                    (active?.name === s.name ? "glow-cyan border-cyan/50 scale-110" : "hover:glow-cyan")}
                  style={{ left: x + "%", top: y + "%" }}
                  whileHover={{ scale: 1.15 }}>
                  <span className="text-cyan">{s.icon}</span> {s.name}
                </motion.button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="glass-strong rounded-3xl p-6 min-h-[280px]">
            {active ? (
              <motion.div key={active.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-cyan glow-cyan">{active.icon}</div>
                  <div>
                    <div className="text-2xl font-display font-bold text-gradient">{active.name}</div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{active.cat}</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{active.desc}</p>
                <div className="text-xs font-mono text-cyan/80 uppercase tracking-widest mb-1">Used in</div>
                <div className="text-sm">{active.used}</div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center mb-3"><Sparkles className="w-6 h-6 text-cyan" /></div>
                <p className="max-w-xs">Hover any skill node in the orbit to inspect it here — with description and where it's used.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* EXPERIENCE                                                   */
/* ============================================================ */

function Experience() {
  const rows = [
    { role: "AI/ML Engineer — Independent Projects", org: "Self-driven", period: "2024 — Present",
      body: "Designed, built and shipped end-to-end AI systems: Climora, Smart Spam AI, Nexus Speech AI and JARVIS. Owned the full loop — data, modeling, deployment, UX." },
    { role: "AI/ML Internship", org: "Applied ML Team", period: "Summer",
      body: "Contributed to production ML workflows: data preprocessing, model training, evaluation and deployment on cloud infrastructure." },
    { role: "B.Tech — Computer Science (AI/ML focus)", org: "Undergraduate", period: "Ongoing",
      body: "Foundations in algorithms, systems and mathematics — with a self-directed depth in machine learning, deep learning and NLP." },
  ];
  return (
    <section id="experience" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Track Record" title={<>Where I've <span className="text-gradient">shipped and learned</span></>}
          icon={<Briefcase className="w-3 h-3 text-cyan" />} />
        <div className="max-w-3xl mx-auto space-y-4">
          {rows.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:glow-cyan hover:border-cyan/30 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-display font-semibold text-lg">{r.role}</h3>
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan/80">{r.period}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">{r.org}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* ACHIEVEMENTS                                                 */
/* ============================================================ */

function useCounter(to: number, duration = 1.6) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0, start = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / (duration * 1000));
        setN(Math.floor(p * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      obs.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [to, duration]);
  return { n, ref };
}

function Metric({ value, suffix = "", label, icon }: { value: number; suffix?: string; label: string; icon: ReactNode }) {
  const { n, ref } = useCounter(value);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="glass-strong rounded-2xl p-6 text-center">
      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-cyan mx-auto mb-3 glow-cyan">{icon}</div>
      <div className="text-4xl font-display font-bold text-gradient">
        <span ref={ref}>{n}</span>{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Numbers" title={<>Traction, <span className="text-gradient">measured</span></>}
          icon={<Award className="w-3 h-3 text-cyan" />} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          <Metric value={5}  suffix="+"  label="Projects Shipped" icon={<Rocket className="w-5 h-5" />} />
          <Metric value={20} suffix="+"  label="Technologies"     icon={<Cpu className="w-5 h-5" />} />
          <Metric value={4}  suffix=""   label="Deployments"      icon={<Cloud className="w-5 h-5" />} />
          <Metric value={1}  suffix=""   label="Internship"       icon={<Briefcase className="w-5 h-5" />} />
          <Metric value={1}  suffix=""   label="Research Concept" icon={<FlaskConical className="w-5 h-5" />} />
          <Metric value={87} suffix="/100" label="CGPA (8.7)"     icon={<GraduationCap className="w-5 h-5" />} />
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* RESEARCH                                                     */
/* ============================================================ */

function Research() {
  const areas = [
    { icon: <HeartPulse className="w-5 h-5" />, name: "Healthcare AI", body: "Human Digital Twin, personalized medicine, wearable-driven prediction." },
    { icon: <Bot className="w-5 h-5" />,        name: "Generative AI", body: "Multimodal generation, controllable outputs, retrieval-augmented reasoning." },
    { icon: <Shield className="w-5 h-5" />,     name: "Explainable AI", body: "Trustworthy models with token-level attribution and clinician-friendly reasoning." },
    { icon: <Mic className="w-5 h-5" />,        name: "Speech AI",     body: "Streaming ASR, multilingual understanding, on-device inference." },
  ];
  return (
    <section id="research" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Lab" title={<>Applied <span className="text-gradient">Research</span></>}
          subtitle="Where I invest the deep-work hours." icon={<FlaskConical className="w-3 h-3 text-cyan" />} />
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-neon-purple/10 blur-3xl" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[color:var(--neon-purple)] glow-purple">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--neon-purple)]">Research Concept</div>
                <h3 className="text-2xl font-display font-bold">Human Digital Twin</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A personalized, continuously-updating digital model of a human — combining wearables, EHR, genomics and imaging —
              to <span className="text-foreground">simulate interventions</span> before they happen and give clinicians better answers, faster.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Multi-modal ingestion",
                "Physiological simulation",
                "Personalized ML predictors",
                "Federated privacy layer",
                "Explainable clinician dashboard",
                "Ethics + regulatory framework",
              ].map((x) => (
                <div key={x} className="glass rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-[color:var(--neon-purple)]" /> {x}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {areas.map((a, i) => (
              <motion.div key={a.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5 hover:glow-cyan hover:border-cyan/30 transition-all">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-cyan mb-3">{a.icon}</div>
                <div className="font-display font-semibold mb-1">{a.name}</div>
                <p className="text-sm text-muted-foreground">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* CONTACT                                                      */
/* ============================================================ */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeader tag="/ Uplink" title={<>Open a <span className="text-gradient">channel</span></>}
          subtitle="I read every message. Recruiters, collaborators and curious minds welcome."
          icon={<Mail className="w-3 h-3 text-cyan" />} />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-strong glow-cyan">
              <img src={casualPhoto} alt="Yash — casual portrait" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <ContactRow icon={<Mail className="w-4 h-4" />} label="Email" value="hello@yash.ai" href="mailto:hello@yash.ai" />
                <ContactRow icon={<Github className="w-4 h-4" />} label="GitHub" value="github.com/yash" href="https://github.com" />
                <ContactRow icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" value="linkedin.com/in/yash" href="https://linkedin.com" />
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); }}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-strong rounded-3xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="What's on your mind?" />
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-cyan/80">Message</label>
              <textarea name="message" rows={5} required placeholder="Share your idea, role or question..."
                className="mt-2 w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50 focus:glow-cyan resize-none placeholder:text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan to-electric text-background font-medium text-sm glow-cyan hover:scale-[1.02] transition-transform">
                <Zap className="w-4 h-4" /> Transmit message
              </button>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm hover:glow-cyan transition-all">
                <Download className="w-4 h-4" /> Download Resume
              </a>
              {sent && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-mono text-cyan">Signal received. I'll respond shortly ✓</motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="flex items-center gap-3 glass rounded-xl px-3 py-2 hover:glow-cyan transition-all">
      <span className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm truncate">{value}</div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
    </a>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] font-mono uppercase tracking-widest text-cyan/80">{label}</label>
      <input id={name} name={name} type={type} required placeholder={placeholder}
        className="mt-2 w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50 focus:glow-cyan placeholder:text-muted-foreground" />
    </div>
  );
}

/* ============================================================ */
/* FOOTER                                                       */
/* ============================================================ */

function Footer() {
  return (
    <footer className="relative py-10 border-t border-cyan/10">
      <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg glass flex items-center justify-center"><Brain className="w-3.5 h-3.5 text-cyan" /></div>
          <span className="font-display text-sm tracking-widest">YASH.AI</span>
          <span className="text-xs text-muted-foreground ml-2">© {new Date().getFullYear()} — Building intelligent systems.</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:glow-cyan"><Github className="w-4 h-4" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:glow-cyan"><Linkedin className="w-4 h-4" /></a>
          <a href="mailto:hello@yash.ai" aria-label="Email"
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:glow-cyan"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ */
/* MAIN                                                         */
/* ============================================================ */

function Portfolio() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence>{!entered && <BootSequence key="boot" onEnter={() => setEntered(true)} />}</AnimatePresence>
      {entered && (
        <>
          {!reduced && <AmbientBackground />}
          <Nav />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Achievements />
          <Research />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
