"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "/data/graubuenden.geojson";
const taxCsvUrl = "/data/tax_rates_2025.csv";

type TaxRow = {
  municipality: string;
  tax_rate_2025: string;
};

type MunicipalityData = {
  taxRate: number;
};

type Position = {
  coordinates: [number, number];
  zoom: number;
};

export default function GraubuendenMap() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [taxData, setTaxData] = useState<Record<string, MunicipalityData>>({});
  const [position, setPosition] = useState<Position>({
    coordinates: [9.55, 46.65],
    zoom: 1,
  });

  useEffect(() => {
    Papa.parse<TaxRow>(taxCsvUrl, {
      download: true,
      header: true,
      complete: (result) => {
        const mapped: Record<string, MunicipalityData> = {};

        result.data.forEach((row) => {
          if (!row.municipality || !row.tax_rate_2025) return;

          mapped[row.municipality.trim()] = {
            taxRate: Number(row.tax_rate_2025),
          };
        });

        setTaxData(mapped);
      },
    });
  }, []);

  const hoveredData = hoveredName ? taxData[hoveredName] : null;

  function getFillColor(name: string) {
    const data = taxData[name];

    if (!data) return "#e2e8f0";

    if (data.taxRate < 60) return "#0f766e";
    if (data.taxRate < 80) return "#0891b2";
    if (data.taxRate < 100) return "#38bdf8";
    return "#bae6fd";
  }

  function handleZoomIn() {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.4, 8),
    }));
  }

  function handleZoomOut() {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.4, 1),
    }));
  }

  function handleReset() {
    setPosition({
      coordinates: [9.55, 46.65],
      zoom: 1,
    });
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Regional Analytics
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
          Graubünden Tax Rate Explorer
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Interactive map based on official municipal tax rates for the canton
          of Graubünden in 2025.
        </p>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Municipality
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950">
            {hoveredName ?? "Hover map"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Tax Rate 2025
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950">
            {hoveredData ? `${hoveredData.taxRate}%` : "-"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Data Source
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950">
            GR.ch
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
        <span className="text-sm font-medium text-slate-700">
          Map controls
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            −
          </button>

          <span className="w-14 text-center text-sm text-slate-500">
            {position.zoom.toFixed(1)}x
          </span>

          <button
            onClick={handleZoomIn}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            +
          </button>

          <button
            onClick={handleReset}
            className="ml-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm transition hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-slate-50 p-4">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [9.55, 46.65],
            scale: 16000,
          }}
          className="w-full"
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={1}
            maxZoom={8}
            translateExtent={[
              [-100, -100],
              [900, 700],
            ]}
            onMoveEnd={(nextPosition) => {
              setPosition({
                coordinates: nextPosition.coordinates as [number, number],
                zoom: nextPosition.zoom,
              });
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name =
                    geo.properties.NAME ??
                    geo.properties.name ??
                    geo.properties.gemeinde ??
                    geo.properties.GEMEINDE ??
                    geo.properties.GMDNAME ??
                    "Unknown";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredName(name)}
                      onMouseLeave={() => setHoveredName(null)}
                      style={{
                        default: {
                          fill: getFillColor(name),
                          stroke: "#ffffff",
                          strokeWidth: 0.5 / position.zoom,
                          outline: "none",
                        },
                        hover: {
                          fill: "#06b6d4",
                          stroke: "#ffffff",
                          strokeWidth: 0.8 / position.zoom,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#0891b2",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#0f766e]" />
          below 60%
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#0891b2]" />
          60–79%
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#38bdf8]" />
          80–99%
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#bae6fd]" />
          100%+
        </div>
      </div>
    </div>
  );
}