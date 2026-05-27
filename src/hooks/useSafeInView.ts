"use client";

import { useState, useEffect } from "react";
import { useInView as useIntersectionInView, IntersectionOptions } from "react-intersection-observer";

export function useSafeInView(options?: IntersectionOptions) {
  const { ref, inView: observerInView, entry } = useIntersectionInView(options);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (observerInView) {
      setInView(true);
    }
  }, [observerInView]);

  useEffect(() => {
    let active = true;
    
    const checkBrave = async () => {
      try {
        // @ts-ignore
        if (typeof window !== "undefined" && window.navigator && navigator.brave && typeof navigator.brave.isBrave === "function") {
          // @ts-ignore
          const isBrave = await navigator.brave.isBrave();
          if (isBrave && active) {
            // Brave Shields can interfere with IntersectionObserver.
            // Provide a graceful fallback to ensure components are visible.
            const timer = setTimeout(() => {
              setInView(true);
            }, 800);
            return () => clearTimeout(timer);
          }
        }
      } catch (e) {
        // Fallback for safety
      }
    };
    
    checkBrave();
    
    return () => {
      active = false;
    };
  }, []);

  return { ref, inView, entry };
}
