"use client";

import { useEffect, useState } from "react";

export default function DataWorkflowDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <style>{`
        @keyframes bp-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bp-draw{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
        @keyframes bp-ping{0%{opacity:1;r:3}70%{opacity:0;r:9}100%{opacity:0;r:3}}
        @keyframes bp-pulse{0%,100%{opacity:1}50%{opacity:.15}}
        @keyframes bp-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes bp-scan{0%{transform:translateY(0)}100%{transform:translateY(80px)}}
        @keyframes bp-row{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}
        @keyframes bp-metric{from{opacity:0}to{opacity:1}}
        @keyframes bp-bar{from{transform:scaleY(0)}to{transform:scaleY(1)}}
        @keyframes bp-spark{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
        @keyframes bp-flicker{0%,89%,91%,96%,100%{opacity:1}90%{opacity:.2}95%{opacity:.5}}
        @keyframes p-r1{0%{transform:translateX(0);opacity:0}5%{opacity:1}90%{opacity:1}100%{transform:translateX(58px);opacity:0}}
        @keyframes p-d1{0%{transform:translateY(0);opacity:0}5%{opacity:1}90%{opacity:1}100%{transform:translateY(58px);opacity:0}}
        .bpw-n1{animation:bp-fadeup .4s ease both .05s}
        .bpw-n2{animation:bp-fadeup .4s ease both .2s}
        .bpw-n3{animation:bp-fadeup .4s ease both .35s}
        .bpw-n4{animation:bp-fadeup .4s ease both .5s}
        .bpw-l1{stroke-dasharray:300;animation:bp-draw .9s ease both .1s}
        .bpw-l2{stroke-dasharray:300;animation:bp-draw .9s ease both .25s}
        .bpw-l3{stroke-dasharray:300;animation:bp-draw .9s ease both .4s}
        .bpw-l4{stroke-dasharray:300;animation:bp-draw .9s ease both .55s}
        .bpw-ping{animation:bp-ping 2s ease-out infinite}
        .bpw-ping2{animation:bp-ping 2s ease-out infinite .5s}
        .bpw-ping3{animation:bp-ping 2s ease-out infinite 1s}
        .bpw-ping4{animation:bp-ping 2s ease-out infinite 1.5s}
        .bpw-dot{animation:bp-pulse 1.4s ease-in-out infinite}
        .bpw-d2{animation-delay:.45s}.bpw-d3{animation-delay:.9s}.bpw-d4{animation-delay:1.35s}
        .bpw-cur{animation:bp-blink .85s step-end infinite}
        .bpw-scan{animation:bp-scan 2s ease-in-out infinite alternate}
        .bpw-r1{animation:bp-row .3s ease both .65s}.bpw-r2{animation:bp-row .3s ease both .72s}
        .bpw-r3{animation:bp-row .3s ease both .79s}.bpw-r4{animation:bp-row .3s ease both .86s}
        .bpw-r5{animation:bp-row .3s ease both .93s}.bpw-r6{animation:bp-row .3s ease both 1s}
        .bpw-r7{animation:bp-row .3s ease both 1.07s}
        .bpw-m1{animation:bp-metric .4s ease both .85s}
        .bpw-m2{animation:bp-metric .4s ease both 1s}
        .bpw-m3{animation:bp-metric .4s ease both 1.15s}
        .bpw-b1{animation:bp-bar .6s cubic-bezier(.34,1.56,.64,1) both 1s;transform-origin:399px 382px}
        .bpw-b2{animation:bp-bar .6s cubic-bezier(.34,1.56,.64,1) both 1.1s;transform-origin:429px 382px}
        .bpw-b3{animation:bp-bar .6s cubic-bezier(.34,1.56,.64,1) both 1.2s;transform-origin:459px 382px}
        .bpw-b4{animation:bp-bar .6s cubic-bezier(.34,1.56,.64,1) both 1.3s;transform-origin:489px 382px}
        .bpw-b5{animation:bp-bar .6s cubic-bezier(.34,1.56,.64,1) both 1.4s;transform-origin:519px 382px}
        .bpw-b6{animation:bp-bar .6s cubic-bezier(.34,1.56,.64,1) both 1.5s;transform-origin:549px 382px}
        .bpw-spark{stroke-dasharray:200;animation:bp-spark 1.2s ease both .8s}
        .bpw-flicker{animation:bp-flicker 4s ease-in-out infinite}
        .bpw-flicker2{animation:bp-flicker 4s ease-in-out infinite 1.8s}
        .pr-a{animation:p-r1 1.2s linear infinite}
        .pr-b{animation:p-r1 1.2s linear infinite .4s}
        .pr-c{animation:p-r1 1.2s linear infinite .8s}
        .pd-a{animation:p-d1 1.2s linear infinite}
        .pd-b{animation:p-d1 1.2s linear infinite .4s}
        .pd-c{animation:p-d1 1.2s linear infinite .8s}
        .pr2-a{animation:p-r1 1.4s linear infinite .2s}
        .pr2-b{animation:p-r1 1.4s linear infinite .67s}
        .pr2-c{animation:p-r1 1.4s linear infinite 1.13s}
      `}</style>

      <svg width="100%" viewBox="0 0 680 480" role="img" aria-label="Data science workflow diagram">
        <defs>
          <clipPath id="bpw-c1"><rect x="22" y="62" width="290" height="100"/></clipPath>
        </defs>

        {/* Grid */}
        <g opacity=".03">
          {[40,80,120,160,200,240,280,320,360,400,440].map(y => <line key={y} x1="0" y1={y} x2="680" y2={y} stroke="#0f172a" strokeWidth="1"/>)}
          {[85,170,255,340,425,510,595].map(x => <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="#0f172a" strokeWidth="1"/>)}
        </g>

        {/* Connector tracks */}
        <rect x="312" y="112" width="58" height="12" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5"/>
        <rect x="161" y="200" width="12" height="58" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5"/>
        <rect x="507" y="200" width="12" height="58" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5"/>
        <rect x="312" y="332" width="58" height="12" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5"/>

        {/* Particles — right track 1→2 (dark) */}
        <circle className="pr-a" cx="318" cy="118" r="3.5" fill="#0f172a" opacity=".5"/>
        <circle className="pr-b" cx="318" cy="118" r="3.5" fill="#0f172a" opacity=".5"/>
        <circle className="pr-c" cx="318" cy="118" r="3.5" fill="#0f172a" opacity=".5"/>

        {/* Particles — down track 1→3 (dark) */}
        <circle className="pd-a" cx="167" cy="206" r="3.5" fill="#0f172a" opacity=".5"/>
        <circle className="pd-b" cx="167" cy="206" r="3.5" fill="#0f172a" opacity=".5"/>
        <circle className="pd-c" cx="167" cy="206" r="3.5" fill="#0f172a" opacity=".5"/>

        {/* Particles — down track 2→4 (green) */}
        <circle className="pd-a" cx="513" cy="206" r="3.5" fill="#10b981" opacity=".6"/>
        <circle className="pd-b" cx="513" cy="206" r="3.5" fill="#10b981" opacity=".6"/>
        <circle className="pd-c" cx="513" cy="206" r="3.5" fill="#10b981" opacity=".6"/>

        {/* Particles — right track 3→4 (green) */}
        <circle className="pr2-a" cx="318" cy="338" r="3.5" fill="#10b981" opacity=".6"/>
        <circle className="pr2-b" cx="318" cy="338" r="3.5" fill="#10b981" opacity=".6"/>
        <circle className="pr2-c" cx="318" cy="338" r="3.5" fill="#10b981" opacity=".6"/>

        {/* ── NODE 1: COLLECT ── */}
        <g className="bpw-n1">
          <path className="bpw-l1" d="M22 54 L22 36 L40 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l1" d="M312 54 L312 36 L294 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l1" d="M22 182 L22 200 L40 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l1" d="M312 182 L312 200 L294 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="22" y="36" width="290" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="22" y="36" width="290" height="4" fill="#0f172a"/>
          <rect x="22" y="40" width="290" height="22" fill="#f8fafc"/>
          <line x1="22" y1="62" x2="312" y2="62" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="32" y="55" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">COLLECT</text>
          <text x="304" y="55" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">01</text>
          <g clipPath="url(#bpw-c1)">
            <rect className="bpw-scan" x="22" y="62" width="290" height="2" fill="#0f172a" opacity=".06"/>
          </g>
          {[
            {y:68,cols:[{x:32,w:120},{x:164,w:80}]},
            {y:77,cols:[{x:32,w:180}]},
            {y:86,cols:[{x:32,w:100},{x:144,w:120}]},
            {y:95,cols:[{x:32,w:150}]},
            {y:104,cols:[{x:32,w:110},{x:154,w:90}]},
            {y:113,cols:[{x:32,w:170}]},
            {y:122,cols:[{x:32,w:130}]},
            {y:131,cols:[{x:32,w:100}]},
            {y:140,cols:[{x:32,w:160}]},
            {y:149,cols:[{x:32,w:120}]},
          ].map(({y,cols},i) => (
            <g key={y} className={`bpw-r${(i%7)+1}`}>
              {cols.map(({x,w},j) => <rect key={j} x={x} y={y} width={w} height="4" fill={i%2===0?"#e2e8f0":"#f1f5f9"}/>)}
            </g>
          ))}
          <line x1="22" y1="162" x2="312" y2="162" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="22" y="162" width="290" height="38" fill="#f8fafc"/>
          <text x="32" y="177" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">API · CSV · SQL</text>
          <circle className="bpw-ping" cx="294" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot" cx="294" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot" cx="294" cy="175" r="1.2" fill="#10b981"/>
          <text x="32" y="193" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">SYS_ONLINE</text>
        </g>

        {/* ── NODE 2: CLEAN ── */}
        <g className="bpw-n2">
          <path className="bpw-l2" d="M368 54 L368 36 L386 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l2" d="M658 54 L658 36 L640 36" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l2" d="M368 182 L368 200 L386 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l2" d="M658 182 L658 200 L640 200" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="368" y="36" width="290" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="368" y="36" width="290" height="4" fill="#0f172a"/>
          <rect x="368" y="40" width="290" height="22" fill="#f8fafc"/>
          <line x1="368" y1="62" x2="658" y2="62" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="378" y="55" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">CLEAN</text>
          <text x="650" y="55" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">02</text>
          <text className="bpw-r1 bpw-flicker" x="378" y="77" fontSize="8" fill="#475569" fontFamily="monospace">› df.dropna()</text>
          <text className="bpw-r2" x="378" y="90" fontSize="8" fill="#475569" fontFamily="monospace">› df.parse_dates()</text>
          <text className="bpw-r3" x="378" y="103" fontSize="8" fill="#dc2626" fontFamily="monospace" opacity=".65">✕ 3 rows dropped</text>
          <text className="bpw-r4" x="378" y="116" fontSize="8" fill="#475569" fontFamily="monospace">› df.validate()</text>
          <text className="bpw-r5 bpw-flicker2" x="378" y="129" fontSize="8" fill="#475569" fontFamily="monospace">› df.rename_cols()</text>
          <text className="bpw-r6" x="378" y="142" fontSize="8" fill="#10b981" fontFamily="monospace">✓ 4957 rows ok</text>
          <text className="bpw-r7" x="378" y="155" fontSize="8" fill="#94a3b8" fontFamily="monospace">› upsert → db</text>
          <rect className="bpw-cur" x="378" y="161" width="6" height="9" fill="#475569" opacity=".5"/>
          <line x1="368" y1="162" x2="658" y2="162" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="368" y="162" width="290" height="38" fill="#f8fafc"/>
          <text x="378" y="177" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">PARSE · VALIDATE</text>
          <circle className="bpw-ping bpw-ping2" cx="640" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot bpw-d2" cx="640" cy="175" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot bpw-d2" cx="640" cy="175" r="1.2" fill="#10b981"/>
          <text x="378" y="193" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">PROC_OK</text>
        </g>

        {/* ── NODE 3: ANALYSE ── */}
        <g className="bpw-n3">
          <path className="bpw-l3" d="M22 274 L22 256 L40 256" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l3" d="M312 274 L312 256 L294 256" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l3" d="M22 402 L22 420 L40 420" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l3" d="M312 402 L312 420 L294 420" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="22" y="256" width="290" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="22" y="256" width="290" height="4" fill="#0f172a"/>
          <rect x="22" y="260" width="290" height="22" fill="#f8fafc"/>
          <line x1="22" y1="282" x2="312" y2="282" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="32" y="275" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">ANALYSE</text>
          <text x="304" y="275" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">03</text>
          <polyline className="bpw-spark" points="32,375 62,358 92,365 122,342 152,350 182,328 212,336 242,318 272,326 302,310" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" opacity=".2"/>
          <circle cx="302" cy="310" r="2.5" fill="#0f172a" opacity=".3" className="bpw-m3"/>
          <g className="bpw-m1">
            <rect x="32" y="288" width="260" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="38" y="299" fontSize="7.5" fill="#64748b" fontFamily="monospace">mean_delay</text>
            <text x="284" y="299" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#0f172a" fontFamily="monospace">1.1 min</text>
          </g>
          <g className="bpw-m2">
            <rect x="32" y="308" width="260" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="38" y="319" fontSize="7.5" fill="#64748b" fontFamily="monospace">punctuality</text>
            <text x="284" y="319" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#10b981" fontFamily="monospace">85.0%</text>
          </g>
          <g className="bpw-m3">
            <rect x="32" y="328" width="260" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="38" y="339" fontSize="7.5" fill="#64748b" fontFamily="monospace">max_delay</text>
            <text x="284" y="339" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#0f172a" fontFamily="monospace">44.5 min</text>
          </g>
          <line x1="22" y1="382" x2="312" y2="382" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="22" y="382" width="290" height="38" fill="#f8fafc"/>
          <text x="32" y="397" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">STATS · ML · FCST</text>
          <circle className="bpw-ping bpw-ping3" cx="294" cy="395" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot bpw-d3" cx="294" cy="395" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot bpw-d3" cx="294" cy="395" r="1.2" fill="#10b981"/>
          <text x="32" y="413" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">MDL_READY</text>
        </g>

        {/* ── NODE 4: VISUALISE ── */}
        <g className="bpw-n4">
          <path className="bpw-l4" d="M368 274 L368 256 L386 256" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l4" d="M658 274 L658 256 L640 256" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l4" d="M368 402 L368 420 L386 420" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <path className="bpw-l4" d="M658 402 L658 420 L640 420" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
          <rect x="368" y="256" width="290" height="164" fill="white" stroke="#0f172a" strokeWidth="0.6"/>
          <rect x="368" y="256" width="290" height="4" fill="#0f172a"/>
          <rect x="368" y="260" width="290" height="22" fill="#f8fafc"/>
          <line x1="368" y1="282" x2="658" y2="282" stroke="#0f172a" strokeWidth="0.5"/>
          <text x="378" y="275" fontSize="9" fontWeight="500" fill="#0f172a" letterSpacing="2" fontFamily="monospace">VISUALISE</text>
          <text x="650" y="275" textAnchor="end" fontSize="7" fill="#94a3b8" fontFamily="monospace">04</text>
          <rect className="bpw-b1" x="388" y="335" width="22" height="47" fill="#0f172a" opacity=".1"/>
          <rect className="bpw-b2" x="418" y="320" width="22" height="62" fill="#0f172a" opacity=".15"/>
          <rect className="bpw-b3" x="448" y="304" width="22" height="78" fill="#0f172a" opacity=".24"/>
          <rect className="bpw-b4" x="478" y="312" width="22" height="70" fill="#0f172a" opacity=".18"/>
          <rect className="bpw-b5" x="508" y="326" width="22" height="56" fill="#0f172a" opacity=".13"/>
          <rect className="bpw-b6" x="538" y="334" width="22" height="48" fill="#0f172a" opacity=".1"/>
          <line x1="378" y1="382" x2="572" y2="382" stroke="#0f172a" strokeWidth="0.5" opacity=".25"/>
          <g className="bpw-m1">
            <rect x="378" y="288" width="260" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="384" y="299" fontSize="7.5" fill="#64748b" fontFamily="monospace">dashboard</text>
            <text x="630" y="299" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#10b981" fontFamily="monospace">LIVE</text>
          </g>
          <g className="bpw-m2">
            <rect x="378" y="308" width="260" height="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.4"/>
            <text x="384" y="319" fontSize="7.5" fill="#64748b" fontFamily="monospace">refresh</text>
            <text x="630" y="319" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#0f172a" fontFamily="monospace">DAILY</text>
          </g>
          <line x1="368" y1="382" x2="658" y2="382" stroke="#0f172a" strokeWidth="0.5"/>
          <rect x="368" y="382" width="290" height="38" fill="#f8fafc"/>
          <text x="378" y="397" fontSize="7.5" fill="#64748b" letterSpacing=".8" fontFamily="monospace">KPI · CHART · DASH</text>
          <circle className="bpw-ping bpw-ping4" cx="640" cy="395" r="3" fill="none" stroke="#10b981" strokeWidth="1"/>
          <circle className="bpw-dot bpw-d4" cx="640" cy="395" r="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <circle className="bpw-dot bpw-d4" cx="640" cy="395" r="1.2" fill="#10b981"/>
          <text x="378" y="413" fontSize="7" fill="#10b981" fontFamily="monospace" letterSpacing=".5">DASH_ONLINE</text>
        </g>

        <text x="340" y="458" textAnchor="middle" fontSize="7.5" fill="#cbd5e1" letterSpacing="3.5" fontFamily="monospace">END-TO-END DATA SCIENCE WORKFLOW</text>
      </svg>
    </div>
  );
}