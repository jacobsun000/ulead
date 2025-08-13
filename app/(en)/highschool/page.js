import { sql } from '@vercel/postgres';
import BackButton from "@/ui/en/Back";
import SectionHeader from "@/ui/en/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/en/Button";
import Quote from "@/ui/en/Quote";
import OfferReport from "@/ui/en/OfferReport";
import SuccessStories from '@/ui/en/SuccessStories';
import Services from '@/ui/en/Services';

const Card = ({ title }) => (
  <div className="flex-1 mx-1">
    <h3 className={`text-xs lg:text-lg mb-2 text-white p-2 rounded-lg text-center place-content-center w-full h-full ${title.includes('Day') ? 'bg-primary' : 'bg-secondary'
      }`}>{title}</h3>
  </div>
);

export default async function Highschool() {
  const { rows: highSchool } = await sql`SELECT * FROM high_school`;
  const { rows: profiles } = await sql`SELECT * FROM success_story WHERE type = 'HighSchool'`;

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
      <div className="relative h-52 md:h-[30rem]">
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
          <Button href="/contacts" text="Free Consultation" style={"text-white px-11 py-2 rounded-full bg-primary md:text-2xl md:ml-10"} />
        </div>
      </div>

      <div className="my-4" >
        <Quote text="From early-age potential development to private school/university applications, Ulead can help your child continue to grow and progress." />
      </div>

      <div className="max-w-6xl mx-auto pt:10 lg:py-12 px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-8 mb-8">
          <Card title="U.S. Boarding Middle/High School Application" />
          <Card title="U.S. Day School Middle/High School Application" />
          <Card title="Canada Middle/High School Application" />
        </div>
      </div>

      <SectionHeader title="Personalized Services" style='my-4' />
      <Services services={services} />

      <SectionHeader title="High School Application Service Process" style='my-4' />
      <div className="flex md:hidden flex-col items-center justify-center my-8">
        <Image src="/img/highschool/process-mobile.svg" alt="Process" width={327} height={735} />
      </div>


      <div className="max-w-6xl py-12 mx-4 md:mx-16 lg:mx-auto hidden md:flex flex-col items-center justify-center">
        <Image src="/img/highschool/process-desktop1.svg" alt="Process" width={956} height={1345} />
      </div>

      <SectionHeader title="Matriculation" style='my-4 mt-12' />
      <div className="max-w-6xl mx-8 md:mx-auto py-4 md:py-12 px-4 md:px-16">
        <OfferReport schools={highSchool} expand={true} />
      </div>

      <SectionHeader title="Success Stories" style='my-4 mt-12' />
      <SuccessStories profiles={profiles} />

      <BackButton />
    </div >
  );
}
