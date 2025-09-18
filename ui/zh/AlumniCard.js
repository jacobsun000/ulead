'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function AlumniCard({
  name,
  image,
  title,
  university,
  highschool,
  university_logo,
  labels,
  evaluation,
  plan,
}) {
  const [tab, setTab] = useState('evaluation')

  return (
    <div className="bg-white rounded-2xl shadow-lg w-[280px] md:w-[400px] overflow-hidden border border-gray-200">
      {/* Profile */}
      <div className="flex flex-row mt-8 md:mt-12">
        <div className="w-3/5">
          <div className="w-full bg-ulead-gradient text-white text-lg font-bold p-4">
            {name}
          </div>
          <div className="p-4 md:p-8 pb-0">
            <div className="text-sm md:text-lg">{university}</div>
            <div className="text-black/60 text-xs md:text-sm mt-2 md:mt-4">
              <div>美国高中：</div>
              <div>{highschool}</div>
              {labels?.map((row, idx) => (
                <div className="md:mt-1 text-xs md:text-sm" key={idx}>{row}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Image side */}
        <div className="w-2/5">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '172 / 236' }}
          >
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 40vw, 100vw"
              priority
            />
          </div>
          <div className="text-black/80 text-center">{title}</div>
        </div>

        {/* University Logo */}
        <div className="absolute left-[60%] transform -translate-x-1/2 -translate-y-1/4 z-10">
          <Image
            src={university_logo}
            alt="University Logo"
            width={96}
            height={96}
            className="rounded-full shadow-md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 border-t-2 border-gray-300 mx-4 pt-2">
        <div className="flex gap-6 text-sm font-medium text-gray-700 mb-2">
          <button
            onClick={() => setTab('evaluation')}
            className={cn(tab === 'evaluation' && 'border-b-4 border-[#3382DB]')}
          >
            案例评价
          </button>
          <button
            onClick={() => setTab('plan')}
            className={cn(tab === 'plan' && 'border-b-4 border-[#3382DB]')}
          >
            规划方向
          </button>
        </div>

        <div className="relative bg-gray-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed min-h-[100px]">
          {tab === 'evaluation' ? (
            <p>{evaluation || '无评价内容'}</p>
          ) : (
            <p>{plan}</p>
          )}
          {/* Quotation mark */}
          <div className="absolute top-0 right-3 -translate-y-1/4 text-[#3382DB] text-[6rem] font-bold select-none leading-none">”</div>
        </div>
      </div>
    </div>
  )
}

