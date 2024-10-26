import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";

const Card = ({ title }) => (
  <div className="flex-1 mx-1">
    <h3 className={`text-xs mb-2 text-white p-2 rounded-lg text-center place-content-center w-full h-full ${title.includes('U.S.') ? 'bg-primary' : 'bg-secondary'
      }`}>{title}</h3>
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
    { title: "Competition and Independent Research Project Planning", isOpen: false, isRed: false },
    { title: "School Selection Guidance", isOpen: false, isRed: false },
    { title: "Application Progress Management", isOpen: false, isRed: false },
    { title: "Document Review by Admissions Officers", isOpen: false, isRed: false },
  ];

  return (
    <div>
      <Header currentPath="/university" />

      <div className="relative h-[30vh] md:h-[80vh]">
        <Image
          src="/img/university/header.png"
          alt="Graduation"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-5 flex flex-col justify-center items-start p-8">
          <h1 className="text-2xl md:text-6xl text-secondary mb-5">
            University Application<br />Consultation
          </h1>
          <Button href="/contacts" text="Free Consultation" style='bg-secondary' />
        </div>
      </div>

      <div className="mx-auto py-12 px-4 w-full">
        <div className="rounded-lg flex flex-row justify-between items-center mb-12">
          <p className="text-xs md:text-lg">
            From early-age potential development to private school/
            university applications, ULead can help your child continue
            to grow and progress.
          </p>
          <Button href="/contacts" text="Schedule Now!" style={'text-xs'} />
        </div>

        <div className="flex border-2">
          <Card title="Canadian University Applicaion" />
          <Card title="U.S. University Application" />
          <Card title="U.K. University Application" />
        </div>
      </div>
      <SectionHeader title="Personalized Services" style="my-0" />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-8 gap-x-8 gap-y-4 mb-8">
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
          <Button text="More details" href="/contacts" />
        </div>
      </div>

      <BackButton />
      <Footer />
    </div>
  );
}
