import { sql } from '@vercel/postgres';
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";
import Quote from "@/ui/Quote";
import OfferReport from "@/ui/OfferReport";
import SuccessStories from '@/ui/SuccessStories';
import Services from '@/ui/Services';

const Card = ({ title }) => (
  <h3 className={`text-sm mb-2 text-white p-2 rounded-xl text-center ${title.includes('Canadian') ? 'bg-primary' : 'bg-secondary'}`}>{title}</h3>
);

export default async function University() {
  const { rows: university } = await sql`SELECT * FROM university`;
  const { rows: profiles } = await sql`SELECT * FROM success_story WHERE type = 'University'`;
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
    { title: "Former Admission Officers", icon: "img/university/11.svg", isOpen: false, isRed: false },
    { title: "Student CV Optimization Guidance", icon: "img/university/12.svg", isOpen: false, isRed: false },
  ];

  return (
    <div>
      <div className="relative h-52 md:h-[30rem]">
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
          <Button href="/contacts" text="Free Consultation" style={"text-white px-11 py-2 rounded-full bg-primary md:text-2xl md:ml-10"} />
        </div>
      </div>

      <div className="my-4" >
        <Quote text="From early-age potential development to private school/university applications, Ulead can help your child continue to grow and progress." />
      </div>

      <div className="max-w-6xl mx-auto pt:10 lg:py-12 px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-8 mb-8">
          <Card title="U.S. University Application" />
          <Card title="Canadian University Application" />
          <Card title="U.K. University Application" />
        </div>
      </div>

      <SectionHeader title="Personalized Services" style='my-4' />
      <Services services={services} />

      <SectionHeader title="Matriculation" style='my-4 mt-12' />
      <div className="max-w-6xl mx-8 md:mx-auto py-4 md:py-12 px-4 md:px-16">
        <OfferReport schools={university} expand={true} />
      </div>

      <SectionHeader title="Success Stories" style='my-4 mt-12' />
      <SuccessStories profiles={profiles} />

      <BackButton />
    </div>
  );
}
