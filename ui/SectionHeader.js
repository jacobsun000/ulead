export default function SectionHeader({ title, style }) {
  return (
    <div className={`flex items-center mx-8 md:mx-[8vw] my-16 ${style}`}>
      {/* Left Line with Diamond */}
      <div className="flex items-center flex-grow">
        <div className="border-t border-gray-300 flex-grow"></div>
        <div className="w-2 h-2 bg-gray-400 translate-x-[-0.5rem] rotate-45 transform ml-2"></div> {/* Diamond */}
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl md:text-4xl md:font-medium font-bold text-black mx-4">
        {title}
      </h2>

      {/* Right Line with Diamond */}
      <div className="flex items-center flex-grow">
        <div className="w-2 h-2 bg-gray-400 translate-x-[0.5rem] rotate-45 transform mr-2"></div> {/* Diamond */}
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>
    </div>
  );
}
