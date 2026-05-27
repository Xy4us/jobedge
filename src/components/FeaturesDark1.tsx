"use client";

import { motion } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const pills = [
  "Lead Scoring", "Email Sequences", "Pipeline CRM", "Deal Tracking",
  "AI Suggestions", "Revenue Forecast", "Meeting Scheduler", "Contact Enrichment",
  "Smart Alerts", "Team Collaboration", "Analytics Reports", "CRM Sync",
  "Automated Follow-ups", "Call Recording", "Prospect Finder", "Playbooks",
];

export default function FeaturesDark1() {
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
          style={{
            background: "radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 70%)"
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.span
          ref={ref}
          variants={fadeInDirection("up", 0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="inline-block px-3 py-1 border border-white/20 text-white/60 text-[11px] font-semibold rounded-full tracking-wider uppercase mb-6"
        >
          Platform
        </motion.span>

        <motion.h2
          variants={fadeInDirection("up", 0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[38px] sm:text-[52px] font-black tracking-[-0.03em] text-white mb-4"
        >
          All in one platform
        </motion.h2>

        <motion.p
          variants={fadeInDirection("up", 0.6)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[17px] text-white/50 max-w-lg mx-auto leading-relaxed mb-14"
        >
          Replace your fragmented sales stack with one intelligent platform that handles every step of your revenue journey.
        </motion.p>

        {/* Pills Cloud */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {pills.map((pill, i) => (
            <motion.span
              key={pill}
              variants={fadeInDirection("up", 0.8 + i * 0.04)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-200 cursor-default
                ${i % 4 === 0
                  ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]"
                  : i % 4 === 1
                  ? "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  : i % 4 === 2
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
