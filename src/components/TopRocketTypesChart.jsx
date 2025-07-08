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

  const item = payload[0].payload;

  return (
    <div className="bg-white dark:bg-slate-700 p-2 rounded shadow text-black dark:text-white text-xs">
      <p className="font-semibold">Rocket: {item.rocket}</p>
      <p>Count: {item.count}</p>
    </div>
  );
};

const TopRocketTypesChart = ({ filters }) => {
  const [data, setData] = useState(null); // null while loading

  useEffect(() => {
    const { yearRange, status, country } = filters;
    const params = {
      start_year: yearRange[0],
      end_year: yearRange[1],
      status: status !== "All" ? status : undefined,
      country: country !== "All" ? country : undefined,
    };

    axios
      .get("https://space-analysis-backend.onrender.com/api/top-rocket-types", { params })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("API error:", err);
        setData([]); // show fallback
      });
  }, [filters]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md min-h-[400px] flex flex-col justify-start">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        🧨 Top Rocket Types
      </h2>

      {data === null ? (
        <div className="flex flex-col items-center justify-center flex-1 py-10 text-gray-500 dark:text-gray-400">
          <div className="animate-bounce text-4xl">🚀</div>
          <p className="mt-2">Loading rockets...</p>
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">
          No data available for this selection.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} layout="vertical" margin={{ left: 100 }}>
            <XAxis
              type="number"
              stroke="#334155"
              tick={{ fill: "#334155", fontSize: 12 }}
            />
            <YAxis
              dataKey="rocket"
              type="category"
              width={180}
              stroke="#334155"
              tick={{ fill: "#334155", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="#8b5cf6"
              className="hover:fill-indigo-600 transition-colors duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TopRocketTypesChart;
