"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import Image from "next/image";

const navLinks = ["Features", "Pricing", "Blog", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Image width="69" height="69" src="/logo.png" alt="Logo" />
            {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8 C3 5 5 3 8 3 C11 3 13 5 13 8 M5 12 C5 10 6.5 9 8 9 C9.5 9 11 10 11 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg> */}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-[14px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-150"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </a>
            <motion.a
              whileHover="hover"
              initial="rest"
              animate="rest"
              target="_blank"
              rel="noopener noreferrer"
              href="#"
              className="px-4 py-2 bg-gray-900 text-white text-[14px] font-medium rounded-lg hover:button-hover-bg hover:text-black transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <AnimatedText text="Create Free Account" />
            </motion.a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden pb-4 border-t border-gray-100"
            >
              <div className="pt-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-[14px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {link}
                  </a>
                ))}
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="#"
                    className="px-3 py-2.5 text-[14px] font-medium text-gray-600"
                  >
                    Sign In
                  </a>
                  <motion.a
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="#"
                    className="px-4 py-2.5 bg-gray-900 text-white text-[14px] font-medium rounded-sm text-center hover:button-hover-bg transition-all duration-200"
                  >
                    <AnimatedText text="Create Free Account" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
