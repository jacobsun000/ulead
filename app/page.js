import { sql } from '@vercel/postgres';
import Image from "next/image";
import Slider from "@/ui/Slider";
import Panel from "@/ui/Panel";
import SectionHeader from "@/ui/SectionHeader";
import Button from "@/ui/Button";
import Tab from "@/ui/Tab";
import BackToTopButton from "@/ui/Back";
import Video from "@/ui/Video";
import IASBadge from "@/ui/IASBadge";
import OfferReport from "@/ui/OfferReport";
import AlumnProfileCard from "@/ui/AlumniProfileCard";

export default function Home() {
  return (
    <div className="bg-[#f5f5f5]">
      <MainSection />
      <div className="w-5/6 mx-auto lg:hidden my-4">
        <Video src="/img/home/video.mp4" poster="/img/home/video_poster.png" />
      </div>
      <SectionHeader title="Our Belief" style={"mt-8 md:mt-16"} />
      <OurBeliefSection />
      <SectionHeader title="Our Services" />
      <OurServicesSection />
      <SectionHeader title="Student Report" />
      <StudentReportSection />
      <SectionHeader title="Our Team" />
      <OurTeamSection />
      <SectionHeader title="Matriculation" />
      <MatriculationSection />
      <SectionHeader title="ULead Alumni" />
      <UleadAlumnSection />
      <SectionHeader title="Qualifications" />
      <QualificationsSection />
      <div className="text-center mb-4">
        <Button text="More Details" href="/contacts" />
      </div>
      <BackToTopButton />
    </div>
  );
}

function MainSection() {
  return (
    <section className="relative w-full h-52 md:h-96">
      {/* Background Image */}
      <Image
        src="/img/home/header.jpg"
        alt="Slider"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        priority
        className="z-0"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-4 lg:pl-32 text-center text-white">
        {/* Title */}
        <h1 className="text-[1.4rem] md:text-5xl font-bold mb-2">
          ULEAD Education Planning
        </h1>

        {/* Subtitle */}
        <p className="text-xs md:text-xl md:pt-4 mb-4">
          ——Straight A Student Learning Skill Program!
        </p>

        {/* "Chat Now" Button */}
        <a
          href="/contacts"
          className="
            bg-primary text-white px-10 text-2xl py-3 rounded-sm shadow-lg 
            hidden md:block
            hover:bg-primaryLight transition duration-300"
        >
          Chat Now
        </a>
      </div>
    </section>
  );
}

