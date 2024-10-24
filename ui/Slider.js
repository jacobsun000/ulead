"use client";
import { useState, useEffect } from "react";

export default function Slider({ elements, showBullet, showArrow, autoplay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + elements.length) % elements.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
  };

  useEffect(() => {
    if (!isHovered && autoplay) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mt-4 flex flex-col items-center justify-center">
      <div
        className="relative mx-10 group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {elements[currentIndex]}
      </div>
      {showArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary rounded-full transition duration-300"
          onClick={prevSlide}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {showArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary rounded-full transition-all duration-300"
          onClick={nextSlide}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {showBullet && (
        <div className="flex space-x-2 mt-6">
          {elements.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 ${index === currentIndex
                ? "bg-gray-500 rounded-full"
                : "bg-gray-300 rounded-full"
                } transition-all duration-500 ease-in-out`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
