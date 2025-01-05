import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Button from "@/ui/Button";

const ServiceItem = ({ title, description, isOpen, isRed, icon }) => {
  return (
    <details className="border-b py-4" open={isOpen}>
      <summary className="flex justify-between items-center cursor-pointer list-none">
        <div className="w-8 h-8">
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <span className="font-semibold">{title}</span>
        <span className={`text-sm md:text-2xl ${isRed ? 'text-primary' : 'text-secondary'}`}>
          {isOpen ? '-' : '+'}
        </span>
      </summary>
      <ul className="mt-2 text-gray-600">
        {description && description.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </details>
  );
};


const GrowthPlan = () => {
  const tags1 = [
    { text: "International Masterclass", color: "border-yellow-500" },
    { text: "English Literature and Writing", color: "border-red-500" },
    { text: "Competition Resources", color: "border-blue-500" },
    { text: "Extracurricular Activities", color: "border-teal-500" },
    { text: "Family Guidance", color: "border-yellow-500" },
    { text: "Music Creation", color: "border-blue-500" },
    { text: "Creative Writing", color: "border-red-500" },
    { text: "Art Portfolio", color: "border-blue-500" },
    { text: "U.S. Professor Course Topics", color: "border-yellow-500" },
    { text: "Sports Activities", color: "border-blue-500" },
  ];
  const tags2 = [
    { text: "Exam Tutoring", color: "border-blue-500" },
    { text: "Science and Innovation", color: "border-teal-500" },
    { text: "Academic Tutoring", color: "border-red-500" },
    { text: "English Reading", color: "border-red-500" },
    { text: "Holiday Activities", color: "border-teal-500" },
    { text: "Stress Writing", color: "border-red-500" },
    { text: "GPA Management", color: "border-teal-500" },
    { text: "Summer School Application", color: "border-red-500" },
  ];

  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-wrap justify-center gap-2">
        {tags1.map((tag, index) => (
          <div
            key={index}
            className={`px-2 py-2 border ${tag.color} text-gray-700 rounded-full text-xs md:text-sm font-medium`}
          >
            {tag.text}
          </div>
        ))}
      </div>

      <div className="bg-white text-black font-bold text-sm md:text-lg my-2 py-2 px-6 rounded-full">
        Lead Program Student Growth Plan
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {tags2.map((tag, index) => (
          <div
            key={index}
            className={`px-2 py-2 border ${tag.color} text-gray-700 rounded-full text-xs md:text-sm font-medium`}
          >
            {tag.text}
          </div>
        ))}
      </div>


      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-8 gap-4 mx-4 mb-8">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block mr-2"></span>
          <span className="text-sm">U.S. Admissions Integration</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-2"></span>
          <span className="text-sm">Academic Skills</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-teal-500 rounded-full inline-block mr-2"></span>
          <span className="text-sm">GPA Management</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block mr-2"></span>
          <span className="text-sm">Background Abilities</span>
        </div>
      </div>
    </div>
  );
};

