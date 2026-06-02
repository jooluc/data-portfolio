"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "de";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "de") setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }

  function t(key: string): string {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let val: any = translations[lang];
    for (const k of keys) {
      val = val?.[k];
    }
    return typeof val === "string" ? val : key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const translations = {
  en: {
    nav: {
      about: "About",
      project: "Project",
      architecture: "Architecture",
      dashboard: "Dashboard",
    },
    hero: {
      badge: "Python · SQL · Data Visualization",
      title: "Building practical data solutions with modern web technologies.",
      subtitle: "This portfolio showcases personal projects in Python, SQL and data visualization. My goal is to explore how data can be transformed into understandable insights and interactive applications.",
      cta_dashboard: "View Dashboard",
      cta_architecture: "See Architecture",
    },
    about: {
      label: "About Me",
      title: "Hi, I'm Luca — Applied Data Scientist with a background in criminal analytics.",
      p1: "I hold a Master's degree in Applied Data Science from the Lucerne University of Applied Sciences (HSLU) and a Bachelor's degree in Information Science from the University of Applied Sciences of the Grisons (FHGR), where I specialised in Web & Usability Engineering.",
      p2: "Professionally, I work as a criminal analyst, where I apply data-driven methods to real-world investigative challenges. Prior to that, I worked as a cybercrime investigator — an experience that sharpened my analytical thinking and attention to detail.",
      p3: "Through personal projects, I explore data engineering, business intelligence and interactive visualisation — combining technical rigour with a strong focus on making data understandable and actionable.",
    },
    project: {
      label: "Project",
      title: "Projects focused on practical analytics and data visualization.",
      subtitle: "The goal of these projects is not only to work with data technically, but also to present information in a way that is intuitive, visually clean and useful for decision-making.",
      feature1_title: "Data Engineering",
      feature1_text: "Working with structured data, SQL transformations and automated pipelines to prepare information for analysis and visualization.",
      feature2_title: "Analytics & Forecasting",
      feature2_text: "Exploring trends, KPIs and interactive visualizations to better understand data and communicate insights in a simple way.",
      feature3_title: "Production Mindset",
      feature3_text: "Building projects with a focus on clean structure, reproducibility and modern web technologies using React and Next.js.",
    },
    architecture: {
      label: "Architecture",
      title: "From raw data to insight layer.",
      subtitle: "A fully automated data workflow — from the Swiss open transport API to a live dashboard. Data is fetched, transformed and stored daily without manual intervention.",
    },
    dashboard: {
      label: "Dashboard",
      title: "RhB Punctuality Analytics.",
      subtitle: "A live data pipeline that fetches daily punctuality data from the Swiss open transport API, stores it in Supabase and visualizes KPIs in real time.",
    },
    stack: {
      label: "Tech Stack",
      title: "Built for reproducibility.",
    },
    footer: {
      copyright: "© 2026 Luca Joos — Data Portfolio",
    },
  },
  de: {
    nav: {
      about: "Über mich",
      project: "Projekte",
      architecture: "Architektur",
      dashboard: "Dashboard",
    },
    hero: {
      badge: "Python · SQL · Datenvisualisierung",
      title: "Praktische Datenlösungen mit modernen Web-Technologien.",
      subtitle: "Dieses Portfolio zeigt persönliche Projekte in Python, SQL und Datenvisualisierung. Mein Ziel ist es, Daten in verständliche Erkenntnisse und interaktive Anwendungen zu verwandeln.",
      cta_dashboard: "Dashboard ansehen",
      cta_architecture: "Architektur ansehen",
    },
    about: {
      label: "Über mich",
      title: "Hallo, ich bin Luca — Applied Data Scientist mit einem Hintergrund in der Kriminalanalyse.",
      p1: "Ich besitze einen Master in Applied Data Science der Hochschule Luzern (HSLU) sowie einen Bachelor in Information Science der Fachhochschule Graubünden (FHGR) mit Schwerpunkt Web & Usability Engineering.",
      p2: "Beruflich arbeite ich als Kriminalanalytiker, wo ich datengetriebene Methoden für reale ermittlerische Fragestellungen einsetze. Zuvor war ich als Cybercrime-Ermittler tätig — eine Erfahrung, die mein analytisches Denken und meine Präzision schärfte.",
      p3: "In persönlichen Projekten erkunde ich Data Engineering, Business Intelligence und interaktive Visualisierung — mit dem Ziel, Daten verständlich und handlungsrelevant zu machen.",
    },
    project: {
      label: "Projekte",
      title: "Projekte mit Fokus auf Analyse und Datenvisualisierung.",
      subtitle: "Das Ziel dieser Projekte ist nicht nur die technische Arbeit mit Daten, sondern auch die Präsentation von Informationen auf intuitive, visuell klare und entscheidungsrelevante Weise.",
      feature1_title: "Data Engineering",
      feature1_text: "Arbeit mit strukturierten Daten, SQL-Transformationen und automatisierten Pipelines zur Aufbereitung für Analysen und Visualisierungen.",
      feature2_title: "Analyse & Forecasting",
      feature2_text: "Erkundung von Trends, KPIs und interaktiven Visualisierungen, um Daten besser zu verstehen und Erkenntnisse verständlich zu kommunizieren.",
      feature3_title: "Production Mindset",
      feature3_text: "Projekte mit Fokus auf saubere Struktur, Reproduzierbarkeit und moderne Web-Technologien mit React und Next.js.",
    },
    architecture: {
      label: "Architektur",
      title: "Von Rohdaten zur Erkenntnisschicht.",
      subtitle: "Ein vollautomatisierter Daten-Workflow — von der Schweizer Open-Transport-API bis zum Live-Dashboard. Daten werden täglich ohne manuelle Eingriffe abgerufen, transformiert und gespeichert.",
    },
    dashboard: {
      label: "Dashboard",
      title: "RhB Pünktlichkeitsanalyse.",
      subtitle: "Eine Live-Datenpipeline die täglich Pünktlichkeitsdaten der Rhätischen Bahn abruft, in Supabase speichert und KPIs in Echtzeit visualisiert.",
    },
    stack: {
      label: "Tech Stack",
      title: "Für Reproduzierbarkeit gebaut.",
    },
    footer: {
      copyright: "© 2026 Luca Joos — Daten-Portfolio",
    },
  },
};