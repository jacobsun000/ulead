import Image from 'next/image'

const FooterColumn = ({ title, items, additionalContent, mobileDisplay = false }) => (
  <div className={`${mobileDisplay ? 'flex' : 'hidden lg:flex'} flex-col`}>
    <h3 className="text-white text-sm md:text-lg font-semibold mb-4">{title}</h3>
    {items.map((item, index) => (
      <a key={index} href="#" className="text-white text-xs md:text-sm mb-2 hover:underline">
        {item}
      </a>
    ))}
    {additionalContent && (
      <div className="mt-4">
        {additionalContent}
      </div>
    )}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10 px-8 md:px-[8vw]">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col items-center">
          <div className="relative md:w-32 md:h-16 w-24 h-12 p-2">
            <Image src="/img/logo.png" alt="ULEAD" fill className="object-contain" />
          </div>

          <div className="flex w-20 h-20 mt-5">
            <Image src="/img/footer/qr.jpg" alt="WeChat QR Code" width={130} height={130} />
          </div>
        </div>

        <FooterColumn
          mobileDisplay
          title="Contact us"
          items={[
            'Tel: +86-10-53350508',
            'E-mail: program@ulead-edu.com'
          ]}
          additionalContent={
            <div>
              <h3 className="text-white font-semibold text-sm mb-2">Our Address</h3>
              <p className="text-sm">Location: Beijing, Chao Yang</p>
              <p className="text-sm">New York, Guangzhou</p>
            </div>
          }
        />

        <FooterColumn
          title="Team"
          items={[
            'Consultant',
            'Professional',
            'Planning',
            'Interviews'
          ]}
          additionalContent={
            <div>
              <h3 className="text-white font-semibold mb-2">Feedback</h3>
              <a href="#" className="text-sm hover:underline">Testimonials</a>
            </div>
          }
        />

        <FooterColumn
          title="Highschool"
          items={[
            'Planning Services',
            'Successful Cases',
            'Offers'
          ]}
        />

        <FooterColumn
          title="University"
          items={[
            'Exclusive Advantages',
            'Specialty',
            'Summer School',
            'Process'
          ]}
        />
      </div>

      <div className="text-center text-[8px] mt-8">
        版权所有：北京合领教育咨询有限公司 www.ulead-edu.com (京ICP备19029988号-1)
      </div>
    </footer>
  );
};
