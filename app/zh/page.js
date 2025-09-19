import Image from "next/image";
import clsx from "clsx";
import { sql } from '@vercel/postgres';
import { ArrowRight } from 'lucide-react'

import DecorativeShapes from "@/ui/zh/DecorativeShapes";
import OfferReport from "@/ui/zh/OfferReport";
import { AlumniCard } from '@/ui/zh/AlumniCard'
import { SwipeableCarousel } from '@/ui/zh/SwipeableCarousel'
import Panel from "@/ui/zh/Panel";
import Panes from '@/ui/zh/Panes'
import IASBadge from "@/ui/en/IASBadge";
import MentorCard from "@/ui/zh/MentorCard";

export default function ChineseHomePage() {
  return (
    <main className="">
      <HeroSection />
      <AboutSection />
      <MatriculationSection />
      <TeamSection />
      <AlumniShowcaseSection />
      <LeadProgramSection />
      <ResearchSection />
      <QualificationsSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden",
        "bg-ulead-gradient text-white",
        "px-4 lg:px-16 xl:px-20 min-h-[180px] md:min-h-[420px]",
      )}
    >
      {/* Decorative bubbles */}
      <DecorativeShapes />

      {/* Content container */}
      <div className="relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="flex flex-row items-end justify-between lg:gap-6 min-h-[180px] md:min-h-[480px]">
          {/* Copy block */}
          <div className="h-full min-h-[180px] md:min-h-[480px] w-7/12 flex items-center">
            <div className="text-left">
              <h1 className="text-xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                高端申请规划服务
              </h1>
              <p className="mt-4 text-xs sm:text-lg md:text-2xl/relaxed text-white/90 font-bold">
                家庭的教育管家，孩子的成长导师
              </p>

              <div className="mt-4 md:mt-6 flex justify-start">
                <a
                  href="/zh/contacts"
                  className="px-4 md:px-8 py-1 md:py-3 rounded-full shadow-lg
                 bg-white hover:bg-white/90 transition-colors border-2 border-transparent
                 active:scale-95"
                >
                  <span className="bg-ulead-gradient bg-clip-text text-transparent text-sm md:text-xl font-semibold">
                    现在沟通
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Photo block */}
          <div className="w-5/12 flex justify-end self-end">
            <div className="relative h-full max-w-[100rem]">
              <Image
                src="/img/zh/home/woman.png"
                alt=""
                width={4096}
                height={2731}
                priority
                className="object-contain h-auto w-full drop-shadow-xl select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="w-full px-4 md:py-12 py-6 flex items-center bg-white flex-col">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 mt-4 md:mb-16 md:mt-8">
        合领教育
      </h1>
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center lg:items-start">
        {/* Image with overlay play icon */}
        <div className="relative">
          {/* Gradient background */}
          <div className="absolute top-4 left-4 w-full h-full bg-ulead-gradient rounded-2xl" />

          {/* Image container */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg z-10">
            <Image
              src="/img/zh/home/manThinking.png"
              alt="Student learning"
              width={1470}
              height={980}
              className="w-full max-w-md object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                <Image
                  src="/img/zh/home/playIcon.svg"
                  width={66}
                  height={67}
                  alt="Play"
                  className="w-12 h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text box */}
        <div className="flex h-full items-center">
          <div className="bg-[#0796E5] text-white p-6 rounded-xl mt-8 lg:mt-0 lg:ml-[-80px] max-w-xl shadow-lg relative z-10">
            <p className="leading-relaxed text-base md:text-lg">
              合领教育为来自中国大陆、新加坡、韩国和日本的高端家庭提供高水平、个性化的学术咨询与辅导服务。公司致力于每一位学生的个性化成长；顾问不只是学生的学术导师和人生导师，还与学生家庭密切合作，建立亲密而信任的关系。
            </p>
            <div className="mt-6 w-full flex justify-end">
              <a href="#team" className="rounded-full px-6 py-2 bg-white text-black hover:bg-gray-100">关于我们</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function MatriculationSection() {
  const { rows: university } = await sql`SELECT * FROM university LIMIT 12`;
  const { rows: highSchool } = await sql`SELECT * FROM high_school LIMIT 12`;
  const { rows: juniorSchool } = await sql`SELECT * FROM other_school LIMIT 12`;
  const panels = [
    {
      title: "美国大学录取",
      content: <OfferReport schools={university} href="/zh/university" />,
    },
    {
      title: "美国高中录取",
      content: <OfferReport schools={highSchool} href="/zh/highschool" />,
    },
    {
      title: "其他",
      content: <OfferReport schools={juniorSchool} />,
    },

  ]
  return (
    <section id="matriculation" className="px-8 pb-16 md:px-[8vw] flex flex-col items-center bg-ulead-gradient">
      <h1 className="text-xl md:text-3xl font-bold text-white py-8">录取报告</h1>
      <Panel elements={panels} />
    </section>
  );
}

function TeamMemberCard({ name_zh, image_url, title_zh, description_zh }) {
  return (
    <div className="text-center max-w-xs mx-auto">
      <div className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden">
        <Image
          src={image_url}
          alt={name_zh}
          width={112}
          height={112}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mt-4 md:text-lg">{name_zh}</p>
      <p className="text-xs md:text-sm text-gray-600">{title_zh}</p>
      <div className="mt-2 text-[0.5rem] md:text-xs text-gray-700 leading-relaxed">
        {(description_zh || []).join("\n")}
      </div>
    </div>
  )
}

async function TeamSection() {
  const { rows: members } = await sql`SELECT * FROM team_members ORDER BY order_index ASC;`;
  const { rows: mentors } = await sql`SELECT * FROM mentor LIMIT 6`;
  const panes = [
    {
      title: '核心团队',
      content: (
        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-8 gap-2">
          {members.map((member) => (<TeamMemberCard key={member.id} {...member} />))}
        </div>
      ),
    },
    {
      title: '资深顾问',
      content: (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} hide_description />
          ))}
        </div>
      ),
    },
  ]

  return (
    <div id="team" className="px-8 py-16 md:px-[8vw] relative overflow-hidden">
      <div className="absolute -left-5 w-16 h-16 md:w-36 md:h-36 bg-ulead-gradient rounded-full z-0" />
      <div className="absolute -bottom-10 -right-10 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-br from-[#6E4AC8] to-[#0796E5] rounded-full z-0" />
      <h1 className="relative text-center text-3xl font-bold pb-10 z-10">我们的团队</h1>
      <div className="relative text-center text-xl pb-10 z-10">合领教育与其他教育公司不同之处在于，我们同样重视学生的成长与申请结果。ULead 致力于通过提供心理支持、学术辅导和整体规划，引导学生走向终身成功。</div>
      <Panes panes={panes} />
    </div>
  )
}

