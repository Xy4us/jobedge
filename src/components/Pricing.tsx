"use client";

import { motion, useSpring } from "framer-motion";
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import confetti from "canvas-confetti";
import { Check, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { fadeInDirection } from "@/utils/motion";

// --- HOOKS & UTILITIES ---

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = window.matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

// --- INTERACTIVE STARFIELD BACKGROUND ---

function StarFieldItem({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [initialPos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const starX =
      containerRect.left +
      (parseFloat(initialPos.left) / 100) * containerRect.width;
    const starY =
      containerRect.top +
      (parseFloat(initialPos.top) / 100) * containerRect.height;

    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = 600; // Radius of magnetic influence

    if (distance < radius) {
      const force = 1 - distance / radius;
      const pullX = deltaX * force * 0.5;
      const pullY = deltaY * force * 0.5;
      springX.set(pullX);
      springY.set(pullY);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, initialPos, containerRef, springX, springY]);

  return (
    <motion.div
      className="absolute bg-gray-950/15 rounded-full"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: `${3.5 + Math.random() * 5.5}px`,
        height: `${3.5 + Math.random() * 5.5}px`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.15, 0.85, 0.15] }}
      transition={{
        duration: 3 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    />
  );
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: 55 }).map((_, i) => (
        <StarFieldItem
          key={`star-${i}`}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

// --- DATA DEFINITION ---

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    price: "7.99",
    yearlyPrice: "5.99",
    period: "month",
    features: [
      "CV Builder with 3 templates",
      "Cover Letter Builder",
      "Basic AI suggestions",
      "PDF downloads",
      "5 documents per month",
      "Email support",
    ],
    description: "Perfect for getting started with CV and cover letters",
    buttonText: "Get Started",
    href: "#",
  },
  {
    name: "Professional",
    price: "19.99",
    yearlyPrice: "15.99",
    period: "month",
    features: [
      "Everything in Basic",
      "Unlimited CV & cover letters",
      "All premium templates",
      "AI Interview Practice (10 sessions/month)",
      "Online Assessments (unlimited)",
      "Advanced AI enhancements",
      "Priority email support",
      "No watermarks",
    ],
    description: "Most popular for serious job seekers",
    buttonText: "Go Professional",
    href: "#",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "39.99",
    yearlyPrice: "31.99",
    period: "month",
    features: [
      "Everything in Professional",
      "Unlimited AI Interview Practice",
      "Assessment Center Simulations",
      "1-on-1 Career Coaching (2 sessions)",
      "Personalized feedback reports",
      "LinkedIn profile optimization",
      "Job application tracking",
      "24/7 priority support",
    ],
    description: "Complete career preparation package",
    buttonText: "Go Premium",
    href: "#",
  },
];

// --- CONTEXT ---

const PricingContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}>({
  isMonthly: true,
  setIsMonthly: () => { },
});

// --- SUB-COMPONENTS ---

function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const confettiRef = useRef<HTMLDivElement>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;

      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 85,
        spread: 85,
        origin: { x: originX, y: originY },
        colors: ["#3b82f6", "#f59e0b", "#10b981"],
        ticks: 200,
        gravity: 1.1,
        decay: 0.94,
        startVelocity: 28,
      });
    }
  };

  return (
    <div className="flex justify-center select-none z-20 relative">
      <div
        ref={confettiRef}
        className="relative flex w-fit items-center rounded-full bg-gray-100 p-1 border border-gray-200"
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gray-900"
          style={pillStyle}
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-250 cursor-pointer",
            isMonthly ? "text-white" : "text-gray-500 hover:text-gray-800"
          )}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-250 cursor-pointer",
            !isMonthly ? "text-white" : "text-gray-500 hover:text-gray-800"
          )}
        >
          Annual
          <span className={cn("hidden sm:inline", !isMonthly ? "text-white/90" : "")}>
            {" "}(Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Button styles: Solid black for Professional, Outline for Basic/Premium
  const buttonStyleClass = cn(
    "w-full py-3 px-6 rounded-lg font-semibold text-sm text-center tracking-wide transition-all duration-200 border",
    plan.isPopular
      ? "bg-gray-950 text-white border-transparent hover:bg-gray-800"
      : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
  );

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -16 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 90,
        damping: 18,
        delay: index * 0.12,
      }}
      className={cn(
        "rounded-2xl p-8 flex flex-col relative bg-white border transition-all duration-300",
        plan.isPopular
          ? "border-gray-950 shadow-xl lg:scale-[1.02] z-10"
          : "border-gray-200/80 hover:border-gray-300 hover:shadow-md"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gray-950 py-1.5 px-4 rounded-full flex items-center gap-1.5 border border-gray-950 shadow-sm">
            <LucideStar className="text-white h-3.5 w-3.5 fill-current" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              Most Popular
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col text-center">
        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 leading-snug min-h-[40px]">
          {plan.description}
        </p>

        {/* Pricing */}
        <div className="mt-6 flex items-baseline justify-center gap-x-1">
          <span className="text-5xl font-extrabold tracking-tight text-gray-900">
            <NumberFlow
              value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
              format={{
                style: "currency",
                currency: "GBP",
                minimumFractionDigits: 2,
              }}
              className="font-variant-numeric: tabular-nums"
            />
          </span>
          <span className="text-sm font-semibold text-gray-400">
            / {plan.period}
          </span>
        </div>

        {/* Subtitle Billed Info */}
        <p className="text-xs text-gray-400/90 font-medium mt-2 min-h-[16px]">
          {isMonthly ? "Billed Monthly" : "Billed Annually"}
        </p>

        {/* Features List */}
        <ul role="list" className="mt-8 space-y-3.5 text-[13.5px] text-gray-600 flex flex-col items-start mx-auto w-fit text-left">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="h-5 w-5 flex-none text-gray-900 mt-0.5" aria-hidden="true" />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button placed at the bottom */}
        <div className="mt-auto pt-8">
          <a href={plan.href} className={buttonStyleClass}>
            {plan.buttonText}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN EXPORTED COMPONENT ---

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <section
        id="pricing"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        className="relative w-full overflow-hidden bg-[#F9FAFB] py-24 md:py-32 border-t border-b border-gray-100 select-none"
      >
        <InteractiveStarfield
          mousePosition={mousePosition}
          containerRef={containerRef}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <motion.span
              variants={fadeInDirection("up", 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-md tracking-wider uppercase mb-1"
            >
              Pricing
            </motion.span>
            <h2 className="text-[38px] sm:text-[46px] tracking-[-0.03em] text-gray-900 mb-4 font-semibold">
              Find the Perfect Plan
            </h2>
            <p className="text-[17px] text-gray-500 max-w-xl mx-auto leading-relaxed font-normal">
              Select the ideal package for your needs and start building today.
            </p>
          </div>

          {/* Toggle switcher */}
          <PricingToggle />

          {/* Pricing Cards Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PricingContext.Provider>
  );
}
