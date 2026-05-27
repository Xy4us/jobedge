"use client";

import { motion } from "framer-motion";
import BorderGlow from "./BorderGlow";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const features = [
  {
    title: "AI-Powered Lead Scoring",
    description:
      "Automatically rank and prioritize leads based on engagement, fit, and intent signals so your team focuses on the right prospects.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L13.5 7.5H19L14.5 11L16.5 17L11 13.5L5.5 17L7.5 11L3 7.5H8.5L11 2Z"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    tag: "AI",
    large: false,
  },
  {
    title: "Smart Email Sequences",
    description:
      "Create personalized outreach campaigns that adapt in real-time based on prospect behavior and response patterns.",
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
    title: "Deal Pipeline Tracking",
    description:
      "Visualize your entire sales pipeline at a glance. Track every opportunity from first touch to closed deal with real-time status updates.",
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
    large: true,
  },
  {
    title: "Meeting Scheduler",
    description:
      "Remove the back-and-forth. Let prospects book meetings directly into your calendar with intelligent availability detection.",
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
    title: "CRM Integrations",
    description:
      "Sync seamlessly with Salesforce, HubSpot, and 50+ tools. Keep your data in sync automatically without manual updates.",
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
    large: false,
  },
  {
    title: "Revenue Forecasting",
    description:
      "Get accurate revenue predictions powered by machine learning. Plan confidently with AI-driven forecasts based on historical data.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 16L8 10L12 13L17 7"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 4v3h-3"
          stroke="#FF6B00"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    tag: "AI",
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
