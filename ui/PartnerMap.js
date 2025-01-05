'use client';

import { useState, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getStateCodeByStateName } from 'us-state-codes'

const geoUrl = "/states-10m.json"; //"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const regions = [
  {
    region: "West",
    states: ["CA", "OR", "WA", "NV", "ID", "MT", "WY", "CO", "AZ", "NM", "UT", "AK", "HI"]
  },
  {
    region: "Midwest",
    states: ["OH", "MI", "IN", "IL", "WI", "MO", "IA", "MN", "KS", "NE", "ND", "SD"]
  },
  {
    region: "South",
    states: ["NC", "SC", "GA", "FL", "TN", "KY", "AL", "MS", "AR", "LA", "TX", "OK"]
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

const partners_ = [
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
  console.log(regionSchools);

  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className='grid grid-rows-5 md:grid-rows-none md:grid-cols-5 gap-2 md:gap-4 m-4 md:m-8'>
        {regionSchools.map((region, i) => (
          <div key={i}
            className={`${i === index ? 'bg-[#E9CDCF]' : ''} text-center border-[1px] border-secondary rounded-lg md:p-4 text-lg cursor-pointer hover:bg-faded`}
            onClick={() => setIndex(i)}
          >
            {region.region}
          </div>
        )
        )}
      </div>
      <div>
        <div className='flex flex-col md:flex-row justify-items-start items-start'>
          <ComposableMap className='mt-0 md:w-3/4' projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const stateCode = getStateCodeByStateName(geo.properties.name);
                  const fill = regionSchools[index].states.some(s => s.state === stateCode) ? "#DCA5AA" : "#E9CDCF";
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
          <div className='flex flex-col md:w-1/4 mx-4 md:m-0'>
            {regionSchools[index].states.map((s, i) => {
              if (!s.schools.length) return null;
              return (
                <div key={i} className="rounded-lg mb-2 bg-white px-12 py-8">
                  <ul className="list-disc">
                    {s.schools.map((school, i) => (
                      <li key={i}>{`${school} (${s.state})`}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
