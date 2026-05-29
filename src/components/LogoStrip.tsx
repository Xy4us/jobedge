"use client";

import { motion } from "framer-motion";
import LogoLoop from "./LogoLoop";
import { useSafeInView } from "@/hooks/useSafeInView";
import { fadeInDirection } from "@/utils/motion";

const logos = [
  { name: "GSK",            src: "/logonew/gsk.png" },
  { name: "Deloitte",       src: "/logonew/deloitte.png" },
  { name: "PwC",            src: "/logonew/pwc.png" },
  { name: "Apple",          src: "/logonew/apple.png" },
  { name: "Google",         src: "/logonew/google.png" },
  { name: "BP",             src: "/logonew/bp.png" },
  { name: "HSBC",           src: "/logonew/hsbc.png" },
  { name: "Goldman Sachs",  src: "/logonew/Create_Goldman_Sachs_.png" },
  { name: "JP Morgan",      src: "/logonew/jp.png" },
  { name: "AXA",            src: "/logonew/AXA.png" },
  { name: "Amazon",         src: "/logonew/amazon.png" },
  { name: "Meta",           src: "/logonew/meta.png" },
  { name: "IBM",            src: "/logonew/ibm.png" },
  { name: "Oracle",         src: "/logonew/oracle.png" },
  { name: "BBC",            src: "/logonew/bbc.png" },
  { name: "BT Group",       src: "/logonew/bt_group.png" },
  { name: "Shell",          src: "/logonew/shell.png" },
  { name: "Tesco",          src: "/logonew/tesco.png" },
  { name: "ASDA",           src: "/logonew/asda.png" },
  { name: "Linklaters",     src: "/logonew/Linklaters.png" },
  { name: "Aviva",          src: "/logonew/aviva.png" },
  { name: "Royal Mail",     src: "/logonew/royalMail.png" },
  { name: "Home Office UK", src: "/logonew/hk.png" },
  { name: "NHS",            src: "/logonew/nhs.png" },
];

export default function LogoStrip() {
  const { ref, inView } = useSafeInView({
    triggerOnce: true,
  });

  const techLogos = logos.map((logo) => ({
    src: logo.src,
    alt: `${logo.name} logo`,
    title: logo.name,
  }));

  return (
    <section className="py-16 overflow-hidden w-full">
      <div className="max-w-5xl mx-auto px-5">
        <motion.p
          ref={ref}
          variants={fadeInDirection("up", 0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-10"
        >
          Target companies for preparations
        </motion.p>
      </div>

      <div className="w-full">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={56}
          gap={80}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#ffffff"
          ariaLabel="Target company logos"
        />
      </div>
    </section>
  );
}
