"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

type ScrubTitleProps = {
  children: React.ReactNode;
};

const ScrubTitle: React.FC<ScrubTitleProps> = ({ children }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the targetRef container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Animation starts when the top of the container hits the top of the viewport
    // and ends when the bottom of the container hits the bottom of the viewport.
    offset: ["start start", "end end"],
  });

  // Use the scroll progress to animate the clip-path
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.9], // Start animation slightly after entering and end slightly before leaving
    [
      "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  return (
    // This outer container provides the scrollable height (200vh)
    <div ref={targetRef} className="relative h-[200vh] w-full">
      {/* This section will be "sticky" and stay in the viewport */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-black">
        <div className="relative w-full">
          {/* Background Text (grayed-out) */}
          <h1
            className="select-none px-4 text-center text-6xl font-bold text-gray-700 md:text-8xl lg:text-9xl"
            aria-hidden="true"
          >
            {children}
          </h1>

          {/* Foreground Text (white) - Animated with clip-path */}
          <motion.h1
            style={{ clipPath }}
            className="absolute inset-0 select-none px-4 text-center text-6xl font-bold text-white md:text-8xl lg:text-9xl"
          >
            {children}
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default ScrubTitle;