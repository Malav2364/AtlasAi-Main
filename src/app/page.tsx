"use client";
import React, { useLayoutEffect, useRef } from 'react';
// import { Skiper26 } from '@/components/skiper26';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import the plugin
import { PlaneTakeoff, ArrowDown } from 'lucide-react';
import Navbar from "@/components/navbar"; // update path as needed
import TimeLineScroll from '@/components/timeLineScroll';

gsap.registerPlugin(ScrollToPlugin); // Register the plugin


export default function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const exploreBtnRef = useRef<HTMLButtonElement>(null);
  const exploreBtnTextRef = useRef<HTMLSpanElement>(null);
  const exploreBtnIconRef = useRef<SVGSVGElement>(null);
  const lines = ["Go.", "Explore.", "Remember."];

  // Animate headline and buttons
  useLayoutEffect(() => {
    const el = textRef.current;
    const btn1 = buttonRef.current;
    const btn2 = exploreBtnRef.current;

    if (el && btn1 && btn2) {
      const chars = el.querySelectorAll("span");
      const masterTl = gsap.timeline();

      // Set the initial state of the buttons before any animation starts
      gsap.set([btn1, btn2], { opacity: 0, y: 30 });

      // 1. Animate the headline first
      masterTl.from(chars, {
        x: (i) => Math.sin(i * 0.4) * 500,
        y: (i) => i * -40,
        rotationY: 720,
        z: -1000,
        opacity: 0,
        duration: 2,
        stagger: 0.05,
        ease: "back.out(1.2)"
      });

      // 2. Animate the buttons TO their final state
      masterTl.to([btn1, btn2], {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.03,
        ease: "power3.out"
      }, "-=0.8"); // Overlap with the end of the headline animation
    }
  }, []);

  // Animate "Start Your Journey" button on hover (Reversed)
  useLayoutEffect(() => {
    const button = buttonRef.current;
    const plane = planeRef.current;
    const buttonText = buttonTextRef.current;

    if (button && plane && buttonText) {
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: "power3.inOut" },
      });

      // Animation to EXPAND the button
      tl.to(button, {
        width: "250px",
        paddingLeft: "1.75rem", // 28px, original px-7
        paddingRight: "1.75rem",
      })
        .to(buttonText, { opacity: 1 }, "<")
        .to(plane, { opacity: 0 }, "<");

      const onEnter = () => { if (!tl.isActive()) tl.play(); };
      const onLeave = () => { if (!tl.isActive()) tl.reverse(); };

      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);

      return () => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
      };
    }
  }, []);

  // Animate "Explore More" button on hover (Reversed)
  useLayoutEffect(() => {
    const button = exploreBtnRef.current;
    const icon = exploreBtnIconRef.current;
    const text = exploreBtnTextRef.current;

    if (button && icon && text) {
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: "power3.inOut" },
      });

      // Animation to EXPAND the button
      tl.to(button, {
        width: "250px",
        paddingLeft: "1.75rem",
        paddingRight: "1.75rem",
      })
        .to(text, { opacity: 1 }, "<")
        .to(icon, { opacity: 0 }, "<");

      const onEnter = () => { if (!tl.isActive()) tl.play(); };
      const onLeave = () => { if (!tl.isActive()) tl.reverse(); };

      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);

      return () => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
      };
    }
  }, []);

  // Function to handle smooth scrolling
  const handleScroll = () => {
    gsap.to(window, { duration: 1.5, scrollTo: "#second-section", ease: "power2.inOut" });
  };


  return (
    <main>
      <Navbar />
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

          {/* Container for both buttons */}
          <div className="flex items-center gap-4 mt-8">
            {/* Travel CTA Button - Reversed Animation */}
            <button
              ref={buttonRef}
              className="relative flex items-center justify-center p-3.5
                        bg-transparent
                        rounded-full
                        border border-white
                        font-bold text-xl text-white
                        shadow-md
                        backdrop-blur-lg
                        focus:outline-none
                        transition
                        overflow-hidden"
              style={{
                boxShadow: "0px 5px 18px rgba(30,190,210,0.09)",
                cursor: "pointer",
                width: "50px", // Default circular width
                height: "50px"
              }}
            >
              <span ref={buttonTextRef} className="absolute whitespace-nowrap opacity-0">Start Your Journey</span>
              <PlaneTakeoff ref={planeRef} className="absolute" size={24} />
            </button>

            {/* "Explore More" Button - Reversed Animation */}
            <button
              ref={exploreBtnRef}
              onClick={handleScroll} // Add the onClick handler
              className="relative flex items-center justify-center p-3.5
                        bg-white
                        rounded-full
                        font-bold text-xl text-gray-900
                        shadow-lg
                        focus:outline-none
                        transition
                        overflow-hidden"
              style={{
                width: "50px", // Default circular width
                height: "50px",
                boxShadow: "0 4px 15px rgba(60,60,60,0.13)",
                cursor: "pointer"
              }}
            >
              <span ref={exploreBtnTextRef} className="absolute whitespace-nowrap opacity-0">Explore More</span>
              <ArrowDown ref={exploreBtnIconRef} className="absolute" size={24} />
            </button>
          </div>
        </div>
      </section>

      <section id="second-section"> {/* Add an ID to the target section */}
]       <TimeLineScroll />
      </section>
    </main>
  );
}