function OurBeliefSection() {
  return (
    <section className="mx-8 lg:mx-[10vw]">
      {/* Content */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:gap-x-16">
        {/* Video Section */}
        <div className="hidden lg:block lg:w-1/2 lg:h-full mb-4">
          <Video src="/img/home/video.mp4" poster="/img/home/video_poster.png" />
        </div>
        {/* Text Section */}
        <div className="lg:w-2/5 flex-col w-full">
          <h3 className="hidden lg:block text-4xl font-bold mb-4">
            <span className="text-primary">U</span>
            <span className="text-secondary">LEAD Education</span>
          </h3>
          <p className="text-md md:text-lg text-black w-full">
            <b className="text-md md:text-lg md:font-normal">ULead Education</b>
            {` provides high-level, personalized advising and tutoring for elite families from Mainland China, Singapore, South Korea, and Japan.`}
          </p>
          <p className="text-md md:text-lg text-black mb-4 md:mb-8 w-full">
            {`The company is fully committed to each student's individualized growth. Consultants serve as students' academic tutors, personal mentors, and collaborate closely with their families to form intimate, trusting relationships.`}
          </p>
          <div className="grid w-full justify-items-center lg:justify-items-start">
            <Button href='/about-us' text='About Us' />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, icon, iconBg, text }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 lg:p-4 lg:w-1/3 text-center">
      <div className="flex justify-center mb-4">
        <div className={`${iconBg} p-4 rounded-full`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-left pl-4">
        {text.map((t, index) => (
          <p key={index} className="text-gray-600 text-xs lg:text-sm mb-4 flex items-start">
            <span className="w-2 h-2 bg-primary lg:bg-primary rounded-full mr-2 mt-1 flex-shrink-0"></span>
            {t}</p>
        ))}
      </div>
    </div>
  );
}

function OurServicesSection() {
  const cards = [
    <ServiceCard
      key="For Parents"
      title="For Parents"
      iconBg="bg-primary md:bg-secondary"
      icon={
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_3_689" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
            <rect width="40" height="40" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_3_689)">
            <path d="M10.8333 9.99992C9.91667 9.99992 9.13194 9.67353 8.47917 9.02075C7.82639 8.36797 7.5 7.58325 7.5 6.66659C7.5 5.74992 7.82639 4.9652 8.47917 4.31242C9.13194 3.65964 9.91667 3.33325 10.8333 3.33325C11.75 3.33325 12.5347 3.65964 13.1875 4.31242C13.8403 4.9652 14.1667 5.74992 14.1667 6.66659C14.1667 7.58325 13.8403 8.36797 13.1875 9.02075C12.5347 9.67353 11.75 9.99992 10.8333 9.99992ZM28.3333 18.3333C27.6389 18.3333 27.0486 18.0902 26.5625 17.6041C26.0764 17.118 25.8333 16.5277 25.8333 15.8333C25.8333 15.1388 26.0764 14.5485 26.5625 14.0624C27.0486 13.5763 27.6389 13.3333 28.3333 13.3333C29.0278 13.3333 29.6181 13.5763 30.1042 14.0624C30.5903 14.5485 30.8333 15.1388 30.8333 15.8333C30.8333 16.5277 30.5903 17.118 30.1042 17.6041C29.6181 18.0902 29.0278 18.3333 28.3333 18.3333ZM7.5 36.6666V24.9999H5V14.9999C5 14.0833 5.32639 13.2985 5.97917 12.6458C6.63194 11.993 7.41667 11.6666 8.33333 11.6666H13.3333C13.9444 11.6666 14.5 11.8124 15 12.1041C15.5 12.3958 15.9028 12.8055 16.2083 13.3333L22.1667 23.6249L23.875 21.0833C24.0972 20.7499 24.3958 20.486 24.7708 20.2916C25.1458 20.0971 25.5417 19.9999 25.9583 19.9999H30.8333C31.5278 19.9999 32.1181 20.243 32.6042 20.7291C33.0903 21.2152 33.3333 21.8055 33.3333 22.4999V28.3333H31.6667V36.6666H25V24.8333L23.7083 26.6666H20.0417L15.8333 19.3333V36.6666H7.5Z" fill="white" />
          </g>
        </svg>
      }
      text={["Parents Growth and Exchange Workshop",
        "School/College Assessment Consulting ",
        "Overseas School Knowledge Enrichment ",
        "Parenting Philosiphy Guidance and Consulting",
        "Psychological Support with Certified Professionals"]}

    />,
    <ServiceCard
      key="For Students"
      title="For Students"
      iconBg="bg-primary"
      icon={
        <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.08337 2.91675H6.66671C8.50767 2.91675 10 4.40912 10 6.25008V17.5001C10 16.1194 8.88075 15.0001 7.50004 15.0001H2.08337V2.91675Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <path d="M17.9167 2.91675H13.3333C11.4924 2.91675 10 4.40912 10 6.25008V17.5001C10 16.1194 11.1193 15.0001 12.5 15.0001H17.9167V2.91675Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      }
      text={["Junior/High School Placement",
        "USA/Canada/UK/Australia College Consulting",
        "Younger Students Navigation Programs",
        "150 Hours Cracking Method in 1.5 Year"]}

    />,
    <ServiceCard
      key="For Schools"
      title="For Schools"
      iconBg="bg-primary md:bg-secondary"
      icon={
        <svg width="40" height="40" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_5_24" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="41" height="41">
            <rect x="0.904541" y="0.933838" width="40" height="40" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_5_24)">
            <path d="M20.9046 35.9338L9.23796 29.6005V19.6005L2.57129 15.9338L20.9046 5.93384L39.238 15.9338V29.2672H35.9046V17.7672L32.5713 19.6005V29.6005L20.9046 35.9338ZM20.9046 22.1005L32.3213 15.9338L20.9046 9.76717L9.48796 15.9338L20.9046 22.1005ZM20.9046 32.1422L29.238 27.6422V21.3505L20.9046 25.9338L12.5713 21.3505V27.6422L20.9046 32.1422Z" fill="#FEFEFF" />
          </g>
        </svg>
      }
      text={["School Reception Support in China",
        "Joint Virtual School Events in Chinese Families",
        "Marketing Research for Schools",
        "Look for Qualified Candidates within and outside of China for Schools",
        "Arrange Sino-US School Students Exchange Events ",
        "Exclusive Promotion for Schools for the Targeted Families"]}

    />
  ];
  return (
    <section className="mx-2 lg:mx-[8vw]">
      <div className="lg:hidden">
        <Slider elements={cards} showArrow showBullet />
      </div>
      <div className="hidden lg:flex flex-1 min-h-full gap-x-8">
        {cards.map((card, _) => (
          card
        ))}
      </div>
    </section>
  );
}

