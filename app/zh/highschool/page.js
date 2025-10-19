import { sql } from '@vercel/postgres';
import Image from 'next/image'

import { AlumniCardHs } from '@/ui/zh/AlumniCard'
import { SwipeableCarousel } from '@/ui/zh/SwipeableCarousel'
import OfferReport from "@/ui/zh/OfferReport";
import { SchoolCards } from '@/ui/zh/SchoolCard';

export default async function University() {
  const { rows: highschool } = await sql`SELECT * FROM offer WHERE type='highschool'`;
  const { rows: schools } = await sql`SELECT * FROM summer_school WHERE type = 'highschool' LIMIT 12`;

  return (
    <div className="min-w-full">
      <div className="w-full bg-ulead-gradient py-8">
        <div className="w-full flex flex-row items-center contents-center justify-center gap-1 md:gap-8">
          <Image width={300} height={225} className="w-1/4 md:max-w-[300px]" alt="" src="/img/zh/highschool/photos/11.png"></Image>
          <Image width={348} height={261} className="w-1/3 md:max-w-[348px]" alt="" src="/img/zh/highschool/photos/12.png"></Image>
          <Image width={300} height={225} className="w-1/4 md:max-w-[300px]" alt="" src="/img/zh/highschool/photos/13.png"></Image>
        </div>
        <div className="w-full flex flex-row items-center contents-center justify-center gap-1 px-2 mt-2 md:gap-16">
          <Image width={256} height={178} className="w-1/4 md:max-w-[256px]" alt="" src="/img/zh/highschool/photos/21.png"></Image>
          <Image width={256} height={178} className="w-1/4 md:max-w-[256px]" alt="" src="/img/zh/highschool/photos/22.png"></Image>
          <Image width={256} height={178} className="w-1/4 md:max-w-[256px]" alt="" src="/img/zh/highschool/photos/23.png"></Image>
          <Image width={256} height={178} className="w-1/4 md:max-w-[256px]" alt="" src="/img/zh/highschool/photos/24.png"></Image>
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <Image src="/img/zh/university/services.svg" alt="" width={1920} height={1080} className="w-full max-w-7xl hidden md:block" />
        <Image src="/img/zh/university/services_mobile.svg" alt="" width={1920} height={1080} className="w-full px-4 md:hidden" />
      </div>
      <div id="matriculation" className="px-8 md:px-[8vw] mt-8 md:mt-0 md:py-16 py-8 bg-ulead-gradient">
        <h1 className="text-2xl md:text-4xl text-white text-center font-bold mb-16">高中录取榜单</h1>
        <OfferReport schools={highschool} expand />
      </div>
      <div id="admission" className="px-8 md:px-[8vw] md:py-16 py-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl text-center font-bold mb-16">高中夏校项目</h1>
        <SchoolCards schools={schools} />
        <a
          href="/zh/summer-school/highschool"
          className="px-16 py-2 mt-4 md:mt-16 rounded-full bg-ulead-gradient
                 bg-white hover:shadow-lg transition-shadow text-white
                 active:scale-95"
        >
          更多项目
        </a>
      </div>

      <div className="px-4 md:px-[8vw] md:py-16 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl text-center font-bold mb-16">招生官会面</h1>
        <Image src="/img/zh/highschool/admissions.png" alt="" width={800} height={400} className="md:w-2/3 h-auto" />
      </div>

      <AlumniShowcaseSection />
    </div>
  );
}


async function AlumniShowcaseSection() {
  const { rows: alumnies } = await sql`SELECT * FROM alumni_hs`;

  return (
    <section id="success-stories" className="w-full py-16 md:mt-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        {/* Vertical Title */}
        <div className="text-3xl md:text-[5rem] text-center lg:w-1/4 w-full lg:ml-8 font-extrabold leading-tight text-transparent bg-clip-text bg-ulead-gradient">
          <div className="lg:block inline-block lg:mr-0 mr-2">成</div>
          <div className="lg:block inline-block lg:mr-0 mr-2">功</div>
          <div className="lg:block inline-block lg:mr-0 mr-2">案</div>
          <div className="lg:block inline-block">例</div>
        </div>

        {/* Swipeable Cards container */}
        <div className="lg:w-3/4 w-full md:px-4">
          <SwipeableCarousel>
            {alumnies.map((alumnus, idx) => (
              <AlumniCardHs key={idx} {...alumnus} />
            ))}
          </SwipeableCarousel>
        </div>
      </div>
    </section>
  )
}
