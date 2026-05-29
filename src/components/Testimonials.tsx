"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

// Tweaked testimonials data adapted for JobEdge career features
export const testimonialsRow1 = [
  {
    name: "Evelyn",
    text: "The AI CV tailoring completely transformed my application. Within a week of optimizing my resume for ATS compliance, I landed three interviews at tier-one companies.",
    avatar: "https://i.pravatar.cc/80?img=1",
  },
  {
    name: "Eniola",
    text: "JobEdge refined my cover letters and assessment prep into a package that finally feels polished, impactful, and engineered to secure top-tier offers.",
    avatar: "https://i.pravatar.cc/80?img=2",
  },
  {
    name: "Billy",
    text: "My job search now has real momentum and clarity. The simulated assessment center days and expert competency guidance gave me the ultimate competitive edge.",
    avatar: "https://i.pravatar.cc/80?img=3",
  },
  {
    name: "Rashane",
    text: "Using their mock interviews improved my delivery, lifted my confidence, and made my final stage answers feel truly structured and professional.",
    avatar: "https://i.pravatar.cc/80?img=4",
  },
];

export const testimonialsRow2 = [
  {
    name: "Abel",
    text: "The virtual mock interviews brought immense clarity, confidence, and structure to my competency answers, making every response twice as engaging to recruiters.",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    name: "Daniel",
    text: "The real-time pacing feedback and AI alignment transformed my resume into a high-scoring ATS masterpiece that recruiters actually read.",
    avatar: "https://i.pravatar.cc/80?img=6",
  },
  {
    name: "Arya",
    text: "Every simulated situational judgement test felt expertly designed. My pass rate for online corporate assessments immediately doubled after using JobEdge.",
    avatar: "https://i.pravatar.cc/80?img=7",
  },
  {
    name: "Lena",
    text: "They understand the modern corporate recruiting pipeline deeply. My career application process finally feels seamless and performs exactly the way it should.",
    avatar: "https://i.pravatar.cc/80?img=8",
  },
];

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false },
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 6); i++) {
      spans.push(
        <span
          className={`inline-flex items-center flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </span>,
      );
    }

    return (
      <div
        className={`${parallaxClassName} relative overflow-hidden`}
        style={parallaxStyle}
      >
        <motion.div
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden flex flex-col gap-6">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </div>
  );
};

function TestimonialCard({
  name,
  text,
  avatar,
}: {
  name: string;
  text: string;
  avatar: string;
}) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-black/5 w-[300px] md:w-[350px] shrink-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-left">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 border border-black/5 shrink-0 transition-transform duration-500 group-hover:scale-110">
          {/* Changed to standard img tag to bypass Next.js hostname strictness and prevent local dev server crash/restarts */}
          <img
            src={avatar}
            alt={name}
            width={44}
            height={44}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{name}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            User Experience
          </p>
        </div>
        <div className="ml-auto opacity-10 group-hover:opacity-30 transition-opacity text-gray-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H21.017C22.1216 3 23.017 3.89543 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H8C9.10457 3 10 3.89543 10 5V15C10 18.3137 7.31371 21 4 21H1Z" />
          </svg>
        </div>
      </div>
      <p className="text-[14px] text-gray-700 leading-relaxed font-medium line-clamp-4">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  const row1Content = (
    <div className="flex gap-6 pr-6">
      {testimonialsRow1.map((t, idx) => (
        <TestimonialCard
          key={idx}
          name={t.name}
          text={t.text}
          avatar={t.avatar}
        />
      ))}
    </div>
  );

  const row2Content = (
    <div className="flex gap-6 pr-6">
      {testimonialsRow2.map((t, idx) => (
        <TestimonialCard
          key={idx}
          name={t.name}
          text={t.text}
          avatar={t.avatar}
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-[#F9FAFB] overflow-hidden relative border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            ref={ref}
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-md tracking-wider uppercase mb-5"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[46px]  tracking-[-0.03em] text-gray-900 mb-4 font-medium"
          >
            Loved by ambitious builders
          </motion.h2>
        </div>
      </div>

      {/* Marquee velocity rows */}
      <div className="w-full relative overflow-hidden flex flex-col gap-6 mt-6">
        <ScrollVelocity
          texts={[row1Content, row2Content]}
          velocity={35} // Perfect and gentle speed to read testimonial texts
          damping={50}
          stiffness={300}
          numCopies={5}
          scrollerClassName="gap-6"
        />
      </div>
    </section>
  );
}
