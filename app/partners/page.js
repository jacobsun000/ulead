import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import Image from 'next/image'

const StatItem = ({ icon, number, description, isRed }) => (
  <div className="flex flex-col items-center ml-7 mr-7">
    <p className="text-left text-sm mb-2 flex items-center font-bold">{description}</p>
    <div className="relative w-24 h-24">
      <Image src={`/img/partners/${icon}`} alt={description} layout="fill" objectFit="contain" />
      <div className="absolute bottom-0 right-0 bg-trasparent rounded-full p-1">
        <span className={`text-3xl font-bold ${isRed ? 'text-red-600' : 'text-blue-900'}`}>{number}</span>
      </div>
    </div>
  </div>
);

export default function Partners() {
  return (
    <div>
      <Header currentPath="/partners" />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Our Partners</h2>
        <div className="relative mb-10">
          <Image
            src="/img/partners/map.svg"
            alt="US Map"
            width={900}
            height={700}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">How ULead works with our partners?</h2>

      <div className="flex justify-between mb-8">
        <StatItem
          icon="plane.svg"
          number="15"
          description="From 2018 till now, traveled to US times"
        />
        <StatItem
          icon="people.svg"
          number="80+"
          description="Hosting Admissions Officers visiting China"
          isRed
        />
        <StatItem
          icon="info.svg"
          number="90+"
          description="Hosting admissions information sessions"
        />
        <StatItem
          icon="relation.svg"
          number="100+"
          description="Established relations with US schools"
          isRed
        />
      </div>

      <div className="mb-4">
        <p className="text-center mb-2">Pictures of past events and admissions</p>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="aspect-square bg-gray-200">
              <Image src={`/img/event${num}.jpg`} alt={`Event ${num}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button type="button" className="px-4 py-2 mb-10 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 transition duration-300">
          Back to top
        </button>
      </div>



      <Footer />
    </div>
  );
}