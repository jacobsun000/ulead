import Header from "@/ui/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header currentPath="/" />
      <MainSection />
      <SectionHeader title="Our Belief" />
      <OurBeliefSection />
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex flex-col items-center mb-8 mt-10 mx-8">
      {/* Title with surrounding lines and diamonds */}
      <div className="flex items-center w-full justify-center">
        {/* Left line with diamond */}
        <div className="flex items-center w-1/4 md:w-2/5 justify-end">
          <div className="w-full border-t border-gray-300"></div>
          <div className="w-1 h-1 translate-x-[-0.5rem] bg-gray-400 rotate-45 transform ml-2"></div> {/* Diamond */}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl md:font-medium text-black mx-6 md:mx-4">
          {title}
        </h2>

        {/* Right line with diamond */}
        <div className="flex items-center w-1/4 md:w-2/5">
          <div className="w-1 h-1 translate-x-[0.5rem] bg-gray-400 rotate-45 transform mr-2"></div> {/* Diamond */}
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

function MainSection() {
  return (
    <section className="relative w-full h-[25vh] md:h-[40vh]"> {/* 20% of screen height */}
      {/* Background Image */}
      <Image
        src="/img/slider1.png"
        alt="Slider"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        priority
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
    <section className="py-12 px-4 md:px-16 bg-white">
      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl font-bold text-primary mb-4">
            ULEAD Education
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            {`ULead Education provides high-level, personalized advising and tutoring
            for elite families from Mainland China, Singapore, South Korea, and Japan.
            The company is fully committed to each student's individualized growth.
            Consultants serve as students' academic tutors, personal mentors, and
            collaborate closely with their families to form intimate, trusting
            relationships.`}
          </p>
          <a href="/about-us" className="bg-primary text-white px-6 py-2 rounded-full">
            About Us
          </a>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/img/your-image.png" // Replace with the actual image path
              alt="Student Learning"
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-md shadow-lg"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white p-2 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.333 3.684A1 1 0 017 13.99V9.01a1 1 0 011.419-.908l6.333 3.684a1 1 0 010 1.776z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

