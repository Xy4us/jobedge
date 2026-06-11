"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "The AI CV tailoring completely transformed my application. Within a week of optimizing my resume for ATS compliance, I landed three interviews at tier-one companies.",
    by: "Evelyn, Software Engineer",
    imgSrc: "https://i.pravatar.cc/80?img=1"
  },
  {
    tempId: 1,
    testimonial: "JobEdge refined my cover letters and assessment prep into a package that finally feels polished, impactful, and engineered to secure top-tier offers.",
    by: "Eniola, Investment Analyst",
    imgSrc: "https://i.pravatar.cc/80?img=2"
  },
  {
    tempId: 2,
    testimonial: "My job search now has real momentum and clarity. The simulated assessment center days and expert competency guidance gave me the ultimate competitive edge.",
    by: "Billy, Product Manager",
    imgSrc: "https://i.pravatar.cc/80?img=3"
  },
  {
    tempId: 3,
    testimonial: "Using their mock interviews improved my delivery, lifted my confidence, and made my final stage answers feel truly structured and professional.",
    by: "Rashane, Consultant",
    imgSrc: "https://i.pravatar.cc/80?img=4"
  },
  {
    tempId: 4,
    testimonial: "The virtual mock interviews brought immense clarity, confidence, and structure to my competency answers, making every response twice as engaging to recruiters.",
    by: "Abel, Data Scientist",
    imgSrc: "https://i.pravatar.cc/80?img=5"
  },
  {
    tempId: 5,
    testimonial: "The real-time pacing feedback and AI alignment transformed my resume into a high-scoring ATS masterpiece that recruiters actually read.",
    by: "Daniel, Frontend Developer",
    imgSrc: "https://i.pravatar.cc/80?img=6"
  },
  {
    tempId: 6,
    testimonial: "Every simulated situational judgement test felt expertly designed. My pass rate for online corporate assessments immediately doubled after using JobEdge.",
    by: "Arya, Operations Manager",
    imgSrc: "https://i.pravatar.cc/80?img=7"
  },
  {
    tempId: 7,
    testimonial: "They understand the modern corporate recruiting pipeline deeply. My career application process finally feels seamless and performs exactly the way it should.",
    by: "Lena, HR Specialist",
    imgSrc: "https://i.pravatar.cc/80?img=8"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out select-none",
        isCenter 
          ? "bg-gray-900 text-white border-gray-900 shadow-xl" 
          : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        zIndex: 10 - Math.abs(position),
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.4) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #e5e5e5" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-gray-800" : "bg-gray-200"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top border border-gray-200"
        style={{
          boxShadow: isCenter ? "3px 3px 0px #ff6b00" : "3px 3px 0px #e5e5e5"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-[18px] font-medium leading-snug tracking-tight",
        isCenter ? "text-white" : "text-gray-900"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-xs font-semibold tracking-wide uppercase",
        isCenter ? "text-[#ff6b00]" : "text-gray-500"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export default function Testimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const { ref: inViewRef, inView } = useSafeInView({
    triggerOnce: true,
  });

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Threshold of 50px for a swipe
    if (diff > 50) {
      handleMove(1); // Swipe left, move to next card
    } else if (diff < -50) {
      handleMove(-1); // Swipe right, move to prev card
    }
    setTouchStart(null);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#F9FAFB] overflow-hidden relative border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            ref={inViewRef}
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
            className="text-[38px] sm:text-[46px] tracking-[-0.03em] text-gray-900 mb-4 font-medium"
          >
            Loved by ambitious builders
          </motion.h2>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden touch-pan-y"
        style={{ height: 600 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {testimonialsList.map((testimonial, index) => {
          const position = index - Math.floor(testimonialsList.length / 2);
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-xl transition-all duration-200 cursor-pointer rounded-full",
              "bg-white border-2 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-xl transition-all duration-200 cursor-pointer rounded-full",
              "bg-white border-2 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
