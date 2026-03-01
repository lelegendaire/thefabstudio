"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function CopyBlur({
  children,
  animationOnScroll = true,
  delay = 0,
  scrub = true,
}) {
  const containerRef = useRef(null);
  const splitRef = useRef(null);
  const charsRef = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Reset
      charsRef.current = [];

      // Split en caractères
      const split = SplitText.create(containerRef.current, {
        type: "chars",
        charsClass: "char++",
      });

      splitRef.current = split;
      charsRef.current = split.chars;

      // Accessibilité
      split.chars.forEach((char) => {
        char.setAttribute("aria-hidden", "true");
      });

      // État initial
      gsap.set(charsRef.current, {
        filter: "blur(10px) brightness(0%)",
        willChange: "filter",
      });

      const animationProps = {
        filter: "blur(0px) brightness(100%)",
        stagger: 0.04,
        ease: "none",
        delay: delay,
      };

      if (animationOnScroll) {
        gsap.to(charsRef.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: scrub,
          },
        });
      } else {
        gsap.to(charsRef.current, {
          ...animationProps,
          duration: 1,
        });
      }

      return () => {
        if (splitRef.current) {
          splitRef.current.revert();
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [animationOnScroll, delay, scrub],
    }
  );

  return React.cloneElement(children, { ref: containerRef });
}