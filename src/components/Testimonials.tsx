"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const testimonials = [
  {
    company: "TechCorp",
    logo: "TC",
    color: "bg-blue-100 text-blue-600",
    quote: "Filo completely transformed how our sales team operates. We went from 40 manual tasks a day to a nearly fully automated pipeline. Our close rate jumped 34% in just two months.",
    name: "Sarah Johnson",
    role: "VP of Sales, TechCorp",
    avatar: "SJ",
  },
  {
    company: "GrowthCo",
    logo: "GC",
    color: "bg-green-100 text-green-600",
    quote: "The AI lead scoring alone is worth the price of the tool. We used to guess which prospects were worth pursuing — now our reps know exactly who to call first, every single day.",
    name: "Mark Williams",
    role: "Head of Revenue, GrowthCo",
    avatar: "MW",
  },
  {
    company: "SaasBase",
    logo: "SB",
    color: "bg-purple-100 text-purple-600",
    quote: "We replaced three separate tools with Filo. Our team actually uses it because it's intuitive and the AI suggestions feel like having a senior sales coach available 24/7.",
    name: "Emma Davis",
    role: "CEO, SaasBase",
    avatar: "ED",
  },
  {
    company: "Nexivo",
    logo: "NX",
    color: "bg-orange-100 text-orange-600",
    quote: "Revenue forecasting used to be a painful 2-day process. With Filo it updates in real time and our predictions are consistently within 5% of actual revenue. Game changer.",
    name: "Alex Chen",
    role: "CFO, Nexivo",
    avatar: "AC",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  const t = testimonials[active];

  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            ref={ref}
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-full tracking-wider uppercase mb-5"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[48px] font-black tracking-[-0.03em] text-gray-900"
          >
            Loved by sales teams
          </motion.h2>
        </div>

        {/* Company Tabs */}
        <motion.div
          variants={fadeInDirection("up", 0.6)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {testimonials.map(({ company, logo, color }, i) => (
            <button
              key={company}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-[13px] font-semibold transition-all duration-200 ${
                active === i
                  ? "bg-gray-900 text-white border-gray-900 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${active === i ? "bg-white/20 text-white" : color}`}>
                {logo}
              </span>
              {company}
            </button>
          ))}
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          variants={fadeInDirection("up", 0.8)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FF6B00">
                    <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9L4.4 12l.7-4L2.2 5.2l4-.6z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[18px] sm:text-[20px] text-gray-800 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[12px] font-bold text-gray-600">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-bold text-gray-900">{t.name}</p>
                  <p className="text-[13px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
