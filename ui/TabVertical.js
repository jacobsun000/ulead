'use client';
import { useState } from 'react';

export default function TabVertical({ elements }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row p-6 overflow-hidden">
      {/* Vertical Tabs (Left side) */}
      <div className="md:w-1/3 flex flex-col space-y-4 mb-6 md:mb-0">
        {elements.map((element, index) => (
          <button
            key={index}
            className={`flex items-center p-4 transition ${currentIndex === index ? 'bg-[#eaecee]' : 'bg-none'
              }`}
            onClick={() => setCurrentIndex(index)}
          >
            {element.label}
          </button>
        ))}
      </div>

      {/* Tab Content (Right side) */}
      <div className="md:w-2/3 p-6 bg-[#eaecee]">
        {elements[currentIndex].content}
      </div>
    </div>
  );
}
