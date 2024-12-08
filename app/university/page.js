import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";
import Quote from "@/ui/Quote";
import OfferReport from "@/ui/OfferReport";
import { university } from "@/data/admission";

const Card = ({ title }) => (
  <h3 className={`text-sm mb-2 text-white p-2 rounded-xl text-center ${title.includes('Canadian') ? 'bg-primary' : 'bg-secondary'}`}>{title}</h3>
);

const ServiceItem = ({ title, description, isOpen, isRed, icon }) => {
  return (
    <details className="border-b py-4" open={isOpen}>
      <summary className="flex justify-between items-center list-none">
        <div className="w-1/12 md:w-8 h-8">
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <span className="w-10/12 font-semibold text-center md:text-left">{title}</span>
        <span className={`text-sm md:text-2xl ${isRed ? 'text-primary' : 'text-secondary'}`}>
          {/* {isOpen ? '-' : '+'} */}
        </span>
      </summary>
      {/* <p className="mt-2 text-gray-600">{description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque diam lectus, sit amet congue ante mollis eget.'}</p> */}
    </details>
  );
};

export default function Partners() {
  const services = [
    { title: "Candidacy Development", icon: "img/university/1.svg", isOpen: false, isRed: false },
    { title: "GPA Management Plan", icon: "img/university/2.svg", isOpen: false, isRed: false },
    { title: "Competition and Independent Research Project Planning", icon: "img/university/3.svg", isOpen: false, isRed: false },
    { title: "Domestic and Overseas Activity Resources Planning", icon: "img/university/4.svg", isOpen: false, isRed: false },
    { title: "School Selection Guidance", icon: "img/university/5.svg", isOpen: false, isRed: false },
    { title: "Summer School Selection and Application", icon: "img/university/6.svg", isOpen: false, isRed: false },
    { title: "Application Progress Management", icon: "img/university/7.svg", isOpen: false, isRed: false },
    { title: "Ivy League Academic and Major Selection Guidance", icon: "img/university/8.svg", isOpen: false, isRed: false },
    { title: "Application System Management Guidance", icon: "img/university/9.svg", isOpen: false, isRed: false },
    { title: "9th-12th Grade Planning Guidance", icon: "img/university/10.svg", isOpen: false, isRed: false },
    { title: "Document Review by Admissions Officers", icon: "img/university/11.svg", isOpen: false, isRed: false },
    { title: "Student CV Optimization Guidance", icon: "img/university/12.svg", isOpen: false, isRed: false },
  ];

  return (
    <div>
      <div className="relative h-52 md:h-96">
        <Image
          src="/img/university/header.jpg"
          alt="Graduation"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-8">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-8 md:ml-10">
            University Application<br />Consultation
          </h1>
          <Button href="/contacts" text="Free Consultation" style={"text-white px-11 py-2 rounded-full bg-secondary md:text-2xl md:ml-10"} />
        </div>
      </div>

      <div className="my-4" >
        <Quote text="From early-age potential development to private school/university applications, ULead can help your child continue to grow and progress." />
      </div>

      <div className="max-w-6xl mx-auto pt:10 md:py-12 px-4">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 mb-8 md:mb-20">
          <Card title="U.S. University Application" />
          <Card title="Canadian University Application" />
          <Card title="U.K. University Application" />
        </div>
      </div>

      <SectionHeader title="Personalized Services" style='my-4' />
      <div className="max-w-6xl mx-8 md:mx-auto py-4 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              icon={service.icon}
              isOpen={service.isOpen}
              isRed={service.isRed}
            />
          ))}
        </div>
        <div className="text-center">
          <Button text="More Details" href="/contacts" />
        </div>
      </div>

      <SectionHeader title="Matriculation" style='my-4 mt-12' />

      <div className="max-w-6xl mx-8 md:mx-auto py-4 md:py-12 px-4">
        <OfferReport schools={university} expand={true} />
      </div>

      <BackButton />
    </div>
  );
}
