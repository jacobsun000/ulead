import Image from 'next/image';

export default function OfferItem({ logo, school, count }) {
  return (
    <div className="bg-white flex w-full items-center p-4 rounded-full shadow-md">
      {/* Logo - aligned to the left */}
      <div className="flex-shrink-0 w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden mr-4">
        <Image src={logo} alt={school} width={128} height={128} objectFit="cover" />
      </div>

      {/* School name - centered */}
      <div className="flex-1 text-center">
        <p className="text-gray-700 text-sm md:text-xl">{school}</p>
      </div>

      {/* Count and arrow - aligned to the right */}
      <div className="flex items-center">
        <span className="text-gray-700 font-bold mr-4 md:text-xl">{count}</span>
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
