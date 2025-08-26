import clsx from "clsx";

export default function DecorativeShapes({ className = "" }) {
  return (
    <div className={clsx("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Large floating circle - center right (smaller on mobile) */}
      <div className="absolute top-1/2 right-[8%] sm:right-1/4
                      w-[260px] h-[260px] sm:w-[420px] sm:h-[420px]
                      bg-gradient-to-br from-[#6E4AC8] to-[#0796E5]
                      rounded-full animate-float -translate-y-1/2 opacity-70" />

      {/* Medium circle - top right (hide on very small screens) */}
      <div className="hidden xs:block absolute top-6 right-6
                      w-[90px] h-[90px] sm:w-[130px] sm:h-[130px]
                      bg-gradient-to-br from-[#6E4AC8] to-[#0796E5]
                      rounded-full animate-float-delayed opacity-70" />

      {/* Small circle - bottom right */}
      <div className="absolute bottom-10 right-6
                      w-[64px] h-[64px] sm:w-[86px] sm:h-[86px]
                      bg-gradient-to-br from-[#6E4AC8] to-[#0796E5]
                      rounded-full opacity-30" />

      {/* Small circle - left center (hide on mobile to reduce clutter) */}
      <div className="hidden md:block absolute top-1/2 left-1/4
                      w-[86px] h-[86px]
                      bg-gradient-to-br from-[#6E4AC8] to-[#0796E5]
                      rounded-full animate-float -translate-y-1/2" />

      {/* Subtle blurred depth shapes (only >= sm) */}
      <div className="hidden sm:block absolute top-1/4 left-1/3
                      w-[120px] h-[120px]
                      bg-gradient-to-br from-[#6E4AC8] to-[#0796E5]
                      rounded-full blur-md opacity-70" />
      <div className="hidden sm:block absolute bottom-1/3 right-1/3
                      w-[180px] h-[180px]
                      bg-gradient-to-br from-[#6E4AC8] to-[#0796E5]
                      rounded-full blur-lg opacity-60" />
    </div>
  );
}
