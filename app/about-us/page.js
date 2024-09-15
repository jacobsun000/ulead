import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image'

const TeamMember = ({ name, imageSrc, description }) => (
  <div className="flex flex-col items-center text-center">
    <Image
      src={imageSrc}
      alt={name}
      width={250}
      height={250}
      className="rounded-full mb-4"
    />
    <h3 className="font-bold text-xl mb-2">{name}</h3>
    <ul className="text-sm list-disc list-inside text-left">
      {description.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function AboutUs() {

  const teamMembers = [
    {
      name: "Tom",
      imageSrc: "/img/aboutus/Tom.png",
      description: [
        "With 30 years of experience in admission management",
        "A renowned expert in the United States",
        "Leader in the field of independent school admissions",
        "Alumni of Dartmouth College, an Ivy League school",
        "Former admissions officer at Cardigan Mountain School",
        "Has served as principal and director of admissions at several independent schools"
      ]
    },
    {
      name: "Andy",
      imageSrc: "/img/aboutus/Andy.png",
      description: [
        "Former admissions officer at Columbia University",
        "Master of Journalism from Northwestern University / Bachelor of Political Science from Columbia University",
        "Awards as a journalist and writer: DuPont–Columbia Award, Emmy Award, Peabody Award, etc.",
        "Successful admissions cases at Ivy League schools like Harvard and top 30 U.S. undergraduate programs"
      ]
    },
    {
      name: "Ray",
      imageSrc: "/img/aboutus/Ray.png",
      description: [
        "Chief Consultant, Master of Psychology in Education from the University of Hong Kong",
        "Creative design activities",
        "Close communication"
      ]
    },
    {
      name: "Anna",
      imageSrc: "/img/aboutus/Anna.png",
      description: [
        "Proficient in six languages",
        "Specializes in multilingual translation/ language tutoring",
        "Verbal and interview coaching"
      ]
    }
  ];

  return (
    <div>
      <Header currentPath="/about-us" />

      <div className="mx-auto">
        <div className="relative h-[400px] mb-12">
          <Image
            src="/img/aboutus/bg.png"
            alt="Graduation"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-4xl w-full mx-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-red-600">U</span>
                <span className="text-blue-900">LEAD</span> Mission
              </h2>
              <p className="text-lg">A mentor for children's growth, a steward of education for families</p>
              <div className="flex justify-center mt-4">
                <span className="h-2 w-2 mx-1 rounded-full bg-gray-300" />
                <span className="h-2 w-2 mx-1 rounded-full bg-gray-300" />
                <span className="h-2 w-2 mx-1 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-4">
          <div className="flex flex-col md:flex-row items-center max-w-5xl w-full p-8 rounded-lg">
            <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <Image
                src="/img/aboutus/founder.png"
                alt="ULEAD Founder"
                width={300}
                height={300}
                className="rounded-full mx-auto"
              />
            </div>
            <div className="w-full md:w-2/3 ml-7">
              <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                <span className="text-red-600">U</span>
                <span className="text-blue-800">LEAD</span> Founder
              </h2>
              <ul className="list-disc list-inside space-y-2 ml">
                <li>Certified Consultant of the Independent Educational Consultants Association (IECA)</li>
                <li>Certified Member of the Enrollment Management Association (EMA)</li>
                <li>Certified Member of the National Association for College Admission Counseling (NACAC)</li>
                <li>Certified Psychologist of the Chinese Academy of Sciences</li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl w-full mt-8 p-6 rounded-lg relative">
            <p className="text-lg text-left px-8 font-bold">
              As a consultant, by continuously learning and accumulating experience, we continuously iterate the methodologies in counseling, focusing on leading children and families well!
            </p>
          </div>
        </div>
      </div>



      <SectionHeader title={"Core Team"} />
      <div className="mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>

      <BackButton />
      <Footer />
    </div >
  );
}
