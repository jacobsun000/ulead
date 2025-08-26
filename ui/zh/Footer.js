import Image from "next/image";
import BackButton from "@/ui/zh/Back";

function getLink(title, href) {
  if (href !== undefined) return href;
  return "#" + title.toLowerCase().replaceAll(" ", "-");
}

const FooterItem = ({ title, href, sections }) => (
  <div className="flex flex-col mb-4">
    <a href={href} className="text-white text-sm md:text-lg font-semibold mb-2 hover:underline">
      {title}
    </a>
    {sections.map((section, index) => (
      <a
        key={index}
        href={href + getLink(section.title, section.href)}
        className="text-white text-xs md:text-sm mb-2 hover:underline"
      >
        {section.title}
      </a>
    ))}
  </div>
);

export default function Footer() {
  return (
    <footer className="text-white pt-6 pb-10 px-8 md:px-[8vw]">
      <BackButton />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-3 flex md:block items-center md:items-start gap-6">
          <div className="relative w-64 h-20 md:w-32 md:h-16">
            <Image src="/img/footer/logo.svg" alt="ULEAD 合领教育" fill className="object-contain" />
          </div>

          <div className="flex md:block gap-4 md:gap-6 mt-4 md:mt-6">
            <Image
              src="/img/footer/qr.jpg"
              alt="关注微信号"
              width={110}
              height={110}
              className="rounded-sm"
            />
            <Image
              src="/img/footer/qrcode.png"
              alt="关注微信号"
              width={110}
              height={110}
              className="rounded-sm"
            />
          </div>
        </div>

        {/* 右侧：四组主导航（第一行） */}
        <div className="md:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterItem
            title="Contact us"
            href="/contacts"
            sections={[
              { title: "Tel:  +86–10–53350508", href: "" },
              { title: "E-mail:  program@ulead–edu.com", href: "" },
            ]}
          />

          <FooterItem
            title="Team"
            href="/about-us#team"
            sections={[
              { title: "Consultant" },
              { title: "Professional" },
              { title: "Planning" },
              { title: "Interviews" },
            ]}
          />

          <FooterItem
            title="Highschool"
            href="/highschool"
            sections={[
              { title: "Planning Services" },
              { title: "Successful Cases" },
              { title: "Offers" },
            ]}
          />

          <FooterItem
            title="University"
            href="/university"
            sections={[
              { title: "Exclusive Advantages" },
              { title: "Specialty" },
              { title: "Summer School" },
              { title: "Process" },
            ]}
          />

          {/* 第二行：Address + Feedback */}
          <FooterItem
            title="Our Address"
            href="/contacts#our-offices"
            sections={[
              { title: "Location： Beijing, Chao Yang", href: "" },
            ]}
          />
          <FooterItem
            title="Feedback"
            href="/testimonials"
            sections={[{ title: "Testimonials" }]}
          />
        </div>
      </div>

      {/* 版权信息（细字 & 半透明白） */}
      <div className="text-center text-[10px] mt-10 text-white/80">
        版权所有：北京合领教育咨询有限公司　www.ulead-edu.com　（京ICP备19029988号-1）
      </div>
    </footer>
  );
}
