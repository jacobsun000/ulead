import PageBackground from "../../../ui/zh/PageBackground";

export default function ChineseSummerSchoolPage() {
  return (
    <PageBackground page="summerSchool">
      <div className="container mx-auto px-4 lg:px-16 xl:px-20 pt-20">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              夏校申请指导服务
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
              精选优质夏校项目，提升学术背景，为升学加分
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition duration-300">
              了解更多
            </button>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}