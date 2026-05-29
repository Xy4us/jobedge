"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Brain, Video, Target } from "lucide-react";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

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

export default function FeaturesGrid1() {
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
        {/* Desktop Layout: Horizontal Row of Vertical Expanding Cards */}
        <div className="hidden md:flex flex-row h-[560px] w-full gap-4 items-stretch">
          {FEATURE_NOTES.map((note, index) => {
            const isActive = activeIndex === index;
            const IconComponent = note.icon;

            return (
              <motion.div
                key={note.id}
                layout
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-[32px] overflow-hidden cursor-pointer select-none border border-gray-200/70 shadow-sm ${
                  isActive ? "flex-[4.5] md:flex-[5] shadow-md" : "flex-[1] hover:shadow-md"
                }`}
                style={{
                  backgroundImage: `url(${note.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              >
                {/* Overlay layer: Vibrant image pop when closed, elegant text contrast background when open */}
                <div 
                  className="absolute inset-0 transition-all duration-700 ease-out" 
                  style={{
                    background: isActive 
                      ? "linear-gradient(to top, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0) 100%)" 
                      : "rgba(0, 0, 0, 0.12)"
                  }}
                />

                {/* Subtle active border matching the card's active color */}
                {isActive && (
                  <motion.div 
                    layoutId="activeCardOutline"
                    className="absolute inset-0 rounded-[32px] border pointer-events-none z-20"
                    style={{ borderColor: `${note.color}55` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                )}

                {/* Content wrapper inside cards */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  {/* Top: Card Index / Type */}
                  <div className="flex justify-between items-start">
                    {/* Hide category on desktop closed state to completely prevent vertical text wrapping / clipping */}
                    {isActive ? (
                      <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                        {note.type}
                      </span>
                    ) : (
                      <div />
                    )}
                    <span 
                      className={`text-xs font-mono font-bold tracking-widest transition-colors duration-500 ${
                        isActive ? "" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                      }`}
                      style={{ color: isActive ? note.color : undefined }}
                    >
                      {note.number}
                    </span>
                  </div>

                  {/* Bottom Area */}
                  <div className="flex items-end gap-5">
                    {/* Circle Icon Badge */}
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500 ${
                        isActive 
                          ? "bg-gray-900 text-white scale-105 border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.15)]" 
                          : "bg-white text-gray-600 border-gray-200 hover:text-gray-900 shadow-sm"
                      }`}
                      style={{ 
                        boxShadow: isActive ? `0 8px 30px ${note.color}33` : undefined
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Expandable Text (Title, Subtitle, Description) */}
                    <div className="overflow-hidden flex flex-col justify-center">
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="pr-4"
                          >
                            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-none">
                              {note.title}
                            </h3>
                            <h4 
                              className="text-[12px] md:text-[13px] font-bold tracking-wider uppercase mt-2.5"
                              style={{ color: note.color }}
                            >
                              {note.subtitle}
                            </h4>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-normal mt-3 max-w-xl">
                              {note.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Layout: Stacked Horizontal Cards with Vertical Expansion */}
        <div className="flex md:hidden flex-col gap-3.5 w-full">
          {FEATURE_NOTES.map((note, index) => {
            const isActive = activeIndex === index;
            const IconComponent = note.icon;

            return (
              <motion.div
                key={`${note.id}-mobile`}
                layout
                onClick={() => setActiveIndex(index)}
                className="relative rounded-[24px] overflow-hidden cursor-pointer w-full select-none border border-gray-200/70 shadow-sm"
                style={{
                  backgroundImage: `url(${note.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: isActive ? "260px" : "75px",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
              >
                {/* Backdrop Overlays */}
                <div 
                  className="absolute inset-0 transition-all duration-500" 
                  style={{
                    background: isActive 
                      ? "linear-gradient(to top, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.85) 60%, rgba(255, 255, 255, 0.1) 100%)" 
                      : "rgba(0, 0, 0, 0.28)"
                  }}
                />

                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-[24px] border pointer-events-none z-20"
                    style={{ borderColor: `${note.color}55` }}
                  />
                )}

                {/* Inner Padding */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  {/* Closed Mobile Header (Compact Mode) */}
                  {!isActive ? (
                    <div className="flex items-center justify-between h-full w-full">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-gray-600 border border-gray-200 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                            {note.title}
                          </h3>
                          <span 
                            className="text-[8px] font-bold tracking-widest uppercase block mt-0.5"
                            style={{ color: `${note.color}` }}
                          >
                            {note.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-white/80 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{note.number}</span>
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
                        <span className="text-[10px] font-mono font-bold text-gray-400">{note.number}</span>
                      </div>

                      {/* Expanded Bottom */}
                      <div className="flex items-end gap-4 mt-auto">
                        <div 
                          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-gray-900 text-white"
                          style={{ 
                            border: `1px solid ${note.color}`,
                            boxShadow: `0 8px 24px ${note.color}33`
                          }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold tracking-wider text-gray-900 uppercase leading-none">
                            {note.title}
                          </h3>
                          <h4 
                            className="text-[8px] font-semibold tracking-widest uppercase mt-1.5"
                            style={{ color: note.color }}
                          >
                            {note.subtitle}
                          </h4>
                          <p className="text-[9px] text-gray-600 leading-relaxed font-normal mt-2 line-clamp-3">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