async function StudentReportSection() {
  const { rows: university } = await sql`SELECT * FROM university LIMIT 12`;
  const { rows: highSchool } = await sql`SELECT * FROM high_school LIMIT 12`;
  const { rows: others } = await sql`SELECT * FROM other_school LIMIT 12`;
  const panels = [
    {
      title: "University",
      content: <OfferReport schools={university} href="/university" />,
    },
    {
      title: "High School",
      content: <OfferReport schools={highSchool} href="/highschool" />,
    },
    {
      title: "Others",
      content: <OfferReport schools={others} href="/lead-program" />,
    },

  ]
  return (
    <section className="mx-8 md:mx-[8vw]">
      <Panel elements={panels} />
    </section>
  );
}

function TeamMember({ image_url: imageSrc, name, description, link }) {
  const fullText = description.join(' ');
  const isLongText = fullText.length > 100;
  const trimmedText = fullText.slice(0, 100) + '...';

  return (
    <div className="bg-white md:border-1 md:border-y-gray-50 md:border-x-none md:rounded-none shadow-lg md:shadow-none rounded-lg p-4 flex flex-col items-center space-x-4 md:space-x-0 mb-6">
      <div className="w-32 h-32">
        <Image
          src={imageSrc}
          alt={name}
          width={200}
          height={200}
          className="rounded-full mb-4"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="font-semibold text-sm text-gray-800">{name}</span>
        <div className="text-gray-600 text-sm group text-center">
          <div className="collapsed-content">
            <div className="line-clamp-wrapper">
              <div className="inline-block">{trimmedText}</div>
              {isLongText && (
                <div className="flex justify-end">
                  <label className="text-primary hover:text-primaryLight cursor-pointer">
                    <input type="checkbox" className="hidden" /> read more
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="hidden expanded-content">{fullText}</div>
        </div>
      </div>
    </div>
  );
}

async function OurTeamSection() {
  const { rows: members } = await sql`SELECT * FROM team_members`;

  return (
    <section className="mx-8 md:mx-[8vw]">
      {/* Description (visible in desktop view) */}
      <p className="text-gray-600 mb-8 hidden md:block">
        {"ULead is different from other educational companies because it focuses as much on students' growth as on application results. ULead is committed to guiding students to lifelong success by providing psychological support, tutoring, and overall planning."}
      </p>


      {/* Team Members */}
      <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 rounded-xl bg-white overflow-clip md:pt-5">
        {members.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>

      {/* Read More Button */}
      <div className="flex justify-center mt-8">
        <Button text="Read More" href="/about-us" />
      </div>
    </section>
  );
}

async function MatriculationSection() {
  const { rows: profiles } = await sql`SELECT * FROM testimonials`;
  const profileCards = profiles.map((profile, index) => (
    <AlumnProfileCard key={index} {...profile} />
  ));

  let profileCardsDesktop = [];

  for (let i = 0; i < profileCards.length; i += 3) {
    profileCardsDesktop.push((
      <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-clip">
        {profileCards.slice(i, i + 3)}
      </div>
    ));
  }

  return (
    <section className="mx-2 md:mx-[8vw]">
      <div className="hidden lg:block">
        <Slider elements={profileCardsDesktop} autoplay={false} showArrow />
      </div>
      <div className="lg:hidden">
        <Slider elements={profileCards} autoplay={false} showArrow />
      </div>
    </section>
  )
}

function AlumniCard({ alumni }) {
  const { name, image, highschool, university, universitylogo } = alumni;
  return (
    <div className="bg-white h-48 md:h-64 shadow-lg rounded-xl border">
      <div className="flex flex-col content-start justify-start">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-48 md:w-64">
            <div className="flex w-full flex-col items-center justify-start">
              <div className="bg-primary w-full mt-4 md:mt-8 md:pl-8 md:h-14 pl-4 h-10 flex items-center">
                <h2 className="text-xl font-bold bg-primary text-white">{name}</h2>
              </div>
              <div className="text-left w-full p-4 md:p-8">
                <p className="text-sm font-semibold">{university}</p>
                <p className="text-gray-500 text-xs font-bold mt-2">
                  Highschool:
                </p>
                <p className="text-gray-500 text-xs">
                  {highschool}
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-24 md:w-32 md:h-32 h-24 mt-4 md:mt-8">
            <div className="absolute z-10 -top-1 border-secrondary rounded-full right-[calc(100%-1.5rem)] md:right-[calc(100%-2rem)] w-12 h-12 md:w-16 md:h-16">
              <Image
                src={universitylogo}
                alt="University Logo"
                className="rounded-full object-cover border-[1px] border-gray-300"
                fill
              />
            </div>
            <Image
              src={image}
              alt="User"
              fill
            />
          </div>
        </div>

      </div>
    </div>
  );
}

async function UleadAlumnSection() {
  const { rows: alumns } = await sql`SELECT * FROM alumni`;

  let alumnCardsMobile = alumns.map((alumni, index) => (
    <AlumniCard alumni={alumni} key={index} />
  ));


  let alumnCardsDesktop = [];

  for (let i = 0; i < alumnCardsMobile.length; i += 3) {
    alumnCardsDesktop.push((
      <div key={i} className="grid grid-cols-3 gap-8">
        {alumnCardsMobile.slice(i, i + 3)}
      </div>
    ));
  }

  return (
    <section className="mx-0 md:mx-[8vw]">
      <div className="lg:hidden">
        <Slider elements={alumnCardsMobile} showBullet />
      </div>
      <div className="hidden lg:flex flex-col items-center gap-8">
        <Slider showBullet showArrow elements={alumnCardsDesktop} />
        <Button text="Explore More" href="/about-us" style={"bg-secondary"} />
      </div>
    </section>
  )
}

function QualificationsSection() {
  const qualifications = [
    "/img/home/qualification1.png",
    "/img/home/qualification2.png",
    "/img/home/qualification3.png",
    "/img/home/qualification4.png",
  ]
  return (
    <section className="mx-8 md:mx-[8vw] mb-16 flex flex-col items-center">
      <div className="flex items-center  gap-x-2 md:gap-x-20">
        {qualifications.map((qualification, index) => (
          <div key={index} className="w-1/5">
            <Image src={qualification} alt={`qualification-${index}`} width={200} height={200} />
          </div>
        ))}
        <div className="w-1/5">
          <IASBadge className="w-[200px] h-[200px]" certNum={'6036'} />
        </ div>
      </ div>
    </section>
  )
}
