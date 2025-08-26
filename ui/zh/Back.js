"use client";

import React from "react";

export default function BackToTopButton({ className = "" }) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleScrollToTop}
        className={[
          "px-6 py-2 mb-10 rounded-full border border-white/60",
          "text-white/90 font-semibold backdrop-blur-sm",
          "hover:bg-white/10 transition duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          className
        ].join(" ")}
      >
        Back to top
      </button>
    </div>
  );
}
