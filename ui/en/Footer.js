import Image from 'next/image'

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
    <footer className="bg-secondary text-white py-10 px-8 md:px-[8vw]">
      <div className="flex flex-wrap justify-between mb-8">
        <div className="flex flex-col items-center">
          <div className="relative md:w-32 md:h-16 w-24 h-12 p-2">
            <Image src="/img/logo.png" alt="Ulead" fill className="object-contain" />
          </div>

          <div className="flex w-20 h-20 mt-5">
            <Image src="/img/footer/qr.jpg" alt="WeChat QR Code" width={130} height={130} />
          </div>
        </div>

        <div>
          <FooterItem
            title="Contact Us"
            href="/contacts"
            sections={[
              { title: "Tel: +86-10-53350508", href: "" },
              { title: "E-Mail: program@ulead-edu.com", href: "" },
            ]} />
          <FooterItem
            title="Our Address"
            href="/contacts#our-offices"
            sections={[
              { title: "Location: Beijing, Chao Yang", href: "" },
              { title: "New York, Guangzhou", href: "" },
            ]} />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            className="hidden lg:block"
            title="Home"
            href="/"
            sections={[
              { title: "Our Mission" },
              { title: "Our Services" },
              { title: "Matriculation" },
              { title: "Our Team" },
              { title: "Success Stories" },
              { title: "Ulead Alumni" },
              { title: "Qualifications" },
            ]}
          />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            title="About Us"
            href="/about-us"
            sections={[
              { title: "Founder" },
              { title: "Core Team" }
            ]} />
          <FooterItem
            title="Lead Program"
            href="/lead-program"
            sections={[
              { title: "Skills Development" },
              { title: "Lead Program Services" },
              { title: "8 Core Competences" },
              { title: "Abilities Training" },
            ]} />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            title="High School"
            href="/highschool"
            sections={[
              { title: "Personalized Services" },
              { title: "Application Service Process", href: "#high-school-application-service-process" },
              { title: "Matriculation" },
            ]} />

          <FooterItem
            title="University"
            href="/university"
            sections={[
              { title: "Personalized Services" },
              { title: "Matriculation" },
            ]} />
        </div>

        <div className="hidden lg:block">
          <FooterItem
            title="Schools"
            href="/schools"
            sections={[
              { title: "Our Target School" },
              { title: "How Ulead works with schools?" },
              { title: "Past Events and Admissions" },
            ]} />
          <FooterItem
            title="Chinese Website"
            href="/zh"
            sections={[
            ]} />
        </div>


      </div>

      <div className="text-center text-[8px] mt-8">
        版权所有：北京合领教育咨询有限公司 www.ulead-edu.com (京ICP备19029988号-1)
      </div>
    </footer>
  );
};
