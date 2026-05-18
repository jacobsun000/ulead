'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { getStateCodeByStateName } from 'us-state-codes';

const geoUrl = '/states-10m.json';

const regions = [
  {
    region: 'West',
    states: ['MT', 'WY', 'CO', 'NM', 'ID', 'UT', 'AZ', 'NV', 'WA', 'OR', 'CA', 'AK', 'HI'],
    color: '#213A6C',
    position: { top: '12%', left: '2%' },
    line: { x1: '22%', y1: '30%', x2: '41%', y2: '40%' },
  },
  {
    region: 'Midwest',
    states: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'MO', 'IA', 'KS', 'NE', 'SD', 'ND'],
    color: '#3C5A8C',
    position: { top: '0%', left: '50%', transform: 'translateX(-50%)' },
    line: { x1: '50%', y1: '16%', x2: '50%', y2: '29%' },
  },
  {
    region: 'Northeast',
    states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA'],
    color: '#5478A9',
    position: { top: '12%', right: '2%' },
    line: { x1: '78%', y1: '30%', x2: '64%', y2: '36%' },
  },
  {
    region: 'Mid-Atlantic',
    states: ['MD', 'DE', 'VA', 'WV', 'DC'],
    color: '#6F92BE',
    position: { bottom: '12%', right: '2%' },
    line: { x1: '78%', y1: '66%', x2: '60%', y2: '45%' },
  },
  {
    region: 'South',
    states: ['KY', 'TN', 'NC', 'SC', 'GA', 'AL', 'MS', 'FL', 'AR', 'LA', 'TX', 'OK'],
    color: '#88AAD1',
    position: { bottom: '0%', left: '50%', transform: 'translateX(-50%)' },
    line: { x1: '50%', y1: '82%', x2: '52%', y2: '56%' },
  },
];

function RegionCard({ region, color, schools, hasMore }) {
  return (
    <section
      className="w-full max-w-[300px] rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur"
      aria-label={`${region} schools`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
        <h3 className="text-lg font-semibold text-slate-900">{region}</h3>
      </div>
      <ul className="space-y-1 text-sm leading-5 text-slate-700">
        {schools.map((school, index) => (
          <li key={`${region}-${index}`} className="border-b border-slate-100 last:border-b-0 last:pb-0">
            {school}
          </li>
        ))}
        {hasMore ? <li className="font-semibold tracking-[0.2em] text-slate-500">....</li> : null}
      </ul>
    </section>
  );
}

export default function PartnerMap({ schools }) {
  const schoolsByState = schools.reduce((result, school) => {
    const { state, name } = school;
    if (!result[state]) {
      result[state] = [];
    }
    result[state].push(name);
    return result;
  }, {});

  const regionSchools = regions.map((region) => {
    const regionList = region.states.flatMap((state) =>
      (schoolsByState[state] || []).map((name) => `${name} (${state})`)
    );

    return {
      ...region,
      schools: regionList.slice(0, 8),
      hasMore: regionList.length > 8,
    };
  });

  const stateToRegion = regionSchools.reduce((result, region) => {
    region.states.forEach((state) => {
      result[state] = region;
    });
    return result;
  }, {});

  return (
    <div className="w-full px-4 pb-8 lg:px-6 pt-16">
      <div className="relative mx-auto max-w-[1360px] lg:min-h-[900px]">
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {regionSchools.map((region) => (
            <line
              key={region.region}
              x1={region.line.x1}
              y1={region.line.y1}
              x2={region.line.x2}
              y2={region.line.y2}
              stroke={region.color}
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeDasharray="1.6 1.1"
              opacity="0.85"
            />
          ))}
        </svg>

        <div className="mx-auto w-full max-w-[620px] pt-4 lg:pt-48">
          <div className="rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(176,182,216,0.35),_rgba(255,255,255,0.98)_65%)] px-4 py-6 lg:px-8 lg:py-8">
            <ComposableMap className="mx-auto w-full max-w-[500px]" projection="geoAlbersUsa">
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateCode = getStateCodeByStateName(geo.properties.name);
                    const fill = stateToRegion[stateCode]?.color || '#D8DEEE';

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="#FFFFFF"
                        strokeWidth={0.8}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>

        {regionSchools.map((region) => (
          <div
            key={region.region}
            className="absolute hidden lg:block"
            style={region.position}
          >
            <RegionCard
              region={region.region}
              color={region.color}
              schools={region.schools}
              hasMore={region.hasMore}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
        {regionSchools.map((region) => (
          <RegionCard
            key={region.region}
            region={region.region}
            color={region.color}
            schools={region.schools}
            hasMore={region.hasMore}
          />
        ))}
      </div>
    </div>
  );
}
