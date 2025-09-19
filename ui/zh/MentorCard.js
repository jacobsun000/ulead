import Image from 'next/image';

export default function MentorCard({ name, degree, institution, research_domains, projects, supported_programs, image_url, hide_description }) {
  return (
    <div className={`rounded-2xl ${hide_description ? "max-w-xs mx-auto" : "shadow w-[160px] md:w-[360px] p-3 md:p-6"} bg-white`}>
      <div className="flex justify-center">
        <Image
          src={image_url}
          alt={name}
          width={120}
          height={120}
          className={`rounded-full ${hide_description ? "w-20 h-20 md:w-28 md:h-28" : "w-16 h-16 md:w-32 md:h-32"}  object-cover`}
        />
      </div>
      <h2 className={`text-center ${hide_description ? "text-xs md:text-base" : "text-sm md:text-xl"} font-bold mt-4`}>{name}</h2>
      {!hide_description &&
        <p className="text-center text-xs md:text-base text-black/80 mt-1">
          {degree},{institution}
        </p>
      }
      {hide_description &&
        <div>
          <p className="text-center text-[0.5rem] md:text-sm text-black/80 mt-1">
            {institution}
          </p>
          <p className="text-center text-[0.5rem] md:text-sm text-black/80 mt-1">
            {degree}
          </p>
        </div>
      }

      {!hide_description &&
        <div className="h-px w-full my-4 bg-ulead-gradient" />
      }
      {!hide_description &&
        <div className="space-y-4 text-sm text-black/90 leading-relaxed">
          <div>
            <h3 className="font-bold text-xs md:text-base">研究领域</h3>
            <p className="mt-1 text-xs md:text-base whitespace-pre-line">{research_domains}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs md:text-base">可参与的项目</h3>
            <p className="mt-1 text-xs md:text-base whitespace-pre-line">{projects}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs md:text-base">支持的项目</h3>
            <p className="mt-1 text-xs md:text-base whitespace-pre-line">{supported_programs}</p>
          </div>
        </div>
      }
    </div>
  );
}
