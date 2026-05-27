"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const plans = [
  {
    name: "Starter",
    priceMonthly: 14.99,
    priceQuarterly: 11.99,
    description: "For individuals and very small teams just getting started.",
    cta: "Get Started",
    ctaStyle: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    highlighted: false,
    features: ["CV limited", "Low level tests", "Interview prep limited"],
  },
  {
    name: "Pro",
    priceMonthly: 25.99,
    priceQuarterly: 19.99,
    description: "For growing teams that need AI-powered sales tools.",
    cta: "Get Started",
    ctaStyle: "bg-gray-900 text-white hover:bg-gray-700",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "All mentioned in Starter",
      "CL",
      "Interview prep - 5/week/type",
      "All assessments",
    ],
  },
  {
    name: "Scale",
    priceMonthly: 49.49,
    priceQuarterly: 34.65,
    description: "For high-volume sales teams that need enterprise power.",
    cta: "Get Started",
    ctaStyle: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    highlighted: false,
    features: ["All mentioned in Pro", "Assessment Center"],
  },
];

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className="shrink-0 mt-0.5"
  >
    <circle cx="7" cy="7" r="7" fill="#22C55E" />
    <path
      d="M4.5 7l2 2 3-3"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Pricing() {
  const [quarterly, setQuarterly] = useState(false);
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            ref={ref}
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-full tracking-wider uppercase mb-5"
          >
            Pricing
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[52px] sm:text-[64px] md:text-[72px] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 mb-6"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            variants={fadeInDirection("up", 0.6)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[17px] text-gray-500 leading-relaxed max-w-xl mx-auto mb-9 font-normal"
          >
            Start free, upgrade when you&apos;re ready. No hidden fees.
          </motion.p>

          {/* Toggle */}
          <motion.div
            variants={fadeInDirection("up", 0.8)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1.5"
          >
            <button
              onClick={() => setQuarterly(false)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                !quarterly
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setQuarterly(true)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 flex items-center gap-2 ${
                quarterly ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
              }`}
            >
              Quarterly
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map(
            (
              {
                name,
                priceMonthly,
                priceQuarterly,
                description,
                cta,
                ctaStyle,
                highlighted,
                badge,
                features,
              },
              i,
            ) => (
              <motion.div
                key={name}
                variants={fadeInDirection("up", 1.0 + i * 0.15)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                  highlighted
                    ? "border-gray-900 shadow-2xl shadow-gray-200/80 scale-[1.02]"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                {highlighted && badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-full">
                      {badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-[20px] font-semibold text-gray-900 mb-1">
                    {name}
                  </h3>
                  <div className="flex items-end gap-1.5 mb-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={quarterly ? "q" : "m"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-[48px] font-black tracking-tighter text-gray-900"
                      >
                        {priceMonthly === 0
                          ? "Free"
                          : ` £${quarterly ? priceQuarterly : priceMonthly}`}
                      </motion.span>
                    </AnimatePresence>
                    {priceMonthly > 0 && (
                      <span className="text-[14px] text-gray-400 mb-2">
                        /mo
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-500 leading-snug">
                    {description}
                  </p>
                </div>

                <a
                  href="#"
                  className={`block w-full text-center py-3 rounded-lg text-[15px] font-medium mb-7 transition-all duration-200 ${ctaStyle}`}
                >
                  {cta}
                </a>

                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-[13px] text-gray-700 leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
