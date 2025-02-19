import { sql } from '@vercel/postgres';
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'
import Slider from "@/ui/Slider";
import Quote from "@/ui/Quote";
import Button from "@/ui/Button";


const TeamMember = ({ name, image_url: imageSrc, description }) => (
  <div className="flex flex-col items-center text-center">
    <Image
      src={imageSrc}
      alt={name}
      width={250}
      height={250}
      className="rounded-full mb-4"
    />
    <h3 className="font-bold text-lg mb-2">{name}</h3>
    <ul className="text-sm list-none text-center">
      {description.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default async function AboutUs() {
  const { rows: members } = await sql`SELECT * FROM team_members`;

  return (
    <div>

      <div className="mx-auto">
        <div className="relative h-52 lg:h-96 mb-12">
          <Image
            src="/img/aboutus/bg.png"
            alt="Graduation"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black/50 hidden lg:flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold mb-4">
                About Us
              </h2>
            </div>
          </div>
          <div className="absolute inset-0 flex lg:hidden items-center justify-center">
            <Slider showBullet elements={[
              <div key={'Mission'} className="rounded-xl shadow-sm h-full bg-white bg-opacity-70 p-4">
                <h3 className="md:text-xl font-bold mt-2 mb-2 text-center">
                  <span className="text-primary">U</span>
                  <span className="text-secondary">LEAD Mission</span>
                </h3>
                <div className="text-sm md:text-lg">{"A mentor for children's growth, a steward of education for families"}</div>
              </div>,
              <div key={"Vision"} className="rounded-xl shadow-sm h-full bg-white bg-opacity-70 p-4">
                <h3 className="md:text-xl font-bold mt-2 mb-2 text-center">
                  <span className="text-primary">U</span>
                  <span className="text-secondary">LEAD Vision</span>
                </h3>
                <div className="text-sm md:text-lg">{"We strive for excellence, fairness, inclusivity, continuous improvement, and sustainable development"}</div>
              </div>,
              <div key={"Value"} className="rounded-xl shadow-sm h-full bg-white bg-opacity-70 p-4">
                <h3 className="md:text-xl font-bold mt-2 mb-2 text-center">
                  <span className="text-primary">U</span>
                  <span className="text-secondary">LEAD Value</span>
                </h3>
                <div className="text-sm md:text-lg">{"Integrity, professionalism, diversity, collaboration, responsibility, innovation"}</div>
              </div>
            ]} />
          </div>
        </div>

        <Quote text="As a consultant, by continuously learning and accumulating experience, we continuously iterate the methodologies in counseling, focusing on leading children and families well!" />

        <div className="flex flex-col items-center md:mx-[8vw]">
          <div className="flex flex-col md:flex-row items-center max-w-5xl w-full p-8 rounded-lg">
            <div className="w-1/2 md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <Image
                src={members[0].image_url}
                alt="ULEAD Founder"
                width={300}
                height={300}
                className="rounded-full mx-auto"
              />
              <h2 className="text-lg md:text-2xl font-bold mt-4 mb-4 text-center">
                <span className="text-primary">U</span>
                <span className="text-secondary">LEAD Founder</span>
              </h2>
            </div>
            <div className="w-full md:w-2/3 ml-7">
              <h2 className="font-bold text-lg md:text-4xl text-secondary mb-4 md:mb-8">{members[0].name}</h2>
              <ul className="text-sm md:text-[1rem] list-disc space-y-2 ml ml-4">
                {members[0].description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center lg:pb-16 lg:mb-8">
          <div className="w-full h-full bg-[#213A6C] opacity-10 absolute mb-4 top-0 left-0 rounded-b-[50%] -z-10"></div>

          <div className="grid grid-cols-3 mt-8 gap-4 lg:gap-8 items-center mx-[8vw]">
            <div className="rounded-xl shadow-sm h-full bg-white bg-opacity-70 p-4">
              <h3 className="text-2xl font-bold mt-4 mb-4 text-center">
                <span className="text-primary">U</span>
                <span className="text-secondary">LEAD Mission</span>
              </h3>
              <div className="text-lg px-4 text-center">
                {"A mentor for children's growth, a steward of education for families"}
              </div>
            </div>

            <div className="rounded-xl shadow-sm h-full bg-white bg-opacity-70 p-4">
              <h3 className="text-2xl font-bold mt-4 mb-4 text-center">
                <span className="text-primary">U</span>
                <span className="text-secondary">LEAD Vision</span>
              </h3>
              <div className="text-lg px-4 text-center">
                {"We strive for excellence, fairness, inclusivity, continuous improvement, and sustainable development"}
              </div>
            </div>

            <div className="rounded-xl shadow-sm h-full bg-white bg-opacity-70 p-4">
              <h3 className="text-2xl font-bold mt-4 mb-4 text-center">
                <span className="text-primary">U</span>
                <span className="text-secondary">LEAD Value</span>
              </h3>
              <div className="text-lg px-4 text-center">
                {"Integrity, professionalism, diversity, collaboration, responsibility, innovation"}
              </div>
            </div>
          </div>
        </div>
      </div>


      <SectionHeader title={"Core Team"} />
      <div className="mx-[8vw] mb-12">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.slice(1).map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>

      <div className="text-center mb-4">
        <Button text="More Details" href="/contacts" />
      </div>

      <BackButton />
    </div >
  );
}
