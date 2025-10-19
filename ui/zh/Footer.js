import Image from 'next/image'
import BackToTopButton from './Back';
import IASBadge from "@/ui/en/IASBadge";

function QualificationsSection() {
  const qualifications = [
    "/img/home/qualification1.png",
    "/img/home/qualification2.png",
    "/img/home/qualification3.png",
    "/img/home/qualification4.png",
  ]
  return (
    <section id="qualifications" className="mx-16 md:mx-[8vw] flex flex-col items-center">
      <h1 className="font-bold text-xl text-center mb-8">资质证明</h1>
      <div className="flex items-center justify-center  gap-x-2 md:gap-x-20">
        {qualifications.map((qualification, index) => (
          <div key={index} className="w-[12%]">
            <Image src={qualification} alt={`qualification-${index}`} width={200} height={200} />
          </div>
        ))}
        <div className="w-[6%]">
          <IASBadge className="w-[150px] h-[150px]" certNum={'6036'} />
        </ div>
      </ div>
    </section>
  )
}

function getLink(title, href) {
  if (href !== undefined) {
    return href;
  }
  return "#" + title.toLowerCase().replaceAll(" ", "-");
}

const FooterItem = ({ title, href, sections }) => (
  <div className='flex flex-col mb-4'>
    <a href={href} className="text-white text-sm md:text-lg font-semibold mb-2 hover:underline">
      {title}
    </a>
    {sections.map((section, index) => (
      <a key={index} href={href + getLink(section.title, section.href)} className="text-white text-xs md:text-sm mb-2 hover:underline">
        {section.title}
      </a>
    ))}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-ulead-gradient text-white py-10 px-8 md:px-[8vw]">
      <BackToTopButton />
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-center">
          <div
            className="md:w-32 md:h-16 w-24 h-12 bg-white"
            style={{
              WebkitMaskImage: "url(/img/logo.png)",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              maskImage: "url(/img/logo.png)",
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "center",
            }}
          />

          <div className="flex w-20 h-20 mt-5">
            <Image src="/img/footer/qr.jpg" alt="WeChat QR Code" width={130} height={130} />
          </div>
        </div>

        <div>
          <FooterItem
            title="联系我们"
            href="/zh/contacts"
            sections={[
              { title: "电话: +86-10-53350508", href: "" },
              { title: "邮件: program@ulead-edu.com", href: "" },
            ]} />
          <FooterItem
            title="我们的地址"
            href="/zh/contacts#our-offices"
            sections={[
              { title: "北京，朝阳区", href: "" },
              { title: "纽约，广州", href: "" },
            ]} />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            className="hidden lg:block"
            title="首页"
            href="/zh"
            sections={[
              { title: "关于我们", href: "#about" },
              { title: "录取报告", href: "#matriculation" },
              { title: "我们的团队", href: "#team" },
              { title: "合领校友会", href: "#alumni" },
              { title: "领航计划", href: "#lead-program" },
              { title: "科研夏校项目", href: "#summer-school" },
            ]}
          />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            title="美国大学"
            href="/zh/university"
            sections={[
              { title: "个性化申请服务", href: "#admission" },
              { title: "录取榜单", href: "#matriculation" },
              { title: "成功案例", href: "#success-stories" }
            ]} />
          <FooterItem
            title="领航计划"
            href="/zh/lead-program"
            sections={[
              { title: "高中领航计划", href: "/highschool#highschool" },
              { title: "大学领航计划", href: "/university#university" },
            ]} />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            title="美国高中"
            href="/zh/highschool"
            sections={[
              { title: "个性化申请服务", href: "#admission" },
              { title: "录取榜单", href: "#matriculation" },
              { title: "成功案例", href: "#success-stories" }
            ]} />

          <FooterItem
            title="夏校项目"
            href="/zh/summer-school"
            sections={[
              { title: "高中夏校项目", href: "/highschool#highschool" },
              { title: "大学夏校项目", href: "/university#university" },
            ]} />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            title="合领资讯"
            href="/zh/news"
            sections={[
              { title: "最新资讯" },
            ]} />
          <FooterItem
            title="英文网站"
            href="/"
            sections={[
            ]} />
        </div>


      </div>
      <div className="w-full border-b-2 my-4"></div>
      <QualificationsSection />
      <div className="text-center text-sm mt-8">
        版权所有：北京合领教育咨询有限公司 www.ulead-edu.com (京ICP备19029988号-1)
      </div>
    </footer>
  );
};
