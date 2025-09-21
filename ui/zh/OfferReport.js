'use client';

import { useState } from 'react';
import Image from 'next/image';

function OfferItem({ logo, name, name_cn, count }) {
  const name_ = name_cn || name;
  return (
    <div className="bg-white flex w-full items-center p-2 md:p-4 rounded-full shadow-md">
      {/* Logo - aligned to the left */}
      <div className="flex-shrink-0 w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden mr-4">
        <Image src={logo} alt={name_} width={128} height={128} objectFit="cover" />
      </div>

      {/* School name - centered */}
      <div className="flex-1 text-center">
        <p className="text-gray-700 text-sm md:text-lg">{name_}</p>
      </div>

      {/* Count and arrow - aligned to the right */}
      <div className="flex items-center">
        <span className="text-gray-700 font-bold mr-4 md:text-xl">{count}名</span>
        <div className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function OfferReport({ schools, href, expand = false }) {
  const step = 6;
  const [limit, setLimit] = useState(step);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {schools.slice(0, limit + step).map((school, index) => (
          <div key={index} className={`${index >= limit ? 'hidden' : ''} lg:block`}>
            <OfferItem {...school} />
          </div>
        ))}

      </div>
      <div className="flex justify-center mt-8">
        {(expand &&
          <button
            className="bg-white text-black px-6 py-2 rounded-full hover:bg-ulead-gradient transition duration-300"
            onClick={() => setLimit(limit + step)}>查看更多</button>
        )}

        {(href &&
          <a className="bg-white text-black px-16 md:text-xl py-2 rounded-full hover:bg-ulead-gradient hover:text-white transition duration-300"
            href={href} >
            <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold">
              查看更多
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
