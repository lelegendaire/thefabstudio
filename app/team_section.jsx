"use client";

import { useEffect,useRef  } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Team({contactRef }) {
     const teamRef = useRef(null); // ✅ ton ref simple ici
  useEffect(() => {
    if (!contactRef?.current || typeof window === "undefined" || window.innerWidth < 900) return;

   const section = contactRef.current;
 const lenis = new Lenis();

  // NE PAS activer Lenis tout de suite
  // On attend 2 secondes avant de démarrer Lenis et ScrollTrigger.update
  const timeoutId = setTimeout(() => {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }, 6000);
   

    const breakpoints = [
      { maxWidth: 1100, translateY: -135, movMultiplier: 450 },
      { maxWidth: 1100, translateY: -130, movMultiplier: 500 },
      { maxWidth: 1200, translateY: -125, movMultiplier: 550 },
      { maxWidth: 1300, translateY: -120, movMultiplier: 600 },
    ];

    const getInitialValues = () => {
      const width = window.innerWidth;
      for (const bp of breakpoints) {
        if (width <= bp.maxWidth) {
          return {
            translateY: bp.translateY,
            movementMultiplier: bp.movMultiplier,
          };
        }
      }
      return {
        translateY: -110,
        movementMultiplier: 650,
      };
    };

    const initialValues = getInitialValues();

    const animationState = {
      scrollprogress: 0,
      initialTranslateY: initialValues.translateY,
      currentTranslateY: initialValues.translateY,
      movementMultiplier: initialValues.movementMultiplier,
      scale: 0.05,
      targetMouseX: 0,
      currentMouseX: 0,
    };

    const handleResize = () => {
      const newValues = getInitialValues();
      animationState.initialTranslateY = newValues.translateY;
      animationState.movementMultiplier = newValues.movementMultiplier;
      if (animationState.scrollprogress === 0) {
        animationState.currentTranslateY = newValues.translateY;
      }
    };

    window.addEventListener("resize", handleResize);

    gsap.timeline({
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          animationState.scrollprogress = self.progress;
          animationState.currentTranslateY = gsap.utils.interpolate(
            animationState.initialTranslateY,
            0,
            animationState.scrollprogress
          );
          animationState.scale = gsap.utils.interpolate(
            0.05,
            1,
            animationState.scrollprogress
          );
        },
      },
    });

    const animate = () => {
      if (window.innerWidth < 900) return;
      const {
        scale,
        targetMouseX,
        currentMouseX,
        currentTranslateY,
        movementMultiplier,
      } = animationState;

      const scaleMovementMultiplier = (1 - scale) * movementMultiplier;
      const maxHorizontalMovement = scale < 0.95 ? targetMouseX * scaleMovementMultiplier : 0;
      animationState.currentMouseX = gsap.utils.interpolate(
        currentMouseX,
        maxHorizontalMovement,
        0.05
      );

      section.style.transform = `translateY(${currentTranslateY}%) translateX(${animationState.currentMouseX}px) scale(${scale})`;
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      animationState.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
       clearTimeout(timeoutId);
    };
  },[contactRef]);

  return (
    <section id="team_section" ref={teamRef} className="h-[150vh] bg-black p-4">
            <h1 className="font-[Satoshi] font-bold text-8xl text-white">Our team</h1>
        </section>
  );
}
