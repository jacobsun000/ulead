import DecorativeShapes from "@/ui/zh/DecorativeShapes";
import Image from "next/image";

export default function ChineseHomePage() {
  return (
    <div className="relative bg-ulead-gradient min-h-screen">
      <DecorativeShapes />

      <div className="relative z-10 container mx-auto px-4 lg:px-16 xl:px-20 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-6 lg:pr-12">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              高端申请规划服务
            </h1>
            <p className="text-xl lg:text-2xl text-white/90">
              家庭的教育管家，孩子的成长导师
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition duration-300">
              现在沟通
            </button>
          </div>

          {/* Right Content - Professional Woman Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* You'll need to add the professional woman image to public/img/zh/ */}
              <div className="w-full h-96 lg:h-[500px] bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <span className="text-white/60">Professional Woman Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
