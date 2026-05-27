"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]"
          style={{
            background: `
              radial-gradient(ellipse 350px 300px at 30% 50%, rgba(255,107,0,0.15) 0%, transparent 70%),
              radial-gradient(ellipse 350px 300px at 70% 50%, rgba(192,132,252,0.12) 0%, transparent 70%)
            `
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.span
          ref={ref}
          variants={fadeInDirection("up", 0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="inline-block px-3 py-1 border border-white/20 text-white/60 text-[11px] font-semibold rounded-full tracking-wider uppercase mb-7"
        >
          Get Started Today
        </motion.span>

        <motion.h2
          variants={fadeInDirection("up", 0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[40px] sm:text-[56px] font-black tracking-[-0.03em] mb-5 leading-[1.05]"
          style={{
            background: "linear-gradient(135deg, #ffffff 30%, rgba(255,107,0,0.9) 65%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Start closing more deals today
        </motion.h2>

        <motion.p
          variants={fadeInDirection("up", 0.6)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[17px] text-white/50 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Join 25,000+ founders and sales leaders who use Filo to grow faster. Set up in minutes — no credit card required.
        </motion.p>

        {/* Email Form */}
        <motion.div
          variants={fadeInDirection("up", 0.8)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l5 5 7-8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-white text-[16px] font-semibold">You&apos;re on the list! 🎉</p>
              <p className="text-white/50 text-[14px]">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="flex-1 w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-white text-gray-900 font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap shadow-md"
              >
                Get Started Free
              </button>
            </form>
          )}
          <p className="text-[12px] text-white/30 mt-4">No credit card required · 14-day free trial · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
