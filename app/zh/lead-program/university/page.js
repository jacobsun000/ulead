import { sql } from '@vercel/postgres';
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
        <span className="pl-2 font-semibold text-left">{title}</span>
      </div>
      <ul className="mt-2 text-gray-600">
        {description && description.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </div>
  );
};

function MentorCard({ name, degree, institution, research_domains, projects, supported_programs, image_url }) {
  return (
    <div className="rounded-2xl shadow bg-white p-3 md:p-6 w-[160px] md:w-[360px]">
      <div className="flex justify-center">
        <Image
          src={image_url}
          alt={name}
          width={120}
          height={120}
          className="rounded-full w-16 h-16 md:w-32 md:h-32 object-cover"
        />
      </div>
      <h2 className="text-center text-sm md:text-xl font-bold mt-4">{name}</h2>
      <p className="text-center text-xs md:text-base text-black/80 mt-1">
        {degree},{institution}
      </p>

      <div className="h-px w-full my-4 bg-ulead-gradient" />

      <div className="space-y-4 text-sm text-black/90 leading-relaxed">
        <div>
          <h3 className="font-bold text-xs md:text-base">研究领域</h3>
          <p className="mt-1 text-xs md:text-base whitespace-pre-line">{research_domains}</p>
        </div>
        <div>
          <h3 className="font-bold text-xs md:text-base">可参与的项目</h3>
          <p className="mt-1 text-xs md:text-base whitespace-pre-line">{projects}</p>
        </div>
        <div>
          <h3 className="font-bold text-xs md:text-base">支持的项目</h3>
          <p className="mt-1 text-xs md:text-base whitespace-pre-line">{supported_programs}</p>
        </div>
      </div>
    </div>
  );
}

