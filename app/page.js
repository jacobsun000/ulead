import Image from "next/image";
import Header from "@/ui/Header";
import Slider from "@/ui/Slider";
import Panel from "@/ui/Panel";
import OfferItem from "@/ui/OfferItem";
import SectionHeader from "@/ui/SectionHeader";
import Button from "@/ui/Button";
import Tab from "@/ui/Tab";
import Footer from "@/ui/Footer";
import BackToTopButton from "@/ui/Back";
import Video from "@/ui/Video";
import TabVertical from "@/ui/TabVertical";

export default function Home() {
  return (
    <div className="bg-[#f5f5f5]">
      <Header currentPath="/" />
      <MainSection />
      <div className="w-5/6 mx-auto md:hidden my-4">
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
      <SectionHeader title="Testimonials" />
      <UleadAlumnSection />
      <SectionHeader title="ULead Alumn" />
      <TestimonialsSection />
      <SectionHeader title="Qualifications" />
      <QualificationsSection />
      <BackToTopButton />
      <Footer />
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
    <section className="mx-8 md:mx-[10vw]">
      {/* Content */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center md:gap-x-16">
        {/* Video Section */}
        <div className="hidden md:block md:w-1/2 md:h-full mb-4">
          <Video src="/img/home/video.mp4" poster="/img/home/video_poster.png" />
        </div>
        {/* Text Section */}
        <div className="md:w-2/5 flex-col w-full">
          <h3 className="hidden md:block text-4xl font-bold mb-4">
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
      </div>
    </section>
  );
}

function ServiceCard({ title, icon, iconBg, text }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-4 md:w-1/3 h-[28rem] text-center">
      <div className="flex justify-center mb-4">
        <div className={`${iconBg} p-4 rounded-full`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-left pl-4">
        {text.map((t, index) => (
          <p key={index} className="text-gray-600 text-xs md:text-sm mb-4">{t}</p>
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
    <section className="mx-2 md:mx-[8vw]">
      <div className="md:hidden">
        <Slider elements={cards} showArrow showBullet />
      </div>
      <div className="hidden md:flex gap-x-8 justify-center items-center relative">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
    { logo: '/img/school/1.png', school: 'Peddie School(NJ)', count: '1' },
    { logo: '/img/school/2.png', school: 'Episcopal High School(VA)', count: '3' },
    { logo: '/img/school/3.png', school: 'Western Reserve Academy(OH)', count: '4' },
    { logo: '/img/school/4.png', school: 'The Webb Schools(CA)', count: '8' },
    { logo: '/img/school/5.png', school: 'Stevenson School(CA)', count: '1' },
    { logo: '/img/school/6.png', school: 'Emma Willard School (NJ)', count: '3' },
    { logo: '/img/school/7.png', school: 'Miss Porter\'s School(CT)', count: '3' },
    { logo: '/img/school/8.png', school: 'Oregon Episcopal School(OR)', count: '8' },
    { logo: '/img/school/9.png', school: 'Culver Academies(IN)', count: '7' },
    { logo: '/img/school/10.png', school: 'Cranbrook School(MI)', count: '6' },
    { logo: '/img/school/11.png', school: 'The Madeira School(VA)', count: '4' },
    { logo: '/img/school/12.png', school: 'The Athenian School(CA)', count: '1' },
    { logo: '/img/school/13.png', school: 'The Hun School of Princeton(NJ)', count: '1' },
    { logo: '/img/school/14.png', school: 'Canterbury School(CT)', count: '1' },
    { logo: '/img/school/15.png', school: 'Virginia Episcopal School(VA)', count: '1' },
    { logo: '/img/school/16.png', school: 'Interlochen Arts Academy(MI)', count: '1' },
    { logo: '/img/school/17.png', school: 'Idyllwild Arts Academy(CA)', count: '1' },
    { logo: '/img/school/18.png', school: 'McCallie School(TN)', count: '4' },
    { logo: '/img/school/19.png', school: 'Indian Springs School(AL)', count: '3' },
    { logo: '/img/school/20.png', school: 'Iolani School(Hawaii)', count: '12' },
    { logo: '/img/school/21.png', school: 'Lake Forest Academy(IL)', count: '4' },
    { logo: '/img/school/22.png', school: 'Kimball Union Academy(NH)', count: '4' },
    { logo: '/img/school/23.png', school: 'Millbrook School(NY)', count: '2' },
    { logo: '/img/school/24.png', school: 'The Ethel Walker School(CT)', count: '2' },
    { logo: '/img/school/25.png', school: 'Miss Hall\'s School(MA)', count: '5' },
    { logo: '/img/school/26.png', school: 'St. Johnsbury Academy(VT)', count: '2' },
    { logo: '/img/school/27.png', school: 'Santa Catalina School(CA)', count: '1' },
    { logo: '/img/school/28.png', school: 'Baylor School(TN)', count: '4' },
    { logo: '/img/school/29.png', school: 'Wilbraham & Monson Academy(MA)', count: '3' },
    { logo: '/img/school/30.png', school: 'Saint James School(MD)', count: '1' },
    { logo: '/img/school/31.png', school: 'Asheville School(NC)', count: '1' },
    { logo: '/img/school/32.png', school: 'St. Mark\'s School(MA)', count: '3' },
    { logo: '/img/school/33.png', school: 'Westminster School(CT)', count: '2' },
    { logo: '/img/school/34.png', school: 'North?eld Mount HermonSchool(MA)', count: '2' },
    { logo: '/img/school/35.png', school: 'The Governor\'s Academy(MA)', count: '2' },
    { logo: '/img/school/36.png', school: 'Kent School(CT)', count: '3' },
    { logo: '/img/school/37.png', school: 'St. Andrew\'s School(DE)', count: '3' },
    { logo: '/img/school/38.png', school: 'Pomfret School(CT)', count: '2' },
    { logo: '/img/school/39.png', school: 'Mercersburg Academy(PA)', count: '3' },
    { logo: '/img/school/40.png', school: 'Westtown School(PA)', count: '4' },
    { logo: '/img/school/41.png', school: 'Williston Northampton School(MA)', count: '4' },
    { logo: '/img/school/42.png', school: 'Tabor Academy(MA)', count: '4' },
    { logo: '/img/school/43.png', school: 'George School(PA)', count: '3' },
    { logo: '/img/school/44.png', school: 'The Stony Brook School(NY)', count: '9' },
    { logo: '/img/school/45.png', school: 'Walnut Hill School for the Arts(MA)', count: '3' },
    { logo: '/img/school/46.png', school: 'The Masters School(NJ)', count: '1' },
    { logo: '/img/school/47.png', school: 'Miss Porter\'s School(CT)', count: '3' },
    { logo: '/img/school/48.png', school: 'The Madeira School(VA)', count: '4' },
    { logo: '/img/school/49.png', school: 'Emma Willard School(NJ)', count: '3' },
    { logo: '/img/school/50.png', school: 'The Ethel Walker School(CT)', count: '2' },
    { logo: '/img/school/51.png', school: 'McCallie School(TN)', count: '3' },
    { logo: '/img/school/52.png', school: 'Miss Hall\'s School(MA)', count: '5' },
    { logo: '/img/school/53.png', school: 'Georgetown Preparatory School(MD)', count: '1' },
    { logo: '/img/school/54.png', school: 'Phillips Academy Andover(MA)', count: '1' },
    { logo: '/img/school/55.png', school: 'The Lawrenceville School(NJ)', count: '1' },
    { logo: '/img/school/56.png', school: 'Choate Rosemary Hall(CT)', count: '3' },
    { logo: '/img/school/57.png', school: 'Groton School(MA)', count: '1' },
    { logo: '/img/school/58.png', school: 'The Hotchkiss School(CT)', count: '2' },
    { logo: '/img/school/59.png', school: 'Concord Academy(MA)', count: '1' },
    { logo: '/img/school/60.png', school: 'Middlesex School(MA)', count: '1' },
    { logo: '/img/school/61.png', school: 'Deer?eld Academy(MA)', count: '4' },
    { logo: '/img/school/62.png', school: 'The Hill School(PA)', count: '2' },
    { logo: '/img/school/63.png', school: 'The Taft School(CT)', count: '2' },
    { logo: '/img/school/64.png', school: 'Fay School(MA)', count: '2' },
    { logo: '/img/school/65.png', school: 'The Rectory School(CT)', count: '3' },
    { logo: '/img/school/66.png', school: 'Cardigan Mountain School(NH)', count: '1' },
    { logo: '/img/school/67.png', school: 'Hillside School(MA)', count: '2' },
    { logo: '/img/school/68.png', school: 'Applewild School(MA)', count: '2' },
    { logo: '/img/school/69.png', school: 'North Country School(NY)', count: '1' },
    { logo: '/img/school/70.png', school: 'Eaglebrook School(MA)', count: '1' },
    { logo: '/img/school/71.png', school: 'The Bement  School(MA)', count: '1' },
    { logo: '/img/school/72.png', school: 'Havergal College', count: '1' },
    { logo: '/img/school/73.png', school: 'Ridley College', count: '1' },
    { logo: '/img/school/74.png', school: 'Ashbury College', count: '1' },
    { logo: '/img/school/75.png', school: 'Georges Vanier Secondary School', count: '1' },
    { logo: '/img/school/76.png', school: 'La Jolla Country Day School(CA)', count: '2' },
    { logo: '/img/school/77.png', school: 'Francis Parker School (CA)', count: '2' },
    { logo: '/img/school/78.png', school: 'The Waverly School(CA)', count: '1' },
    { logo: '/img/school/79.png', school: 'Windermere Preparatory School(FL)', count: '1' },
    { logo: '/img/school/80.png', school: 'America Heritage Schools(FL)', count: '1' },
    { logo: '/img/school/81.png', school: 'The Bishop\'s School(CA)', count: '2' },
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
      content: <OfferReport schools={highSchool} href="/highschool" />,
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
    <div className="bg-white md:border-1 md:border-y-gray-50 md:border-x-none md:rounded-none shadow-lg md:shadow-none rounded-lg p-4 flex md:flex-col items-center space-x-4 md:space-x-0 mb-6">
      <Image
        src={imageSrc}
        alt={name}
        width={64}
        height={64}
        className="rounded-full mb-4"
      />
      <div>
        <span className="md:hidden font-semibold text-xs text-gray-800">{name}</span>
        <p className="text-gray-600 text-sm">
          {description}
          <a href={link} className="md:hidden text-primary cursor-pointer"> Read More</a>
        </p>
      </div>
    </div>
  );
}

function OurTeamSection() {
  const members = [
    {
      name: "Christina",
      imageSrc: "/img/aboutus/founder.png",
      description: [
        "Certified Consultant of the Independent Educational Consultants Association (IECA). ",
        "Certified Member of the Enrollment Management Association (EMA)...",
      ]

    },
    {
      name: "Tom",
      imageSrc: "/img/aboutus/Tom.png",
      description: [
        "With 30 years of experience in admission management. ",
        "A renowned expert in the United States. ",
        "Leader in the field of independent school admissions...",
      ]
    },
    {
      name: "Andy",
      imageSrc: "/img/aboutus/Andy.png",
      description: [
        "Former admissions officer at Columbia University. ",
        "Master of Journalism from Northwestern University / Bachelor of Political Science from Columbia University...",
      ]
    },
    {
      name: "Ray",
      imageSrc: "/img/aboutus/Ray.png",
      description: [
        "Chief Consultant, Master of Psychology in Education from the University of Hong Kong. ",
        "Creative design activities. ",
        "Close communication..."
      ]
    },
    {
      name: "Anna",
      imageSrc: "/img/aboutus/Anna.png",
      description: [
        "Proficient in six languages. ",
        "Specializes in multilingual translation/ language tutoring. ",
        "Verbal and interview coaching..."
      ]
    }
  ];
  const tabs = [
    { key: 'consultant', label: 'Consultant', members },
    { key: 'professionals', label: 'Professionals', members },
    { key: 'planning', label: 'Planning', members },
    { key: 'interviews', label: 'Interviews', members }
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
            <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 rounded-xl bg-white overflow-clip md:pt-5">
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

function AlumnProfileCard({ imageSrc, name, highschool, offers, experiences }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Top Section */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Profile Image */}
        <div className="flex flex-col">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image src={imageSrc} alt={name} width={64} height={64} objectFit="cover" />
          </div>
          <p className="md:hidden font-semibold text-xs text-secondary">{name}</p>
        </div>

        {/* Profile Information */}
        <div>
          <p className="hidden md:block text-xl font-semibold text-primary">{name}</p>
          <p className="text-xs md:text-sm mb-2"><span className="font-bold">Highschool:</span> {highschool}</p>
          <p className="text-xs md:text-sm"><span className="font-bold">Offers:</span></p>
          {offers.map((offer, index) => (
            <p key={index} className="text-xs md:text-sm">{offer}</p>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* Experience Sharing Section */}
      <h3 className="text-sm md:text-lg text-center font-semibold text-secondary mb-4">Experience Sharing</h3>
      <ul className="list-disc list-inside text-xs md:text-sm">
        {experiences.map((experience, index) => (
          <li key={index}>{experience}</li>
        ))}
      </ul>

      {/* Read More Button */}
      <div className="flex md:hidden mt-6 justify-center">
        <Button style={'text-xs'} text="Read More" href="/about-us" />
      </div>
    </div>
  );
}

function UleadAlumnSection() {
  const alumnProfiles = [
    {
      imageSrc: '/img/icon-female.png',
      name: 'Student L',
      highschool: 'Deerfield Academy',
      offers: ['Culver', 'Cranbrook'],
      experiences: ['His athletic strengths have been professionally recognized by the coach. Through role-playing and learning from each other, as well as taking detailed notes and highlighting key points, his hard work further enhanced his interview performance. Both his fluency in language and logical thinking were effectively improved!']
    },
    {
      imageSrc: '/img/icon-male.png',
      name: 'Student Z',
      highschool: 'Deerfield Academy',
      offers: ['Choate', 'Taft', 'Loomis'],
      experiences: ['In addition to attending Choat\'s summer school, the student also visited and compared several top boarding schools, thus deciding early on that Choate would be their dream school. The student started reading English literature at a young age and, besides an interest in math and physics, also developed a passion for history and Greek mythology. The teacher who interviewed the student happened to also teach history, so during the interview, the student\'s knowledge and background could be well demonstrated. Studying debate from a young age also helped the student enhance their logical thinking and communication skills, which further showcased their confidence.']
    },
    {
      imageSrc: '/img/icon-female.png',
      name: 'Student S',
      highschool: 'Deerfield Academy',
      offers: ['Westminster', 'Canterbury'],
      experiences: ['He is a particularly warm-hearted child, very polite, and willing to share with others. The first draft of his application essay was already very vivid and full of imagery. He has strong comprehension skills and can quickly make adjustments to the logic of the essay, which is why the quality of his writing is exceptionally high!']
    },
    {
      imageSrc: '/img/icon-male.png',
      name: 'Student Y',
      highschool: 'Deerfield Academy',
      offers: ['St. Mark', 'EHS', 'Stony Brook'],
      experiences: ['Student Y is a very kind and compassionate child, passionate about public service and genuinely dedicated! ',
        'This was clearly reflected in his overall interview, essays, and other application materials. During the interview preparation, Y\'s stories were very touching, especially the one about helping a young Tibetan child with pronunciation.',
        'Through repeated practice until his delivery was emotional and impactful, he ultimately left a lasting impression.']
    },
    {
      imageSrc: '/img/icon-female.png',
      name: 'Student D',
      highschool: 'Deerfield Academy',
      offers: ['Choate', 'Tabor'],
      experiences: ['He excels in mathematics and enjoys playing the clarinet.',
        'He has a strong ability to grasp concepts quickly and is highly efficient, always completing tasks on time without procrastination.',
        'In the application process, the student\'s own potential, hard work, professional guidance, and close communication were all essential factors for success!']
    },
    {
      imageSrc: '/img/icon-male.png',
      name: 'Student T',
      highschool: 'Deerfield Academy',
      offers: ['Webbs', 'Mercersburg'],
      experiences: ['Student T has a wealth of experiences, is multi-talented, and actively participates in various activities both inside and outside of school!',
        'However, despite her optimism, she faced setbacks during her application to U.S. high schools, which weighed heavily on her mind. She didn’t want to give up any of her activities.',
        'With patient support, she eventually learned to manage her time well, not only maintaining her extracurricular commitments but also dedicating significant time to her application preparation. Reflecting on this challenging yet rewarding journey, she gained many insights!']
    },
  ];
  const alumnProfileCards = alumnProfiles.map((profile, index) => (
    <AlumnProfileCard key={index} {...profile} />
  ));

  let alumnProfileCardsDesktop = [];

  for (let i = 0; i < alumnProfileCards.length; i += 3) {
    alumnProfileCardsDesktop.push((
      <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alumnProfileCards.slice(i, i + 3)}
      </div>
    ));
  }

  return (
    <section className="mx-2 md:mx-[8vw]">
      <div className="hidden md:block">
        <Slider elements={alumnProfileCardsDesktop} autoplay={false} showArrow />
      </div>
      <div className="md:hidden">
        <Slider elements={alumnProfileCards} autoplay={false} showArrow />
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael",
      image: "/img/home/alumn1.jpg",
      schools: ["The Webb Schools", "Princeton University"]
    }, {
      name: "Lily",
      image: "/img/home/alumn2.jpg",
      schools: ["Deerfield Academy", "Yale University"]
    }, {
      name: "Linda",
      image: "/img/home/alumn3.jpg",
      schools: ["St.Paul's School", "Columbia University"]
    }, {
      name: "David",
      image: "/img/home/alumn4.png",
      schools: ["Choate/Princeton Int School", "Massachusetts Institute of Technology"]
    }, {
      name: "Vanessa",
      image: "/img/home/alumn5.jpg",
      schools: ["The Thacher School", "University of Pennsylvania"]
    }, {
      name: "Russell",
      image: "/img/home/alumn6.jpg",
      schools: ["The Stony Brook School", "New York University-Stern School"]
    }, {
      name: "Jack",
      image: "/img/home/alumn7.jpg",
      schools: ["Cranbrook Schools", "University of Michigan"]
    }, {
      name: "Coco",
      image: "/img/home/alumn8.jpg",
      schools: ["Mercersburg Academy", "Berkelee College of Music"]
    }
  ];

  let testimonialCardsMobile = testimonials.map((testimonial, index) => (
    <div key={index} className="bg-white rounded-lg shadow-lg gap-x-4 p-6 md:max-w-md w-[80vw] flex">
      <div className="w-16 h-16 gap-y-2 flex flex-col align-center mb-4">
        <Image className="rounded-full" src={testimonial.image} alt="img" width={64} height={64} objectFit="cover" />
        <h3 className="text-sm font-semibold text-center mb-8">{testimonial.name}</h3>
      </div>
      <div className="">
        <div className="text-gray-600 text-xs mb-4">
          {testimonial.schools.map((school, index) => (
            <p key={index} className="mr-2">{school};</p>
          ))}
        </div>
        <p className="text-gray-600 text-xs">{testimonial.description}</p>
      </div>
    </div>
  ));

  const testimonialCards = testimonials.map((t) => (
    {
      label: (
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mr-4 border-2 border-secondary">
              <Image src={t.image} alt={t.name} width={48} height={48} objectFit="cover" />
            </div>
            <p className="font-semibold text-center">{t.name}</p>
          </div>
          <div className="text-left">
            <p className="font-semibold mb-4">{t.major}</p>
            <p className="font-semibold">Offers:</p>
            <p className="mb-4">
              {t.schools.map((school, index) => (
                <span key={index} className="mr-2">{school};</span>
              ))}
            </p>
          </div>
        </div>
      ),
      content: (
        <div>
          <h3 className="text-lg font-semibold">{t.descriptionTitle}</h3>
          <p>{t.description}</p>
        </div>
      ),
    }
  ));
  return (
    <section className="mx-0 md:mx-[8vw]">
      <div className="md:hidden">
        <Slider elements={testimonialCardsMobile} showBullet />
      </div>
      <div className="hidden md:flex flex-col items-center gap-8">
        <Slider showBullet showArrow elements={testimonialCardsMobile} />
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
    "/img/home/qualification5.png",
  ]
  return (
    <section className="mx-8 md:mx-[8vw] mb-16">
      <div className="flex items-center gap-x-2">
        {qualifications.map((qualification, index) => (
          <div key={index} className="w-1/5">
            <Image src={qualification} alt={`qualification-${index}`} width={200} height={200} />
          </div>
        ))}
      </ div>
    </section>
  )
}
