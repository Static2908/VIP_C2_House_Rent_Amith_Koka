import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";

const AdminHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

if (!user || !user.userData) return null;

  return (
<div className="househunt-shell flex min-h-screen flex-col">
  {/* Navbar */}
  <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/60 bg-white/80 py-4 shadow-sm backdrop-blur-xl">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 lg:px-8">
    <h2 className="househunt-brand text-3xl font-extrabold text-slate-900">HouseHunt</h2>
    <div className="flex items-center gap-4 md:gap-6">
      <span className="hidden text-sm font-medium text-slate-500 sm:inline">Admin Console</span>
      <span className="text-slate-700">Hi, {user.userData.name}</span>
      <button
        onClick={handleLogOut}
        className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 font-semibold text-rose-700 transition hover:bg-rose-100"
      >
        Log Out
      </button>
    </div>
    </div>
  </nav>

  {/* Admin Tabs */}
  <div className="mx-auto w-full max-w-7xl px-4 py-24"> 
    {/* Tabs */}
    <div className="mb-6 flex flex-wrap gap-3 border-b border-slate-200">
      <button
        onClick={() => setActiveTab("users")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "users"
            ? "border-b-2 border-blue-600 text-blue-700"
              : "text-slate-500 hover:text-blue-600"
        }`}
      >
        All Users
      </button>
      <button
        onClick={() => setActiveTab("properties")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "properties"
            ? "border-b-2 border-blue-600 text-blue-700"
              : "text-slate-500 hover:text-blue-600"
        }`}
      >
        All Properties
      </button>
      <button
        onClick={() => setActiveTab("bookings")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "bookings"
            ? "border-b-2 border-blue-600 text-blue-700"
              : "text-slate-500 hover:text-blue-600"
        }`}
      >
        All Bookings
      </button>
    </div>

    {/* Tab Panels */}
    <div className="househunt-card rounded-[1.75rem] p-6 text-slate-700">
      {activeTab === "users" && <AllUsers />}
      {activeTab === "properties" && <AllProperty />}
      {activeTab === "bookings" && <AllBookings />}
    </div>
  </div>
</div>

  );
};

export default AdminHome;