export default function Partners() {
  const services = [
    {
      title: "Academic Growth Plan", icon: "img/lead-program/1.svg", isOpen: false, isRed: false,
      description: ["Explore personal academic strengths and develop a growth plan, set academic benchmarks and long-term development strategies.",
        "English learning habits and methods, learning points and methods to connect other subjects with international learning styles.",
        "Domestic and international bilingual systems, international education systems, analysis and choices of public and private education.",
        "Analysis and choices of the U.S. private and public school systems, including elite private schools."]
    },
    {
      title: "Artistic Growth Plan", icon: "img/lead-program/2.svg", isOpen: false, isRed: false,
      description: ["Help children discover their own artistic strengths, understand their advantages, and analyze opportunities.",
        "Foster international perspectives and guide children in nurturing unique artistic talents.",
        "Visual and performing arts learning points, methods, and resources to connect with international art education.",
        "International development pathways for non-arts major students with artistic talents."]
    },
    {
      title: "Sports Growth Plan", icon: "img/lead-program/3.svg", isOpen: false, isRed: false,
      description: ["Develop children's physical strengths, skills, and resilience through tailored sports training and activities.",
        "Set short- and long-term athletic development goals while nurturing sportsmanship and teamwork.",
        "Introduce learning points and methods to connect sports training with academic and international education systems.",
        "Explore pathways for domestic and international sports development, including opportunities in elite athletic programs and schools."]
    },
    {
      title: "Parental Growth Course", icon: "img/lead-program/4.svg", isOpen: false, isRed: false,
      description: ["Equip parents with the skills to support their children's academic, artistic, and personal growth effectively.",
        "Understand domestic and international education systems, bridging gaps between home and school learning.",
        "Offer strategies for effective communication, motivation, and the creation of a nurturing and growth-focused family environment.",
        "Provide resources for guiding children through critical life transitions, from school selection to personal development milestones."]
    },
    {
      title: "Leadership Growth Plan", icon: "img/lead-program/5.svg", isOpen: false, isRed: false,
      description: ["Cultivate leadership skills in children, focusing on teamwork, problem-solving, and decision-making.",
        "Guide students in setting personal and community goals, emphasizing responsibility and initiative.",
        "Introduce international frameworks for leadership development, connecting them with domestic and global opportunities.",
        "Develop customized plans for leadership growth through mentorship, extracurricular activities, and community involvement."]
    },
    {
      title: "Holiday Growth Plan", icon: "img/lead-program/6.svg", isOpen: false, isRed: false,
      description: ["Maximize holiday breaks with meaningful and educational activities tailored to children's unique strengths.",
        "Combine academic, artistic, and physical activities with cultural exploration and international learning opportunities.",
        "Create balanced schedules that encourage skill-building, relaxation, and family bonding.",
        "Provide resources for leveraging holiday periods to enhance personal growth, including travel programs and workshops."]
    },
    {
      title: "Overseas Growth Plan", icon: "img/lead-program/7.svg", isOpen: false, isRed: false,
      description: ["Guide families in planning for overseas education and cultural adaptation.",
        "Offer strategies for selecting suitable schools and programs abroad while addressing cultural and academic challenges.",
        "Provide resources for personal, academic, and extracurricular growth in international environments.",
        "Develop comprehensive plans for future global opportunities, including college admissions and career development."]
    },
    {
      title: "Public Welfare Growth Plan", icon: "img/lead-program/8.svg", isOpen: false, isRed: false,
      description: ["Instill a sense of social responsibility by introducing children to volunteerism and public service.",
        "Design activities that align with children's strengths and interests, fostering empathy and community awareness.",
        "Explore domestic and international public welfare projects, offering pathways to meaningful involvement.",
        "Encourage family and community participation in public service activities, building lifelong habits of giving back."]
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
      <div className="mx-[8vw] max-w-6xl md:mx-auto flex flex-col">
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
          <div className="w-1/3 hidden md:block">
            <Image src="/img/lead-program/art.svg" alt="Sports" width={120} height={120} />
          </div>
          <div className="w-1/3 hidden md:block">
            <Image src="/img/lead-program/academic2.svg" alt="Academic" width={120} height={120} />
          </div>
          <div className="w-1/3 hidden md:block">
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

        <div className="flex md:hidden gap-8 mb-8">
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
      <div className="mx-[8vw] mb-8 md:hidden">
        <Image src="/img/lead-program/services.svg" alt="Skills Development" width={358} height={334} />
      </div>

      <div className="mx-[8vw] mb-8 hidden md:flex items-center justify-center">
        <Image src="/img/lead-program/services_desktop.svg" className="max-w-screen-sm" alt="Skills Development" width={1212} height={887} />
      </div>


      <SectionHeader title="8 Core Competences" style='my-4' />
      <div className="max-w-6xl mx-8 md:mx-auto py-4 md:py-12 px-4">
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
