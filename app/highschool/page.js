import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";
import Button2 from "@/ui/Button2";

const Card = ({ title }) => (
  <div className="flex-1 mx-1">
    <h3 className={`text-xs mb-2 text-white p-2 rounded-lg text-center place-content-center w-full h-full ${title.includes('Day') ? 'bg-primary' : 'bg-secondary'
      }`}>{title}</h3>
  </div>
);

const ServiceItem = ({ title, description, isOpen, isRed }) => {
  return (
    <details className="border-b py-4" open={isOpen}>
      <summary className="flex justify-between items-center cursor-pointer list-none">
        <span className="font-semibold">{title}</span>
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

export default function Highschool() {
  const services = [
    { title: "Comprehensive Candidacy Development Plan", isOpen: false, isRed: false },
    { title: "School Selection Guidance", isOpen: false, isRed: false },
    { title: "Summer School Selection and Application", isOpen: false, isRed: false },
    { title: "Application System Management Guidance", isOpen: false, isRed: false },
    { title: "Student Resume Optimization Guidance (CV)", isOpen: false, isRed: false },
    { title: "Ivy League Alumni Major Selection Guidance", isOpen: false, isRed: false },
    { title: "Pre-College Admissions Officer", isOpen: false, isRed: false },
    { title: "Essay Review", isOpen: false, isRed: false },
    { title: "Essay Editing: Ivy League Mentor", isOpen: false, isRed: false },
    { title: "Application System Management Guidance", isOpen: false, isRed: false },
  ];

  return (
    <div>
      <Header currentPath="/highschool" />
      <div className="relative h-[30vh] md:h-[80vh]">
        <Image
          src="/img/highschool/header.png"
          alt="Book"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-5 flex flex-col justify-center items-start p-8">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-5">
            Private School <br />Application Consultation
          </h1>
          <Button href="/contacts" text="Free Consultation" style='bg-secondary' />
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt:10 md:py-12 px-4">
        <div className="p-6 rounded-lg flex flex-col gap-y-5 md:flex-row justify-between items-center mb-8 md:mb-12">
          <p className="text-base md:text-lg max-w-2xl">
            From early-age potential development to private school/
            university applications, ULead can help your child continue
            to grow and progress.
          </p>
          <Button href="/contacts" text="Schedule Now!" style='px-6 py-2 rounded-full hidden md:block' />
        </div>

        <div className="flex border-2">
          <Card title="U.S. Day School Middle/High School Application" />
          <Card title="U.S. Boarding Middle/High School Application" />
          <Card title="Canadian Boarding Middle/High School Application" />
        </div>

      </div>
      <SectionHeader title="Personalized Services" style='my-0' />
      <div className="max-w-6xl mx-8 md:mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              isOpen={service.isOpen}
              isRed={service.isRed}
            />
          ))}
        </div>
        <div className="text-center">
          <Button text="Contact us for more details" href="/contacts" />
        </div>
      </div>


      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-lg font-bold text-center mb-8">High School Application Service Process</h2>
        <div className="flex items-center justify-center">
          <Image
            src="/img/highschool/process.svg"
            alt="process"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="text-center mb-5">
        <Button2 text="View Details of 150+ Service Hours" href="/contacts" />
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-lg font-bold text-center mb-8">High School Application Service Process</h2>
        <div className="flex items-center justify-center">
          <Image
            src="/img/highschool/process2.svg"
            alt="process2"
            width={500}
            height={500}
          />
        </div>
      </div>

      <BackButton />
      <Footer />
    </div >
  );
}
