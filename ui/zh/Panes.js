'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function Panes({ panes }) {
  const [activeTab, setActiveTab] = React.useState(panes[0]?.title)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-ulead-gradient p-6 flex flex-row rounded-xl items-center">
      <TabsList className="flex flex-col items-center justify-between gap-2 p-4 h-72 rounded-l-2xl text-white min-w-[120px]">
        {panes.map((pane) => (
          <TabsTrigger
            key={pane.title}
            value={pane.title}
            className="text-white px-4 py-2 text-lg text-white/40 font-semibold data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-md w-full text-left"
          >
            {pane.title}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1 bg-white rounded-r-2xl shadow-md p-6">
        {panes.map((pane) => (
          <TabsContent key={pane.title} value={pane.title}>
            {pane.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
