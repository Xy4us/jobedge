"use client";

import { motion } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

export default function FeaturesGrid2() {
  const leftCards = [
    {
      title: "Real-Time Pipeline View",
      description: "See all your deals, stages, and team activity in one dynamic visual board. Never miss a follow-up again.",
      visual: (
        <div className="mt-5 space-y-2">
          {[
            { stage: "Discovery", count: 12, width: "75%", color: "bg-blue-400" },
            { stage: "Proposal", count: 7, width: "50%", color: "bg-orange-400" },
            { stage: "Negotiation", count: 4, width: "30%", color: "bg-purple-400" },
            { stage: "Closed Won", count: 9, width: "60%", color: "bg-green-400" },
          ].map(({ stage, count, width, color }) => (
            <div key={stage} className="flex items-center gap-3">
              <span className="text-[11px] text-gray-500 w-24 shrink-0">{stage}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width }} />
              </div>
              <span className="text-[11px] font-semibold text-gray-700">{count}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "AI Reply Suggestions",
      description: "Get intelligent response drafts for every prospect email. Reply faster, sound better, close sooner.",
      visual: (
        <div className="mt-5 bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p className="text-[11px] text-gray-400 mb-2">AI Suggested Reply</p>
          <p className="text-[12px] text-gray-700 leading-relaxed">
            &quot;Hi Sarah, following up on our demo call — happy to answer any questions about our enterprise plan and ROI projections...&quot;
          </p>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1 bg-gray-900 text-white text-[10px] font-semibold rounded-full">Use Reply</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-full">Regenerate</button>
          </div>
        </div>
      ),
    },
  ];

  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            ref={ref}
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-[11px] font-bold rounded-full tracking-wider uppercase mb-5"
          >
            PRO
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[46px] font-black tracking-[-0.03em] text-gray-900 mb-4"
          >
            AI-Powered Sales Overview
          </motion.h2>
          <motion.p
            variants={fadeInDirection("up", 0.6)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[17px] text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            Get a bird&apos;s-eye view of your entire revenue engine. Spot opportunities, fix gaps, and make data-driven decisions in seconds.
          </motion.p>
        </div>

        {/* 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Cards */}
          <div className="flex flex-col gap-5">
            {leftCards.map(({ title, description, visual }, i) => (
              <motion.div
                key={title}
                variants={fadeInDirection("left", 0.8 + 0.15 * i)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:shadow-gray-100 transition-all duration-300"
              >
                <h3 className="text-[19px] font-bold text-gray-900 tracking-tight mb-2">{title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{description}</p>
                {visual}
              </motion.div>
            ))}
          </div>

          {/* Right Big Card */}
          <motion.div
            variants={fadeInDirection("right", 1.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:shadow-gray-100 transition-all duration-300"
          >
            <h3 className="text-[19px] font-bold text-gray-900 tracking-tight mb-2">Revenue Analytics Dashboard</h3>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
              Track MRR, ARR, churn, and expansion revenue in one unified view. Know your numbers before your next board meeting.
            </p>

            {/* Revenue Chart Mock */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-[11px] text-gray-400">Total Revenue</p>
                  <p className="text-[28px] font-black text-gray-900">$284,520</p>
                </div>
                <span className="text-[13px] font-semibold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">+18.4%</span>
              </div>
              <svg viewBox="0 0 300 80" className="w-full h-20 mt-2">
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 70 L40 60 L80 65 L120 45 L160 50 L200 30 L240 35 L280 15 L300 18 L300 80 L0 80Z" fill="url(#revGrad)"/>
                <path d="M0 70 L40 60 L80 65 L120 45 L160 50 L200 30 L240 35 L280 15 L300 18" stroke="#FF6B00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Metric cards row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "MRR", value: "$23.7k", color: "bg-orange-50" },
                { label: "Churn", value: "1.2%", color: "bg-green-50" },
                { label: "LTV", value: "$4,820", color: "bg-blue-50" },
              ].map(({ label, value, color }) => (
                <div key={label} className={`${color} rounded-xl p-3 text-center`}>
                  <p className="text-[10px] text-gray-500 mb-1">{label}</p>
                  <p className="text-[16px] font-black text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
