"use client";

import { useState } from "react";
import { GitBranch, Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 text-xs font-medium">
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition ${lang === "en" ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-950"}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("de")}
        className={`rounded-full px-2.5 py-1 transition ${lang === "de" ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-950"}`}
      >
        DE
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about",        label: t("nav.about") },
    { href: "#project",      label: t("nav.project") },
    { href: "#architecture", label: t("nav.architecture") },
    { href: "#dashboard",    label: t("nav.dashboard") },
  ];

  return (
    <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white">
          <GitBranch className="h-4 w-4" />
        </div>
        <span className="font-semibold tracking-tight">Luca Joos</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="hover:text-slate-950 transition">{label}</a>
        ))}
        <LanguageToggle />
      </div>

      {/* Mobile: Language Toggle + Hamburger */}
      <div className="flex items-center gap-3 md:hidden">
        <LanguageToggle />
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition hover:text-slate-950"
          aria-label="Menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur md:hidden z-50"
          >
            <div className="flex flex-col gap-1">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}