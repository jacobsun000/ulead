import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'

const Card = ({ title, content }) => (
  <div className="bg-white rounded-lg shadow-md">
    <h3 className={`text-lg font-bold mb-2 text-white p-2 rounded text-center w-full ${title.includes('Canadian') ? 'bg-red-600' : 'bg-blue-800'
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

export default function Partners() {
  const services = [
    { title: "Candidacy Development", isOpen: false, isRed: false },
    { title: "GPA Management Plan", isOpen: false, isRed: false },
    { title: "Competition and Independent Research Project Planning", isOpen: false, isRed: false },
    { title: "Domestic and Overseas Activity Resources Planning", isOpen: false, isRed: false },
    { title: "School Selection Guidance", isOpen: false, isRed: false },
    { title: "Summer School Selection and Application", isOpen: false, isRed: false },
    { title: "Application Progress Management", isOpen: false, isRed: false },
    { title: "Ivy League Academic and Major Selection Guidance", isOpen: false, isRed: false },
    { title: "Application System Management Guidance", isOpen: false, isRed: false },
    { title: "9th-12th Grade Planning Guidance", isOpen: false, isRed: false },
    { title: "Document Review by Admissions Officers", isOpen: false, isRed: false },
    { title: "Student CV Optimization Guidance", isOpen: false, isRed: false },
    { title: "Recommendation Letter Guidance", isOpen: false, isRed: false },
  ];

  return (
    <div>
      <Header currentPath="/university" />
      <div className="relative h-[80vh]">
        <Image
          src="/img/university/header.png"
          alt="Graduation"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8">
          <h1 className="text-6xl font-bold text-black mb-8 ml-10">
            University Application<br />Consultation
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
            title="U.S. University Application"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <Card
            title="Canadian University Application"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <Card
            title="U.K. University Application"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </div>
      </div>
      <SectionHeader title="Personalized Services" />
      <div className="max-w-6xl mx-auto py-12 px-4">
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

      <BackButton />
      <Footer />
    </div>
  );
}