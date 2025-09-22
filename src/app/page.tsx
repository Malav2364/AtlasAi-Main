"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { Skiper26 } from '@/components/skiper26';
import gsap from 'gsap';

export default function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const lines = ["Go.", "Explore.", "Remember."];

  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      const chars = el.querySelectorAll("span");
      gsap.from(chars, {
        opacity: 0,
        scale: 0.1,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",

        // y: (i) => i * 30 - 300, // staggered spiral
        // rotationY: (i) => i * 45,
        // z: (i) => i * 50 - 500,
        // opacity: 0,
        // duration: 2,
        // stagger: 0.05,
        // ease: "power4.out"

          // x: (i) => Math.sin(i * 0.4) * 500,
          // y: (i) => i * -40,
          // rotationY: 720,
          // z: -1000,
          // opacity: 0,
          // duration: 2,
          // stagger: 0.05,
          // ease: "power3.out"
      });
    }
  }, []);

  return (   
    <main>
      <section className="relative flex flex-col items-start justify-center min-h-screen pl-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/heroVid.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center">
          <h1 ref={textRef} className="font-bold uppercase font-stretch-100% text-8xl text-left text-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="block">
                {line.split("").map((char, charIndex) => (
                  <span key={charIndex} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            ))}
          </h1>
        </div>
      </section>
      <div className="fixed bottom-4 right-4">
        <Skiper26 />
      </div>
      <section>
        <div className="flex flex-col items-center justify-center min-h-screen">
          
        </div>
      </section>
    </main>
  );
}
