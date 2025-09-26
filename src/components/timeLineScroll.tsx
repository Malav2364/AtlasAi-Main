"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper component for animating text characters
const AnimatedText = React.forwardRef<HTMLHeadingElement, { text: string; className?: string; style?: React.CSSProperties }>(({ text, ...props }, ref) => (
  <h1 ref={ref} {...props}>
    {text.split('').map((char, index) => (
      <span key={index} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </h1>
));
AnimatedText.displayName = 'AnimatedText';


const TimeLineScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);


  useLayoutEffect(() => {
    const video1El = video1Ref.current;
    const video2El = video2Ref.current;
    const video3El = video3Ref.current;
    const text1Chars = text1Ref.current?.querySelectorAll('span');
    const text2Chars = text2Ref.current?.querySelectorAll('span');
    const text3Chars = text3Ref.current?.querySelectorAll('span');

    const ctx = gsap.context(() => {
      if (
          text1Chars?.length && text2Chars?.length && text3Chars?.length &&
          video1El && video2El && video3El 
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", 
            scrub: 0.5,
            pin: true,
          }
        });

        gsap.set([video1El, video2El, video3El], { 
            opacity: 0, scale: 0.1, xPercent: -50, yPercent: -50,
            left: '50%', top: '50%', zIndex: 0
        });

        // --- REVISED & BALANCED Animation Sequence ---

        // Section 1: Travel
        tl
          .from(text1Chars, {
              opacity: 0, y: 50, filter: 'blur(10px)',
              stagger: { each: 0.05, from: "random" },
              duration: 0.8, // Consistent duration
              ease: "power2.out"
          })
          .to(video1El, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", zIndex: 1 }, "<")
          .to(video1El, { scale: 1.1, x: '-2%', duration: 5, ease: "none" }, "<") // Adjusted Ken Burns
          .to({}, { duration: 1 }) // <-- Explicit 1s hold time

        // Section 2: Explore
        .to(text1Chars, { opacity: 0, yPercent: 50, stagger: 0.05, duration: 0.8 }, ">") // ">" starts at the end of previous tween
        .to(video1El, { opacity: 0, scale: 0.8, duration: 0.8, ease: "power1.in" }, "<") 
        .from(text2Chars, {
            opacity: 0, y: 50, filter: 'blur(10px)',
            stagger: { each: 0.05, from: "random" },
            duration: 0.8, // Consistent duration
            ease: "power2.out"
        }, "<")
        .fromTo(video2El, 
            { opacity: 0, scale: 0.1, zIndex: 1 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
            "<"
        )
        .to(video2El, { scale: 1.1, x: '2%', duration: 5, ease: "none" }, "<")
        .to({}, { duration: 1 }) // <-- Explicit 1s hold time

        // Section 3: Snap
        .to(text2Chars, { opacity: 0, yPercent: 50, stagger: 0.05, duration: 0.8 }, ">")
        .to(video2El, { opacity: 0, scale: 0.8, duration: 0.8, ease: "power1.in" }, "<")
        .from(text3Chars, {
            opacity: 0, y: 50, filter: 'blur(10px)',
            stagger: { each: 0.05, from: "random" },
            duration: 0.8, // Consistent duration
            ease: "power2.out"
        }, "<")
        .fromTo(video3El, 
            { opacity: 0, scale: 0.1, zIndex: 1 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
            "<"
        )
        .to(video3El, { scale: 1.1, y: '-2%', duration: 5, ease: "none" }, "<");
      }
    }, sectionRef); 

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-white text-black overflow-hidden">
      <video 
          ref={video1Ref}
          src="travel.mp4"
          className="absolute w-screen h-screen object-cover"
          autoPlay muted loop playsInline
      />
      <video 
          ref={video2Ref}
          src="explore.mp4"
          className="absolute w-screen h-screen object-cover"
          autoPlay muted loop playsInline
      />
      <video 
          ref={video3Ref}
          src="snap.mp4"
          className="absolute w-screen h-screen object-cover"
          autoPlay muted loop playsInline
      />
      
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
        <AnimatedText ref={text1Ref} text="Travel." className="absolute text-[25vw] font-extrabold text-white select-none z-20 blend-difference" style={{ lineHeight: '1' }} />
        <AnimatedText ref={text2Ref} text="Explore." className="absolute text-[20vw] font-extrabold text-white select-none z-20 blend-difference" style={{ lineHeight: '1' }} />
        <AnimatedText ref={text3Ref} text="Snap." className="absolute text-[25vw] font-extrabold text-white select-none z-20 blend-difference" style={{ lineHeight: '1' }} />
      </div>
    </section>
  );
};

export default TimeLineScroll;