"use client";

import { useEffect, useState } from "react";

export default function PipelineDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <style>{`
        @keyframes rhb-flow { to { stroke-dashoffset: -24; } }
        @keyframes rhb-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        @keyframes rhb-fadeup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .rhb-pipe { stroke-dasharray:6 4; animation: rhb-flow linear infinite; }
        .rhb-pipe-1 { animation-duration: 1.2s; }
        .rhb-pipe-2 { animation-duration: 1.5s; }
        .rhb-pipe-3 { animation-duration: 1.8s; }
        .rhb-pipe-4 { animation-duration: 1.4s; }
        .rhb-dot { animation: rhb-pulse 2s ease-in-out infinite; }
        .rhb-dot-2 { animation-delay: .35s; }
        .rhb-dot-3 { animation-delay: .7s; }
        .rhb-node { cursor: default; }
        .rhb-n1 { animation: rhb-fadeup .5s ease both .05s; }
        .rhb-n2 { animation: rhb-fadeup .5s ease both .2s; }
        .rhb-n3 { animation: rhb-fadeup .5s ease both .35s; }
        .rhb-n4 { animation: rhb-fadeup .5s ease both .5s; }
        .rhb-n5 { animation: rhb-fadeup .5s ease both .65s; }
      `}</style>

      <svg
        width="100%"
        viewBox="0 0 680 380"
        role="img"
        aria-label="RhB Pipeline Architecture Diagram"
      >
        <defs>
          <marker id="rhb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* ── Column headers ── */}
        <text x="68"  y="20" textAnchor="middle" fontSize="11" fill="#94a3b8">Source</text>
        <text x="208" y="20" textAnchor="middle" fontSize="11" fill="#94a3b8">Extract &amp; transform</text>
        <text x="348" y="20" textAnchor="middle" fontSize="11" fill="#94a3b8">Storage</text>
        <text x="488" y="20" textAnchor="middle" fontSize="11" fill="#94a3b8">Orchestration</text>
        <text x="618" y="20" textAnchor="middle" fontSize="11" fill="#94a3b8">Visualisation</text>

        {/* ── Dividers ── */}
        {[136, 276, 416, 556].map((x) => (
          <line key={x} x1={x} y1="32" x2={x} y2="345" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3 4"/>
        ))}

        {/* ── Node 1: API Source ── */}
        <g className="rhb-node rhb-n1">
          <rect x="20" y="130" width="96" height="64" rx="10" fill="#e1f5ee" stroke="#0f6e56" strokeWidth="0.5"/>
          <text x="68" y="153" textAnchor="middle" fontSize="13" fontWeight="500" fill="#085041">opendata</text>
          <text x="68" y="169" textAnchor="middle" fontSize="11" fill="#0f6e56">.swiss API</text>
          <text x="68" y="186" textAnchor="middle" fontSize="10" fill="#1D9E75">CKAN v2 · CSV</text>
          {/* Pulsing dots */}
          <circle className="rhb-dot"   cx="52" cy="208" r="3" fill="#1D9E75"/>
          <circle className="rhb-dot rhb-dot-2" cx="64" cy="208" r="3" fill="#1D9E75"/>
          <circle className="rhb-dot rhb-dot-3" cx="76" cy="208" r="3" fill="#1D9E75"/>
          <text x="68" y="224" textAnchor="middle" fontSize="10" fill="#94a3b8">Daily at 05:00</text>
        </g>

        {/* ── Flow 1 ── */}
        <path className="rhb-pipe rhb-pipe-1" d="M116 162 L148 162" fill="none" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#rhb-arrow)"/>

        {/* ── Node 2: Python ETL ── */}
        <g className="rhb-node rhb-n2">
          <rect x="148" y="100" width="120" height="130" rx="10" fill="#eeedfe" stroke="#534ab7" strokeWidth="0.5"/>
          <text x="208" y="122" textAnchor="middle" fontSize="13" fontWeight="500" fill="#26215c">Python ETL</text>
          {[
            { y: 144, label: "Filter RhB rows" },
            { y: 168, label: "Parse timestamps" },
            { y: 192, label: "Calc. delay (min)" },
            { y: 216, label: "Upsert Supabase" },
          ].map(({ y, label }) => (
            <g key={y}>
              <rect x="160" y={y - 10} width="96" height="20" rx="4" fill="none" stroke="#afa9ec" strokeWidth="0.5"/>
              <text x="208" y={y + 1} textAnchor="middle" fontSize="10" fill="#3c3489">{label}</text>
            </g>
          ))}
        </g>

        {/* ── Flow 2 ── */}
        <path className="rhb-pipe rhb-pipe-2" d="M268 162 L300 162" fill="none" stroke="#7f77dd" strokeWidth="1.5" markerEnd="url(#rhb-arrow)"/>

        {/* ── Node 3: Supabase ── */}
        <g className="rhb-node rhb-n3">
          <rect x="300" y="110" width="96" height="104" rx="10" fill="#e6f1fb" stroke="#185fa5" strokeWidth="0.5"/>
          <text x="348" y="133" textAnchor="middle" fontSize="13" fontWeight="500" fill="#042c53">Supabase</text>
          <text x="348" y="149" textAnchor="middle" fontSize="11" fill="#185fa5">PostgreSQL</text>
          <rect x="312" y="160" width="72" height="18" rx="4" fill="none" stroke="#85b7eb" strokeWidth="0.5"/>
          <text x="348" y="170" textAnchor="middle" fontSize="10" fill="#0c447c">rhb_istdaten</text>
          <rect x="312" y="182" width="72" height="18" rx="4" fill="none" stroke="#85b7eb" strokeWidth="0.5"/>
          <text x="348" y="192" textAnchor="middle" fontSize="10" fill="#0c447c">RLS enabled</text>
        </g>

        {/* ── Flow 3: Actions → triggers ETL ── */}
        <path className="rhb-pipe rhb-pipe-3" d="M440 162 L398 162" fill="none" stroke="#ba7517" strokeWidth="1.5" markerEnd="url(#rhb-arrow)"/>

        {/* ── Node 4: GitHub Actions ── */}
        <g className="rhb-node rhb-n4">
          <rect x="440" y="110" width="112" height="104" rx="10" fill="#faeeda" stroke="#854f0b" strokeWidth="0.5"/>
          <text x="496" y="133" textAnchor="middle" fontSize="13" fontWeight="500" fill="#412402">GitHub Actions</text>
          <rect x="452" y="144" width="88" height="18" rx="4" fill="none" stroke="#fac775" strokeWidth="0.5"/>
          <text x="496" y="154" textAnchor="middle" fontSize="10" fill="#633806">cron: 0 6 * * *</text>
          <rect x="452" y="166" width="88" height="18" rx="4" fill="none" stroke="#fac775" strokeWidth="0.5"/>
          <text x="496" y="176" textAnchor="middle" fontSize="10" fill="#633806">ubuntu-latest</text>
          <rect x="452" y="188" width="88" height="18" rx="4" fill="none" stroke="#fac775" strokeWidth="0.5"/>
          <text x="496" y="198" textAnchor="middle" fontSize="10" fill="#633806">python</text>
          <text x="496" y="226" textAnchor="middle" fontSize="10" fill="#94a3b8">08:00 CH daily</text>
        </g>

        {/* ── Flow 4: Supabase → Dashboard ── */}
        <path className="rhb-pipe rhb-pipe-4" d="M554 162 L584 162" fill="none" stroke="#185fa5" strokeWidth="1.5" markerEnd="url(#rhb-arrow)"/>

        {/* ── Node 5: Dashboard ── */}
        <g className="rhb-node rhb-n5">
          <rect x="584" y="120" width="80" height="84" rx="10" fill="#faece7" stroke="#993c1d" strokeWidth="0.5"/>
          <text x="624" y="143" textAnchor="middle" fontSize="13" fontWeight="500" fill="#4a1b0c">Next.js</text>
          <text x="624" y="159" textAnchor="middle" fontSize="11" fill="#993c1d">Dashboard</text>
          <rect x="596" y="168" width="56" height="18" rx="4" fill="none" stroke="#f0997b" strokeWidth="0.5"/>
          <text x="624" y="178" textAnchor="middle" fontSize="10" fill="#712b13">lucajoos.ch</text>
          <text x="624" y="216" textAnchor="middle" fontSize="10" fill="#94a3b8">Live · Vercel</text>
        </g>

        {/* ── CSV Backup side-path ── */}
        <path d="M208 230 L208 280 L348 280" fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" markerEnd="url(#rhb-arrow)"/>
        <rect x="268" y="268" width="72" height="18" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.5"/>
        <text x="304" y="278" textAnchor="middle" fontSize="10" fill="#94a3b8">CSV backup</text>

        {/* ── Legend ── */}
        <line x1="40"  y1="332" x2="68"  y2="332" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="74"  y="336" fontSize="10" fill="#94a3b8">Data flow</text>
        <line x1="148" y1="332" x2="176" y2="332" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3"/>
        <text x="182" y="336" fontSize="10" fill="#94a3b8">Backup path</text>
        <circle cx="268" cy="332" r="4" fill="#1D9E75"/>
        <text x="278" y="336" fontSize="10" fill="#94a3b8">Live data source</text>
      </svg>
    </div>
  );
}