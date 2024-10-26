import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";
import Quote from "@/ui/Quote";

const Card = ({ title }) => (
  <h3 className={`text-sm mb-2 text-white p-2 rounded-xl text-center ${title.includes('Day') ? 'bg-primary' : 'bg-secondary'}`}>{title}</h3>
);

const ServiceItem = ({ title, description, isOpen, isRed, icon }) => {
  return (
    <details className="border-b py-4" open={isOpen}>
      <summary className="flex justify-between items-center cursor-pointer list-none">
        <div className="w-8 h-8">
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <span className="font-semibold text-center md:text-left">{title}</span>
        <span className={`text-sm md:text-2xl ${isRed ? 'text-primary' : 'text-secondary'}`}>
          {isOpen ? '-' : '+'}
        </span>
      </summary>
      <p className="mt-2 text-gray-600">{description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque diam lectus, sit amet congue ante mollis eget.'}</p>
    </details>
  );
};

const ProcessStep = ({ number, title, description, isRed }) => (
  <div className={`p-4 border rounded-lg w-40 h-52 md:w-60 md:h-60 ${isRed ? 'border-primary' : 'border-secondary'}`}>
    <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${isRed ? 'bg-primary' : 'bg-secondary'} text-white flex items-center justify-center font-bold mb-2 text-xs md:text-lg`}>
      {number}
    </div>
    <h3 className="font-semibold text-sm md:text-lg md:font-bold mb-2 text-center">{title}</h3>
    <p className="text-xs md:text-sm text-center">{description}</p>
  </div>
);

const Arrow = () => (
  <div className="flex items-center md:px-2">
    <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

export default function Partners() {
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
      <Header currentPath="/highschool" />
      <div className="relative h-[30vh] md:h-[40vh]">
        <Image
          src="/img/highschool/header.png"
          alt="Book"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-8 ml-10">
            Private School <br />Application Consultation
          </h1>
          <Button href="/contacts" text="Free Consultation" style='bg-secondary ml-10' />
        </div>
      </div>

      <div className="my-4" >
        <Quote text="From early-age potential development to private school/university applications, ULead can help your child continue to grow and progress." />
      </div>

      <div className="max-w-6xl mx-auto pt:10 md:py-12 px-4">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 mb-8 md:mb-20">
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


      <div className="max-w-6xl mx-auto py-12 px-4 hidden md:flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-16">High School Application Service Process</h2>
        <Image src="/img/highschool/process-desktop1.svg" alt="Process" width={956} height={1345} />
        <h2 className="text-3xl font-bold text-center mb-16 mt-32">High School Application Service Process</h2>
        <Image src="/img/highschool/process-desktop2.svg" alt="Process" width={1311} height={856} />
      </div>

      <BackButton />
      <Footer />
    </div>
  );
}
