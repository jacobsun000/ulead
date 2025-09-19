import Image from 'next/image'
import DecorativeShapes from '@/ui/zh/DecorativeShapes';
import clsx from 'clsx';

const ServiceItem = ({ title, description, isOpen, isRed, icon }) => {
  return (
    <div className="border-b py-4" open={isOpen}>
      <div className="flex items-center cursor-none list-none">
        <div className="w-8 h-8">
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <span className="pl-2 font-semibold text-left text-sm md:text-base">{title}</span>
      </div>
      <ul className="mt-2 text-gray-600 md:text-base text-xs">
        {description && description.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </div>
  );
};

export default function LeadProgramPage() {
  const services = [
    {
      title: "学术成长计划", icon: "/img/lead-program/11.svg", isOpen: false, isRed: false,
      description: ["挖掘重点特科，并制定发展计划，学术标签打造及发展逻辑梳理。",
        "英语学习节点和方法，其他学科的国际化接轨的学习节点和方法。",
        "国内双语私立体系、国际教育体系、公立体系的分析和选择。",
        "美国私立走读体系、私立寄宿体系、公立体系的分析和选择。"]
    },
    {
      title: "艺术成长计划", icon: "/img/lead-program/22.svg", isOpen: false, isRed: false,
      description: ["启发孩子自身对艺术发展的认识，优势和劣势分析。",
        "国际化视角和审美力建立和增长。",
        "典型艺术和设计赛道及目标院校的学习节点、方法和资源。",
        "个性化艺术生和艺术性生的国际化发展路径。"]
    },
    {
      title: "运动成长计划", icon: "/img/lead-program/33.svg", isOpen: false, isRed: false,
      description: ["挖掘重点特科，并制定发展计划，学术标签打造及发展逻辑梳理。",
        "英语学习节点和方法，其他学科的国际化接轨的学习节点和方法。",
        "国内双语私立体系、国际教育体系、公立体系的分析和选择。",
        "美国私立走读体系、私立寄宿体系、公立体系的分析和选择。"]
    },
    {
      title: "家长教育成长计划", icon: "/img/lead-program/44.svg", isOpen: false, isRed: false,
      description: ["启发孩子自身对艺术发展的认识，优势和劣势分析。",
        "国际化视角和审美力建立和增长。",
        "典型艺术和设计赛道及目标院校的学习节点、方法和资源。",
        "个性化艺术生和艺术性生的国际化发展路径。"]
    },
    {
      title: "领导力成长计划", icon: "/img/lead-program/55.svg", isOpen: false, isRed: false,
      description: ["挖掘重点特科，并制定发展计划，学术标签打造及发展逻辑梳理。",
        "英语学习节点和方法，其他学科的国际化接轨的学习节点和方法。",
        "国内双语私立体系、国际教育体系、公立体系的分析和选择。",
        "美国私立走读体系、私立寄宿体系、公立体系的分析和选择。"]
    },
    {
      title: "节假日成长计划", icon: "/img/lead-program/66.svg", isOpen: false, isRed: false,
      description: ["启发孩子自身对艺术发展的认识，优势和劣势分析。",
        "国际化视角和审美力建立和增长。",
        "典型艺术和设计赛道及目标院校的学习节点、方法和资源。",
        "个性化艺术生和艺术性生的国际化发展路径。"]
    },
    {
      title: "海外成长计划", icon: "/img/lead-program/77.svg", isOpen: false, isRed: false,
      description: ["挖掘重点特科，并制定发展计划，学术标签打造及发展逻辑梳理。",
        "英语学习节点和方法，其他学科的国际化接轨的学习节点和方法。",
        "国内双语私立体系、国际教育体系、公立体系的分析和选择。",
        "美国私立走读体系、私立寄宿体系、公立体系的分析和选择。"]
    },
    {
      title: "公益活动成长计划", icon: "/img/lead-program/88.svg", isOpen: false, isRed: false,
      description: ["启发孩子自身对艺术发展的认识，优势和劣势分析。",
        "国际化视角和审美力建立和增长。",
        "典型艺术和设计赛道及目标院校的学习节点、方法和资源。",
        "个性化艺术生和艺术性生的国际化发展路径。"]
    },
  ];
  return (
    <div>
      {/* ===== Hero ===== */}
      <div className="w-full">
        <HeroSection />

        {/* ===== 主体容器 ===== */}
        <main className="w-full mt-10 p-6 sm:p-10 shadow-xl ring-1 ring-black/5">

          {/* ===== 美国高中领航计划 ===== */}
          <section id="highschool">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">美国高中领航计划</h2>
              <p className="mt-4 text-gray-600">
                专注孩子本身，由成长顾问同导师引领孩子和家长进行个性化的成长和申请规划，
                让孩子有足够的时间有效地提升自己的背景和能力
              </p>
            </div>

            {/* 卡片 */}
            <div className="mx-auto mt-10 max-w-6xl">
              <div className="grid gap-6 grid-cols-2">
                <img src="/img/lead-program/a.svg" alt="规划整体解决方案" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/b.svg" alt="暑假机会拓展" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/c.svg" alt="英文/文件读计划" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/d.svg" alt="SSAT/托福学习计划" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/e.svg" alt="顾校育导师制" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/f.svg" alt="校园调研/访校" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/g.svg" alt="学术竞赛与申请作品规划" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/h.svg" alt="校内GPA提升" className="w-90 h-auto mx-auto" />
              </div>
            </div>
          </section>

          {/* ===== 高中领航服务 ===== */}
          <section id="section-service" className="mx-auto mt-16 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">高中领航服务</h2>
            <div className="flex justify-center">
              <img
                src="/img/lead-program/service.svg"
                alt="高中领航服务流程"
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </section>

          {/* ===== 八项核心竞争力 ===== */}
          <section id="section-core" className="mx-auto mt-16">
            <h2 className="text-center text-2xl md:text-3xl font-bold">八项核心竞争力</h2>
            <div className="max-w-6xl mx-2 md:mx-12 lg:mx-auto md:py-4 md:px-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {services.map((service, index) => (
                  <ServiceItem
                    key={index}
                    title={service.title}
                    icon={service.icon}
                    isOpen={service.isOpen}
                    isRed={service.isRed}
                    description={service.description}
                  />
                ))}
              </div>
            </div>
          </section>


          {/* ===== 能力训练 ===== */}
          <section id="section-abilities" className="mx-auto mt-8 px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold my-4">能力训练</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-6 mt-4 md:mt-16">
              {[
                "竞赛资源",
                "压力写作",
                "课外活动",
                "家庭引导",
                "英语学术写作",
                "音乐创作",
                "创意写作",
                "艺术作品集",
                "美国教授课程",
                "国际大师课",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="relative p-0.5 rounded-full text-xs md:text-sm font-medium text-gray-700 bg-gradient-to-r from-[#6A5AE0] to-[#1F8CEC]"
                >
                  <span className="bg-white rounded-full px-2 md:px-2 py-1 md:py-0.5 block">
                    {tag}
                  </span>
                </span>
              ))}
            </div>

            <div className="mb-6">
              <span className="inline-block px-6 py-2 rounded-full text-white text-sm md:text-base font-semibold bg-gradient-to-r from-[#6A5AE0] to-[#1F8CEC] shadow">
                领航计划学生成长
              </span>
            </div>

            {/* 下方标签组 */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "创意写作",
                "运动活动",
                "英语阅读",
                "GPA 管理",
                "学术指导",
                "夏校申请",
                "科学创新",
                "音乐创作",
                "假日活动",
                "考试辅导",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="relative p-0.5 rounded-full text-xs md:text-sm font-medium text-gray-700 bg-gradient-to-r from-[#6A5AE0] to-[#1F8CEC]"
                >
                  <span className="bg-white rounded-full px-2 md:px-2 py-1 md:py-0.5 block">
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>

    </div>
  );
}

function HeroSection() {
  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden flex justify-center items-center",
        "bg-ulead-gradient text-white",
        "px-4 lg:px-16 xl:px-20 min-h-[280px] md:min-h-[420px]",
      )}
    >
      <DecorativeShapes className="z-0" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl w-full text-center lg:text-6xl font-bold leading-tight">合领领航计划</h1>

        <div className="mt-8 flex items-center justify-center gap-4 md:gap-6">
          {/* Left button - gradient background */}
          <div className="bg-white rounded-full px-4 md:px-6 py-1 md:py-2 opacity-60 hover:opacity-90 transition">
            <a
              href="/zh/lead-program/university"
              className="text-sm sm:text-base
               text-transparent bg-clip-text bg-ulead-gradient"
            >
              美国大学领航计划
            </a>
          </div>

          {/* Right button - white background, gradient text */}
          <div className="bg-white rounded-full px-4 md:px-6 py-1 md:py-2 opacity-90 hover:opacity-100 transition">
            <a
              href="/zh/lead-program/highschool"
              className="text-sm sm:text-base
               text-transparent bg-clip-text bg-ulead-gradient"
            >
              美国高中领航计划
            </a>
          </div>
        </div>


        <div className="mt-8 flex justify-center">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
