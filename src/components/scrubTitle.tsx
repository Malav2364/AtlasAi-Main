"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const SignOff: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      // FIXED: Changed h-[75vh] to h-screen for full viewport height
      className="relative flex h-screen w-full items-center justify-center bg-black"
    >
      {/* FIXED: Added w-full to ensure proper centering and layout */}
      <div className="relative w-full text-center">
        {/* Background Text (grayed-out) */}
        <h1 className="select-none px-4 text-6xl font-bold text-gray-700 md:text-8xl lg:text-9xl">
          The world is yours to explore.
        </h1>
        
        {/* Foreground Text (inside the animated clipping mask) */}
        <motion.div
          style={{ width: lineWidth }}
          className="absolute inset-0 overflow-hidden"
        >
          <h1 className="select-none whitespace-nowrap px-4 text-6xl font-bold text-white md:text-8xl lg:text-9xl">
            The world is yours to explore.
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default SignOff;