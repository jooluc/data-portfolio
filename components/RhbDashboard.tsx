"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";
import { Train, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const getSupabase = () => createClient(supabaseUrl, supabaseKey);

interface RhbRow {
  betriebstag: string;
  linien_text: string;
  abfahrt_verspaetung_min: number | null;
  puenktlich: boolean | null;
}

interface KPIs {
  puenktlichkeit: number;
  medianVerspaetung: number;
  totalStopps: number;
  maxVerspaetung: number;
}

interface LineStats { linie: string; puenktlichkeit: number; stopps: number; }
interface DayStats  { tag: string; puenktlichkeit: number; }

const txt = {
  en: {
    loading:     "Loading RhB data...",
    punctuality: "Punctuality",
    punctSub:    "Departures <= 3 min delay",
    median:      "Median Delay",
    medianSub:   "Typical deviation",
    stopps:      "Halt Stops",
    stoppsSub:   "Evaluated stops",
    maxDelay:    "Max. Delay",
    maxDelaySub: "Largest deviation",
    overTime:    "Punctuality over time",
    overTimeSub: "Daily values in %",
    byLine:      "Punctuality by line",
    byLineSub:   "Lines with >= 20 stops only",
    liveLabel:   "Live from Supabase",
    lastUpdate:  "Latest data",
    footer:      "Data updated daily via GitHub Actions",
    repoLink:    "View Repo",
    source:      "Data from opentransportdata.swiss",
  },
  de: {
    loading:     "Lade RhB-Daten...",
    punctuality: "Puenktlichkeit",
    punctSub:    "Abfahrten <= 3 Min Verspaetung",
    median:      "Median-Verspaetung",
    medianSub:   "Typische Abweichung",
    stopps:      "Haltestopps",
    stoppsSub:   "Ausgewertete Stopps",
    maxDelay:    "Max. Verspaetung",
    maxDelaySub: "Groesste Abweichung",
    overTime:    "Puenktlichkeit ueber Zeit",
    overTimeSub: "Tageswerte in %",
    byLine:      "Puenktlichkeit nach Linie",
    byLineSub:   "Nur Linien mit >= 20 Stopps",
    liveLabel:   "Live aus Supabase",
    lastUpdate:  "Letzter Stand",
    footer:      "Daten werden taeglich automatisch via GitHub Actions aktualisiert",
    repoLink:    "Zum Repo",
    source:      "Daten von opentransportdata.swiss",
  },
};

export default function RhbDashboard() {
  const { lang } = useLanguage();
  const l = txt[lang];

  const [kpis, setKpis]            = useState<KPIs | null>(null);
  const [lineStats, setLineStats]   = useState<LineStats[]>([]);
  const [dayStats, setDayStats]     = useState<DayStats[]>([]);
  const [latestDate, setLatestDate] = useState<string>("");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = getSupabase();
      try {
        // Letzte 5000 Zeilen fuer KPIs und Linienstatistiken
        const { data: raw, error: e1 } = await supabase
          .from("rhb_istdaten")
          .select("betriebstag, linien_text, abfahrt_verspaetung_min, puenktlich")
          .order("betriebstag", { ascending: false })
          .limit(5000);

        if (e1) throw new Error(e1.message);
        if (!raw || raw.length === 0) throw new Error("Keine Daten gefunden.");

        const rows = raw as RhbRow[];
        setLatestDate(rows[0].betriebstag);

        // KPIs berechnen
        const withDelay      = rows.filter((r) => r.abfahrt_verspaetung_min !== null);
        const delays         = withDelay.map((r) => r.abfahrt_verspaetung_min as number).sort((a, b) => a - b);
        const puenktlichRows = rows.filter((r) => r.puenktlich !== null);
        const puenktlichkeit = puenktlichRows.length > 0
          ? (puenktlichRows.filter((r) => r.puenktlich).length / puenktlichRows.length) * 100 : 0;
        const median = delays.length > 0 ? delays[Math.floor(delays.length / 2)] : 0;
        const max    = delays.length > 0 ? Math.max(...delays) : 0;

        setKpis({
          puenktlichkeit:    Math.round(puenktlichkeit * 10) / 10,
          medianVerspaetung: Math.round(median * 10) / 10,
          totalStopps:       rows.length,
          maxVerspaetung:    Math.round(max * 10) / 10,
        });

        // Puenktlichkeit nach Linie
        const byLine: Record<string, { total: number; puenktlich: number }> = {};
        rows.forEach((r) => {
          if (!r.linien_text) return;
          if (!byLine[r.linien_text]) byLine[r.linien_text] = { total: 0, puenktlich: 0 };
          byLine[r.linien_text].total++;
          if (r.puenktlich) byLine[r.linien_text].puenktlich++;
        });
        setLineStats(
          Object.entries(byLine)
            .filter(([, v]) => v.total >= 20)
            .map(([linie, v]) => ({
              linie,
              puenktlichkeit: Math.round((v.puenktlich / v.total) * 1000) / 10,
              stopps: v.total,
            }))
            .sort((a, b) => b.puenktlichkeit - a.puenktlichkeit)
        );

        // Puenktlichkeit pro Tag via Datenbankfunktion
        const { data: dayData, error: e2 } = await supabase
          .rpc("rhb_puenktlichkeit_pro_tag");

        if (!e2 && dayData) {
          setDayStats(
            (dayData as { betriebstag: string; puenktlichkeit: number }[])
              .map((d) => ({
                tag: d.betriebstag.slice(5),
                puenktlichkeit: Math.round(d.puenktlichkeit * 10) / 10,
              }))
              .sort((a, b) => a.tag.localeCompare(b.tag))
          );
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex h-64 items-center justify-center text-slate-500">
      <div className="flex items-center gap-3">
        <Train className="h-5 w-5 animate-pulse" />
        <span>{l.loading}</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex h-64 items-center justify-center text-slate-500">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <span>{error}</span>
      </div>
    </div>
  );

  const kpiCards = [
    { icon: Train,       label: l.punctuality, value: `${kpis!.puenktlichkeit}%`,                 sub: l.punctSub,    color: kpis!.puenktlichkeit >= 90 ? "text-green-600" : kpis!.puenktlichkeit >= 80 ? "text-amber-600" : "text-red-500" },
    { icon: Clock,       label: l.median,       value: `${kpis!.medianVerspaetung} Min`,           sub: l.medianSub,   color: "text-slate-950" },
    { icon: TrendingUp,  label: l.stopps,       value: kpis!.totalStopps.toLocaleString("de-CH"), sub: l.stoppsSub,   color: "text-slate-950" },
    { icon: AlertCircle, label: l.maxDelay,     value: `${kpis!.maxVerspaetung} Min`,              sub: l.maxDelaySub, color: "text-slate-950" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950">
            <Train className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold tracking-tight text-slate-950">RhB Punctuality Analytics</h3>
            <p className="text-xs text-slate-500">{l.source} · {l.lastUpdate}: {latestDate}</p>
          </div>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">{l.liveLabel}</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpiCards.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
              <Icon className="h-4 w-4 text-slate-600" />
            </div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className={`mt-1 text-2xl font-semibold tracking-tight ${color}`}>{value}</p>
            <p className="mt-1 text-xs text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {dayStats.length > 1 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-slate-700">{l.overTime}</p>
            <p className="mb-5 text-xs text-slate-400">{l.overTimeSub}</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dayStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="tag" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v) => [`${v}%`, l.punctuality]} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="puenktlichkeit" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 2, fill: "#0f172a" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {lineStats.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-slate-700">{l.byLine}</p>
            <p className="mb-5 text-xs text-slate-400">{l.byLineSub}</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lineStats} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="linie" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} width={36} />
                  <Tooltip formatter={(v) => [`${v}%`, l.punctuality]} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                  <Bar dataKey="puenktlichkeit" fill="#0f172a" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        {l.footer} ·{" "}
        <a href="https://github.com/jooluc/rhb-punctuality" target="_blank" className="underline hover:text-slate-600">{l.repoLink}</a>
      </p>
    </div>
  );
}