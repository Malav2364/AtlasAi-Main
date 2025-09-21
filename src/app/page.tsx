import React from 'react'
import { ContainerTextFlip } from '@/components/ui/container-text-flip' 

export default function Home() {
  return (   
    <>
    <p>Start Your Next Chapter</p>    
      <ContainerTextFlip 
          words={["Travel.", "Explore.", "Discover.", "Create Memories."]}
        />
    </>

  )
}