export default async function LeadProgramPage() {
  const { rows: mentors } = await sql`SELECT * FROM mentor`;
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
        <main className="w-full mt-10 p-2 md:p-6 sm:p-10 shadow-xl ring-1 ring-black/5">

          {/* ===== 美国大学领航计划 ===== */}
          <section id="university">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">美国大学领航计划</h2>
              <p className="mt-4 text-gray-600">
                ULEAD高质量科研论文出版项目，旨在为学生提供高质量科研训练及专业科研论文支持，提升学生科研竞争力，获得在国际学术期刊上的发表机会。
              </p>
            </div>

            {/* 卡片 */}
            <div className="mx-auto mt-10 max-w-6xl">
              <div className="grid gap-6 grid-cols-2">
                <img src="/img/lead-program/zua.svg" alt="学术自由选题" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/zub.svg" alt="指导与支持" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/zuc.svg" alt="一对一导师制" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/zud.svg" alt="严谨的学术标准" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/zue.svg" alt="灵活的时间安排" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/zuf.svg" alt="展示与发表" className="w-90 h-auto mx-auto" />
              </div>
            </div>
          </section>

          {/* ===== 领航服务 ===== */}
          <section id="section-service" className="md:mx-auto mt-12 md:mt-32 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">大学领航项目</h2>

            <div className="flex mt-4 flex-row md:gap-16 gap-4 items-center justify-center w-full">
              {/* Image */}
              <div className="relative w-1/3 md:w-1/5 aspect-square rounded-xl">
                <Image
                  src="/img/lead-program/p1.png"
                  alt="research writing"
                  fill
                  className="object-cover z-20 rounded-xl"
                />
                <div className="absolute left-2 md:left-8 top-2 md:top-8 w-full h-full rounded-xl bg-ulead-gradient z-10" />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start md:gap-4 w-2/3 md:w-1/2">
                {/* Title */}
                <h2 className="text-xs md:text-xl font-bold mb-2 md:mb-4">FYP 项目</h2>

                {/* Intro Text */}
                <p className="text-gray-800 mb-2 md:mb-4 leading-relaxed font-bold md:font-normal text-[0.5rem] md:text-base">
                  探索确定研究是否适合学生，并找到学生感兴趣的主题。
                </p>

                {/* Bullet Points */}
                <ul className="list-disc text-left text-[0.5rem] md:text-base list-inside md:space-y-2 space-y-1 text-gray-700">
                  <li>探索学生的兴趣，开始确定可能的研究领域。</li>
                  <li>学习如何构建一个有力的研究课题。</li>
                  <li>根据反馈评估，审查并最终确定一个有力的研究课题。</li>
                  <li>
                    草拟可能的研究主题，并讨论下一步（无论是我们的研究项目、论文竞赛，还是会议提交）。
                  </li>
                  <li>面向所有高中生至大一学生开放。</li>
                  <li>课程持续 3 周。</li>
                </ul>
              </div>
            </div>

            <div className="flex mt-4 flex-row md:gap-16 gap-4 items-center justify-center w-full">
              {/* Image */}
              <div className="relative w-1/3 md:w-1/5 aspect-square rounded-xl">
                <Image
                  src="/img/lead-program/p2.png"
                  alt="research writing"
                  fill
                  className="object-cover z-20 rounded-xl"
                />
                <div className="absolute left-2 md:left-8 top-2 md:top-8 w-full h-full rounded-xl bg-ulead-gradient z-10" />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start md:gap-4 w-2/3 md:w-1/2">
                {/* Title */}
                <h2 className="text-xs md:text-xl font-bold mb-2 md:mb-4">RA – EXISTING DATA 项目</h2>

                {/* Bullet Points */}
                <ul className="list-disc text-left text-[0.5rem] md:text-base list-inside md:space-y-2 space-y-1 text-gray-700">
                  <li>分析现有数据集，并为正在进行的研究做出贡献，最终实现同行评审的发表。</li>
                  <li>培养数据分析技能，并为现实世界的研究出版物做出贡献。</li>
                  <li>面向具有强大科学背景的高中生和大学生开放，但由于名额有限，竞争非常激烈。</li>
                  <li>需要强有力的申请材料和成功的实验室匹配。</li>
                  <li>课程持续 1 年。</li>
                </ul>
              </div>
            </div>

            <div className="flex mt-4 flex-row mb-8 md:gap-16 gap-4 items-center justify-center w-full">
              {/* Image */}
              <div className="relative w-1/3 md:w-1/5 aspect-square rounded-xl">
                <Image
                  src="/img/lead-program/p3.png"
                  alt="research writing"
                  fill
                  className="object-cover z-20 rounded-xl"
                />
                <div className="absolute left-2 md:left-8 top-2 md:top-8 w-full h-full rounded-xl bg-ulead-gradient z-10" />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start md:gap-4 w-2/3 md:w-1/2">
                {/* Title */}
                <h2 className="text-sm md:text-xl font-bold mb-2 md:mb-4">INTRO – LIT 项目</h2>

                <p className="text-gray-800 mb-2 md:mb-4 leading-relaxed font-bold md:font-normal text-[0.5rem] md:text-base">
                  学习研究的基础：问题识别和文献综述。
                </p>

                {/* Bullet Points */}
                <ul className="list-disc text-left text-[0.5rem] md:text-base list-inside md:space-y-2 space-y-1 text-gray-700">
                  <li>选择学生自己的主题 / 研究问题。</li>
                  <li>通过全面的文献综述项目，发展批判性思维和写作技能。</li>
                  <li>学生的研究结果做学术展示。</li>
                  <li>无论学生的背景如何，都能获得对科学过程的广泛了解。</li>
                  <li>可选择加入入门组项目。</li>
                  <li>面向所有高中生、间隔年学生和大一学生开放。</li>
                  <li>课程持续 4–8 周。</li>
                </ul>
              </div>
            </div>

            <a
              href="/zh/contacts"
              className="px-16 py-2 mt-8 md:py-3 rounded-full bg-ulead-gradient
                 bg-white hover:shadow-lg transition-shadow text-white
                 active:scale-95"
            >
              咨询申请
            </a>
          </section>

          {/* ===== 合作导师 ===== */}
          <section id="section-core" className="mx-auto mt-8 md:mt-32 flex items-center flex-col gap-16">
            <h2 className="text-center text-2xl md:text-3xl font-bold">合作导师</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} {...mentor} />
              ))}
            </div>
            <a
              href="/zh/contacts"
              className="px-16 py-2 mb-8 md:py-3 rounded-full bg-ulead-gradient
                 bg-white hover:shadow-lg transition-shadow text-white
                 active:scale-95"
            >
              立即咨询
            </a>
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
          <div className="bg-white rounded-full px-4 md:px-6 py-1 md:py-2 opacity-90 hover:opacity-100 transition">
            <a
              href="/zh/lead-program/university"
              className="text-sm sm:text-base
               text-transparent bg-clip-text bg-ulead-gradient"
            >
              美国大学领航计划
            </a>
          </div>

          {/* Right button - white background, gradient text */}
          <div className="bg-white rounded-full px-4 md:px-6 py-1 md:py-2 opacity-60 hover:opacity-90 transition">
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
