"use client";

import { useEffect, useState } from "react";

export default function DataWorkflowDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <style>{`
        @keyframes bp-flow{to{stroke-dashoffset:-20}}
        @keyframes bp-pulse{0%,100%{opacity:1}50%{opacity:.1}}
        @keyframes bp-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes bp-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bp-scan{0%{transform:translateY(0)}100%{transform:translateY(96px)}}
        @keyframes bp-draw{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
        @keyframes bp-flicker{0%,89%,91%,96%,100%{opacity:1}90%{opacity:.2}95%{opacity:.5}}
        @keyframes bp-bar1{from{height:0;y:162}to{height:18;y:144}}
        @keyframes bp-bar2{from{height:0;y:162}to{height:31;y:131}}
        @keyframes bp-bar3{from{height:0;y:162}to{height:45;y:117}}
        @keyframes bp-bar4{from{height:0;y:162}to{height:38;y:124}}
        @keyframes bp-bar5{from{height:0;y:162}to{height:28;y:134}}
        @keyframes bp-bar6{from{height:0;y:162}to{height:22;y:140}}
        @keyframes bp-spark{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
        @keyframes bp-row-in{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}
        @keyframes bp-metric{from{opacity:0}to{opacity:1}}
        @keyframes bp-ping{0%{r:3;opacity:1}70%{r:8;opacity:0}100%{r:3;opacity:0}}
        .bpw-pipe{stroke-dasharray:4 4;animation:bp-flow linear infinite}
        .bpw-p1{animation-duration:.7s}.bpw-p2{animation-duration:.95s}.bpw-p3{animation-duration:1.2s}
        .bpw-dot{animation:bp-pulse 1.4s ease-in-out infinite}
        .bpw-d2{animation-delay:.45s}.bpw-d3{animation-delay:.9s}.bpw-d4{animation-delay:1.35s}
        .bpw-ping{animation:bp-ping 2s ease-out infinite}
        .bpw-ping2{animation:bp-ping 2s ease-out infinite .45s}
        .bpw-ping3{animation:bp-ping 2s ease-out infinite .9s}
        .bpw-ping4{animation:bp-ping 2s ease-out infinite 1.35s}
        .bpw-cur{animation:bp-blink .85s step-end infinite}
        .bpw-scan{animation:bp-scan 2s ease-in-out infinite alternate}
        .bpw-n1{animation:bp-fadeup .4s ease both .05s}
        .bpw-n2{animation:bp-fadeup .4s ease both .2s}
        .bpw-n3{animation:bp-fadeup .4s ease both .35s}
        .bpw-n4{animation:bp-fadeup .4s ease both .5s}
        .bpw-l1{stroke-dasharray:300;animation:bp-draw .9s ease both .1s}
        .bpw-l2{stroke-dasharray:300;animation:bp-draw .9s ease both .25s}
        .bpw-l3{stroke-dasharray:300;animation:bp-draw .9s ease both .4s}
        .bpw-l4{stroke-dasharray:300;animation:bp-draw .9s ease both .55s}
        .bpw-flicker{animation:bp-flicker 4s ease-in-out infinite}
        .bpw-flicker2{animation:bp-flicker 4s ease-in-out infinite 1.8s}
        .bpw-b1{animation:bp-bar1 .8s cubic-bezier(.34,1.56,.64,1) both .9s}
        .bpw-b2{animation:bp-bar2 .8s cubic-bezier(.34,1.56,.64,1) both 1s}
        .bpw-b3{animation:bp-bar3 .8s cubic-bezier(.34,1.56,.64,1) both 1.1s}
        .bpw-b4{animation:bp-bar4 .8s cubic-bezier(.34,1.56,.64,1) both 1.2s}
        .bpw-b5{animation:bp-bar5 .8s cubic-bezier(.34,1.56,.64,1) both 1.3s}
        .bpw-b6{animation:bp-bar6 .8s cubic-bezier(.34,1.56,.64,1) both 1.4s}
        .bpw-spark{stroke-dasharray:200;animation:bp-spark 1.2s ease both .7s}
        .bpw-r1{animation:bp-row-in .3s ease both .65s}
        .bpw-r2{animation:bp-row-in .3s ease both .72s}
        .bpw-r3{animation:bp-row-in .3s ease both .79s}
        .bpw-r4{animation:bp-row-in .3s ease both .86s}
        .bpw-r5{animation:bp-row-in .3s ease both .93s}
        .bpw-r6{animation:bp-row-in .3s ease both 1s}
        .bpw-r7{animation:bp-row-in .3s ease both 1.07s}
        .bpw-m1{animation:bp-metric .4s ease both .85s}
        .bpw-m2{animation:bp-metric .4s ease both 1s}
        .bpw-m3{animation:bp-metric .4s ease both 1.15s}
      `}</style>

      <svg width="100%" viewBox="0 0 680 260" role="img" aria-label="Data science workflow diagram">
        <defs>
          <marker id="bpw-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <clipPath id="bpw-c1"><rect x="22" y="62" width="130" height="100"/></clipPath>
        </defs>

        {/* Subtle grid */}
        <g opacity=".035">
          {[36,72,108,144,180,216].map(y => <line key={y} x1="0" y1={y} x2="680" y2={y} stroke="#0f172a" strokeWidth="1"/>)}
          {[85,170,255,340,425,510,595].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#0f172a" strokeWidth="1"/>)}
        </g>

        {/* ── NODE 1: COLLECT ── */}
        <g className="bpw-n1">
          <path className="bpw-l1" d="M22 54 L22 36 L40 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l1" d="M152 54 L152 36 L134 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l1" d="M22 182 L22 200 L40 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l1" d="M152 182 L152 200 L134 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="22" y="36" width="130" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="22" y="36" width="130" height="4" fill="#0f172a"/>
          <rect x="22" y="40" width="130" height="22" fill="#f8fafc"/>
          <line x1="22" y1="62" x2="152" y2="62" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="32" y="55" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">COLLECT</text>
          <text x="144" y="55" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">01</text>
          <g clipPath="url(#bpw-c1)">
            <rect className="bpw-scan" x="22" y="62" width="130" height="2" fill="#0f172a" opacity=".06"/>
          </g>
          {[68,77,86,95,104,113,122,131,140,149].map((y,i) => (
            <rect key={y} className={`bpw-r${(i%7)+1}`} x="32" y={y} width={[70,92,52,80,64,88,76,58,84,66][i]} height="4" fill={i%2===0?"#e2e8f0":"#f1f5f9"}/>
          ))}
          <line x1="22" y1="162" x2="152" y2="162" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="22" y="162" width="130" height="38" fill="#f8fafc"/>
          <text x="32" y="177" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">API · CSV · SQL</text>
          <circle className="bpw-ping" cx="134" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot" cx="134" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot" cx="134" cy="175" r="1.2" fill="#10b981"/>
          <text x="32" y="193" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">SYS_ONLINE</text>
        </g>

        {/* Connector 1 */}
        <g className="bpw-n1">
          <line x1="152" y1="118" x2="192" y2="118" className="bpw-pipe bpw-p1" stroke="#0f172a" strokeWidth="1.2" opacity=".3" markerEnd="url(#bpw-arr)"/>
          <text x="172" y="112" textAnchor="middle" fontSize="7" fill="#94a3b8" letterSpacing="1.5" fontFamily="monospace">RAW</text>
        </g>

        {/* ── NODE 2: CLEAN ── */}
        <g className="bpw-n2">
          <path className="bpw-l2" d="M192 54 L192 36 L210 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l2" d="M322 54 L322 36 L304 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l2" d="M192 182 L192 200 L210 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l2" d="M322 182 L322 200 L304 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="192" y="36" width="130" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="192" y="36" width="130" height="4" fill="#0f172a"/>
          <rect x="192" y="40" width="130" height="22" fill="#f8fafc"/>
          <line x1="192" y1="62" x2="322" y2="62" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="202" y="55" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">CLEAN</text>
          <text x="314" y="55" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">02</text>
          <text className="bpw-r1 bpw-flicker" x="202" y="77" fontSize="8" fill="#475569" fontFamily="monospace">› df.dropna()</text>
          <text className="bpw-r2" x="202" y="90" fontSize="8" fill="#475569" fontFamily="monospace">› df.parse_dates()</text>
          <text className="bpw-r3" x="202" y="103" fontSize="8" fill="#dc2626" fontFamily="monospace" opacity=".65">✕ 3 rows dropped</text>
          <text className="bpw-r4" x="202" y="116" fontSize="8" fill="#475569" fontFamily="monospace">› df.validate()</text>
          <text className="bpw-r5 bpw-flicker2" x="202" y="129" fontSize="8" fill="#475569" fontFamily="monospace">› df.rename_cols()</text>
          <text className="bpw-r6" x="202" y="142" fontSize="8" fill="#10b981" fontFamily="monospace">✓ 4957 rows ok</text>
          <text className="bpw-r7" x="202" y="155" fontSize="8" fill="#94a3b8" fontFamily="monospace">› upsert → db</text>
          <rect className="bpw-cur" x="202" y="161" width="6" height="9" fill="#475569" opacity=".5"/>
          <line x1="192" y1="162" x2="322" y2="162" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="192" y="162" width="130" height="38" fill="#f8fafc"/>
          <text x="202" y="177" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">PARSE · VALIDATE</text>
          <circle className="bpw-ping bpw-ping2" cx="304" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot bpw-d2" cx="304" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot bpw-d2" cx="304" cy="175" r="1.2" fill="#10b981"/>
          <text x="202" y="193" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">PROC_OK</text>
        </g>

        {/* Connector 2 */}
        <g className="bpw-n2">
          <line x1="322" y1="118" x2="362" y2="118" className="bpw-pipe bpw-p2" stroke="#0f172a" strokeWidth="1.2" opacity=".3" markerEnd="url(#bpw-arr)"/>
          <text x="342" y="112" textAnchor="middle" fontSize="7" fill="#94a3b8" letterSpacing="1.5" fontFamily="monospace">CLEAN</text>
        </g>

        {/* ── NODE 3: ANALYSE ── */}
        <g className="bpw-n3">
          <path className="bpw-l3" d="M362 54 L362 36 L380 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l3" d="M492 54 L492 36 L474 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l3" d="M362 182 L362 200 L380 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l3" d="M492 182 L492 200 L474 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="362" y="36" width="130" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="362" y="36" width="130" height="4" fill="#0f172a"/>
          <rect x="362" y="40" width="130" height="22" fill="#f8fafc"/>
          <line x1="362" y1="62" x2="492" y2="62" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="372" y="55" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">ANALYSE</text>
          <text x="484" y="55" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">03</text>
          <polyline className="bpw-spark" points="372,155 388,143 404,149 420,128 436,135 452,115 468,122 484,107" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" opacity=".2"/>
          <circle cx="484" cy="107" r="2.5" fill="#0f172a" opacity=".3" className="bpw-m3"/>
          <g className="bpw-m1">
            <rect x="372" y="68" width="110" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="378" y="79" fontSize="7.5" fill="#64748b" fontFamily="monospace">mean_delay</text>
            <text x="474" y="79" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#0f172a" fontFamily="monospace">1.1 min</text>
          </g>
          <g className="bpw-m2">
            <rect x="372" y="88" width="110" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="378" y="99" fontSize="7.5" fill="#64748b" fontFamily="monospace">punctuality</text>
            <text x="474" y="99" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#10b981" fontFamily="monospace">85.0%</text>
          </g>
          <g className="bpw-m3">
            <rect x="372" y="108" width="110" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="378" y="119" fontSize="7.5" fill="#64748b" fontFamily="monospace">max_delay</text>
            <text x="474" y="119" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#0f172a" fontFamily="monospace">44.5 min</text>
          </g>
          <line x1="362" y1="162" x2="492" y2="162" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="362" y="162" width="130" height="38" fill="#f8fafc"/>
          <text x="372" y="177" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">STATS · ML · FCST</text>
          <circle className="bpw-ping bpw-ping3" cx="474" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot bpw-d3" cx="474" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot bpw-d3" cx="474" cy="175" r="1.2" fill="#10b981"/>
          <text x="372" y="193" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">MDL_READY</text>
        </g>

        {/* Connector 3 */}
        <g className="bpw-n3">
          <line x1="492" y1="118" x2="532" y2="118" className="bpw-pipe bpw-p3" stroke="#0f172a" strokeWidth="1.2" opacity=".3" markerEnd="url(#bpw-arr)"/>
          <text x="512" y="112" textAnchor="middle" fontSize="7" fill="#94a3b8" letterSpacing="1.5" fontFamily="monospace">MODEL</text>
        </g>

        {/* ── NODE 4: VISUALISE ── */}
        <g className="bpw-n4">
          <path className="bpw-l4" d="M532 54 L532 36 L550 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l4" d="M662 54 L662 36 L644 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l4" d="M532 182 L532 200 L550 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l4" d="M662 182 L662 200 L644 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="532" y="36" width="130" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="532" y="36" width="130" height="4" fill="#0f172a"/>
          <rect x="532" y="40" width="130" height="22" fill="#f8fafc"/>
          <line x1="532" y1="62" x2="662" y2="62" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="542" y="55" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">VISUALISE</text>
          <text x="654" y="55" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">04</text>
          <rect className="bpw-b1" x="542" y="144" width="12" height="18" fill="#0f172a" opacity=".08"/>
          <rect className="bpw-b2" x="558" y="131" width="12" height="31" fill="#0f172a" opacity=".13"/>
          <rect className="bpw-b3" x="574" y="117" width="12" height="45" fill="#0f172a" opacity=".22"/>
          <rect className="bpw-b4" x="590" y="124" width="12" height="38" fill="#0f172a" opacity=".18"/>
          <rect className="bpw-b5" x="606" y="134" width="12" height="28" fill="#0f172a" opacity=".12"/>
          <rect className="bpw-b6" x="622" y="140" width="12" height="22" fill="#0f172a" opacity=".09"/>
          <line x1="538" y1="162" x2="638" y2="162" stroke="#0f172a" strokeWidth="0.5" opacity=".3"/>
          <g className="bpw-m1">
            <rect x="542" y="68" width="110" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="548" y="79" fontSize="7.5" fill="#64748b" fontFamily="monospace">dashboard</text>
            <text x="644" y="79" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#10b981" fontFamily="monospace">LIVE</text>
          </g>
          <g className="bpw-m2">
            <rect x="542" y="88" width="110" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="548" y="99" fontSize="7.5" fill="#64748b" fontFamily="monospace">refresh</text>
            <text x="644" y="99" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#0f172a" fontFamily="monospace">DAILY</text>
          </g>
          <line x1="532" y1="162" x2="662" y2="162" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="532" y="162" width="130" height="38" fill="#f8fafc"/>
          <text x="542" y="177" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">KPI · CHART · DASH</text>
          <circle className="bpw-ping bpw-ping4" cx="644" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot bpw-d4" cx="644" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot bpw-d4" cx="644" cy="175" r="1.2" fill="#10b981"/>
          <text x="542" y="193" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">DASH_ONLINE</text>
        </g>

        <text x="340" y="238" textAnchor="middle" fontSize="7.5" fill="#cbd5e1" letterSpacing="3.5" fontFamily="monospace">END-TO-END DATA SCIENCE WORKFLOW</text>
      </svg>
    </div>
  );
}