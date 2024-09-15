import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import Image from 'next/image'

const Card = ({ title, content }) => (
  <div className="bg-white rounded-lg shadow-md">
    <h3 className={`text-lg font-bold mb-2 text-white p-2 rounded text-center w-full ${title.includes('Day') ? 'bg-red-600' : 'bg-blue-800'
      }`}>{title}</h3>
    <p className="text-sm px-5 pb-5 text-center">{content}</p>
  </div>
);

const ServiceItem = ({ title, description, isOpen, isRed }) => {
  return (
    <details className="border-b py-4" open={isOpen}>
      <summary className="flex justify-between items-center cursor-pointer list-none">
        <span className="font-semibold">{title}</span>
        <span className={`text-2xl ${isRed ? 'text-red-500' : 'text-blue-500'}`}>
          {isOpen ? '-' : '+'}
        </span>
      </summary>
      <p className="mt-2 text-gray-600">{description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque diam lectus, sit amet congue ante mollis eget.'}</p>
    </details>
  );
};

const ProcessStep = ({ number, title, description, isRed }) => (
  <div className={`p-4 border rounded-lg w-60 h-60 ${isRed ? 'border-red-500' : 'border-blue-800'}`}>
    <div className={`w-8 h-8 rounded-full ${isRed ? 'bg-red-500' : 'bg-blue-800'} text-white flex items-center justify-center font-bold mb-2`}>
      {number}
    </div>
    <h3 className="font-bold mb-2 text-center">{title}</h3>
    <p className="text-sm text-center">{description}</p>
  </div>
);

const Arrow = () => (
  <div className="flex items-center px-2">
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

export default function Partners() {
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
      <div className="relative h-[80vh]">
        <Image
          src="/img/highschool/header.png"
          alt="Book"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8">
          <h1 className="text-6xl font-bold text-white mb-8 ml-10">
            Private School <br />Application Consultation
          </h1>
          <button className="ml-10 bg-blue-900 text-white px-11 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Free Consultation
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className=" p-6 rounded-lg flex justify-between items-center mb-12">
          <p className="text-lg max-w-3xl">
            From early-age potential development to private school/
            university applications, ULead can help your child continue
            to grow and progress.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-500 transition duration-300">
            Schedule Now!
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card
            title="U.S. Boarding Middle/High School Application"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <Card
            title="U.S. Day School Middle/High School Application"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <Card
            title="U.S. Boarding Middle/High School Application"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </div>

        <h2 className="mt-10 text-3xl font-bold text-center">Personalized Services</h2>
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
          <button className="bg-red-600 text-white px-12 py-2 rounded-md hover:bg-red-500 transition duration-300">
            Contact us for more details
          </button>
        </div>
      </div>


      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">High School Application Service Process</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <ProcessStep number={1} title="Interest Exploration and Development" />
            <Arrow />
            <ProcessStep number={2} title="Mentor Arrangement and Planning" isRed />
            <Arrow />
            <ProcessStep number={3} title="Application Planning" description="Academic Research Interest Exploration" />
            <Arrow />
            <ProcessStep number={4} title="Full Process QC Management" description="Shared Application Email Management; Real-Time Information Updates" isRed />
          </div>
          <div className="flex items-center">
            <ProcessStep number={7} title="Campus Visit Guidance" isRed />
            <Arrow />
            <div className={`p-4 border rounded-lg w-80 h-60 border-blue-800`}>
              <div className={`w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold mb-2`}>6</div>
              <h3 className="font-bold mb-2 text-center">Interview Coaching</h3>
              <p className="text-sm text-center">Self-Awareness Enhancement (Building a Story Game); Interview Awareness Enhancement (Key Interview Assessment Points); Personal Interview Video Practice Assessment & Feedback; Dimensional Comprehensive Improvement (Simulation)</p>
            </div>
            <Arrow />
            <ProcessStep number={5} title="Third-Party Interview Coaching" description="Vericant or InitialView" isRed />
          </div>
          <div className="flex items-center">
            <ProcessStep number={8} title="School Selection Guidance and Interview Scheduling" />
            <Arrow />
            <ProcessStep number={9} title="Essay Guidance" description="Cornell University and Harvard External QC Management" isRed />
            <Arrow />
            <ProcessStep number={10} title="Supplemental Essay Guidance" description="Cornell University and Harvard External QC Management" />
            <Arrow />
            <ProcessStep number={11} title="Offer Selection Strategy" isRed />
          </div>
        </div>
      </div>

      <BackButton />
      <Footer />
    </div>
  );
}