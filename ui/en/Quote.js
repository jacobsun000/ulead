import Image from 'next/image';

export default function Quote({ text }) {
  return (
    <div className="flex items-center p-4 mx-[8vw]">
      <Image src="/img/aboutus/quote-start.svg" alt="Start Quote" width={135} height={98} className="w-6 md:w-24 h-6 md:h-24 text-pink-300 mr-2" />
      <p className="text-gray-800 text-center text-sm md:text-lg font-bold flex-1">{text}</p>
      <Image src="/img/aboutus/quote-end.svg" alt="End Quote" width={135} height={98} className="w-6 md:w-24 h-6 md:h-24 text-pink-300 ml-2" />
    </div>
  );
}
