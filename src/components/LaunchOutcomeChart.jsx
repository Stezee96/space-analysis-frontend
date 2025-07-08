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
  return (
    <div className="bg-white dark:bg-slate-700 p-2 rounded shadow text-black dark:text-white text-xs">
      <div className="font-semibold">{label}</div>
      <div>{payload[0].value} launches</div>
    </div>
  );
};

const LaunchOutcomeChart = ({ filters }) => {
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
      .get("https://space-analysis-backend.onrender.com/api/launch-outcome", { params })
      .then((res) => setData(res.data))
      .catch((err) => console.error("API error:", err));
  }, [filters]);

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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md min-h-[400px] h-[400px]">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span>⚖️</span> Launch Outcome Breakdown
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <XAxis
              dataKey="outcome"
              stroke={labelColor}
              tick={{ fill: labelColor, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: labelColor }}
            >
              <Label
                value="Outcome"
                offset={-5}
                position="insideBottom"
                fill={labelColor}
              />
            </XAxis>
            <YAxis
              stroke={labelColor}
              tick={{ fill: labelColor, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: labelColor }}
            >
              <Label
                value="Count"
                angle={-90}
                position="insideLeft"
                fill={labelColor}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">
          No data available for this selection.
        </p>
      )}
    </div>
  );
};

export default LaunchOutcomeChart;
