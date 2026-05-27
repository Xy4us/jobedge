"use client";

import { motion } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const cards = [
  {
    title: "AI Lead Intelligence",
    description: "Automatically research, score, and prioritize every lead using real-time data from 40+ sources.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#FF6B00" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="#FF6B00"/>
      </svg>
    ),
  },
  {
    title: "Automated Outreach",
    description: "Send the right message at the right time. AI crafts and delivers personalized sequences automatically.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 2L11 13" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Conversation Intelligence",
    description: "Analyze every call and email with AI. Get coaching tips, sentiment analysis, and win-rate insights.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10h8M8 14h5" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Predictive Forecasting",
    description: "Know your revenue before it happens. ML models trained on your deal history predict outcomes with 92% accuracy.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 18L9 12L13 16L21 7" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 3v4h-4" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Team Performance",
    description: "Real-time dashboards for every rep. Track activity, quota attainment, and coaching opportunities.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="3" stroke="#FF6B00" strokeWidth="1.8"/>
        <circle cx="16" cy="8" r="3" stroke="#FF6B00" strokeWidth="1.8"/>
        <path d="M2 20c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Native Integrations",
    description: "Connect with 200+ tools in one click. Salesforce, HubSpot, Slack, Gmail — always in sync.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="6" height="6" rx="2" stroke="#FF6B00" strokeWidth="1.8"/>
        <rect x="16" y="7" width="6" height="6" rx="2" stroke="#FF6B00" strokeWidth="1.8"/>
        <path d="M8 10h8" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 3v4M12 17v4" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function FeaturesDark2() {
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-24 bg-[#0D0D0D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[48px] font-black tracking-[-0.03em] text-white mb-4"
          >
            Supercharge your business
          </motion.h2>
          <motion.p
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[17px] text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Six powerful capabilities that work together to accelerate your entire revenue operation.
          </motion.p>
        </div>

        {/* 3-col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ title, description, icon }, i) => (
            <motion.div
              key={title}
              variants={fadeInDirection("up", 0.6 + i * 0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mb-5 group-hover:bg-[#FF6B00]/20 transition-colors duration-200">
                {icon}
              </div>

              <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight">{title}</h3>
              <p className="text-[14px] text-white/50 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
