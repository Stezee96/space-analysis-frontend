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

  const companyIcon = "🏢";

  return (
    <div className="bg-white dark:bg-slate-700 p-2 rounded shadow text-black dark:text-white text-xs">
      <div className="flex items-center gap-1 font-semibold">
        <span>{companyIcon}</span>
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

const TopCompaniesChart = ({ filters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const { yearRange, status, country } = filters;

    const params = {
      start_year: yearRange[0],
      end_year: yearRange[1],
      status: status !== "All" ? status : undefined,
      country: country !== "All" ? country : undefined,
    };

    axios
      .get("http://space-analysis-backend.onrender.com/api/top-companies", { params })
      .then((res) => setData(res.data))
      .catch((err) => console.error("API error:", err));
  }, [filters]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md min-h-[400px]">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span>🏢</span> Top 10 Companies
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
        >
          <XAxis
            type="number"
            stroke="#334155"
            tick={{ fill: "#334155", fontSize: 12 }}
          />
          <YAxis
            dataKey="company"
            type="category"
            stroke="#334155"
            tick={{ fill: "#334155", fontSize: 12 }}
            width={150}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="mission_count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCompaniesChart;
