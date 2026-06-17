import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
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

    if (!data.email || !data.password) {
      showToast("error", "Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/login",
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        const user = res.data.user;

        setTimeout(() => {
          switch (user.type) {
            case "Admin":
              navigate("/adminhome");
              break;

            case "Renter":
              navigate("/renterhome");
              break;

            case "Owner":
              if (user.granted === "ungranted") {
                showToast(
                  "error",
                  "Your account is not yet confirmed by the admin"
                );
              } else {
                navigate("/ownerhome");
              }
              break;

            default:
              navigate("/login");
              break;
          }

          window.location.reload();
        }, 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Login failed"
      );

      navigate("/login");
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

      {/* Login Form */}
      <div className="flex flex-grow items-center justify-center px-4 pt-24">
        <div className="househunt-card w-full max-w-md rounded-[1.75rem] p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600 shadow-sm ring-1 ring-blue-100">
              🔒
            </div>

            <h1 className="househunt-section-title mt-4 text-2xl font-bold">
              Sign In
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back to HouseHunt
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
              placeholder="Password"
              className="househunt-input w-full rounded-xl px-4 py-3 placeholder-slate-400"
            />

            <button
              type="submit"
              className="househunt-primary-btn w-full rounded-xl py-3 font-semibold transition duration-200"
            >
              Sign In
            </button>

            <div className="mt-4 flex justify-between text-sm">
              <Link
                to="/forgotpassword"
                className="font-medium text-emerald-600 hover:underline"
              >
                Forgot Password?
              </Link>

              <Link
                to="/register"
                className="font-medium text-blue-700 hover:underline"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;