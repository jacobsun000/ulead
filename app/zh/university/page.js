import { sql } from '@vercel/postgres';
import Image from 'next/image'

import OfferReport from "@/ui/zh/OfferReport";

export default async function University() {
  const { rows: university } = await sql`SELECT * FROM university`;

  return (
    <div className="min-w-full">
      <Image src="/img/zh/university/head.svg" alt="" width={1920} height={1080} className="w-full h-full" />
      <div className="px-16 md:px-[8vw] py-16 bg-ulead-gradient">
        <h1 className="text-4xl text-white text-center font-bold mb-16">大学录取榜单</h1>
        <OfferReport schools={university} expand />
      </div>
    </div>
  );
}
