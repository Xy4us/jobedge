"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const faqs = [
  {
    q: "Is there a free plan available?",
    a: "Yes! Our Starter plan is completely free with no credit card required. You get up to 100 contacts, basic pipeline management, and 5 email sequences per month — perfect for getting started.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. You can cancel at any time with zero penalties. If you cancel, you'll retain access to your plan until the end of your billing period, and your data will be available for export.",
  },
  {
    q: "How does the 14-day free trial work?",
    a: "Sign up for Pro or Scale and get full access to every feature for 14 days, no credit card required. At the end of the trial, you can choose to subscribe or drop to the free Starter plan.",
  },
  {
    q: "Does Filo integrate with my existing CRM?",
    a: "Yes. Filo integrates natively with Salesforce, HubSpot, Pipedrive, and 50+ other tools on the Pro plan. Enterprise customers get access to custom integrations and our open API.",
  },
  {
    q: "Is my data secure?",
    a: "Security is our top priority. We use bank-grade AES-256 encryption for data at rest and TLS 1.3 in transit. We're SOC 2 Type II certified and GDPR compliant. Your data is never sold or shared.",
  },
  {
    q: "Can I get a demo before committing?",
    a: "Of course! Book a 30-minute personalized demo with our team and we'll walk you through the platform, answer your questions, and help you find the best plan for your needs.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section id="contact" ref={ref} className="py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-full tracking-wider uppercase mb-5"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[48px] font-black tracking-[-0.03em] text-gray-900 mb-4"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            variants={fadeInDirection("up", 0.6)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[17px] text-gray-500"
          >
            Can&apos;t find your answer?{" "}
            <a href="#" className="text-[#FF6B00] font-medium hover:underline">Chat with us</a>
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-100">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              variants={fadeInDirection("up", 0.8 + i * 0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className={`text-[16px] font-semibold transition-colors duration-200 pr-4 ${open === i ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}>
                  {q}
                </span>
                <span className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? "bg-gray-900 border-gray-900 rotate-45" : "border-gray-200 bg-white"}`}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 2v7M2 5.5h7" stroke={open === i ? "white" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[15px] text-gray-500 leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
