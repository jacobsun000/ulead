import Image from "next/image"

export function SchoolCards({ schools }) {
  return (
    <div className="space-y-6 px-4">
      {schools.map(school => (
        <div
          key={school.id}
          className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm"
        >
          <Image
            src={school.image}
            alt={school.name}
            width={120}
            height={120}
            className="w-20 h-20 object-contain"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold">{school.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {school.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-700 mt-2">{school.description}</p>
          </div>
          <a
            href={school.href}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-ulead-gradient text-white">
              →
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}
