import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const statusIcon = {
    Success: "✅",
    Failure: "❌",
    "Partial Failure": "⚠️",
    "Prelaunch Failure": "🚀",
    Other: "❓",
  };

  const status = payload[0].payload.mission_status;
  const icon = statusIcon[status] || "🚀";

  return (
    <div className="bg-white dark:bg-slate-700 p-2 rounded shadow text-black dark:text-white text-xs">
      <div className="flex items-center gap-1 font-semibold">
        <span>{icon}</span>
        <span>{status || label}</span>
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

const MissionStatusChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { yearRange, status, country } = filters;
    const params = {
      start_year: yearRange[0],
      end_year: yearRange[1],
      status: status !== "All" ? status : undefined,
      country: country !== "All" ? country : undefined,
    };

    axios
      .get("https://space-analysis-backend.onrender.com/api/mission-status", { params })
      .then((res) => setData(res.data))
      .catch((err) => console.error("API error:", err))
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-white dark:bg-slate-800 rounded-xl shadow-md min-h-[400px]">
        <div className="animate-bounce text-4xl">🚀</div>
        <span className="mt-2 text-gray-500 dark:text-gray-300">Loading mission status...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md min-h-[400px]">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span>🚀</span> Mission Status
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis
            dataKey="mission_status"
            stroke="#334155"
            tick={{ fill: "#334155", fontSize: 12 }}
          />
          <YAxis stroke="#334155" tick={{ fill: "#334155", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MissionStatusChart;
