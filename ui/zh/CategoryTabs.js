'use client'

import { useState } from 'react';
import Image from 'next/image';

const CATEGORIES = ['全部', 'AI', 'CS', '机器人', '新闻学', '电影', '艺术', '商科']

export function CategoryTabs({ schools }) {
  const [category, setCategory] = useState('全部')

  const filtered = category === '全部'
    ? schools
    : schools.filter(school =>
      school.tags.some(tag => tag.includes(category))
    )

  return (
    <div>
      {/* Tab selector */}
      <div className="flex flex-wrap gap-3 p-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-all
              ${cat === category
                ? 'bg-ulead-gradient text-white shadow'
                : 'bg-white text-blue-400 border border-blue-100'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Result cards */}
      <div className="flex flex-col gap-8 px-4">
        {filtered.map(school => (
          <div key={school.id} className="bg-white p-12 rounded-xl shadow-md flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <Image src={school.image} width={128} height={128} alt={school.name} className="w-20 h-20 object-contain" />
              <div>
                <h2 className="font-bold text-lg">{school.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mt-2">{school.description}</p>
              </div>
            </div>
            <div className="space-y-3 w-full mb-8">
              {school.programs.map(program => (
                <div key={program.name} className="flex justify-between border-t pt-3">
                  <div>
                    <h3 className="font-semibold">{program.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                  </div>
                  <a href={program.href} target="_blank" rel="noopener noreferrer" className="self-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-ulead-gradient text-white">
                      →
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <a
              href={school.href}
              className="px-16 py-2 rounded-full bg-ulead-gradient
                 bg-white hover:shadow-lg transition-shadow text-white
                 active:scale-95"
            >
              更多项目
            </a>
          </div>
        ))}
      </div>
    </div>
  )
};
