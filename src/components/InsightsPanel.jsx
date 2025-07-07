import React, { useEffect, useState } from "react";
import axios from "axios";

const InsightsPanel = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
  axios
    .get("https://space-analysis-backend.onrender.com/api/launch-insights")
    .then((res) => {
      if (Array.isArray(res.data)) {
        setInsights(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setInsights([]);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch insights:", err);
      setInsights([]);
    });
}, []);


  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        🧠 Smart Insights
      </h2>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-6">
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightsPanel;
