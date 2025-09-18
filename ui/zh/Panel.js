"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Panel({ elements, autoplay = false, variant = "white" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isHovered && !isClicked && autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered, isClicked, autoplay, elements.length]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full md:mt-4 flex flex-col items-center justify-center">
      <div className="flex justify-center space-x-8 mb-8">
        {elements.map((element, index) => (
          <button
            key={index}
            className={cn('text-base md:text-lg font-semibold',
              currentIndex === index ? `${variant === 'black' ? "text-black border-[#0796E5]" : "text-white"} border-b-4`
                : `${variant === 'black' ? "text-black/40" : "text-white/40"}`,
            )}
            onClick={() => { setCurrentIndex(index); setIsClicked(true); }}
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
