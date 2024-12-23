'use client';

import { useState, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/states-10m.json"; //"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const partners = [
  {
    "state": "Alabama",
    "schools": ["Indian Springs School"]
  },
  {
    "state": "California",
    "schools": [
      "The Webb Schools",
      "Stevenson School",
      "Thatcher School",
      "Cate School",
      "Santa Catalina",
    ]
  },
  {
    "state": "Colorado",
    "schools": [
      "Fountain Valley School of Colorado",
    ]
  },
  {
    "state": "Connecticut",
    "schools": [
      "Miss Porter's School",
      "Choate Rosemary School",
    ]
  },
  {
    "state": "Delaware",
    "schools": [
      "Saint Andrew's School",
    ]
  },
  {
    "state": "Hawaii",
    "schools": [
      "Iolani School",
    ]
  },
  {
    "state": "Indiana",
    "schools": [
      "Culver Academies",
    ]
  },
  {
    "state": "Maryland",
    "schools": [
      "Episcopal High School",
      "Madeira School",
      "Georgetown Preparatory",
    ]
  },
  {
    "state": "Massachusetts",
    "schools": [
      "Phillips Academy Andover",
      "Groton School",
      "Miss Hall's School",
      "Middlesex School",
      "Concord Academy",
      "St. Mark's School",
      "Deerfield Academy",
      "Williston Northampton School",
      "Northfield Mount Hermon School",
      "Tabor Academy",
    ]
  },
  {
    "state": "Michigan",
    "schools": [
      "Cranbrook School",
    ]
  },
  {
    "state": "New Hampshire",
    "schools": [
      "Phillips Exeter School",
    ]
  },
  {
    "state": "New Jersey",
    "schools": [
      "Peddie School",
    ]
  },
  {
    "state": "New York",
    "schools": [
      "Emma Willard School",
    ]
  },
  {
    "state": "Ohio",
    "schools": [
      "Western Reserve Academy",
    ]
  },
  {
    "state": "Pennsylvania",
    "schools": [
      "Mercersburg School",
      "Westtown School",
      "George School",
    ]
  },
  {
    "state": "Tennessee",
    "schools": [
      "The Webb School",
      "McCallie School",
      "Baylor School",
    ]
  },
  {
    "state": "Vermont",
    "schools": [
      "St. Johnsbury Academy",
    ]
  },
  {
    "state": "Virginia",
    "schools": [
      "Virginia High School",
      "Episcopal High School",
      "Christchurch School",
    ]
  }
];



export default function PartnerMap() {
  const [hlIndex, setHlIndex] = useState(0);
  const [isScrollingStates, setIsScollingStates] = useState(true);
  const containerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchThreshold = 30;

  useEffect(() => {
    const container = containerRef.current || window;

    // Wheel handling for desktop
    const handleWheel = (e) => {
      if (!isScrollingStates) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        setHlIndex((prev) => Math.min(prev + 1, partners.length - 1));
      } else if (e.deltaY < 0) {
        setHlIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    // Touch handling for mobile
    const handleTouchStart = (e) => {
      if (!isScrollingStates) return;
      const touch = e.touches[0];
      touchStartYRef.current = touch.clientY;
    };

    const handleTouchMove = (e) => {
      if (!isScrollingStates) return;
      e.preventDefault();

      const touch = e.touches[0];
      const deltaY = touchStartYRef.current - touch.clientY;

      if (Math.abs(deltaY) > touchThreshold) {
        if (deltaY > 0) {
          setHlIndex((prev) => Math.min(prev + 1, partners.length - 1));
        } else {
          setHlIndex((prev) => Math.max(prev - 1, 0));
        }
        touchStartYRef.current = touch.clientY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isScrollingStates]);

  useEffect(() => {
    // If we've hit the last state, allow normal scroll
    if (hlIndex === partners.length - 1) {
      setIsScollingStates(false);
    }
  }, [hlIndex]);

  return (
    <div className='flex flex-col md:flex-row'>
      <ComposableMap className='mt-0 md:w-3/4' projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              console.log(geo);
              const stateCode = geo.properties.name;
              const fill = partners[hlIndex].state === stateCode ? "#F59793" : "#EEE";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#FFF"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="rounded-lg m-8 border-secondary border-2 p-8 md:w-1/4">
        <span className="text-secondary font-bold">{`Our Target School in ${partners[hlIndex].state}`}</span>
        <ul className="list-disc">
          {partners[hlIndex].schools.map((school, i) => (
            <li key={i}>{school}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
