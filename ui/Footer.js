import Image from 'next/image'

const FooterColumn = ({ title, items, additionalContent, mobileDisplay = false }) => (
  <div className={`${mobileDisplay ? 'flex' : 'hidden md:flex'} flex-col`}>
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    {items.map((item, index) => (
      <a key={index} href="#" className="text-white text-sm mb-2 hover:underline">
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
    <footer className="bg-secondary text-white py-10 px-16">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-primary text-xl md:text-5xl font-bold">U</span>
            <span className="text-white text-xl md:text-5xl font-bold">LEAD</span>
          </div>
          <span className="text-white text-xl md:text-5xl">合领教育</span>

          <div className="flex flex-col items-center mr-5 mt-5">
            <Image src="/img/footer/qrcode.png" alt="WeChat QR Code" width={130} height={130} />
          </div>

          <div className="flex flex-col items-center mr-5 mt-5">
            <Image src="/img/footer/qrcode.png" alt="WeChat QR Code" width={130} height={130} />
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
              <h3 className="text-white font-semibold mb-2">Our Address</h3>
              <p className="text-sm">Location: Beijing, Chao Yang</p>
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

      <div className="text-center text-sm mt-8">
        版权所有：北京合领教育咨询有限公司 www.ulead-edu.com (京ICP备19029988号-1)
      </div>
    </footer>
  );
};
