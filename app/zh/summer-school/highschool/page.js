import DecorativeShapes from '@/ui/zh/DecorativeShapes';
import { CategoryTabs } from '@/ui/zh/CategoryTabs';
import { sql } from '@vercel/postgres';


export default async function Highschool() {
  const { rows: schools } = await sql`SELECT * FROM summer_school WHERE type = 'highschool'`;

  return (
    <div className="min-w-full flex flex-col items-center mb-16">
      <section className="relative isolate w-full overflow-hidden bg-ulead-gradient text-white px-4 lg:px-16 xl:px-20 min-h-[420px] flex items-center justify-center" >
        {/* Decorative bubbles */}
        <DecorativeShapes />

        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold leading-tight tracking-tight z-50">
          夏校项目
        </h1>
      </section>
      <div className="flex bg-white rounded-full p-1 shadow-md w-fit mt-16">
        <a
          href="/zh/summer-school/university"
          className="px-12 py-2 rounded-full text-sm font-semibold text-blue-400"
        >
          美国大学夏校
        </a>
        <a
          href="/zh/summer-school/highschool"
          className="px-12 py-2 rounded-full text-sm font-semibold text-white bg-ulead-gradient"
        >
          美国高中夏校
        </a>
      </div>
      <CategoryTabs schools={schools} />
    </div>
  );
}
