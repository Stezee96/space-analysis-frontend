import React, { useEffect, useState } from "react";
import axios from "axios";

const StatOverview = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/launch-stat-summary")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch stat summary:", err);
      });
  }, []);

  if (!stats) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Loading mission summary...
      </div>
    );
  }

  const statStyle =
    "bg-white dark:bg-slate-800 shadow rounded-xl px-5 py-4 text-center";
  const labelStyle = "text-sm text-gray-500 dark:text-gray-400";
  const valueStyle = "text-2xl font-bold text-gray-800 dark:text-white";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div className={statStyle}>
        <div className={valueStyle}>🛰️ {stats.total_missions.toLocaleString()}</div>
        <div className={labelStyle}>Total Missions</div>
      </div>
      <div className={statStyle}>
        <div className={valueStyle}>📅 {stats.first_launch}</div>
        <div className={labelStyle}>First Launch Year</div>
      </div>
      <div className={statStyle}>
        <div className={valueStyle}>🚀 {stats.most_used_rocket}</div>
        <div className={labelStyle}>Most Used Rocket</div>
      </div>
      <div className={statStyle}>
        <div className={valueStyle}>🏢 {stats.top_company}</div>
        <div className={labelStyle}>Top Launch Company</div>
      </div>
      <div className={statStyle}>
        <div className={valueStyle}>📍 {stats.top_location}</div>
        <div className={labelStyle}>Most Active Launch Site</div>
      </div>
    </div>
  );
};

export default StatOverview;
