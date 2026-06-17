import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";

axios.defaults.withCredentials = true;


const Register = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.type) {
      return showToast("error", "Please fill all fields");
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/register",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="househunt-shell flex min-h-screen flex-col">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      {/* Navbar */}
<nav className="fixed left-0 top-0 z-50 w-full border-b border-white/60 bg-white/80 py-4 shadow-sm backdrop-blur-xl">
  <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 lg:px-8">
    <div>
      <h2 className="househunt-brand text-3xl font-extrabold text-slate-900">
        HouseHunt
      </h2>

      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
        Premium rental discovery
      </p>
    </div>

    <div className="flex items-center gap-3 text-sm font-medium md:gap-8 md:text-base">
      <Link
        to="/"
        className="text-slate-600 transition hover:text-blue-600"
      >
        Home
      </Link>

      <Link
        to="/login"
        className="text-slate-600 transition hover:text-blue-600"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="househunt-primary-btn rounded-full px-5 py-2.5 transition"
      >
        Register
      </Link>
    </div>
  </div>
</nav>

      {/* Register Form */}
      <div className="flex-grow flex items-center justify-center px-4 pt-24">
        <div className="househunt-card w-full max-w-md rounded-[1.75rem] p-8">
          <div className="text-center mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600 shadow-sm ring-1 ring-blue-100">
              📝
            </div>
            <h1 className="househunt-section-title mt-4 text-2xl font-bold">
              Sign Up
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Renter Full Name / Owner Name"
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            />

            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            >
              <option value="">Select User Type</option>
              <option value="Renter">Renter</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
            </select>

            <button
              type="submit"
              className="househunt-primary-btn w-full rounded-xl py-3 font-semibold transition duration-200"
            >
              Sign Up
            </button>

            <div className="mt-4 text-center text-sm text-slate-600">
              Have an account?{" "}
              <Link to="/login" className="font-medium text-blue-700 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
