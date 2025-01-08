import { sql } from '@vercel/postgres';
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";
import Quote from "@/ui/Quote";
import OfferReport from "@/ui/OfferReport";

const Card = ({ title }) => (
  <div className="flex-1 mx-1">
    <h3 className={`text-xs lg:text-lg mb-2 text-white p-2 rounded-lg text-center place-content-center w-full h-full ${title.includes('Day') ? 'bg-primary' : 'bg-secondary'
      }`}>{title}</h3>
  </div>
);

const ServiceItem = ({ title, description, isOpen, isRed, icon }) => {
  return (
    <details className="border-b py-4" open={isOpen}>
      <summary className="flex justify-between items-center list-none">
        <div className="w-1/12 lg:w-8 h-8">
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <span className="w-10/12 font-semibold text-center lg:text-left">{title}</span>
        <span className={`text-sm lg:text-2xl ${isRed ? 'text-primary' : 'text-secondary'}`}>
          {/* {isOpen ? '-' : '+'} */}
        </span>
      </summary>
      {/* <p className="mt-2 text-gray-600">{description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque diam lectus, sit amet congue ante mollis eget.'}</p> */}
    </details>
  );
};

export default async function Partners() {
  const { rows: highSchool } = await sql`SELECT * FROM high_school`;

  const services = [
    { title: "Comprehensive Candidacy Development Plan", icon: "img/highschool/1.svg", isOpen: false, isRed: false },
    { title: "School Selection Guidance", icon: "img/highschool/2.svg", isOpen: false, isRed: false },
    { title: "Summer School Selection and Application", icon: "img/highschool/3.svg", isOpen: false, isRed: false },
    { title: "Application System Management Guidance", icon: "img/highschool/4.svg", isOpen: false, isRed: false },
    { title: "Student Resume Optimization Guidance (CV)", icon: "img/highschool/5.svg", isOpen: false, isRed: false },
    { title: "Ivy League Alumni Major Selection Guidance", icon: "img/highschool/6.svg", isOpen: false, isRed: false },
    { title: "Pre-College Admissions Officer", icon: "img/highschool/7.svg", isOpen: false, isRed: false },
    { title: "Essay Review", icon: "img/highschool/8.svg", isOpen: false, isRed: false },
    { title: "Essay Editing: Ivy League Mentor", icon: "img/highschool/9.svg", isOpen: false, isRed: false },
    { title: "Application System Management Guidance", icon: "img/highschool/10.svg", isOpen: false, isRed: false },
  ];

  return (
    <div>
      <div className="relative h-52 md:h-96">
        <Image
          src="/img/highschool/header.jpg"
          alt="Book"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-8">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-8 md:ml-10">
            Private School <br />Application Consultation
          </h1>
          <Button href="/contacts" text="Free Consultation" style={"text-white px-11 py-2 rounded-full bg-secondary md:text-2xl md:ml-10"} />
        </div>
      </div>

      <div className="my-4" >
        <Quote text="From early-age potential development to private school/university applications, ULead can help your child continue to grow and progress." />
      </div>

      <div className="max-w-6xl mx-auto pt:10 lg:py-12 px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-8 mb-8 md:mb-20">
          <Card title="U.S. Boarding Middle/High School Application" />
          <Card title="U.S. Day School Middle/High School Application" />
          <Card title="U.S. Boarding Middle/High School Application" />
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

      <div className="flex md:hidden flex-col items-center justify-center my-8">
        <h2 className="text-lg font-bold text-center mb-8">High School Application Service Process</h2>
        <Image src="/img/highschool/process-mobile.svg" alt="Process" width={327} height={735} />
      </div>


      <div className="max-w-6xl py-12 mx-4 md:mx-16 lg:mx-auto hidden md:flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-16">High School Application Service Process</h2>
        <Image src="/img/highschool/process-desktop1.svg" alt="Process" width={956} height={1345} />
        <h2 className="text-3xl font-bold text-center mb-16 mt-32">High School Application Service Process</h2>
        <Image src="/img/highschool/process-desktop2.svg" alt="Process" width={1311} height={856} />
      </div>

      <div className="text-center mb-4">
        <Button text="More Details" href="/contacts" />
      </div>


      <SectionHeader title="Matriculation" style='my-4 mt-12' />

      <div className="max-w-6xl mx-8 md:mx-auto py-4 md:py-12 px-4 md:px-16">
        <OfferReport schools={highSchool} expand={true} />
      </div>

      <BackButton />
    </div >
  );
}
