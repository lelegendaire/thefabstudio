"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function CopyBloc({
    children,
    animatedOnScroll = true,
    
    delay = 0,
    blockColor = "#000",
    stagger = 0.15,
    duration = 0.75,
    scroller = window,
}) {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        let elements = [];

        // Récupération du contenu
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
            elements = Array.from(containerRef.current.children);
        } else {
            elements = [containerRef.current];
        }

        const splits = [];
        const blocks = [];
        const lines = [];

        elements.forEach((el) => {
            // 🚀 CORRECT : création du split
            const split = new SplitText(el, {
                type: "lines",
                linesClass: "block-line",
                lineThreshold: 0.1,
            });

            splits.push(split);

            split.lines.forEach((line) => {
                // Création wrapper
                const wrapper = document.createElement("div");
                wrapper.className = "block-line-wrapper";
                wrapper.style.position = "relative";
                wrapper.style.overflow = "hidden";

                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);

                // Création block
                const block = document.createElement("div");
                block.className = "block-revealer";
                block.style.position = "absolute";
                block.style.top = "0";
                block.style.left = "0";
                block.style.width = "100%";
                block.style.height = "100%";
                block.style.backgroundColor = blockColor;
                block.style.transformOrigin = "left center";
                block.style.transform = "scaleX(0)";

                wrapper.appendChild(block);

                lines.push(line);
                blocks.push(block);
            });
        });

        // Animation setup
        gsap.set(lines, { opacity: 0 });

        const animate = (block, line, i) => {
            return gsap.timeline({ delay: delay + i * stagger })
                .to(block, {
                    scaleX: 1,
                    duration,
                    ease: "power3.inOut",
                })
                .set(line, { opacity: 1 })
                .set(block, { transformOrigin: "right center" })
                .to(block, {
                    scaleX: 0,
                    duration,
                    ease: "power3.inOut",
                });
        };

        if (animatedOnScroll) {
            blocks.forEach((b, i) => {
                const tl = animate(b, lines[i], i);
                tl.pause();

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    scroller: scroller,
                    start: "top 90%",
                    once: true,
                    onEnter: () => tl.play(),
                });
            });
        } else {
            blocks.forEach((b, i) => animate(b, lines[i], i));
        }

        // Cleanup SplitText
        return () => {
            splits.forEach((s) => s.revert());
        };
    }, {
        scope: containerRef,
        dependencies: [animatedOnScroll, delay, blockColor, stagger, duration],
    });

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );
}
