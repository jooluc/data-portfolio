"use client";

import HalftoneBackground from "@/components/HalftoneBackground";
import Navbar from "../components/Navbar";
import PipelineDiagram from "../components/PipelineDiagram";
import DataWorkflowDiagram from "../components/DataWorkflowDiagram";
import RhbDashboard from "../components/RhbDashboard";
import { useLanguage } from "../components/LanguageContext";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Database,
  GitBranch,
  LineChart,
  Server,
  Sparkles,
} from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDatacamp } from "react-icons/si";

const stack = [
  "Python", "SQL", "PostgreSQL", "Supabase",
  "Next.js", "React", "GitHub Actions", "Vercel",
];

function HomeContent() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yCards = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = [
    { icon: Database, title: t("project.feature1_title"), text: t("project.feature1_text") },
    { icon: LineChart, title: t("project.feature2_title"), text: t("project.feature2_text") },
    { icon: Server,   title: t("project.feature3_title"), text: t("project.feature3_text") },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* ── Hero ── */}
      <section className="relative min-h-screen overflow-hidden px-6 py-8 md:px-10 lg:px-16">
        <HalftoneBackground />
        <Navbar />
        <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
          <motion.div style={{ y: mounted ? yHero : 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              {t("hero.badge")}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition hover:bg-slate-800">
                {t("hero.cta_dashboard")} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#architecture" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-6 py-3 font-medium text-slate-900 transition hover:bg-white">
                {t("hero.cta_architecture")}
              </a>
            </div>
          </motion.div>

          <motion.div style={{ y: mounted ? yCards : 0 }} className="relative">
            <DataWorkflowDiagram />
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="bg-white px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="relative">
            <img src="/images/profile.jpg" alt="Portrait of Luca" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover object-top shadow-xl shadow-slate-200"/>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{t("about.label")}</p>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("about.title")}</h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Python","SQL","PostgreSQL","Data Visualization","Analytics","ETL Pipelines","Machine Learning","React","Next.js"].map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Project ── */}
      <section id="project" className="px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{t("project.label")}</p>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("project.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{t("project.subtitle")}</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section id="architecture" className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white md:px-10 lg:px-16">
        <motion.div style={{ y: mounted ? yHero : 0 }} className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"/>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">{t("architecture.label")}</p>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("architecture.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">{t("architecture.subtitle")}</p>
          </div>
          <div className="mt-14 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
            <PipelineDiagram />
          </div>
        </div>
      </section>

      {/* ── Dashboard ── */}
      <section id="dashboard" className="px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{t("dashboard.label")}</p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("dashboard.title")}</h2>
            </div>
            <p className="max-w-md leading-7 text-slate-600">{t("dashboard.subtitle")}</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
            </div>
            <div className="rounded-b-[1.5rem] bg-slate-50 p-8">
              <RhbDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="px-6 pb-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 md:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{t("stack.label")}</p>
              <h2 className="text-3xl font-semibold tracking-tight">{t("stack.title")}</h2>
            </div>
            <div className="flex max-w-3xl flex-wrap gap-3">
              {stack.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="border-t border-slate-200 px-6 py-10 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-slate-500 md:flex-row">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-5 text-slate-600">
            <a href="https://github.com/jooluc" target="_blank" className="transition hover:text-slate-950"><FaGithub size={22} /></a>
            <a href="https://www.linkedin.com/in/luca-joos-256b01183/" target="_blank" className="transition hover:text-slate-950"><FaLinkedin size={22} /></a>
            <a href="mailto:luca.joos-portfolio@pm.me" className="transition hover:text-slate-950"><FaEnvelope size={22} /></a>
            <a href="https://www.datacamp.com/portfolio/lucajoos" target="_blank" className="transition hover:text-slate-950"><SiDatacamp size={22} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}