import { Variants } from "framer-motion";

/**
 * Premium slide/fade up variant for container headings and grids.
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Premium custom cubic-bezier
    },
  },
};

/**
 * Fade-in animation variant.
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Variant generator for customizable delayed fade-in directions.
 */
export const fadeInDirection = (
  direction: "up" | "down" | "left" | "right",
  delay: number = 0,
  duration: number = 0.8
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
        duration,
      },
    },
  };
};

/**
 * Staggered container animation variant.
 */
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};
