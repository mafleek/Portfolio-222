import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Linkedin,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  LayoutGrid,
  PanelsTopLeft,
  Waypoints,
} from "lucide-react";

type NavItem = { label: string; href: string };
type Portrait = { src: string; alt: string };
type Project = { tag: string; title: string; summary: string; href?: string; featured?: boolean };

type ResumeCardProps = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  href: string;
  preview: string[];
};

const SPINSPOTTER_PROTOTYPE_URL = "https://wool-shred-49318596.figma.site";

const navItems: NavItem[] = [
  { label: "About Me", href: "#/about" },
  { label: "Projects", href: "#/projects" },
  { label: "Resume", href: "#/resume" },
  { label: "Contact", href: "#/contact" },
];

const portraits: Portrait[] = [
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900", alt: "Maleek portrait front" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900", alt: "Maleek portrait profile" },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900", alt: "Maleek portrait monochrome" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900", alt: "Maleek portrait leather" },
];

const projects: Project[] = [
  {
    tag: "Flagship Case Study · Product Strategy · HCI",
    title: "SpinSpotter",
    summary:
      "A browser extension and mobile app concept designed to detect framing bias in news media using NLP and explainable AI.",
    href: "#/projects/spinspotter",
    featured: true,
  },
  {
    tag: "Clinical UX · Data Tracking · AI Assistance",
    title: "HEART Clinic Documentation System",
    summary: "A mobile-first concept for a clinic workflow with wearable data and AI-assisted note drafting.",
    href: "#/projects/heart-clinic",
  },
];

function useHashRoute(): string {
  const getRoute = () => window.location.hash.replace("#", "") || "/about";
  const [route, setRoute] = useState<string>(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function PortraitCard({ portrait }: { portrait: Portrait }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 min-h-[220px]">
      <img src={portrait.src} alt={portrait.alt} className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
    </div>
  );
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="relative border-b border-white/10 pb-12 lg:pb-16">
      <div className="mb-6 text-xs uppercase tracking-[0.35em] text-white/45">{eyebrow}</div>
      <h1 className="max-w-5xl bg-gradient-to-r from-white via-white to-white/70 bg-clip-text font-serif text-5xl leading-none tracking-tight text-transparent sm:text-6xl lg:text-8xl">
        {title}
      </h1>
      <p className="mt-8 max-w-4xl text-lg leading-8 text-white/70 lg:text-2xl lg:leading-10">{intro}</p>
    </section>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const route = useHashRoute();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [route]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#/about" className="flex items-center gap-3">
            <span className="font-serif text-4xl italic text-red-500">Mp</span>
            <span className="hidden text-xs uppercase tracking-[0.35em] text-white/55 sm:block">Maleek Patterson</span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => {
              const active = route === item.href.replace("#", "");
              return (
                <a key={item.label} href={item.href} className={active ? "text-white underline" : "text-white/75 hover:text-white"}>
                  {item.label}
                </a>
              );
            })}
          </nav>
          <button onClick={() => setOpen((v) => !v)} className="rounded-2xl border border-white/15 p-3 md:hidden" aria-label="Toggle navigation">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/10 md:hidden">
              <div className="space-y-4 px-6 py-5">{navItems.map((item) => <a key={item.label} href={item.href} className="block">{item.label}</a>)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-10">{children}</main>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-20">
      <section className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 text-xs uppercase tracking-[0.35em] text-white/45">Psychology · Human-Centered Design · UX Research · AI</div>
          <h1 className="max-w-5xl font-serif text-5xl leading-none tracking-tight sm:text-6xl lg:text-8xl">Maleek Patterson</h1>
          <p className="mt-8 max-w-4xl text-lg leading-8 text-white/70">Designing at the intersection of mind, behavior, and technology.</p>
        </div>
        <PortraitCard portrait={portraits[0]} />
      </section>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="space-y-16">
      <PageHero eyebrow="Selected Work" title="Projects" intro="A tighter project shelf built from the strongest artifacts only." />
      <section className="grid gap-6 lg:grid-cols-2">
        {projects.map((p) => (
          <motion.a key={p.title} href={p.href} whileHover={{ y: -4 }} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-white/45">{p.tag}</div>
            <h3 className="mt-5 font-serif text-3xl">{p.title}</h3>
            <p className="mt-4 text-base leading-7 text-white/70">{p.summary}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/80">Open Case Study <ArrowRight size={16} /></div>
          </motion.a>
        ))}
      </section>
    </div>
  );
}

function SpinSpotterCaseStudyPage() {
  return <PageHero eyebrow="Case Study · SpinSpotter" title="Detecting framing bias with explainable AI." intro="SpinSpotter helps readers identify media framing bias and compare source language." />;
}

function HeartClinicCaseStudyPage() {
  return <PageHero eyebrow="Case Study · HEART Clinic" title="Bringing live physiologic tracking and documentation into one workflow." intro="Combines wearable-device data, HRR zone logic, AI-assisted note drafting, and supervisor review." />;
}

function ResumeCard({ icon: Icon, title, href, preview }: ResumeCardProps) {
  return (
    <motion.a href={href} whileHover={{ y: -6 }} className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="mb-6 flex items-center gap-3 text-white/55"><Icon size={18} /><span className="text-xs uppercase tracking-[0.35em]">Overview</span></div>
      <h3 className="font-serif text-4xl leading-none sm:text-5xl">{title}</h3>
      <ul className="mt-8 space-y-4 text-lg leading-8 text-white/68">{preview.map((item) => <li key={item}>• {item}</li>)}</ul>
    </motion.a>
  );
}

function ResumePage() {
  return (
    <div className="space-y-16">
      <PageHero eyebrow="Resume" title="Experience, education, and capabilities." intro="A clean navigation hub for the pages below." />
      <section className="grid gap-6 lg:grid-cols-3">
        <ResumeCard icon={Briefcase} title="Work History" href="#/resume/work-history" preview={["UX and research experience", "AI-adjacent roles"]} />
        <ResumeCard icon={GraduationCap} title="Education" href="#/resume/education" preview={["M.S. in Human-Centered Design", "B.S. in Psychology"]} />
        <ResumeCard icon={Sparkles} title="Skills" href="#/resume/skills" preview={["UX Research and UX/UI Design", "GenAI and prompt design"]} />
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="space-y-16">
      <PageHero eyebrow="Contact" title="Let’s talk intelligently." intro="Portfolio conversations, research opportunities, or consulting inquiries." />
      <section className="grid gap-6 md:grid-cols-3">
        {[{ icon: Mail, label: "Email", value: "your@email.com" }, { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/yourname" }, { icon: ExternalLink, label: "Prototype", value: SPINSPOTTER_PROTOTYPE_URL }].map((item) => (
          <div key={item.label} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"><item.icon size={18} className="text-white/55" /><div className="mt-3">{item.label}</div><div className="mt-2 break-words text-white/75">{item.value}</div></div>
        ))}
      </section>
    </div>
  );
}

function NotFoundPage() {
  return <PageHero eyebrow="404" title="Page not found." intro="That route does not exist in this prototype." />;
}

export default function PortfolioApp() {
  const route = useHashRoute();
  const page = useMemo(() => {
    switch (route) {
      case "/":
      case "/about":
        return <AboutPage />;
      case "/projects":
        return <ProjectsPage />;
      case "/projects/spinspotter":
        return <SpinSpotterCaseStudyPage />;
      case "/projects/heart-clinic":
        return <HeartClinicCaseStudyPage />;
      case "/resume":
        return <ResumePage />;
      case "/contact":
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  }, [route]);

  return <AppShell>{page}</AppShell>;
}
