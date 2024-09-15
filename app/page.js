import Image from "next/image";
import Header from "@/ui/Header";
import Slider from "@/ui/Slider";
import Panel from "@/ui/Panel";
import OfferItem from "@/ui/OfferItem";
import SectionHeader from "@/ui/SectionHeader";
import Button from "@/ui/Button";
import Tab from "@/ui/Tab";

export default function Home() {
  return (
    <div>
      <Header currentPath="/" />
      <MainSection />
      <SectionHeader title="Our Belief" />
      <OurBeliefSection />
      <SectionHeader title="Our Services" />
      <OurServicesSection />
      <SectionHeader title="Student Report" />
      <StudentReportSection />
      <SectionHeader title="Our Team" />
      <OurTeamSection />
      <SectionHeader title="ULead Alumn" />
      <SectionHeader title="Testimonials" />
      <SectionHeader title="Qualifications" />
    </div>
  );
}


function MainSection() {
  return (
    <section className="relative w-full h-[25vh] md:h-[40vh]"> {/* 20% of screen height */}
      {/* Background Image */}
      <Image
        src="/img/home/gallery1.png"
        alt="Slider"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        priority
        className="z-0"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-4 md:pl-32 text-center text-white">
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
    <section className="mx-8 md:mx-[8vw] bg-white">
      {/* Content */}
      <div className="flex flex-row md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="md:w-2/5 flex-col w-full">
          <h3 className="hidden md:block text-3xl font-bold mb-4">
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
          <div className="grid w-full justify-items-center md:justify-items-start">
            <Button href='/about-us' text='About Us' />
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex md:w-3/5 mt-8 md:mt-0 justify-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/img/home/student_learning.png"
              alt="Student Learning"
              width={600}
              height={400}
              className="rounded-md shadow-lg"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="p-2 rounded-full">
                <Image src="/img/play_button.svg" width={80} height={80} alt="play" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, icon, iconBg, text }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-lg text-center">
      <div className="flex justify-center mb-4">
        <div className={`${iconBg} p-4 rounded-full`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{text}</p>
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
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
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
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
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
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    />
  ];
  return (
    <section className="py-8 mx-2 md:mx-[8vw]">
      <div className="md:hidden">
        <Slider elements={cards}></Slider>
      </div>
      <div className="hidden md:flex gap-x-16 justify-center items-center">
        {cards.map((card, _) => (
          card
        ))}
      </div>
    </section>
  );
}

function OfferReport({ schools, href }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school, index) => (
          <div key={index} className={`${index >= 5 ? 'hidden' : ''} md:${index >= 10 ? 'hidden' : 'block'}`}>
            <OfferItem {...school} />
          </div>
        ))}

      </div>
      <div className="flex justify-center mt-8">
        <Button text="Read More" href={href} />
      </div>
    </div>
  );
}

function StudentReportSection() {
  const university = [
    { school: 'Baylor School(TN)', count: '1', logo: '/img/school/logo1.png' },
    { school: 'Deerfield Academy', count: '3', logo: '/img/school/logo2.png' },
    { school: 'Miss Hall\'s School', count: '2', logo: '/img/school/logo3.png' },
    { school: 'The Hotchkiss School', count: '2', logo: '/img/school/logo4.png' },
    { school: 'Choate Rosemary Hall', count: '2', logo: '/img/school/logo5.png' },
    { school: 'Baylor School(TN)', count: '1', logo: '/img/school/logo1.png' },
    { school: 'Deerfield Academy', count: '3', logo: '/img/school/logo2.png' },
    { school: 'Miss Hall\'s School', count: '2', logo: '/img/school/logo3.png' },
    { school: 'The Hotchkiss School', count: '2', logo: '/img/school/logo4.png' },
    { school: 'Choate Rosemary Hall', count: '2', logo: '/img/school/logo5.png' }
  ];
  const highSchool = university;
  const others = university;


  const panels = [
    {
      title: "University",
      content: <OfferReport schools={university} href="/university" />,
    },
    {
      title: "High School",
      content: <OfferReport schools={highSchool} href="/high-school" />,
    },
    {
      title: "Others",
      content: <OfferReport schools={others} href="/university" />,
    },

  ]
  return (
    <section className="mx-8 md:mx-[16vw]">
      <Panel elements={panels} />
    </section>
  );
}

function TeamMember({ imageSrc, name, description, link }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image src={imageSrc} alt={name} width={64} height={64} objectFit="cover" />
      </div>
      <div>
        {/* <p className="font-semibold text-gray-800">{name}</p> */}
        <p className="text-gray-600 text-sm">
          {description}
          <a href={link} className="text-primary cursor-pointer"> Read More</a>
        </p>
      </div>
    </div>
  );
}

function OurTeamSection() {
  const tabs = [
    {
      key: 'consultant', label: 'Consultant', members: [
        { imageSrc: '/img/team-1.png', name: 'Christina Wang', description: 'Christina Wang holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-2.png', name: 'John Doe', description: 'John Doe holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-3.png', name: 'Jane Smith', description: 'Jane Smith holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-4.png', name: 'Adam White', description: 'Adam White holds a bachelor\'s degree from Beijing Foreign Studies University...' }
      ]
    },
    {
      key: 'professionals', label: 'Professionals', members: [
        { imageSrc: '/img/team-1.png', name: 'Christina Wang', description: 'Christina Wang holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-2.png', name: 'John Doe', description: 'John Doe holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-3.png', name: 'Jane Smith', description: 'Jane Smith holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-4.png', name: 'Adam White', description: 'Adam White holds a bachelor\'s degree from Beijing Foreign Studies University...' }
      ]
    },
    {
      key: 'planning', label: 'Planning', members: [
        { imageSrc: '/img/team-1.png', name: 'Christina Wang', description: 'Christina Wang holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-2.png', name: 'John Doe', description: 'John Doe holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-3.png', name: 'Jane Smith', description: 'Jane Smith holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-4.png', name: 'Adam White', description: 'Adam White holds a bachelor\'s degree from Beijing Foreign Studies University...' }
      ]
    },
    {
      key: 'interviews', label: 'Interviews', members: [
        { imageSrc: '/img/team-1.png', name: 'Christina Wang', description: 'Christina Wang holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-2.png', name: 'John Doe', description: 'John Doe holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-3.png', name: 'Jane Smith', description: 'Jane Smith holds a bachelor\'s degree from Beijing Foreign Studies University...' },
        { imageSrc: '/img/team-4.png', name: 'Adam White', description: 'Adam White holds a bachelor\'s degree from Beijing Foreign Studies University...' }
      ]
    }
  ];

  return (
    <section className="mx-8 md:mx-[8vw]">
      {/* Description (visible in desktop view) */}
      <p className="text-gray-600 mb-8 hidden md:block">
        {"ULead is different from other educational companies because it focuses as much on students' growth as on application results. ULead is committed to guiding students to lifelong success by providing psychological support, tutoring, and overall planning."}
      </p>


      {/* Team Members */}
      <Tab elements={tabs.map((tab) => {
        return {
          key: tab.key, label: tab.label, content: (
            <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tab.members.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          )
        }
      })} />

      {/* Read More Button */}
      <div className="flex justify-center mt-8">
        <Button text="Read More" href="/about-us" />
      </div>
    </section>
  );
}
