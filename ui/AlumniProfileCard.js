'use client';
import { useState } from "react";
import Image from "next/image";
import Button from "@/ui/Button";

export default function AlumnProfileCard({ image_url: imageSrc, name, highschool, offers, experiences }) {
  const [isExpanded, setIsExpanded] = useState(false);
  let experiencesLength = 0;
  let experiencesCount = 0;
  for (let i = 0; i < experiences.length; i++) {
    if (experiencesLength < 150) {
      experiencesLength += experiences[i].length;
      experiencesCount++;
    }
  }
  let expandable = experiencesCount < experiences.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Top Section */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Profile Image */}
        <div className="flex flex-col">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image src={imageSrc} alt={name} width={64} height={64} objectFit="cover" />
          </div>
          <p className="md:hidden font-semibold text-xs text-secondary">{name}</p>
        </div>

        {/* Profile Information */}
        <div>
          <p className="hidden md:block text-xl font-semibold text-primary">{name}</p>
          {/* <p className="text-xs md:text-sm mb-2"><span className="font-bold">Highschool:</span> {highschool}</p> */}
          <p className="text-xs md:text-sm"><span className="font-bold">Offers:</span></p>
          <p className="text-xs md:text-sm">{offers.join(', ')}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* Experience Sharing Section */}
      <h3 className="text-sm md:text-lg text-center font-semibold text-secondary mb-4">Experience Sharing</h3>
      <div className="mt-4">
        <ul className="list-disc list-inside text-xs md:text-sm">
          {isExpanded
            ? experiences.map((experience, index) => (
              <li key={index} className="mb-1">
                {experience}
              </li>
            ))
            : experiences.slice(0, experiencesCount).map((experience, index) => (
              <li key={index} className="mb-1">
                {experience}
              </li>
            ))}
        </ul>
        {expandable && (
          <div className="text-right">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primaryLight mt-2 text-sm text-right cursor-pointer"
            >
              {isExpanded ? 'read less' : 'read more'}
            </button>
          </div>
        )}
      </div>

      {/* Read More Button */}
      <div className="flex md:hidden mt-6 justify-center">
        <Button style={'text-xs'} text="Read More" href="/about-us" />
      </div>
    </div>
  );
}
