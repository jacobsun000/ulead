import Header from "@/ui/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header currentPath="/" />
      <MainSection />
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
          href="#"
          className="
            bg-primary text-white px-10 text-2xl py-3 rounded-sm shadow-lg 
            hidden md:block
            hover:bg-red-700 transition duration-300"
        >
          Chat Now
        </a>
      </div>
    </section>
  );
}

