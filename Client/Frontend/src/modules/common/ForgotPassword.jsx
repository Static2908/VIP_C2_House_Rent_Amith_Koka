import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";

axios.defaults.withCredentials = true;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password || !data.confirmPassword) {
      showToast("error", "Please fill all fields");
      return;
    }

    if (data.password !== data.confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/forgotpassword",
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        showToast("success", "Your password has been changed!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        showToast("error", "User doesn't exist");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }

      setTimeout(() => {
        navigate("/register");
      }, 1000);
    }
  };

  return (
    <div className="househunt-shell flex min-h-screen flex-col">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
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

      {/* Forgot Password Form */}
      <div className="flex flex-grow items-center justify-center px-4 pt-24">
        <div className="househunt-card w-full max-w-md rounded-[1.75rem] p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600 shadow-sm ring-1 ring-blue-100">
              🔑
            </div>

            <h1 className="househunt-section-title mt-4 text-2xl font-bold">
              Forgot Password?
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Enter your email and new password to reset your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="New Password"
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            />

            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            />

            <button
              type="submit"
              className="househunt-primary-btn w-full rounded-xl py-3 font-semibold transition duration-200"
            >
              Change Password
            </button>

            <div className="mt-4 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-700 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;