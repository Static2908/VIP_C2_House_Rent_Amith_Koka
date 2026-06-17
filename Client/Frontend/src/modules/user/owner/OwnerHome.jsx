import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";

const tabs = [
  { name: "Add Property", component: <AddProperty /> },
  { name: "All Properties", component: <AllProperties /> },
  { name: "All Bookings", component: <AllBookings /> },
];

const OwnerHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="househunt-shell min-h-screen text-slate-700">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h2 className="househunt-brand text-3xl font-extrabold text-slate-900">HouseHunt</h2>
          <div className="flex items-center gap-6">
            <h5 className="hidden text-sm font-medium text-slate-500 sm:block">
              Owner Dashboard
            </h5>
            <h5 className="font-medium text-slate-700">
              Hi {user.userData.name}
            </h5>
            <button
              onClick={handleLogOut}
              className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition duration-200 hover:bg-rose-100"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3 border-b border-slate-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 rounded-t-lg
            ${activeTab === index
                  ? "border-b-2 border-blue-600 bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="househunt-card mt-6 rounded-[1.75rem] p-6 transition-all">
          {tabs[activeTab].component}
        </div>
      </div>
    </div>

  );
};

export default OwnerHome;
