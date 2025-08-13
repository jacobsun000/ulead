'use client'
import { useState } from 'react';

export default function Tab({ elements }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div className="hidden md:flex justify-center space-x-4 mb-8">
        {elements.map((tab, index) => (
          <button
            key={tab.key}
            className={`px-6 py-2 font-semibold rounded-full ${currentIndex === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}
            onClick={() => setCurrentIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {elements[currentIndex].content}

    </div>
  );
}
