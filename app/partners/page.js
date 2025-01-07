import { sql } from '@vercel/postgres';
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Button from "@/ui/Button";
import Image from 'next/image'
import PartnerMap from "@/ui/PartnerMap";

const StatItem = ({ icon, number, description, isRed }) => (
  <div className="flex flex-col items-center ml-7 mr-7">
    <p className="text-left text-xs md:text-sm mb-2 flex items-center font-bold">{description}</p>
    <div className="relative w-24 h-24">
      <Image src={`/img/partners/${icon}`} alt={description} layout="fill" objectFit="contain" />
      <div className="absolute bottom-0 right-0 bg-trasparent rounded-full p-1">
        <span className={`text-2xl md:text-3xl font-bold ${isRed ? 'text-red-600' : 'text-blue-900'}`}>{number}</span>
      </div>
    </div>
  </div>
);

export default async function Partners() {
  const { rows: schools } = await sql`SELECT * FROM target_school;`;
  return (
    <div className="mt-28">
      <SectionHeader title="Our Target School" style={"mb-0"} />
      <div className="md:max-w-[90vw] mx-auto">
        <PartnerMap schools={schools} />
      </div>


      <h2 className="text-2xl md:text-2xl font-bold text-center my-12">How ULead works with our partners?</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between mb-8">
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

      <h2 className="text-2xl md:text-2xl font-bold text-center mb-6">Pictures of past events and admissions</h2>
      <div className="mb-4">
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="aspect-square">
              <Image src={`/img/partners/event${num}.png`} alt={`Event ${num}`} width={900} height={700} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-4">
        <Button text="More Details" href="/contacts" />
      </div>

      <BackButton />
    </div>
  );
}
