import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import Image from 'next/image'

export default function Partners() {
  return (
    <div>
      <Header currentPath="/university" />
      <div className="relative h-[50vh]">
        <Image
          src="/img/university/header.svg"
          alt="Graduation"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8">
          <h1 className="text-4xl font-bold text-black mb-8 ml-10">
            University Application<br />Consultation
          </h1>
          <button className="ml-10 bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Free Consultation
          </button>
        </div>
      </div>


      <Footer />
    </div>
  );
}