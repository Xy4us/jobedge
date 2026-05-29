"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import Image from "next/image";
import { useLenis } from "lenis/react";

const navLinks = ["Features", "Pricing", "Blog", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(`#${targetId}`);
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ── NAVBAR BAR ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${mobileOpen ? "z-[180]" : "z-[200]"} ${
          scrolled || mobileOpen
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" onClick={handleLogoClick}>
              <Image width="69" height="69" src="/logo.png" alt="Logo" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleLinkClick(e, `#${link.toLowerCase()}`)}
                  className="px-4 py-2 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-all duration-150"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
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

            {/* Mobile burger — only visible on mobile, stays as 3 bars always */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className="block h-0.5 w-5 bg-gray-700" />
              <span className="block h-0.5 w-5 bg-gray-700" />
              <span className="block h-0.5 w-5 bg-gray-700" />
            </button>
          </nav>
        </div>
      </header>

      {/* ── MOBILE DRAWER (portal-like, outside header) ────────── */}
      {/* Rendered as a sibling to <header>, so it is never clipped */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark overlay — covers full viewport, NO backdrop-blur (perf) */}
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 190, background: "rgba(0,0,0,0.55)" }}
            />

            {/* Right-side drawer — slides in from the right */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 195,
                width: "70%",
                maxWidth: "320px",
                background: "#ffffff",
                boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px",
                overflowY: "auto",
              }}
            >
              {/* Top: Logo + close button */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                  <Link href="/" onClick={(e) => { setMobileOpen(false); handleLogoClick(e); }}>
                    <Image width={60} height={60} src="/logo.png" alt="JobEdge Logo" />
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    style={{ padding: "8px", color: "#6b7280", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer" }}
                    aria-label="Close menu"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Nav links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleLinkClick(e, `#${link.toLowerCase()}`);
                      }}
                      style={{ display: "block", padding: "12px", fontSize: "15px", fontWeight: 600, color: "#374151", borderRadius: "8px", textDecoration: "none" }}
                    >
                      {link}
                    </a>
                  ))}

                  <div style={{ height: "1px", background: "#f0f0f0", margin: "12px 0" }} />

                  <a
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "12px", fontSize: "15px", fontWeight: 600, color: "#374151", borderRadius: "8px", textDecoration: "none" }}
                  >
                    Sign In
                  </a>

                  <a
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    style={{ display: "block", marginTop: "8px", width: "100%", padding: "12px", background: "#111827", color: "#ffffff", fontSize: "14px", fontWeight: 700, textAlign: "center", borderRadius: "8px", textDecoration: "none", boxSizing: "border-box" }}
                  >
                    Create Free Account
                  </a>
                </div>
              </div>

              {/* Bottom: Copyright */}
              <div style={{ paddingTop: "24px", borderTop: "1px solid #f0f0f0", fontSize: "11px", color: "#9ca3af", fontWeight: 500, letterSpacing: "0.05em" }}>
                &copy; 2026 JobEdge. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
