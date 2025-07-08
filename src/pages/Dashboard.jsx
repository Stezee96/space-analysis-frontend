import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import MissionStatusChart from "../components/MissionStatusChart";
import TopCompaniesChart from "../components/TopCompaniesChart";
import TopLaunchLocationsChart from "../components/TopLaunchLocationsChart";
import LaunchesPerYearChart from "../components/LaunchesPerYearChart";
import TopRocketTypesChart from '../components/TopRocketTypesChart';
import LaunchOutcomeChart from "../components/LaunchOutcomeChart";
import LaunchByCountryTable from "../components/LaunchByCountryTable";
import StatOverview from "../components/StatOverview";
import InsightsPanel from "../components/InsightsPanel.jsx";
import GlobalFilterPanel from "../components/GlobalFilterPanel";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    yearRange: [1957, 2023],
    status: "All",
    country: "All",
  });

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Title */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  🌌 Space Launch Intelligence Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base mt-1">
                  Global launch data overview from 1957 to 2023
                </p>
              </div>
            </div>

            {/* Overview & Filters */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 space-y-6">
                <StatOverview />
                <InsightsPanel />
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow h-[200px] overflow-y-auto">
                  <GlobalFilterPanel filters={filters} setFilters={setFilters} />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-12 gap-6 mt-6">
  <div className="col-span-12"><MissionStatusChart filters={filters} /></div>
  {/* <div className="col-span-12"><TopCompaniesChart filters={filters} /></div>
  <div className="col-span-12"><TopLaunchLocationsChart filters={filters} /></div>
  <div className="col-span-12"><LaunchesPerYearChart filters={filters} /></div>
  <div className="col-span-12"><TopRocketTypesChart filters={filters} /></div>
  <div className="col-span-12"><LaunchOutcomeChart filters={filters} /></div>
  <div className="col-span-12"><LaunchByCountryTable filters={filters} /></div> */}
</div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
