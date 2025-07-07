import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const launchIcon = "🚀";

  return (
    <div className="bg-white dark:bg-slate-700 p-2 rounded shadow text-black dark:text-white text-xs">
      <div className="flex items-center gap-1 font-semibold">
        <span>{launchIcon}</span>
        <span>Year: {label}</span>
      </div>
      <div>
        {payload.map((p) => (
          <p key={p.dataKey}>
            {p.dataKey}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const LaunchesPerYearChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const { yearRange, status, country } = filters;
    const params = {
      start_year: yearRange[0],
      end_year: yearRange[1],
      status: status !== "All" ? status : undefined,
      country: country !== "All" ? country : undefined,
    };

    axios
      .get("https://space-analysis-backend.onrender.com/api/launches-per-year", { params })
      .then((res) => setData(res.data))
      .catch((err) => console.error("API error:", err));
  }, [filters]);

  // Watch for dark mode
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  // Set color for axis label text
  const labelColor = isDark ? "#d1d5db" : "#334155"; // Tailwind's slate-300 for dark, slate-800 for light

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md min-h-[400px]">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span>📈</span> Launches Per Year
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis
            dataKey="year"
            stroke={labelColor}
            tick={{
              fill: labelColor,
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{ stroke: labelColor }}
          >
            <Label
              value="Year"
              offset={-5}
              position="insideBottom"
              fill={labelColor}
            />
          </XAxis>
          <YAxis
            stroke={labelColor}
            tick={{
              fill: labelColor,
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{ stroke: labelColor }}
          >
            <Label
              value="Launches"
              angle={-90}
              position="insideLeft"
              fill={labelColor}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>

      <style jsx="true">{`
        :root.dark .recharts-cartesian-axis-tick-value {
          fill: #d1d5db; /* Lighter text in dark mode */
        }
        :root.dark .recharts-cartesian-axis-line,
        :root.dark .recharts-cartesian-grid-horizontal line,
        :root.dark .recharts-cartesian-grid-vertical line {
          stroke: #475569; /* Softer lines in dark mode */
        }
        :root.dark .recharts-bar-rectangle path {
          fill: #4ade80 !important; /* Light green bars for contrast */
          stroke: #ffffff !important; /* White border for bars */
        }
      `}</style>
    </div>
  );
};

export default LaunchesPerYearChart;
