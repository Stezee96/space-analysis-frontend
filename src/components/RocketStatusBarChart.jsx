// src/components/HeatmapLaunches.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList,
  BarChart,
  Bar
} from "recharts";

const HeatmapLaunches = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/heatmap-data")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Heatmap data fetch failed", err));
  }, []);

  // Create a unique color map per mission status
  const getColor = (status) => {
    switch (status) {
      case "Success": return "#34d399";        // green
      case "Failure": return "#f87171";        // red
      case "Partial Failure": return "#fbbf24"; // yellow
      case "Prelaunch Failure": return "#60a5fa"; // blue
      default: return "#d1d5db";               // gray
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          🚀 Mission Outcomes by Rocket Status
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">Loading heatmap...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="rocket_status" />
            <Tooltip />
            <Bar dataKey="count" name="Count">
              <LabelList dataKey="mission_status" position="right" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.mission_status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HeatmapLaunches;
