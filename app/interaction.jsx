"use client"
import Copy from "./components/Copy"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from '@studio-freight/lenis';

// Enregistrer les plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const TeamSection = () => {
  const sectionRef = useRef(null);
  const lenisRef = useRef(null);
  const animationInitialized = useRef(false);
// Collection d'images variées
  const imageUrls = [
    'https://images.unsplash.com/photo-1757317202556-a87236bdb48b?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506942907748-846932449367?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1464822759844-d150f76515d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  useEffect(() => {
    if (animationInitialized.current) return;
      const timeoutId = setTimeout(() => {
    // Initialiser Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current.on('scroll', ScrollTrigger.update);
    
    const tick = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}, 6000);
    // Initialiser les animations
    initSpotlightAnimations();
    animationInitialized.current = true;

    const handleResize = () => {
      ScrollTrigger.refresh();
      initSpotlightAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const initSpotlightAnimations = () => {
    if (!sectionRef.current) return;

    const images = sectionRef.current.querySelectorAll(".img-element");
    const coverImg = sectionRef.current.querySelector(".spotlight-cover-img");
    const introHeader = sectionRef.current.querySelector(".spotlight-intro-header h1");
    const outroHeader = sectionRef.current.querySelector(".spotlight-outro-header h1");

    if (!images.length || !coverImg || !introHeader || !outroHeader) return;

    let introHeaderSplit = null;
    let outroHeaderSplit = null;

    // Nettoyer les animations précédentes
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === sectionRef.current.querySelector('.spotlight')) {
        trigger.kill();
      }
    });

    try {
      introHeaderSplit = new SplitText(introHeader, {type: "words"});
      gsap.set(introHeaderSplit.words, {opacity: 1});

      outroHeaderSplit = new SplitText(outroHeader, {type: "words"});
      gsap.set(outroHeaderSplit.words, {opacity: 0});
      gsap.set(outroHeader, {opacity: 1});
    } catch (error) {
      console.warn("SplitText non disponible, utilisation d'une alternative");
      // Alternative simple si SplitText n'est pas disponible
      const splitTextSimple = (element) => {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = words.map(word => `<span class="word inline-block">${word}</span>`).join(' ');
        return element.querySelectorAll('.word');
      };

      introHeaderSplit = { words: splitTextSimple(introHeader) };
      gsap.set(introHeaderSplit.words, {opacity: 1});

      outroHeaderSplit = { words: splitTextSimple(outroHeader) };
      gsap.set(outroHeaderSplit.words, {opacity: 0});
      gsap.set(outroHeader, {opacity: 1});
    }

    const scatterDirections = [
      {x: 1.3, y: 0.7 }, {x: -1.5, y: 1.0 }, {x: 1.1, y: -1.3 }, {x: -1.7, y: 0.8 },
      {x: 0.8, y: 1.5 }, {x: -1.0, y: -1.4 }, {x: 1.6, y: 0.3 }, {x: -0.7, y: 1.7 },
      {x: 1.2, y: -1.6 }, {x: -1.4, y: 0.9 }, {x: 1.8, y: -0.5 }, {x: -1.1, y: -1.8 },
      {x: 0.9, y: 1.8 }, {x: -1.9, y: 0.4 }, {x: 1.0, y: -1.9 }, {x: -0.8, y: 1.9 },
      {x: 1.7, y: -1.0 }, {x: -1.3, y: -1.2 }, {x: 0.7, y: 2.0 }, {x: 1.25, y: -0.2 },
    ];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth < 1000;
    const scatterMultiplier = isMobile ? 2.5 : 0.5;

    const startPositions = Array.from(images).map(() => ({
      x: 0, y: 0, z: -1000, scale: 0,
    }));

    const endPositions = scatterDirections.map((dir) => ({
      x: dir.x * screenWidth * scatterMultiplier,
      y: dir.y * screenHeight * scatterMultiplier,
      z: 2000,
      scale: 1,
    }));

    images.forEach((img, index) => {
      gsap.set(img, startPositions[index]);
    });

    gsap.set(coverImg, {
      z: -1000, scale: 0, x: 0, y: 0,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.spotlight'),
      start: "top top",
      end: `+=${window.innerHeight * 15}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        images.forEach((img, index) => {
          const staggerDelay = index * 0.03;
          const scaleMultiplier = isMobile ? 4 : 2;
          let imageProgress = Math.max(0, (progress - staggerDelay) * 4);

          const start = startPositions[index];
          const end = endPositions[index];

          const zValue = gsap.utils.interpolate(start.z, end.z, imageProgress);
          const scaleValue = gsap.utils.interpolate(start.scale, end.scale, imageProgress * scaleMultiplier);
          const xValue = gsap.utils.interpolate(start.x, end.x, imageProgress);
          const yValue = gsap.utils.interpolate(start.y, end.y, imageProgress);

          gsap.set(img, { z: zValue, scale: scaleValue, x: xValue, y: yValue });
        });

        const coverProgress = Math.max(0, (progress - 0.7) * 4);
        const coverZValue = -1000 + 1000 * coverProgress;
        const coverScaleValue = Math.min(1, coverProgress * 2);

        gsap.set(coverImg, {
          z: coverZValue, scale: coverScaleValue, x: 0, y: 0,
        });

        // Animation du texte intro
        if (introHeaderSplit && introHeaderSplit.words.length > 0) {
          if (progress >= 0.6 && progress <= 0.75) {
            const introFadeProgress = (progress - 0.6) / 0.15;
            const totalWords = introHeaderSplit.words.length;

            introHeaderSplit.words.forEach((word, index) => {
              const wordFadeProgress = index / totalWords;
              const fadeRange = 0.1;

              if (introFadeProgress >= wordFadeProgress + fadeRange) {
                gsap.set(word, {opacity: 0});
              } else if (introFadeProgress <= wordFadeProgress) {
                gsap.set(word, {opacity: 1});
              } else {
                const wordOpacity = 1 - (introFadeProgress - wordFadeProgress) / fadeRange;
                gsap.set(word, {opacity: wordOpacity});
              }
            });
          } else if (progress < 0.6) {
            gsap.set(introHeaderSplit.words, {opacity: 1});
          } else if (progress > 0.75) {
            gsap.set(introHeaderSplit.words, {opacity: 0});
          }
        }

        // Animation du texte outro
        if (outroHeaderSplit && outroHeaderSplit.words.length > 0) {
          if (progress >= 0.8 && progress <= 0.95) {
            const outroRevealProgress = (progress - 0.8) / 0.15;
            const totalWords = outroHeaderSplit.words.length;

            outroHeaderSplit.words.forEach((word, index) => {
              const wordRevealProgress = index / totalWords;
              const fadeRange = 0.1;

              if (outroRevealProgress >= wordRevealProgress + fadeRange) {
                gsap.set(word, {opacity: 1});
              } else if (outroRevealProgress <= wordRevealProgress) {
                gsap.set(word, {opacity: 0});
              } else {
                const wordOpacity = (outroRevealProgress - wordRevealProgress) / fadeRange;
                gsap.set(word, {opacity: wordOpacity});
              }
            });
          } else if (progress < 0.8) {
            gsap.set(outroHeaderSplit.words, {opacity: 0});
          } else if (progress > 0.95) {
            gsap.set(outroHeaderSplit.words, {opacity: 1});
          }
        }
      },
    });
  };

    return(
         <div ref={sectionRef} className="team-section">
      {/* Section Intro */}
      <section className="relative w-screen h-screen p-8 overflow-hidden flex justify-center items-center bg-[#0f0f0f] text-[#fff]">
        <h1 className="text-5xl md:text-8xl font-medium tracking-tight leading-[0.9] w-full md:w-1/2 text-center font-[Satoshi]">
          Want to discover more  
        </h1>
      </section>

      {/* Section Spotlight */}
      <section className="spotlight relative w-screen h-screen p-8 overflow-hidden bg-[#0f0f0f] text-[#d7dbd2]">
        {/* Images Container */}
        <div className="spotlight-images absolute inset-0 w-full h-full" style={{
          transformStyle: 'preserve-3d',
          perspective: '2000px'
        }}>
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="img-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url('${imageUrl}')`
              }}
            />
          ))}
        </div>

        {/* Cover Image */}
        <div className="spotlight-cover-img absolute inset-0 w-full h-full will-change-transform" style={{
          transformStyle: 'preserve-3d',
          perspective: '2000px'
        }}>
          <img
            src="/medias/dune.jpg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Headers */}
        <div className="spotlight-intro-header absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full md:w-1/2 px-8 z-10">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight leading-[0.9]">
            When art and design meet that create the work of art 
          </h1>
        </div>

        <div className="spotlight-outro-header absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full md:w-1/2 px-8 z-20">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight leading-[0.9]">
            Nothing scares us when you challenge us
          </h1>
        </div>
      </section>

      {/* Section Outro */}
      <section className="relative w-screen overflow-hidden flex justify-start flex-col  items-center text-white h-[150vh] bg-black p-4 font-[Satoshi]">
       
        <Copy><h1 className="font-bold text-6xl p-10">Still not convinced</h1></Copy>
        <Copy><h3 className="font-bold text-3xl p-5 text-center">Here you can try our prototype and personalisable each site in your vision to have a glimpse</h3></Copy>
        <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center flex-col">
                <div className="h-100 rounded-2xl overflow-hidden "><img className="w-full h-full object-cover transition-transform object-center hover:transform-[scale(1.2)]" src={"https://images.unsplash.com/photo-1752041593295-29a7546096e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"}></img></div>
                <h1>Our work 1</h1>
                <button className="bg-white w-60 rounded-4xl p-2 text-black">I will try</button>
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="h-100 rounded-2xl overflow-hidden "><img className="w-full h-full object-cover transition-transform object-center hover:transform-[scale(1.2)]" src={"https://images.unsplash.com/photo-1752805936163-73fe92f5070d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D"}></img></div>
                <h1>Our work 2</h1>
                <button className="bg-white w-60 rounded-4xl p-2 text-black">Try</button>
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="h-100 rounded-2xl overflow-hidden "><img className="w-full h-full object-cover transition-transform object-center hover:transform-[scale(1.2)]" src={"https://plus.unsplash.com/premium_photo-1746417461105-51b89a61907f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"}></img></div>
                <h1>Our work 3</h1>
                <button className="bg-white w-60 rounded-4xl p-2 text-black">Try</button>
            </div>
        </div>
       
      </section>
    </div>
        
    )}
export default TeamSection;