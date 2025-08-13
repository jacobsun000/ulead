import DecorativeShapes from "@/ui/zh/DecorativeShapes";

export default function ChineseHighSchoolPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-ulead-gradient h-screen">
        <DecorativeShapes />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-16 xl:px-20 pt-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center text-white space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                美国高中个性化申请规划服务
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
                专业的美国高中申请指导，为您的孩子开启国际教育之路
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition duration-300">
                咨询申请
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content sections below with white/light backgrounds */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-16 xl:px-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">我们的服务优势</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              这里可以添加更多内容部分，背景为白色，形成层次感
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}