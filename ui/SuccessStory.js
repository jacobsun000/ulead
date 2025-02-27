import Image from "next/image";

export default function AlumniCard({ name, image, school, labels, offers, evaluation }) {
  return (
    <div className="bg-white shadow-lg rounded-xl border content-center justify-start md:w-[26rem] w-72">
      {/* Header */}
      <div className="mt-8 mr-8 mb-4 flex flex-row items-center">
        <p className="md:text-xl text-sm md:w-40 w-28 md:p-4 p-2 bg-secondary text-white rounded-r-full">{name}</p>
        <p className="md:text-xl text-sm md:p-4 md:pr-2 p-2 font-semibold text-black">{school}</p>
      </div>
      {/* Personal information */}
      <div className="md:mx-8 mx-4 flex flex-row">
        <div className="md:w-32 md:h-32 h-24 w-24">
          <Image src={image} alt="Alumni" width={120} height={120} className="rounded-xl" />
        </div>
        <div className="md:p-4 pl-4 pt-0">
          {labels.map((label, i) => (<p className="text-xs md:text-sm font-bold" key={i}>{label}</p>))}
          <p className="md:text-sm text-xs font-bold pt-2">Offers:</p>
          {offers.map((offer, i) => (
            <p key={i} className="text-xs md:text-sm text-gray-500">{offer}</p>
          ))}
        </div>
      </div>

      {/* Seperator */}
      <div className="flex items-center flex-grow md:mx-6 mx-2 md:my-4 my-2">
        <div className="w-[0.35rem] h-[0.35rem] bg-slate-500 translate-x-[0.5rem] rotate-45 transform mr-2"></div> {/* Diamond */}
        <div className="border-t border-slate-500 flex-grow"></div>
      </div>

      {/* Case Evaluation*/}
      <div className="relative text-center">
        <h3 className="md:text-xl text-sm font-bold relative">Case Evaluation</h3>
        <Image src="/img/aboutus/quote-end.svg" alt="End Quote" width={135} height={98} className="md:w-6 md:h-6 w-4 h-4 absolute top-0 right-6" />
        <p className="mt-2 md:p-8 p-4 pt-0 text-left text-gray-500 md:text-sm text-xs">
          {evaluation}
        </p>
      </div>


    </div>
  );
}
