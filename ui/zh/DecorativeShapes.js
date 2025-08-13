'use client';

export default function DecorativeShapes({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large floating circle - center right */}
      <div className="absolute top-1/2 right-1/4 w-[475px] h-[475px] bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full animate-float transform -translate-y-1/2"></div>

      {/* Medium circle - top right */}
      <div className="absolute top-16 right-16 w-[140px] h-[140px] bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full animate-float-delayed"></div>

      {/* Small circle - bottom right */}
      <div className="absolute bottom-20 right-16 w-[86px] h-[86px] bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full opacity-30"></div>

      {/* Small circle - left center */}
      <div className="absolute top-1/2 left-1/4 w-[86px] h-[86px] bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full animate-float transform -translate-y-1/2"></div>

      {/* Additional subtle shapes for depth */}
      <div className="absolute top-1/4 left-1/3 w-[120px] h-[120px] bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full blur-md"></div>
      <div className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full blur-lg"></div>
    </div>
  );
}
