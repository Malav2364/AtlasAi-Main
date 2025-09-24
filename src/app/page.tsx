"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { Skiper26 } from '@/components/skiper26';
import gsap from 'gsap';



export default function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef(null);
  const lines = ["Go.", "Explore.", "Remember."];

  // Animate headline
  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      const chars = el.querySelectorAll("span");
      gsap.from(chars, {
        x: (i) => Math.sin(i * 0.4) * 500,
        y: (i) => i * -40,
        rotationY: 720,
        z: -1000,
        opacity: 0,
        duration: 2,
        stagger: 0.05,
        ease: "back.out(1.2)"
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
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/heroVid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-65 z-0" />
        <div className="relative z-10 flex flex-col items-start">
          <h1
            ref={textRef}
            className="font-bold uppercase font-stretch-100% text-8xl text-left text-white z-20"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
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
          
          {/* Travel CTA Button with Airplane Animation */}
<button
  ref={buttonRef}
  className="relative px-7 py-2 mt-8
             bg-transparent
             rounded-full
             border-1 border-white
             font-bold text-xl text-white
             shadow-md
             backdrop-blur-lg
             focus:outline-none
             transition
             overflow-hidden"
  style={{
    boxShadow: "0px 5px 18px rgba(30,190,210,0.09)",
    cursor: "pointer",
    minWidth: 0
  }}
>
  Start Your Journey
</button>

        </div>
      </section>

      <section>
        {/* ...other sections */}
      </section>
      <div className="fixed bottom-4 right-4">
        <Skiper26 />
      </div>
    </main>
  );
}
