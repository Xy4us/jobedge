"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

const socialLinks = [
  {
    title: "Facebook",
    href: "#",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    title: "Instagram",
    href: "#",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    title: "Youtube",
    href: "#",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    href: "#",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "#features" },
      { title: "Pricing", href: "#pricing" },
      { title: "Changelog", href: "#" },
      { title: "Roadmap", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Press", href: "#" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Documentation", href: "#" },
      { title: "API Reference", href: "#" },
      { title: "Support", href: "#" },
      { title: "Status", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
      { title: "Cookie Policy", href: "#" },
      { title: "GDPR Compliance", href: "#" },
    ],
  },
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn("relative h-[480px] w-full overflow-hidden select-none border-t border-gray-100 sticky-reveal-footer", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <style>{`
        @media (max-width: 767px) {
          .sticky-reveal-footer {
            clip-path: none !important;
            height: auto !important;
            overflow: visible !important;
          }
          .sticky-reveal-footer-fixed {
            position: relative !important;
            height: auto !important;
            bottom: auto !important;
            z-index: auto !important;
          }
          .sticky-reveal-footer-sticky {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            overflow: visible !important;
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
        }
      `}</style>
      {/* fixed bottom container creates the "reveal from behind" effect */}
      <div className="fixed bottom-0 h-[480px] w-full bg-white z-0 sticky-reveal-footer-fixed">
        <div className="sticky top-[calc(100vh-480px)] h-full overflow-y-auto bg-white flex flex-col justify-between py-12 px-5 sm:px-12 md:px-24 sticky-reveal-footer-sticky">
          
          {/* Background decorative gradient */}
          <div
            aria-hidden
            className="absolute inset-0 isolate z-0 pointer-events-none overflow-hidden select-none"
          >
            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,107,0,0.04)_0,rgba(192,132,252,0.02)_50%,rgba(0,0,0,0.01)_80%)] absolute top-0 left-0 h-[800px] w-[350px] -translate-y-[200px] -rotate-45 rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(192,132,252,0.03)_0,rgba(0,0,0,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-[800px] w-[150px] translate-x-[5%] -translate-y-[50%] -rotate-45 rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,107,0,0.03)_0,rgba(0,0,0,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-[800px] w-[150px] -translate-y-[200px] -rotate-45 rounded-full" />
          </div>

          {/* Top Section */}
          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:justify-between items-start">
            
            {/* Brand block */}
            <AnimatedContainer className="w-full max-w-sm space-y-5">
              <Link href="/" className="inline-block">
                <Image width="88" height="88" src="/logo.png" alt="JobEdge Logo" />
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering job seekers with AI-driven CV tailoring, interactive online assessments, mock interviews, and virtual assessment center simulations.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    aria-label={link.title}
                    className="size-8 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer shadow-sm"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </AnimatedContainer>

            {/* Links groups */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:max-w-3xl">
              {footerLinkGroups.map((group, index) => (
                <AnimatedContainer
                  key={group.label}
                  delay={0.1 + index * 0.1}
                  className="w-full"
                >
                  <div>
                    <h3 className="text-[12px] font-bold text-gray-900 tracking-wider uppercase mb-4">
                      {group.label}
                    </h3>
                    <ul className="text-gray-500 space-y-3 text-[13.5px]">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="hover:text-gray-950 inline-flex items-center transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>

          </div>

          {/* Bottom copyright */}
          <div className="relative z-10 text-gray-400 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-[13px] md:flex-row">
            <p>© {new Date().getFullYear()} JobEdge, Inc. All rights reserved.</p>
            <p className="font-semibold text-gray-500">JobEdge</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
