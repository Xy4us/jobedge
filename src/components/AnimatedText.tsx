"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string | React.ReactNode;
}

export default function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <div className="relative overflow-hidden inline-flex items-center justify-center align-middle">
      <motion.div
        variants={{
          rest: { y: 0, opacity: 1 },
          hover: { y: "-100%", opacity: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center whitespace-nowrap"
      >
        {text}
      </motion.div>
      <motion.div
        variants={{
          rest: { y: "100%", opacity: 0 },
          hover: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        aria-hidden="true"
      >
        {text}
      </motion.div>
    </div>
  );
}
