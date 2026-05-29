"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Aurora from "@/components/Aurora";
import AnimatedText from "./AnimatedText";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  // Scroll-driven scale animation on the dashboard mockup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scale from 0.85 → 1 as hero scrolls into view (opacity remains 1)
  const rawScale = useTransform(scrollYProgress, [0, 0.55], [0.85, 1]);

  // useSpring adds a smooth lag — feels premium and cinematic
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start pt-32 pb-0 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 ">
        <Aurora
          colorStops={["#007bff", "#ffffff", "#ffcc33"]}
          blend={0.0009}
          amplitude={0.25}
          speed={1.5}
        />
      </div>
      {/* Mesh Gradient Background */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 600px 400px at 15% 20%, rgba(251,146,60,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 500px 350px at 85% 15%, rgba(192,132,252,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 700px 500px at 50% 100%, rgba(96,165,250,0.1) 0%, transparent 70%),
              radial-gradient(ellipse 400px 300px at 75% 60%, rgba(244,114,182,0.1) 0%, transparent 70%)
            `,
          }}
        />
      </div> */}

      <motion.div className="relative z-10 flex flex-col items-center text-center px-5 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          ref={ref}
          variants={fadeInDirection("up", 0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex items-center gap-2 mb-7 bg-[#f9fafb] p-1.5 rounded-lg backdrop-blur-sm border border-gray-200/70
                shadow-[0px_1px_2px_rgba(16,24,40,0.1),0px_8px_24px_rgba(16,24,40,0.1),0px_16px_48px_rgba(16,24,40,0.1)]"
        >
          <span className="px-2.5 py-1 bg-gray-900 text-white text-[11px] font-semibold rounded-md tracking-wide uppercase">
            New
          </span>
          <span className="text-[14px] text-gray-500 font-medium">
            AI Search: Find leads your way
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-gray-400"
          >
            <path
              d="M3 7h8M8 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInDirection("up", 0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[52px] sm:text-[64px] md:text-[72px] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 mb-6 "
        >
          Your Edge To Every
          <br />
          Job Opportunity
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeInDirection("up", 0.6)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[17px] text-gray-500 leading-relaxed max-w-xl mb-9 font-normal"
        >
          Unlock rapid growth by combining intelligent automation, real-time
          insights, and streamlined workflows.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInDirection("up", 0.8)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center gap-3 mb-4"
        >
          <motion.a
            whileHover="hover"
            initial="rest"
            animate="rest"
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            className="px-6 py-3 bg-gray-900 text-white hover:text-black text-[15px] rounded-lg hover:button-hover-bg transition-all duration-200 shadow-md hover:shadow-md"
          >
            <AnimatedText text="Get 14 Days Free Trial" />
          </motion.a>
        </motion.div>

        {/* No credit card */}
        <motion.p
          variants={fadeInDirection("up", 1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[13px] text-gray-400 mb-14"
        >
          No Credit Card Required
        </motion.p>
      </motion.div>

      {/* Dashboard Mockup — scales up as you scroll */}
      <div className="relative z-10 w-full flex justify-center px-5 max-w-6xl mx-auto">
        <motion.div
          variants={fadeInDirection("up", 1.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ scale }}
          className="w-full relative"
        >
          {/* Glow behind mockup */}
          <div
            className="absolute -inset-8 rounded-3xl blur-3xl opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(251,146,60,0.3), rgba(192,132,252,0.3), rgba(96,165,250,0.3))",
            }}
          />
          <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-2xl shadow-gray-200/60 bg-white">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 px-3 py-1 bg-white rounded-md text-[11px] text-gray-400 border border-gray-200 text-center">
                jodedge/dashboard
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex min-h-[420px] bg-white">
              {/* Sidebar */}
              <div className="w-52 border-r border-gray-100 bg-gray-50/50 p-4 hidden sm:block">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-md bg-[#FF6B00] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6C2 3.8 3.8 2 6 2s4 1.8 4 4M3.5 9C3.5 7.7 4.7 7 6 7s2.5.7 2.5 2"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">
                    Filo
                  </span>
                </div>
                {[
                  { icon: "📊", label: "Analytics", active: true },
                  { icon: "👤", label: "Contacts" },
                  { icon: "💰", label: "Revenue" },
                  { icon: "📋", label: "Tasks" },
                  { icon: "⚙️", label: "Settings" },
                ].map(({ icon, label, active }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 cursor-pointer ${
                      active
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-[14px]">{icon}</span>
                    <span className="text-[12px] font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-5 overflow-hidden">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    {
                      label: "Monthly Revenue",
                      value: "$84,320",
                      change: "+12.5%",
                      color: "bg-orange-50",
                    },
                    {
                      label: "Active Deals",
                      value: "247",
                      change: "+8.2%",
                      color: "bg-purple-50",
                    },
                    {
                      label: "Win Rate",
                      value: "68%",
                      change: "+3.1%",
                      color: "bg-blue-50",
                    },
                  ].map(({ label, value, change, color }) => (
                    <div
                      key={label}
                      className={`${color} rounded-xl p-3 border border-gray-100`}
                    >
                      <p className="text-[10px] text-gray-500 mb-1">{label}</p>
                      <p className="text-[20px] font-black text-gray-900">
                        {value}
                      </p>
                      <span className="text-[10px] font-semibold text-green-500">
                        {change}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[12px] font-semibold text-gray-700">
                      Monthly Sales
                    </p>
                    <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-full border">
                      Last 6 months
                    </span>
                  </div>
                  {/* SVG Chart */}
                  <svg viewBox="0 0 400 80" className="w-full h-16">
                    <defs>
                      <linearGradient
                        id="chartGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FF6B00"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF6B00"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 60 L60 45 L120 55 L180 30 L240 40 L300 20 L360 25 L400 15 L400 80 L0 80Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0 60 L60 45 L120 55 L180 30 L240 40 L300 20 L360 25 L400 15"
                      stroke="#FF6B00"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Contacts Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-gray-700">
                      Recent Contacts
                    </p>
                    <span className="text-[10px] text-[#FF6B00] font-medium">
                      View all
                    </span>
                  </div>
                  {[
                    {
                      name: "Sarah Johnson",
                      company: "TechCorp",
                      status: "Hot Lead",
                      color: "bg-red-100 text-red-600",
                    },
                    {
                      name: "Mark Williams",
                      company: "GrowthCo",
                      status: "Qualified",
                      color: "bg-green-100 text-green-600",
                    },
                    {
                      name: "Emma Davis",
                      company: "SaasBase",
                      status: "Prospect",
                      color: "bg-blue-100 text-blue-600",
                    },
                  ].map(({ name, company, status, color }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                          {name[0]}
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-gray-800">
                            {name}
                          </p>
                          <p className="text-[10px] text-gray-400">{company}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
