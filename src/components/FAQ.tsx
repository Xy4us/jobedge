"use client";

import React from "react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-none", className)}
    {...props}
  />
));
CustomAccordionItem.displayName = "CustomAccordionItem";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 rounded-2xl p-5 text-left cursor-pointer",
        "bg-white border border-gray-100 transition-all hover:bg-gray-50/70 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/10",
        "data-[state=open]:shadow-md data-[state=open]:bg-gray-50/50",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <HelpCircle className="h-5 w-5 text-gray-500 shrink-0" />
        <span className="text-[16px] font-semibold text-gray-800 tracking-wide leading-snug">
          {children}
        </span>
      </div>
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
        <ChevronDown className="h-4 w-4 text-gray-700" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CustomAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-gray-600 transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-2",
      className
    )}
    {...props}
  >
    <div className="mt-4 ml-0 sm:ml-14">
      <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm transition-all">
        <span className="flex-1 text-[14.5px] leading-relaxed font-normal">{children}</span>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition-transform hover:scale-105">
          <MessageCircle className="h-4.5 w-4.5 text-gray-500" />
        </div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = "CustomAccordionContent";

const faqs = [
  {
    q: "Is there a free plan available?",
    a: "Yes! Our Basic plan is completely free with no credit card required. You get access to our core CV builder, cover letter builder, basic AI suggestions, and up to 5 documents per month — perfect for getting started.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. You can cancel at any time with zero penalties. If you cancel, you'll retain access to your plan until the end of your billing period, and your data will be available for export.",
  },
  {
    q: "How does the 14-day free trial work?",
    a: "Sign up for Professional or Premium and get full access to every feature for 14 days, no credit card required. At the end of the trial, you can choose to subscribe or drop to the free Basic plan.",
  },
  {
    q: "Does JobEdge support CV formats for different industries?",
    a: "Yes. JobEdge provides templates and AI optimizations tailored for finance, technology, consulting, healthcare, and 20+ other industries to ensure your resume passes applicant tracking systems (ATS).",
  },
  {
    q: "Is my data secure?",
    a: "Security is our top priority. We use bank-grade AES-256 encryption for data at rest and TLS 1.3 in transit. We are fully GDPR compliant, and your personal information and documents are never sold or shared.",
  },
  {
    q: "Can I get a demo before committing?",
    a: "Of course! Book a 30-minute personalized demo with our team and we'll walk you through the platform, show you the assessment simulations and AI interview practice, and help you find the best plan.",
  },
];

export default function FAQ() {
  const { ref: inViewRef, inView } = useSafeInView({
    triggerOnce: true,
  });

  return (
    <section id="contact" className="py-24 bg-white select-none relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-50/40 via-transparent to-gray-50/30 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            ref={inViewRef}
            variants={fadeInDirection("up", 0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-md tracking-wider uppercase mb-5"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeInDirection("up", 0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[38px] sm:text-[46px] tracking-[-0.03em] text-gray-900 mb-4 font-semibold"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            variants={fadeInDirection("up", 0.6)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[17px] text-gray-500 font-normal"
          >
            Can&apos;t find your answer?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Chat with us
            </a>
          </motion.p>
        </div>

        {/* Custom Radix Accordion */}
        <CustomAccordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <CustomAccordionItem key={index} value={`item-${index}`}>
              <CustomAccordionTrigger>{faq.q}</CustomAccordionTrigger>
              <CustomAccordionContent>{faq.a}</CustomAccordionContent>
            </CustomAccordionItem>
          ))}
        </CustomAccordion>
      </div>
    </section>
  );
}
