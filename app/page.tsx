"use client";

import HalftoneBackground from "@/components/HalftoneBackground";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Database,
  GitBranch,
  LineChart,
  Server,
  Sparkles,
} from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDatacamp } from "react-icons/si";
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const metrics = [
  { label: "Data Sources", value: "12+" },
  { label: "SQL Models", value: "38" },
  { label: "Refresh Cycle", value: "Daily" },
];

const stack = [
  "Python",
  "SQL",
  "PostgreSQL",
  "FastAPI",
  "Streamlit",
  "Plotly",
  "Docker",
  "GitHub Actions",
];

const chartData = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 68 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 71 },
  { month: "May", value: 83 },
  { month: "Jun", value: 91 },
  { month: "Jul", value: 88 },
  { month: "Aug", value: 96 },
];

const features = [
  {
    icon: Database,
    title: "Data Engineering",
    text: "Working with structured data, SQL transformations and small data pipelines to prepare information for analysis and visualization.",
  },
  {
    icon: LineChart,
    title: "Analytics & Forecasting",
    text: "Exploring trends, KPIs and interactive visualizations to better understand data and communicate insights in a simple way.",
  },
  {
    icon: Server,
    title: "Production Mindset",
    text: "Building projects with a focus on clean structure, reproducibility and modern web technologies using React and Next.js.",
  },
];

function AnimatedGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-70">
      <motion.div
        animate={{
          backgroundPosition: [
            "0px 0px",
            "0px 40px",
            "40px 40px",
            "0px 0px",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <motion.div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl"
        animate={{
          x: mousePosition.x - 210,
          y: mousePosition.y - 210,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 120,
          mass: 0.6,
        }}
      />

      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />

      <motion.div
        animate={{ x: [0, 22, 0], y: [0, -18, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-20 top-32 h-40 w-40 rounded-full bg-cyan-100 blur-2xl"
      />

      <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}

function MiniChart() {
  const bars = useMemo(() => [38, 62, 44, 78, 54, 88, 72, 96], []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Regional Market Index</p>
          <p className="text-2xl font-semibold tracking-tight text-slate-950">
            +14.8%
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 p-3 text-white">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>

      <div className="flex h-40 items-end gap-3">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.8, delay: index * 0.08 }}
            className="flex-1 rounded-t-xl bg-slate-900"
          />
        ))}
      </div>

      <div className="mt-5 flex justify-between text-xs text-slate-400">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yCards = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative min-h-screen overflow-hidden px-6 py-8 md:px-10 lg:px-16">
        <HalftoneBackground />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">Luca Joos</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#about" className="hover:text-slate-950">
              About
            </a>
            <a href="#project" className="hover:text-slate-950">
              Project
            </a>
            <a href="#architecture" className="hover:text-slate-950">
              Architecture
            </a>
            <a href="#dashboard" className="hover:text-slate-950">
              Dashboard
            </a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={{ y: mounted ? yHero : 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Python · SQL · Data Visualization
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
              Building practical data solutions with modern web technologies.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              This portfolio showcases personal projects in Python, SQL and data visualization. My goal is to explore how data can be transformed into understandable insights and interactive applications.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                View Dashboard <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="#architecture"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-6 py-3 font-medium text-slate-900 transition hover:bg-white"
              >
                See Architecture
              </a>
            </div>
          </motion.div>

          <motion.div style={{ y: mounted ? yCards : 0 }} className="relative">
            <MiniChart />

            <div className="mt-5 grid grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-5 text-center shadow-sm backdrop-blur"
                >
                  <p className="text-2xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-white px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="relative">
            <img
              src="/images/profile.jpg"
              alt="Portrait of Luca"
              className="aspect-[4/5] w-full rounded-[2.5rem] object-cover object-top shadow-xl shadow-slate-200"
            />
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              About Me
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Hi, I&apos;m Luca — interested in data analytics, visualization and modern data-driven applications.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
              <p>
                I enjoy working with data and turning complex information into clear and visually understandable insights. My interests range from SQL and Python to dashboards and interactive web applications.
              </p>

              <p>
                I am especially interested in data analytics, business intelligence and the technical side of data workflows. Through personal projects, I continuously improve my skills in data modeling, visualization and modern web technologies.
              </p>

              <p>
                This website serves as a portfolio and learning platform where I experiment with dashboards, visualizations and data-focused web applications.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Python",
                "SQL",
                "PostgreSQL",
                "Data Visualization",
                "Analytics",
                "ETL Pipelines",
                "React",
                "Next.js",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="project" className="px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Project
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Projects focused on practical analytics and data visualization.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              The goal of these projects is not only to work with data technically, but also to present information in a way that is intuitive, visually clean and useful for decision-making.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold tracking-tight">
                  {title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="architecture"
        className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white md:px-10 lg:px-16"
      >
        <motion.div
          style={{ y: mounted ? yHero : 0 }}
          className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                Architecture
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                From raw data to insight layer.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                A simplified data workflow combining data collection, transformation and visualization. The focus lies on creating understandable and reproducible analytics applications.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Extract APIs & CSV files",
                "Validate and clean with Python",
                "Model facts and dimensions in SQL",
                "Serve metrics to dashboard",
                "Visualize KPIs and trends",
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-slate-100">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                Dashboard
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Interactive analytics space.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-slate-600">
              This section contains interactive visualizations and dashboard components built with React and modern charting libraries.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
            </div>

            <div className="rounded-b-[1.5rem] bg-slate-50 p-8">
              <div className="mb-10 flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Swiss Economic Activity Index
                  </p>

                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                    +18.4%
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">
                  Updated Daily
                </div>
              </div>

              <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b" }}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b" }}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0f172a"
                      strokeWidth={3}
                      dot={false}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 md:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                Tech Stack
              </p>

              <h2 className="text-3xl font-semibold tracking-tight">
                Built for reproducibility.
              </h2>
            </div>

            <div className="flex max-w-3xl flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="border-t border-slate-200 px-6 py-10 md:px-10 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Luca Joos — Data Portfolio</p>

          <div className="flex items-center gap-5 text-slate-600">
            <a
              href="https://github.com/AnonymousCrux"
              target="_blank"
              className="transition hover:text-slate-950"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://www.linkedin.com/in/luca-joos-256b01183/"
              target="_blank"
              className="transition hover:text-slate-950"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="mailto:luca.joos@protonmail.ch"
              className="transition hover:text-slate-950"
            >
              <FaEnvelope size={22} />
            </a>

            <a
              href="https://www.datacamp.com/portfolio/lucajoos"
              target="_blank"
              className="transition hover:text-slate-950"
            >
              <SiDatacamp size={22} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}