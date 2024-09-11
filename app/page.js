import Header from "@/ui/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header currentPath="/" />
      <MainSection />
      <SectionHeader title="Our Belief" />
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

