import { sql } from '@vercel/postgres';
import Image from 'next/image'

import { AlumniCard } from '@/ui/zh/AlumniCard'
import { SwipeableCarousel } from '@/ui/zh/SwipeableCarousel'
import OfferReport from "@/ui/zh/OfferReport";
import { SchoolCards } from '@/ui/zh/SchoolCard';

export default async function University() {
  const { rows: university } = await sql`SELECT * FROM offer WHERE type='university'`;
  const { rows: schools } = await sql`SELECT * FROM summer_school WHERE type = 'university' LIMIT 12`;

  return (
    <div className="min-w-full">
      <div className="relative">
        <Image src="/img/zh/university/head.svg" alt="" width={1920} height={1080} className="w-full h-full object-contain" />
        <a
          href="/zh/contacts"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 px-4 md:px-8 py-1 md:py-3 rounded-full shadow-lg
                 bg-white hover:bg-white/90 transition-colors border-2 border-transparent
                 active:scale-95"
        >
          <span className="bg-ulead-gradient bg-clip-text text-transparent text-sm md:text-2xl font-semibold">
            咨询申请
          </span>
        </a>
      </div>

      <div className="w-full flex justify-center mt-8">
        <Image src="/img/zh/university/services.svg" alt="" width={1920} height={1080} className="w-full max-w-7xl hidden md:block" />
        <Image src="/img/zh/university/services_mobile.svg" alt="" width={1920} height={1080} className="w-full px-4 md:hidden" />
      </div>

      <div id="matriculation" className="px-8 md:px-[8vw] mt-8 md:mt-0 md:py-16 py-8 bg-ulead-gradient">
        <h1 className="text-2xl md:text-4xl text-white text-center font-bold mb-16">大学录取榜单</h1>
        <OfferReport schools={university} expand />
      </div>

      <div id="admission" className="px-8 md:px-[8vw] md:py-16 py-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl text-center font-bold mb-16">大学夏校项目</h1>
        <SchoolCards schools={schools} />
        <a
          href="/zh/summer-school/university"
          className="px-16 py-2 mt-4 md:mt-16 rounded-full bg-ulead-gradient
                 bg-white hover:shadow-lg transition-shadow text-white
                 active:scale-95"
        >
          更多项目
        </a>
      </div>

      <AlumniShowcaseSection />
    </div>
  );
}

async function AlumniShowcaseSection() {
  const { rows: alumnies } = await sql`SELECT * FROM alumni`;

  return (
    <section id="success-stories" className="w-full py-16 md:mt-16 overflow-hidden">
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
