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
        <span>{label}</span>
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

const TopLaunchLocationsChart = ({ filters }) => {
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
      .get("https://space-analysis-backend.onrender.com/api/top-launch-locations", { params })
      .then((res) => setData(res.data))
      .catch((err) => console.error("API error:", err));
  }, [filters]);

  // Detect dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const labelColor = isDark ? "#d1d5db" : "#334155";

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md min-h-[400px]">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span>📍</span> Top Launch Locations
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 100, right: 20 }}
        >
          <XAxis
            type="number"
            stroke={labelColor}
            tick={{ fill: labelColor, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: labelColor }}
          />
          <YAxis
            dataKey="location"
            type="category"
            stroke={labelColor}
            width={140}
            tick={{ fill: labelColor, fontSize: 11 }}
            tickFormatter={(v) => (v.length > 20 ? v.slice(0, 20) + "…" : v)}
            tickLine={false}
            axisLine={{ stroke: labelColor }}
          >
            <Label
              value="Launch Site"
              angle={-90}
              position="insideLeft"
              fill={labelColor}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopLaunchLocationsChart;
