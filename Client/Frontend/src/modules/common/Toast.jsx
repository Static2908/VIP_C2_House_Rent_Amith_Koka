import React, { useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed right-5 top-5 z-[9999] flex items-center gap-3 rounded-2xl border px-5 py-3 shadow-2xl backdrop-blur-xl animate-slideIn
      ${type === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      {isSuccess ? (
        <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
      ) : (
        <XCircleIcon className="h-6 w-6 flex-shrink-0" />
      )}
      <span className="font-medium">{message}</span>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 transition hover:text-slate-700"
      >
        ✖
      </button>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Toast;
