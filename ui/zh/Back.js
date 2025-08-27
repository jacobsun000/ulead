"use client";

import React from 'react';

export default function BackToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="px-16 py-2 mb-10 border-white/70 border-2 text-white/70 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
        onClick={handleScrollToTop}
      >
        回到顶部
      </button>
    </div>
  );
}
