"use client";
import { useState, useEffect } from "react";

export default function Panel({ elements }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered, elements.length]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mt-4 flex flex-col items-center justify-center">
      <div className="flex justify-center space-x-8 mb-8">
        {elements.map((element, index) => (
          <button
            key={index}
            className={`text-lg font-semibold ${currentIndex === index ? 'text-black border-b-2 border-red-600' : 'text-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          >
            {element.title}
          </button>
        ))}
      </div>
      <div
        className="w-full"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {elements[currentIndex].content}
      </div>
    </div>
  );
}
