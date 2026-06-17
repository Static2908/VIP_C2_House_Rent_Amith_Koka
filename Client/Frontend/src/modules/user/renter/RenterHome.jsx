import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import PropTypes from "prop-types";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="w-full mt-6">
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="househunt-shell min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-white/60 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h2 className="househunt-brand text-3xl font-extrabold text-slate-900">HouseHunt</h2>
        <div className="flex items-center gap-6">
          <h5 className="hidden text-sm font-medium text-slate-500 sm:block">
            Renter Dashboard
          </h5>
          <h5 className="font-medium text-slate-700">
            Hi, {user.userData.name}
          </h5>
          <Link
            to="/"
            onClick={handleLogOut}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
          >
            Log Out
          </Link>
        </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="househunt-card mx-auto mt-10 w-full max-w-5xl rounded-[1.75rem] p-6">
        <div className="flex border-b border-slate-200">
          <button
            className={`px-6 py-2 text-sm font-medium transition-colors ${value === 0
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-slate-500 hover:text-blue-600"
              }`}
            onClick={() => setValue(0)}
          >
            All Properties
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium transition-colors ${value === 1
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-slate-500 hover:text-blue-600"
              }`}
            onClick={() => setValue(1)}
          >
            Booking History
          </button>
        </div>

        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          <div className="mt-6">
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="mt-6">
            <AllProperty />
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default RenterHome;
