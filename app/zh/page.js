import Image from "next/image";
import clsx from "clsx";
import { sql } from '@vercel/postgres';

import { Button } from "@/ui/Button";
import DecorativeShapes from "@/ui/zh/DecorativeShapes";
import OfferReport from "@/ui/zh/OfferReport";
import Panel from "@/ui/zh/Panel";

export default function ChineseHomePage() {
  return (
    <main className="">
      <HeroSection />
      <AboutSection />
      <MatriculationSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden",
        "bg-ulead-gradient text-white",
        "px-4 lg:px-16 xl:px-20 min-h-[420px]",
      )}
    >
      {/* Decorative bubbles */}
      <DecorativeShapes />

      {/* Content container */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-6 min-h-[480px]">
          {/* Copy block */}
          <div className="w-full h-full min-h-[480px] lg:w-7/12 flex items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                高端申请规划服务
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-2xl/relaxed text-white/90 font-bold">
                家庭的教育管家，孩子的成长导师
              </p>

              <div className="mt-6 flex justify-center lg:justify-start">
                <a
                  href="/zh/contact"
                  className="px-8 py-2 md:py-3 rounded-full shadow-lg
                 bg-white hover:bg-white/90 transition-colors border-2 border-transparent
                 active:scale-95"
                >
                  <span className="bg-ulead-gradient bg-clip-text text-transparent text-xl font-semibold">
                    现在沟通
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Photo block */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end self-end">
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
    <section className="w-full px-4 py-12 flex items-center bg-white flex-col">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 mt-8">
        合领教育
      </h1>
      <div className="relative max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-start">
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
      content: <OfferReport schools={university} href="/university" />,
    },
    {
      title: "美国高中录取",
      content: <OfferReport schools={highSchool} href="/highschool" />,
    },
    {
      title: "其他",
      content: <OfferReport schools={juniorSchool} />,
    },

  ]
  return (
    <section className="px-8 md:px-[8vw] flex flex-col items-center bg-ulead-gradient">
      <h1 className="text-3xl font-bold text-white py-8">录取报告</h1>
      <Panel elements={panels} />
    </section>
  );
}
