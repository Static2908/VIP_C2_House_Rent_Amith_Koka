import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const images = [p1, p2, p3, p4];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="househunt-shell min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <h2 className="househunt-brand text-3xl font-extrabold text-slate-900">
              HouseHunt
            </h2>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Premium rental discovery
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium md:gap-8 md:text-base">
            <Link to="/" className="text-slate-600 transition hover:text-blue-600">
            Home
          </Link>
          <Link to="/login" className="text-slate-600 transition hover:text-blue-600">
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

      {/* Hero Section */}
      <div className="relative mt-20 w-full overflow-hidden px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/70 bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
        <div className="relative h-[68vh] overflow-hidden lg:h-[74vh]">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${currentIndex === idx ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={img} alt={`Slide ${idx}`} className="h-full w-full object-cover" />
            <div className="househunt-hero-overlay absolute inset-0"></div>
          </div>
        ))}

        {/* Center Text */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white sm:px-8 lg:px-12 lg:pb-12">
          <div className="max-w-3xl space-y-5">
            <span className="househunt-badge bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md">
              Verified rentals
            </span>
            <h1 className="househunt-page-title text-4xl font-extrabold leading-tight tracking-tight drop-shadow-md md:text-6xl">
              Find Your Next Home With Confidence
          </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-100/95 md:text-lg">
              Browse verified rental properties, connect directly with owners, and find the perfect place to live.
          </p>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-3.5 w-3.5 rounded-full border border-white/50 transition-all duration-300 ${currentIndex === idx ? "scale-110 bg-white shadow-lg" : "bg-white/40 hover:bg-white/70"
                }`}
            ></button>
          ))}
        </div>
        </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 text-center md:mb-14">
          <span className="mx-auto househunt-badge bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
            Curated listings
          </span>
          <h2 className="househunt-section-title text-3xl font-extrabold md:text-5xl">
            Explore Premium Properties
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Looking to post your property?
            <Link
              to="/register"
              className="ml-0 mt-4 inline-flex rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 md:ml-3 md:mt-0"
            >
              Register as Owner
            </Link>
          </p>
        </div>

        {/* Property Cards */}
        <div className="mt-10">
          <AllPropertiesCards />
        </div>
      </div>
    </div>

  );
};

export default Home;
