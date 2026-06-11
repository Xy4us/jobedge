"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Brain, Video, Target } from "lucide-react";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";
import { cn } from "@/lib/utils";

interface FeatureNote {
  id: string;
  number: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const FEATURE_NOTES: FeatureNote[] = [
  {
    id: "cv-ats",
    number: "01",
    type: "AI Optimization",
    title: "CV TAILORING",
    subtitle: "Create tailored CVs & check ATS compliance",
    description: "Optimize your resume dynamically to align with job descriptions. Identify missing keywords and correct formatting issues to rank highly on applicant tracking systems.",
    bgImage: "/images/note_pepper.png",
    icon: Sparkles,
    color: "#007bff", // Accent Blue
  },
  {
    id: "cover-letter",
    number: "02",
    type: "Automation",
    title: "COVER LETTERS",
    subtitle: "Cover Letter aligned with Job description",
    description: "Generate persuasive, targeted cover letters that match the tone and requirements of your target role. Grab the attention of recruiters with personalized copy.",
    bgImage: "/images/note_rose.png",
    icon: FileText,
    color: "#ffcc33", // Accent Yellow/Gold
  },
  {
    id: "assessments",
    number: "03",
    type: "Analytics",
    title: "ONLINE ASSESSMENTS",
    subtitle: "Online Assessments Practice",
    description: "Master Numerical, Situational Judgement Tests (SJTs), Verbal Reasoning, Logical Reasoning, and many other corporate assessments using high-fidelity simulated tests.",
    bgImage: "/images/note_amber.png",
    icon: Brain,
    color: "#38bdf8", // Sky Blue
  },
  {
    id: "mock-interview",
    number: "04",
    type: "Productivity",
    title: "MOCK INTERVIEWS",
    subtitle: "Virtual Interview Practice",
    description: "Polish your delivery using mock sessions covering competency-based, strengths-based, employer-based, and sector-based questions with instant pacing guidance.",
    bgImage: "/images/note_wood.png",
    icon: Video,
    color: "#ffaa00", // Soft Amber/Yellow
  },
  {
    id: "assessment-center",
    number: "05",
    type: "Integrations",
    title: "ASSESSMENT CENTERS",
    subtitle: "Virtual Assessment Center Simulation",
    description: "Navigate complex final-stage selection days. Participate in comprehensive presentation exercises, interactive group roleplay simulations, and high-intensity business case study exercises.",
    bgImage: "/images/note_vetiver.png",
    icon: Target,
    color: "#6c757d", // Accent Gray
  },
];

interface AccordionItemProps {
  note: FeatureNote;
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ note, isActive, onMouseEnter }) => {
  const IconComponent = note.icon;
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative h-[480px] lg:h-[540px] xl:h-[600px] rounded-[32px] overflow-hidden cursor-pointer border border-white/10 select-none shadow-lg transition-all duration-700 ease-in-out",
        isActive ? "w-[420px] lg:w-[480px] xl:w-[540px] shadow-2xl" : "w-[75px] lg:w-[85px] xl:w-[95px] shadow-md"
      )}
    >
      {/* Background Image (img tag for GPU-accelerated scaling and zero repaints) */}
      <img
        src={note.bgImage}
        alt={note.title}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/45 transition-opacity duration-700 pointer-events-none" />

      {/* Top Info (Active Only pill & number) */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 text-white">
        <span
          className={cn(
            "text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500",
            isActive ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-2"
          )}
          style={{ color: note.color }}
        >
          {note.type}
        </span>
        <span className="text-xs font-mono font-bold tracking-widest opacity-80">
          {note.number}
        </span>
      </div>

      {/* Caption Text: Single span rotating and moving */}
      <span
        className={cn(
          "absolute text-white whitespace-nowrap z-10 font-bold transition-all duration-500 ease-in-out select-none pointer-events-none",
          isActive
            ? "bottom-[130px] lg:bottom-[150px] xl:bottom-[170px] left-6 rotate-0 text-xl md:text-2xl lg:text-3xl tracking-[0.15em] translate-x-0"
            : "bottom-36 lg:bottom-40 xl:bottom-44 left-1/2 -translate-x-1/2 -rotate-90 text-sm tracking-[0.25em] opacity-80"
        )}
      >
        {note.title}
      </span>

      {/* Details & Icon Area at Bottom */}
      <div
        className={cn(
          "absolute bottom-6 left-6 right-6 flex items-end gap-4 z-10 text-white transition-all duration-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Circle Icon Badge */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-white text-gray-900 shadow-md"
        >
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Subtitle & Description */}
        <div className="flex flex-col">
          <h4
            className="text-[11px] font-bold tracking-wider uppercase leading-none"
            style={{ color: note.color }}
          >
            {note.subtitle}
          </h4>
          <p className="text-[13px] text-white/75 leading-relaxed font-normal mt-1.5 max-w-[320px] lg:max-w-[380px] xl:max-w-[440px]">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesGrid() {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default to Cover Letters expanded (index 1)
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section id="features" className="relative w-full bg-[#F9FAFB] py-24 md:py-32 px-4 md:px-16 overflow-hidden border-t border-b border-gray-200/60 select-none">
      {/* Background radial accent glow adapted to website's blue and gold colors in subtle light mode opacity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#007bff]/5 via-transparent to-[#ffcc33]/4 blur-[130px] pointer-events-none" />

      {/* Light Mode Section Header matching original FeaturesGrid1 styling */}
      <div className="relative z-10 text-center mb-16 md:mb-20 max-w-xl mx-auto">
        <motion.span
          ref={ref}
          variants={fadeInDirection("up", 0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-md tracking-wider uppercase mb-5"
        >
          FREE
        </motion.span>
        <motion.h2
          variants={fadeInDirection("up", 0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[38px] sm:text-[46px] tracking-[-0.03em] text-gray-900 mb-4 font-semibold"
        >
          Sales Made Simple with AI
        </motion.h2>
        <motion.p
          variants={fadeInDirection("up", 0.6)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[17px] text-gray-500 max-w-xl mx-auto leading-relaxed"
        >
          Everything you need to close more deals, build stronger
          relationships, and grow your revenue — all in one platform.
        </motion.p>
      </div>

      {/* Accordion Layout Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Desktop Layout: Horizontal Row of Fixed-width Expanding Cards */}
        <div className="hidden md:flex flex-row items-center justify-center h-[520px] lg:h-[580px] xl:h-[640px] w-full gap-4 lg:gap-5">
          {FEATURE_NOTES.map((note, index) => (
            <AccordionItem
              key={note.id}
              note={note}
              isActive={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Mobile Layout: Stacked Horizontal Cards with Vertical Expansion */}
        <div className="flex md:hidden flex-col gap-3.5 w-full">
          {FEATURE_NOTES.map((note, index) => {
            const isActive = activeIndex === index;
            const IconComponent = note.icon;

            return (
              <div
                key={`${note.id}-mobile`}
                onClick={() => setActiveIndex(index)}
                className="relative rounded-[24px] overflow-hidden cursor-pointer w-full select-none border border-gray-200/70 shadow-sm transition-all duration-500 ease-in-out"
                style={{
                  height: isActive ? "260px" : "75px",
                }}
              >
                {/* Background Image */}
                <img
                  src={note.bgImage}
                  alt={note.title}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/45 pointer-events-none" />

                {/* Inner Padding */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 text-white">
                  {/* Closed Mobile Header (Compact Mode) */}
                  {!isActive ? (
                    <div className="flex items-center justify-between h-full w-full">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-gray-900 border border-gray-200 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-extrabold tracking-wider text-white uppercase leading-none">
                            {note.title}
                          </h3>
                          <span
                            className="text-[8px] font-bold tracking-widest uppercase block mt-1"
                            style={{ color: note.color }}
                          >
                            {note.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-white/80 font-bold">{note.number}</span>
                    </div>
                  ) : (
                    // Expanded Mobile Mode
                    <>
                      {/* Expanded Top */}
                      <div className="flex justify-between items-start">
                        <span
                          className="text-[8px] font-bold tracking-[0.2em] uppercase"
                          style={{ color: note.color }}
                        >
                          {note.type}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white/80">{note.number}</span>
                      </div>

                      {/* Expanded Bottom */}
                      <div className="flex items-end gap-4 mt-auto">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-white text-gray-900 border border-transparent shadow-md"
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold tracking-wider text-white uppercase leading-none">
                            {note.title}
                          </h3>
                          <h4
                            className="text-[8px] font-semibold tracking-widest uppercase mt-1.5"
                            style={{ color: note.color }}
                          >
                            {note.subtitle}
                          </h4>
                          <p className="text-[11px] text-white/75 leading-relaxed font-normal mt-2 line-clamp-3">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
