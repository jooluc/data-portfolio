"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Train, Clock, AlertCircle, TrendingUp } from "lucide-react";

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

interface LineStats {
  linie: string;
  puenktlichkeit: number;
  stopps: number;
}

interface DayStats {
  tag: string;
  puenktlichkeit: number;
}

export default function RhbDashboard() {
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [lineStats, setLineStats] = useState<LineStats[]>([]);
  const [dayStats, setDayStats] = useState<DayStats[]>([]);
  const [latestDate, setLatestDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = getSupabase();
      try {
        // Alle Daten paginiert abrufen
        let allData: RhbRow[] = [];
        let from = 0;
        const pageSize = 1000;

        while (true) {
          const { data, error } = await supabase
            .from("rhb_istdaten")
            .select("betriebstag, linien_text, abfahrt_verspaetung_min, puenktlich")
            .order("betriebstag", { ascending: false })
            .range(from, from + pageSize - 1);

          if (error) throw error;
          if (!data || data.length === 0) break;

          allData = [...allData, ...data];
          if (data.length < pageSize) break;
          from += pageSize;
        }

        if (allData.length === 0) throw new Error("Keine Daten gefunden.");

        const rows = allData;

        // Neuestes Datum
        setLatestDate(rows[0].betriebstag);

        // KPIs berechnen
        const withDelay = rows.filter((r) => r.abfahrt_verspaetung_min !== null);
        const delays = withDelay.map((r) => r.abfahrt_verspaetung_min as number).sort((a, b) => a - b);
        const puenktlichRows = rows.filter((r) => r.puenktlich !== null);
        const puenktlichkeit = puenktlichRows.length > 0
          ? (puenktlichRows.filter((r) => r.puenktlich).length / puenktlichRows.length) * 100
          : 0;
        const median = delays.length > 0 ? delays[Math.floor(delays.length / 2)] : 0;
        const max = delays.length > 0 ? Math.max(...delays) : 0;

        setKpis({
          puenktlichkeit: Math.round(puenktlichkeit * 10) / 10,
          medianVerspaetung: Math.round(median * 10) / 10,
          totalStopps: rows.length,
          maxVerspaetung: Math.round(max * 10) / 10,
        });

        // Pünktlichkeit nach Linie (nur Linien mit mind. 20 Stopps)
        const byLine: Record<string, { total: number; puenktlich: number }> = {};
        rows.forEach((r) => {
          if (!r.linien_text) return;
          if (!byLine[r.linien_text]) byLine[r.linien_text] = { total: 0, puenktlich: 0 };
          byLine[r.linien_text].total++;
          if (r.puenktlich) byLine[r.linien_text].puenktlich++;
        });
        const lineData = Object.entries(byLine)
          .filter(([, v]) => v.total >= 20)
          .map(([linie, v]) => ({
            linie,
            puenktlichkeit: Math.round((v.puenktlich / v.total) * 1000) / 10,
            stopps: v.total,
          }))
          .sort((a, b) => b.puenktlichkeit - a.puenktlichkeit);
        setLineStats(lineData);

        // Pünktlichkeit pro Tag
        const byDay: Record<string, { total: number; puenktlich: number }> = {};
        rows.forEach((r) => {
          const tag = r.betriebstag;
          if (!byDay[tag]) byDay[tag] = { total: 0, puenktlich: 0 };
          byDay[tag].total++;
          if (r.puenktlich) byDay[tag].puenktlich++;
        });
        const dayData = Object.entries(byDay)
          .map(([tag, v]) => ({
            tag: tag.slice(5),
            puenktlichkeit: Math.round((v.puenktlich / v.total) * 1000) / 10,
          }))
          .sort((a, b) => a.tag.localeCompare(b.tag));
        setDayStats(dayData);

      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        <div className="flex items-center gap-3">
          <Train className="h-5 w-5 animate-pulse" />
          <span>Lade RhB-Daten...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      icon: Train,
      label: "Pünktlichkeit",
      value: `${kpis!.puenktlichkeit}%`,
      sub: "Abfahrten ≤ 3 Min Verspätung",
      color: kpis!.puenktlichkeit >= 90 ? "text-green-600" : kpis!.puenktlichkeit >= 80 ? "text-amber-600" : "text-red-500",
    },
    {
      icon: Clock,
      label: "Median-Verspätung",
      value: `${kpis!.medianVerspaetung} Min`,
      sub: "Typische Abweichung",
      color: "text-slate-950",
    },
    {
      icon: TrendingUp,
      label: "Haltestopps",
      value: kpis!.totalStopps.toLocaleString("de-CH"),
      sub: "Ausgewertete Stopps",
      color: "text-slate-950",
    },
    {
      icon: AlertCircle,
      label: "Max. Verspätung",
      value: `${kpis!.maxVerspaetung} Min`,
      sub: "Grösste Abweichung",
      color: "text-slate-950",
    },
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
            <h3 className="font-semibold tracking-tight text-slate-950">
              RhB Pünktlichkeits-Analyse
            </h3>
            <p className="text-xs text-slate-500">
              Daten von opentransportdata.swiss · Letzter Stand:{" "}
              {latestDate}
            </p>
          </div>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">
          Live aus Supabase
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpiCards.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
              <Icon className="h-4 w-4 text-slate-600" />
            </div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className={`mt-1 text-2xl font-semibold tracking-tight ${color}`}>
              {value}
            </p>
            <p className="mt-1 text-xs text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pünktlichkeit über Zeit */}
        {dayStats.length > 1 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-slate-700">
              Pünktlichkeit über Zeit
            </p>
            <p className="mb-5 text-xs text-slate-400">
              Tageswerte in %
            </p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dayStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="tag"
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[60, 100]}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, "Pünktlichkeit"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="puenktlichkeit"
                    stroke="#0f172a"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#0f172a" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Pünktlichkeit nach Linie */}
        {lineStats.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-slate-700">
              Pünktlichkeit nach Linie
            </p>
            <p className="mb-5 text-xs text-slate-400">
              Nur Linien mit ≥ 20 Stopps
            </p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lineStats}
                  layout="vertical"
                  margin={{ left: 8, right: 16 }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="linie"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, "Pünktlichkeit"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="puenktlichkeit"
                    fill="#0f172a"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        Daten werden täglich automatisch via GitHub Actions aktualisiert ·{" "}
        <a
          href="https://github.com/jooluc/rhb-punctuality"
          target="_blank"
          className="underline hover:text-slate-600"
        >
          Zum Repo
        </a>
      </p>
    </div>
  );
}