import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";
import { sql } from "@vercel/postgres";

const ServiceItem = ({ title, description, isOpen, isRed, icon }) => {
  return (
    <div className="border-b py-4" open={isOpen}>
      <div className="flex items-center cursor-pointer list-none">
        <div className="w-8 h-8">
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <span className="pl-2 font-semibold text-left">{title}</span>
      </div>
      <ul className="mt-2 text-gray-600">
        {description && description.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </div>
  );
};


const GrowthPlan = async () => {
  const { rows: tags } = await sql`SELECT * FROM tag`;
  const { rows: tagColors } = await sql`SELECT * FROM tag_color`;
  const colors = Object.fromEntries(tagColors.map(tag => [tag.type, tag.color]));
  console.log(colors);

  const topTags = tags.filter(tag => tag.pos === 'top');
  const bottomTags = tags.filter(tag => tag.pos === 'bottom');

  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-wrap justify-center gap-2">
        {topTags.map((tag, index) => (
          <div
            key={index}
            className={`px-2 py-2 border text-gray-700 rounded-full text-xs lg:text-sm font-medium`}
            style={{ borderColor: colors[tag.type] }}
          >
            {tag.text}
          </div>
        ))}
      </div>

      <div className="bg-white text-black font-bold text-sm lg:text-lg my-2 py-2 px-6 rounded-full">
        Lead Program Student Growth Plan
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {bottomTags.map((tag, index) => (
          <div
            key={index}
            className={`px-2 py-2 border text-gray-700 rounded-full text-xs lg:text-sm font-medium`}
            style={{ borderColor: colors[tag.type] }}
          >
            {tag.text}
          </div>
        ))}
      </div>


      {/* Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-8 gap-4 mx-4 mb-8">
        {tagColors.map((tag, index) => (
          <div key={index} className="flex items-center">
            <span className={`w-3 h-3 rounded-full inline-block mr-2`}
              style={{ backgroundColor: tag.color }}
            ></span>
            <span className="text-sm">{tag.type}</span>
          </div>
        ))}
      </div>
    </div>);
};

export default function Partners() {
  const services = [
    {
      title: "Academic Growth Plan", icon: "img/lead-program/1.svg", isOpen: false, isRed: false,
      description: ["Identify academic strengths, set goals, and develop effective learning strategies.",
        "Compare education systems to make informed schooling choices."]
    },
    {
      title: "Artistic Growth Plan", icon: "img/lead-program/2.svg", isOpen: false, isRed: false,
      description: ["Discover and develop artistic talents with structured guidance.",
        "Connect arts education to international learning pathways."]
    },
    {
      title: "Sports Growth Plan", icon: "img/lead-program/3.svg", isOpen: false, isRed: false,
      description: ["Enhance athletic skills, resilience, and teamwork through tailored training.",
        "Explore pathways for academic and competitive sports development."]
    },
    {
      title: "Parental Growth Course", icon: "img/lead-program/4.svg", isOpen: false, isRed: false,
      description: ["Help parents support their child's education and personal growth.",
        "Bridge home and school learning with effective strategies."]
    },
    {
      title: "Leadership Growth Plan", icon: "img/lead-program/5.svg", isOpen: false, isRed: false,
      description: ["Develop leadership, teamwork, and decision-making skills.",
        "Create personalized growth plans through mentorship and activities."]
    },
    {
      title: "Holiday Growth Plan", icon: "img/lead-program/6.svg", isOpen: false, isRed: false,
      description: ["Maximize holiday breaks with educational and skill-building activities.",
        "Balance learning, relaxation, and cultural exploration."]
    },
    {
      title: "Overseas Growth Plan", icon: "img/lead-program/7.svg", isOpen: false, isRed: false,
      description: ["Guide families in planning overseas education and adaptation.",
        "Provide resources for academic success and global opportunities."]
    },
    {
      title: "Public Welfare Growth Plan", icon: "img/lead-program/8.svg", isOpen: false, isRed: false,
      description: ["Encourage social responsibility through volunteerism and public service.",
        "Explore meaningful community engagement opportunities."]
    },
  ];

  return (
    <div>
      <div className="relative h-52 md:h-96">
        <Image
          src="/img/lead-program/header.jpg"
          alt="Graduation"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-8">
          <h1 className="text-2xl md:text-6xl text-white font-bold mb-8 md:ml-10">
            Lead Programs
          </h1>
          <Button href="/contacts" text="Free Consultation" style={"text-white px-11 py-2 rounded-full bg-secondary md:text-2xl md:ml-10"} />
        </div>
      </div>

      <SectionHeader title="Skills Development" style='my-8' />
      <div className="mx-[8vw] max-w-6xl lg:mx-auto flex flex-col">
        <span className="mb-8">
          Focusing on the child, growth advisors guide both the child and parents through personalized growth and application planning, allowing the child ample time to effectively enhance their background and abilities.
        </span>

        <div className="flex gap-8 mb-8">
          <div className="w-1/3">
            <Image src="/img/lead-program/sports.svg" alt="Sports" width={120} height={120} />
          </div>
          <div className="w-1/3">
            <Image src="/img/lead-program/academic.svg" alt="Academic" width={120} height={120} />
          </div>
          <div className="w-1/3">
            <Image src="/img/lead-program/public_welfare.svg" alt="Public Welfare" width={120} height={120} />
          </div>
          <div className="w-1/3 hidden lg:block">
            <Image src="/img/lead-program/art.svg" alt="Sports" width={120} height={120} />
          </div>
          <div className="w-1/3 hidden lg:block">
            <Image src="/img/lead-program/academic2.svg" alt="Academic" width={120} height={120} />
          </div>
          <div className="w-1/3 hidden lg:block">
            <Image src="/img/lead-program/music.svg" alt="Public Welfare" width={120} height={120} />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="rounded-xl border-2 p-4 border-primary">
            <span className="text-primary">Aligning with elite overseas educational training models </span>
            {"to improve the child's real abilities, such as "}
            <span className="text-primary">intrinsic motivation, academic competence, critical thinking, and analytical skills</span>
            , which will benefit them for a lifetime.
          </div>
          <div className="rounded-xl border-2 p-4 border-secondary">
            {"Providing professional guidance and targeted training to influence the child's "}
            <span className="text-secondary">thinking methods and depth of thought</span>
            {", helping them advance in school selection, majors, and even "}
            <span className="text-secondary">future career development.</span>
          </div>
        </div>

        <div className="flex lg:hidden gap-8 mb-8">
          <div className="w-1/3">
            <Image src="/img/lead-program/art.svg" alt="Sports" width={120} height={120} />
          </div>
          <div className="w-1/3">
            <Image src="/img/lead-program/academic2.svg" alt="Academic" width={120} height={120} />
          </div>
          <div className="w-1/3">
            <Image src="/img/lead-program/music.svg" alt="Public Welfare" width={120} height={120} />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="rounded-xl border-2 p-4 border-primary">
            {"Expanding the child's "}
            <span className="text-primary">academic and extracurricular activities </span>
            in multiple dimensions and directions, while connecting them with valuable resources.
          </div>
          <div className="rounded-xl border-2 p-4 border-secondary">
            Parents in the leadership program will gain an understanding of
            <span className="text-secondary">international education systems in the U.S., U.K., and Canada, </span>
            as well as expert-shared experiences, helping the family make better decisions.
          </div>
        </div>
      </div>

      <SectionHeader title="Lead Program Services" style='my-8' />
      <div className="mx-[8vw] mb-8 lg:hidden flex justify-center">
        <Image src="/img/lead-program/services.svg" alt="Skills Development" width={537} height={501} />
      </div>

      <div className="mx-[8vw] mb-8 hidden lg:flex items-center justify-center">
        <Image src="/img/lead-program/services_desktop.svg" className="max-w-screen-sm" alt="Skills Development" width={1212} height={887} />
      </div>


      <SectionHeader title="8 Core Competences" style='my-4' />
      <div className="max-w-6xl mx-8 md:mx-12 lg:mx-auto py-4 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              icon={service.icon}
              isOpen={service.isOpen}
              isRed={service.isRed}
              description={service.description}
            />
          ))}
        </div>
        <div className="text-center">
          <Button text="More Details" href="/contacts" />
        </div>
      </div>

      <SectionHeader title="Abilities Training" style='my-4 md:my-16' />
      <GrowthPlan />

      <div className="text-center mb-4">
        <Button text="More Details" href="/contacts" />
      </div>

      <BackButton />
    </div>
  );
}
