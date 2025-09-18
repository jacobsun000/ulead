import DecorativeShapes from "@/ui/zh/DecorativeShapes";
import { NewsList } from "@/ui/zh/NewsList";
import clsx from "clsx";

const NEWS = [
  {
    id: "1",
    title:
      "迈向哥伦比亚大学与朱莉亚音乐学院：从 Top 30 美高到学术与艺术的双重巅峰",
    authorLabel: "作者精选",
    badges: [
      { label: "合领教育王晓丹", variant: "secondary" },
      { label: "IECA认证专业顾问", variant: "outline" },
    ],
    date: "2025年7月25日",
    excerpt:
      "在合领晓丹老师团队的陪伴下，这位就读于美国 Top 30 寄宿高中的女生成功收获了哥伦比亚大学与朱莉亚音乐学院的录取，成为我们今年最令人骄傲的综合型文理+艺术型申请案例之一。",
    href: "/news/columbia-juilliard",
    image: {
      src: "/img/news/n1.png",
      alt: "Columbia University campus statue",
    },
  },
  {
    id: "2",
    authorLabel: "作者精选",
    title: "晓丹老师2025英高录取成果",
    badges: [
      { label: "合领教育王晓丹", variant: "secondary" },
      { label: "IECA认证专业顾问", variant: "outline" },
    ],
    date: "2025年3月11日",
    excerpt:
      "同学们、伙伴们，你们经受了勇气与拼搏，才迎来今天的成长与收获。每位家长用心陪伴，合领陪伴学生的选校规划、面试与申请，见证一学年的努力与跨越。",
    href: "/news/kse-2025-admits",
    image: {
      src: "/img/news/n2.png",
      alt: "恭喜插画（Congrats）",
    },
  },
  {
    id: "3",
    title:
      "合领 × ETS veriii assessment 正式上线——破除学术成果认证难题，开启全球科研能力展示新通道",
    badges: [
      { label: "合领教育王晓丹", variant: "secondary" },
      { label: "IECA认证专业顾问", variant: "outline" },
    ],
    date: "2025年8月15日",
    excerpt:
      "由 KSE Global 联合 ETS（美国教育考试服务中心）共同开发的 veriii assessment 科研能力评估平台今日正式上线，帮助学生以标准化方式展示研究能力与产出。",
    href: "/news/veriii-assessment-launch",
    image: {
      src: "/img/news/n3.png",
      alt: "veriii assessment 发布",
    },
  },
  {
    id: "4",
    title:
      "合领教育 × Duke｜独家科研计划 与顶尖教授接洽并肩科研写作并期刊发表",
    badges: [
      { label: "合领教育王晓丹", variant: "secondary" },
      { label: "IECA认证专业顾问", variant: "outline" },
    ],
    date: "2025年8月15日",
    excerpt:
      "面向对科研写作有强烈兴趣的同学开放；与导师一对一打磨课题、完成研究设计与数据分析，并在导师指导下冲刺期刊发表，获得 RA 实战体验。",
    href: "/news/duke-research-program-2025",
    image: {
      src: "/img/news/n4.png",
      alt: "Duke 研究合作海报",
    },
  },
];

export default function LeadProgramPage() {
  return (
    <main className="w-full flex flex-col items-center">
      <HeroSection />
      <section className="mx-4 content-center max-w-6xl my-10">
        <NewsList items={NEWS} />
      </section>
    </main>
  );
}


function HeroSection() {
  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden",
        "bg-ulead-gradient text-white",
        "px-4 lg:px-16 xl:px-20 min-h-[420px]"
      )}
    >
      {/* Put shapes in a lower layer */}
      <DecorativeShapes className="z-0" />

      {/* Lift content above shapes */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 min-h-[480px]">
          <div className="w-full h-full min-h-[480px] lg:w-7/12 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-center">
              合领资讯
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
