import { sql } from '@vercel/postgres';
import Image from 'next/image'

import OfferReport from "@/ui/zh/OfferReport";
import { SchoolCards } from '@/ui/zh/SchoolCard';

export default async function University() {
  const { rows: highschool } = await sql`SELECT * FROM high_school`;
  const { rows: schools } = await sql`SELECT * FROM summer_school WHERE type = 'highschool'`;

  return (
    <div className="min-w-full">
      <Image src="/img/zh/highschool/head.svg" alt="" width={1920} height={1080} className="w-full h-full hidden md:block" />
      <Image src="/img/zh/highschool/head_mobile.svg" alt="" width={1920} height={1080} className="w-full h-full block md:hidden" />
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

      <div id="success-stories" className="px-4 md:px-[8vw] py-16 flex flex-col items-center">
        <Image src="/img/zh/highschool/successStories.svg" alt="" width={800} height={400} className="h-auto" />
      </div>
    </div>
  );
}
