import { sql } from "@vercel/postgres";
import DecorativeShapes from "@/ui/zh/DecorativeShapes";
import { NewsList } from "@/ui/zh/NewsList";
import clsx from "clsx";

export default async function NewsPage() {
  const { rows } = await sql`
    SELECT
      id,
      title,
      author,
      badges,
      excerpt,
      published_at,
      image_url,
      external_url,
      is_top
    FROM news
    WHERE is_published = TRUE
    ORDER BY is_top DESC, published_at DESC, id DESC;
  `;

  const items = rows
    .map(transformNewsRow)
    .filter((item) => item !== null);

  return (
    <main className="w-full flex flex-col items-center">
      <HeroSection />
      <section className="mx-4 content-center max-w-6xl my-10">
        <NewsList items={items} />
        <div className="mt-10 flex justify-center">
          <a
            href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3MDE1NTUyMQ==&scene=117#wechat_redirect"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-ulead-gradient px-8 py-2 text-white text-sm md:text-base hover:opacity-90 transition-opacity"
          >
            更多内容
          </a>
        </div>
      </section>
    </main>
  );
}

function transformNewsRow(row) {
  const href = row.external_url;
  const imageSrc = row.image_url;

  if (!href || !imageSrc) {
    return null;
  }

  const id = row.id;
  if (!id) {
    return null;
  }

  const badgeItems = normalizeBadges(row.badges);

  return {
    id: String(id),
    title: row.title,
    authorLabel: row.is_top ? "作者精选" : undefined,
    author: row.author || undefined,
    badges: badgeItems,
    date: formatZhDate(row.published_at),
    excerpt: row.excerpt,
    href,
    image: {
      src: imageSrc,
      alt: row.title || "新闻封面",
    },
  };
}

function normalizeBadges(raw) {
  if (!raw) {
    return [];
  }
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((badge) => (badge ?? "").toString().trim())
    .filter(Boolean)
    .map((label) => ({
      label,
      variant: "outline",
    }));
}

function formatZhDate(dateLike) {
  if (!dateLike) {
    return "";
  }
  const date = dateLike instanceof Date ? dateLike : new Date(dateLike);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function HeroSection() {
  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden",
        "bg-ulead-gradient text-white",
        "px-4 lg:px-16 xl:px-20 min-h-[280px] md:min-h-[420px]"
      )}
    >
      {/* Put shapes in a lower layer */}
      <DecorativeShapes className="z-0" />

      {/* Lift content above shapes */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 min-h-[280px] md:min-h-[480px]">
          <div className="w-full h-full min-h-[280px] md:min-h-[480px] lg:w-7/12 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-center">
              合领资讯
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
