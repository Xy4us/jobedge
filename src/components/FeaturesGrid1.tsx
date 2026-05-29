"use client";

import { motion } from "framer-motion";
import BorderGlow from "./BorderGlow";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const features = [
  {
    title: "Create tailored CVs & check ATS compliance",
    description:
      "Optimize your resume dynamically to align with job descriptions. Identify missing keywords and correct formatting issues to rank highly on applicant tracking systems.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="16" height="18" rx="2" stroke="#FF6B00" strokeWidth="1.8" />
        <line x1="7" y1="7" x2="15" y2="7" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="11" x2="15" y2="11" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="15" x2="11" y2="15" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 14l2 2 3-3" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "AI",
    large: false,
  },
  {
    title: "Cover Letter aligned with Job description",
    description:
      "Generate persuasive, targeted cover letters that match the tone and requirements of your target role. Grab the attention of recruiters with personalized copy.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="2"
          y="5"
          width="18"
          height="13"
          rx="2"
          stroke="#FF6B00"
          strokeWidth="1.8"
        />
        <path
          d="M2 8l9 5 9-5"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    tag: "Automation",
    large: false,
  },
  {
    title: "Online Assessments Practice",
    description:
      "Master Numerical, Situational Judgement Tests (SJTs), Verbal Reasoning, Logical Reasoning, and many other corporate assessments using high-fidelity simulated tests.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="14" width="4" height="6" rx="1" fill="#FF6B00" />
        <rect
          x="9"
          y="9"
          width="4"
          height="11"
          rx="1"
          fill="#FF6B00"
          opacity="0.6"
        />
        <rect
          x="16"
          y="4"
          width="4"
          height="16"
          rx="1"
          fill="#FF6B00"
          opacity="0.3"
        />
      </svg>
    ),
    tag: "Analytics",
    large: false,
  },
  {
    title: "Virtual Interview Practice",
    description:
      "Polish your delivery using mock sessions covering competency-based, strengths-based, employer-based, and sector-based questions with instant pacing guidance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="3"
          y="4"
          width="16"
          height="15"
          rx="2"
          stroke="#FF6B00"
          strokeWidth="1.8"
        />
        <path d="M3 9h16" stroke="#FF6B00" strokeWidth="1.8" />
        <path
          d="M8 2v3M14 2v3"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M7 13h4M7 16h2"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    tag: "Productivity",
    large: false,
  },
  {
    title: "Virtual Assessment Center Simulation",
    description:
      "Navigate complex final-stage selection days. Participate in comprehensive presentation exercises, interactive group roleplay simulations, and high-intensity business case study exercises.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" stroke="#FF6B00" strokeWidth="1.8" />
        <path
          d="M11 2v3M11 17v3M2 11h3M17 11h3"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4.9 4.9l2.1 2.1M14.9 14.9l2.1 2.1M17.1 4.9l-2.1 2.1M7.1 14.9l-2.1 2.1"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    tag: "Integrations",
    large: true,
  },
];

const tagColors: Record<string, string> = {
  AI: "bg-orange-50 text-orange-600 border-orange-100",
  Automation: "bg-purple-50 text-purple-600 border-purple-100",
  Analytics: "bg-blue-50 text-blue-600 border-blue-100",
  Productivity: "bg-green-50 text-green-600 border-green-100",
  Integrations: "bg-pink-50 text-pink-600 border-pink-100",
};

export default function FeaturesGrid1() {
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            ref={ref}
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-md tracking-wider uppercase mb-5"
          >
            <span>FREE</span>
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[46px]  tracking-[-0.03em] text-gray-900 mb-4 font-medium"
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

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ title, description, icon, tag, large }, i) => (
            <motion.div
              key={title}
              variants={fadeInDirection("up", 0.8 + i * 0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={large ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <BorderGlow
                edgeSensitivity={28}
                glowColor="25 90 65"
                backgroundColor="#ffffff"
                borderRadius={16}
                glowRadius={60}
                glowIntensity={1.5}
                coneSpread={30}
                animated
                colors={["#ff6b00", "#c084fc", "#38bdf8"]}
                className="w-full h-full group"
              >
                <div className="p-6 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon Box */}
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors duration-200">
                      {icon}
                    </div>

                    {/* Tag */}
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full border mb-3 ${tagColors[tag]}`}
                    >
                      {tag}
                    </span>

                    <h3 className="text-[17px] font-bold text-gray-900 mb-2 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
