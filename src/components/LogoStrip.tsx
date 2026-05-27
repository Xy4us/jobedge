"use client";

import { motion } from "framer-motion";
import LogoLoop from "./LogoLoop";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const logos = [
  {
    name: "Loopbit",
    svg: (
      <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
        <defs>
          <linearGradient id="loopbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <circle
          cx="12"
          cy="14"
          r="7"
          stroke="url(#loopbit-grad)"
          strokeWidth="2"
        />
        <circle cx="12" cy="14" r="3" fill="url(#loopbit-grad)" />
        <text
          x="24"
          y="19"
          fontFamily="Inter,sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#0F172A"
        >
          loopbit
        </text>
      </svg>
    ),
  },
  {
    name: "Nexivo",
    svg: (
      <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
        <defs>
          <linearGradient id="nexivo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <polygon points="14,4 22,14 14,24 6,14" fill="url(#nexivo-grad)" />
        <text
          x="28"
          y="19"
          fontFamily="Inter,sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#0F172A"
        >
          nexivo
        </text>
      </svg>
    ),
  },
  {
    name: "Infera",
    svg: (
      <svg width="75" height="28" viewBox="0 0 75 28" fill="none">
        <defs>
          <linearGradient id="infera-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <path
          d="M8 20 L14 8 L20 20"
          stroke="url(#infera-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="26"
          y="19"
          fontFamily="Inter,sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#0F172A"
        >
          infera
        </text>
      </svg>
    ),
  },
  {
    name: "Braina",
    svg: (
      <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
        <defs>
          <linearGradient id="braina-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <rect
          x="6"
          y="8"
          width="14"
          height="12"
          rx="4"
          stroke="url(#braina-grad)"
          strokeWidth="2"
        />
        <circle cx="13" cy="14" r="2.5" fill="url(#braina-grad)" />
        <text
          x="26"
          y="19"
          fontFamily="Inter,sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#0F172A"
        >
          braina
        </text>
      </svg>
    ),
  },
  {
    name: "Synthora",
    svg: (
      <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
        <defs>
          <linearGradient
            id="synthora-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <path d="M7 14 Q14 6 21 14 Q14 22 7 14Z" fill="url(#synthora-grad)" />
        <text
          x="27"
          y="19"
          fontFamily="Inter,sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#0F172A"
        >
          synthora
        </text>
      </svg>
    ),
  },
];

export default function LogoStrip() {
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  const techLogos = logos.map((logo) => ({
    node: logo.svg,
    title: logo.name,
  }));

  return (
    <section className="py-16  overflow-hidden w-full">
      <div className="max-w-5xl mx-auto px-5">
        <motion.p
          ref={ref}
          variants={fadeInDirection("up", 0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-10"
        >
          Trusted by 25,000+ Founders
        </motion.p>
      </div>

      <div className="w-full">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={28}
          gap={60}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#ffffff"
          ariaLabel="Trusted partner logos"
        />
      </div>
    </section>
  );
}