async function AlumniShowcaseSection() {
  const { rows: alumnies } = await sql`SELECT * FROM alumni_zh`;

  return (
    <section id="alumni" className="w-full py-16 md:mt-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        {/* Vertical Title */}
        <div className="text-3xl md:text-[5rem] text-center lg:w-1/4 w-full mb-8 lg:mb-0 lg:ml-8 font-extrabold leading-tight text-transparent bg-clip-text bg-ulead-gradient">
          <div className="lg:block inline-block lg:mr-0 mr-2">合</div>
          <div className="lg:block inline-block lg:mr-0 mr-2">领</div>
          <div className="lg:block inline-block lg:mr-0 mr-2">校</div>
          <div className="lg:block inline-block lg:mr-0 mr-2">友</div>
          <div className="lg:block inline-block">会</div>
        </div>

        {/* Swipeable Cards container */}
        <div className="lg:w-3/4 w-full px-4">
          <SwipeableCarousel>
            {alumnies.map((alumnus, idx) => (
              <AlumniCard key={idx} {...alumnus} />
            ))}
          </SwipeableCarousel>
        </div>
      </div>
    </section>
  )
}

function LeadProgramSection() {
  const programs = [
    {
      title: "FYP 项目",
      description:
        "学习如何构建一个有力的研究课题。草拟可能的研究主题，并讨论下一步（无论是我们的研究项目、论文竞赛，还是会议提交）。",
    },
    {
      title: "RA–ORIGINAL RESEARCH 项目",
      description:
        "设计并进行学生自己的研究项目，最终实现同行评审的发表。面向所有高中生和大学生开放，但由于名额有限，竞争非常激烈。",
    },
    {
      title: "INTRO–LIT项目",
      description:
        "通过全面的文献综述项目，发展批判性思维和写作技能。为学生的研究结果做学术展示。",
    },
    {
      title: "RA–EXISTING DATA项目",
      description:
        "分析现有数据集，并为正在进行的研究做出贡献,最终实现同行评审的发表。培养数据分析技能，并为现实世界的研究出版物做出贡献。",
    },
    {
      title: "INTRO–MED 项目",
      description:
        "增强学生申请医学院、药学院或护理项目的竞争力。在模拟病房大会上展示学生的研究成果。",
    },
  ];
  const items = [
    {
      title: "规划整体解决方案",
      subtitle: "学术 / 艺术 / 体育 / 公益 / 领导力",
      icon: "/img/zh/home/plan.svg",
    },
    {
      title: "暑假机会拓展",
      subtitle: "兴趣领域深耕 / 学术领域拓展",
      icon: "/img/zh/home/summer.svg",
    },
    {
      title: "英文伴读计划",
      subtitle: "压力写作能力提升 / storytelling",
      icon: "/img/zh/home/book.svg",
    },
    {
      title: "SSAT / 托福学习计划 / 节点及资源",
      subtitle: "",
      icon: "/img/zh/home/ssat.svg",
    },
    {
      title: "藤校青年导师指导",
      subtitle: "构建内在动力",
      icon: "/img/zh/home/mentor.svg",
    },
    {
      title: "校园调研 / 访问 / 体系选择指导",
      subtitle: "",
      icon: "/img/zh/home/visit.svg",
    },
    {
      title: "学术竞赛及申请作品规划",
      subtitle: "简历提升",
      icon: "/img/zh/home/trophy.svg",
    },
    {
      title: "校内 GPA 提升 / 方案 / 资源",
      subtitle: "",
      icon: "/img/zh/home/gpa.svg",
    },
  ];

  const elements = [
    {
      title: "美国大学",
      content: <div className="flex items-center flex-col w-full">
        <div className="text-center text-xl pb-10 max-w-5xl"> ULEAD高质量科研论文出版项目，旨在为学生提供高质量科研训练及专业科研论文支持，提升学生科研竞争力，获得在国际学术期刊上的发表机会。
        </div>
        <div className="flex flex-col md:flex-row gap-16 items-center justify-center w-full">
          {/* Image */}
          <div className="relative w-full md:w-1/3 aspect-[3/4] rounded-xl">
            <Image
              src="/img/zh/home/leadProgram.png"
              alt="research writing"
              fill
              className="object-cover z-20 rounded-xl"
            />
            <div className="absolute left-8 top-8 w-full h-full rounded-xl bg-ulead-gradient z-10" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {programs.map((item, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <ArrowRight className="text-[#0796E5] min-w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <a href="/zh/university" className="bg-ulead-gradient text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition">查看更多</a>
      </div>
    },
    {
      title: "美国高中",
      content: <div className="flex items-center flex-col w-full">
        <div className="text-center text-xl pb-10 max-w-5xl">
          专注孩子本身，由成长顾问导师引领孩子和家长进行个性化的成长和申请规划，让孩子有足够的时间有效地提升自己的背景和能力
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            // Check if it's in left column (even index) or right column (odd index)
            const isLeftCol = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between px-6 py-4 rounded-full bg-ulead-gradient text-white ${isLeftCol ? "flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 relative shrink-0 p-2 bg-white rounded-full">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                  />
                </div>

                {/* Text */}
                <div className={`mx-4 w-full text-left ${isLeftCol ? "" : "md:text-right"}`}>
                  <h3 className="font-semibold text-sm md:text-base">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs md:text-sm opacity-90">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <a href="/zh/highschool" className="bg-ulead-gradient text-white font-semibold mt-8 px-10 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition">查看更多</a>
      </div>
    }
  ];

  return (
    <section id="lead-program" className="px-8 md:py-16 pb-8 md:px-[8vw]">
      <h1 className="text-center text-3xl font-bold pb-10">领航计划</h1>
      <Panel elements={elements} variant="black" />
    </section>
  )
}

function ResearchSection() {
  const programs = [
    {
      title: "加州大学圣巴巴拉分校 暑研项目",
      date: "7.6 – 7.26",
      description: "面向研究兴趣：侧重于科研与学习工程方向",
    },
    {
      title: "哥伦比亚大学巴纳德学院 暑研项目",
      date: "7.20 – 8.9（面授）",
      description: "多科研研究课题：社会科学、艺术和理工科类等",
    },
    {
      title: "北卡罗来纳州 数学夏令营",
      date: "7.6 – 7.20 / 7.19 – 8.2（面授）",
      description: "侧重于数学竞赛方向",
    },
  ];
  return (
    <section id="summer-school" className="relative overflow-hidden py-20 px-6 md:px-[8vw]">
      {/* Decorative Eclipse Background */}
      <Image
        src="/img/zh/home/research.svg"
        alt="Decorative background"
        fill
        className="object-cover pointer-events-none -translate-y-1/2 z-0"
      />
      {/* Foreground Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">科研夏校项目</h2>

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Left Panel */}
          <div className="bg-white text-black rounded-2xl p-6 md:p-8 shadow-lg w-full lg:w-2/3">
            <h3 className="text-xl font-bold mb-4">12周科研研究项目</h3>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              <li>为期12周的纯在线研究；</li>
              <li>经面试和背景选拔后参与；</li>
              <li>由常春藤联盟、牛津大学和剑桥大学的教师授课；</li>
              <li>
                学员将完成大学级别学术报告，并获得由美国教育考试服务中心（ETS，托福考试主办方）联合颁发的项目证书和成绩单；
              </li>
              <li>
                加入由3–6名学生组成的小班，由特定学术领域（如生物、工程、商科、心理学等）的教授亲自授课。学生将自选定研究课题，在教授的个性化指导下开展独立研究，并最终提交一篇学术文章。
              </li>
              <li>
                课程设置包含教授直播授课、系列自学视频、指定阅读材料以及丰富多样的辅助资源，全面帮助学生掌握科研方法，完成大学级别的研究项目/论文；
              </li>
              <li>学术研究能力认证项目由英美顶尖大学教授精心设计。</li>
            </ul>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4 w-full lg:w-[30%]">
            {programs.map((p, i) => (
              <div
                key={i}
                className="bg-white text-black rounded-xl px-4 py-3 shadow-md"
              >
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600 mb-1">{p.date}</div>
                <div className="text-sm text-gray-700">{p.description}</div>
              </div>
            ))}

            <a className="mt-4 text-center cursor-poointer w-full bg-gradient-to-r from-[#6E4AC8] to-[#0796E5] text-white text-sm font-semibold py-2.5 rounded-full hover:opacity-90 transition" href="/zh/contacts">
              了解更多
            </a>
          </div>
        </div>
      </div>
    </section>);
}

function QualificationsSection() {
  const qualifications = [
    "/img/home/qualification1.png",
    "/img/home/qualification2.png",
    "/img/home/qualification3.png",
    "/img/home/qualification4.png",
  ]
  return (
    <section id="qualifications" className="mx-16 md:mx-[8vw] pb-16 flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center mb-8">资质证明</h1>
      <div className="flex items-center  gap-x-2 md:gap-x-20">
        {qualifications.map((qualification, index) => (
          <div key={index} className="w-1/5">
            <Image src={qualification} alt={`qualification-${index}`} width={200} height={200} />
          </div>
        ))}
        <div className="w-1/5">
          <IASBadge className="w-[200px] h-[200px]" certNum={'6036'} />
        </ div>
      </ div>
    </section>
  )
}
