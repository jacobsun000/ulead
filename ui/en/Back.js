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
        className="px-4 py-2 mb-10 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 transition duration-300"
        onClick={handleScrollToTop}
      >
        Back to top
      </button>
    </div>
  );
}
