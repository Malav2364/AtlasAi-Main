import React from 'react'
import { ContainerTextFlip } from '@/components/ui/container-text-flip' 
import { Skiper26 } from '@/components/skiper26'

export default function Home() {
  return (   
    <main>
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center">
        <p className="text-7xl font-bold mr-4">Start Your Next Chapter</p>
        <ContainerTextFlip
          words={["Travel.", "Explore.", "Discover.", "Create Memories."]}
        />
      </div>
    </section>
    <div className="fixed bottom-4 right-4">
      <Skiper26 />
    </div>
  </main>

  )
}
