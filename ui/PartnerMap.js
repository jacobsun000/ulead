'use client';

import { useState, useRef } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getStateCodeByStateName } from 'us-state-codes'

const geoUrl = "/states-10m.json"; //"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const regions = [
  {
    region: "West",
    states: ["MT", "WY", "CO", "NM", "ID", "UT", "AZ", "NV", "WA", "OR", "CA", "AK", "HI"]
  },
  {
    region: "Midwest",
    states: ["OH", "MI", "IN", "IL", "WI", "MN", "MO", "IA", "KS", "NE", "SD", "ND"]
  },
  {
    region: "South",
    states: ["KY", "TN", "NC", "SC", "GA", "AL", "MS", "FL", "AR", "LA", "TX", "OK"]
  },

  {
    region: "Mid-Atlantic",
    states: ["MD", "DE", "VA", "WV", "DC"]
  },
  {
    region: "Northeast",
    states: ["ME", "NH", "VT", "MA", "RI", "CT", "NY", "NJ", "PA"]
  },
];

export default function PartnerMap({ schools }) {
  schools = schools.reduce((result, school) => {
    const { state, name } = school;
    if (!result[state]) {
      result[state] = [];
    }
    result[state].push(name);
    return result;
  }, {});

  const regionSchools = regions.map(region => {
    return {
      region: region.region, states: region.states.map(state => {
        return { state, schools: schools[state] || [] };
      })
    };
  });

  const [index, setIndex] = useState(0);
  return (
    <div className='flex flex-col items-center'>
      <div className='grid grid-rows-2 grid-cols-3 lg:grid-rows-none lg:grid-cols-5 gap-2 lg:max-w-7xl lg:gap-4 m-4 mb-0 lg:m-8'>
        {regionSchools.map((region, i) => (
          <div key={i}
            className={`${i === index ? 'bg-primary text-white' : ''} text-center border-[1px] border-secondary rounded-lg lg:p-4 text-lg cursor-pointer hover:bg-secondary hover:text-white p-1`}
            onClick={() => setIndex(i)}
          >
            {region.region}
          </div>
        )
        )}
      </div>
      <div className='flex flex-col lg:flex-row px-4 lg:p-0 lg:max-h-[80vh] w-full'>
        <ComposableMap className='mt-0 lg:w-3/4' projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateCode = getStateCodeByStateName(geo.properties.name);
                const fill = regionSchools[index].states.some(s => s.state === stateCode) ? "#B62C3A" : "#213A6C";
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
        <div className='flex flex-col max-h-[45vh] lg:max-h-full lg:w-1/4 mx-4 lg:m-0 overflow-y-scroll'>
          {regionSchools[index].states.map((s, i) => {
            if (!s.schools.length) return null;
            return (
              <div key={i} className="rounded-lg mb-2 bg-white px-12 py-8">
                <ul className="list-disc">
                  {s.schools.map((school, i) => (
                    <li key={i}>{school} <span className='hidden lg:inline-block'>({s.state})</span></li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
