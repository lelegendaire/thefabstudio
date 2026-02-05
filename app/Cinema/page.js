'use client';
import React, { useEffect, useRef, useState } from 'react';
import { LampContainer } from "../../components/ui/lamp";
import { motion } from "motion/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useLenis } from '.././context/LenisContext'
import setupMarqueeAnimation from './marquee.js'
const CinemaPage = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [displacement, setDisplacement] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const cursorRef = useRef(null);
    const rafRef = useRef(null);
    const lenis = useLenis()
    const cardsRef = useRef(null);
    const introCardRef = useRef(null);
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches

 useEffect(()=>{
const id = setTimeout(() => {
        if (!cardsRef.current && !introCardRef.current) return;     
        gsap.registerPlugin(ScrollTrigger, SplitText);
     const cards = cardsRef.current.querySelectorAll(".card");
        const introCard = introCardRef.current;
const titles = introCardRef.current.querySelectorAll(".card-title h1");
console.log(titles)
  titles.forEach((title) => {
    const split = new SplitText(title, {
      type: "char",
      charsClass: "char",
      tag: "div",
    });
    split.chars.forEach((char) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
    });
  });
  const cardImgWraper = introCard.querySelector(".card-img");
  const cardImg = introCard.querySelector(".card-img .image_film");
  gsap.set(cardImgWraper, { scale: 0.5, borderRadius: "400px" });
  gsap.set(cardImg, { scale: 1.5 });

  function animateContentIn(titleChars, description) {
    gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
    gsap.to(description, {
      x: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.1,
      ease: "power4.out",
    });
  }
  function animateContentOut(titleChars, description) {
    gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
    gsap.to(description, {
      x: "40px",
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
    });
  }
  const marquee = introCard.querySelector(".card-marquee .marquee");
  const titleChars = introCard.querySelector(".char span");
  const description = introCard.querySelector(".card-description");

  ScrollTrigger.create({
    trigger: introCard,
    start: "top top",
    end: "+=300vh",
    onUpdate: (self) => {
      const progress = self.progress;

      const imgScale = 0.5 + progress * 0.5;
      const borderRadius = 400 - progress * 375;
      const innerImgScale = 1.5 - progress * 0.5;

      gsap.set(cardImgWraper, {
        scale: imgScale,
        borderRadius: borderRadius + "px",
      });
      gsap.set(cardImg, { scale: innerImgScale });

      if (imgScale >= 0.5 && imgScale <= 0.75) {
        const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
        gsap.set(marquee, { opacity: 1 - fadeProgress });
      } else if (imgScale < 0.5) {
        gsap.set(imgScale, { opacity: 1 });
      } else if (imgScale > 0.75) {
        gsap.set(imgScale, { opacity: 0 });
      }
      if (progress >= 1 && !introCard.contentRevealed) {
        introCard.contentRevealed = true;
        animateContentIn(titleChars, description);
      }
      if (progress < 1 && introCard.contentRevealed) {
        introCard.contentRevealed = false;
        animateContentOut(titleChars, description);
      }
    },
  });
  cards.forEach((card, index) => {
    const isLastCard = index == cards.length - 1;
    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: isLastCard ? "+=100vh" : "to top",
      endTrigger: isLastCard ? null : cards[cards.length - 1],
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  cards.forEach((card, index) => {
    if (index < cards.length - 1) {
      const cardWrapper = card.querySelector(".card-wrapper");
      ScrollTrigger.create({
        trigger: cards[index + 1],
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardImgWraper, {
            scale: 1 - progress * 0.25,
            opacity: 1 - progress,
          });
        },
      });
    }
  });
 cards.forEach((card, index) => {
    if (index > 0) {
      const cardImg = card.querySelector(".card-img .image_film");
      const imgContainer = card.querySelector(".card-img");
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardImg, {
            scale: 2 - progress,
          });
          gsap.set(imgContainer, {
            borderRadius: 150 - progress * 125 + "px",
          });
        },
      });
    }
  });
   cards.forEach((card, index) => {
    if (index == 0) return ;
      const cardDescription = card.querySelector(".card-description");
      const cardTitleChars = card.querySelector(".char span");
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        onEnter: ()=>{
            animateContentIn(cardTitleChars, cardDescription)
        },
        onLeaveBack: ()=>{
            animateContentOut(cardTitleChars, cardDescription)
        }
      });
    
  });
  setupMarqueeAnimation();
      return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, 0);
    return () => clearTimeout(id);
 },[]);
    useEffect(() => {
        setIsMounted(true);
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Animation fluide du curseur et du displacement avec lerp
        const animate = () => {
            setCursorPos(prev => ({
                x: prev.x + (mousePos.x - prev.x) * 0.15,
                y: prev.y + (mousePos.y - prev.y) * 0.15
            }));

            // Calcul du displacement en temps réel
            if (windowSize.width > 0) {
                const centerX = windowSize.width / 2;
                const centerY = windowSize.height / 2;
                const deltaX = (mousePos.x - centerX) / centerX;
                const deltaY = (mousePos.y - centerY) / centerY;
                
                setDisplacement(prev => ({
                    x: prev.x + (deltaX * 30 - prev.x) * 0.15,
                    y: prev.y + (deltaY * 30 - prev.y) * 0.15
                }));
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [mousePos, windowSize.width, windowSize.height]);

    if (!isMounted) {
        return (
            <div className="relative min-h-screen overflow-hidden">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/medias/blade_runner.webp')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <section className="relative z-10 min-h-screen p-8 flex items-center justify-center">
                    <div className='absolute top-0 m-5 flex items-center justify-center list-none gap-5 text-xl text-white font-[montserrat]'>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>Home</a></li>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>Film</a></li>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>History</a></li>
                    </div>
                    <h1 className="text-9xl font-bold text-white font-[boska]">BEAUTY OF CINEMA</h1>
                    <img className="absolute" src="/medias/Runner.webp" alt="Runner" />
                </section>
            </div>
        );
    }

const transformStyle = isMobile
  ? "scale(1.05)"
  : `translate(${displacement.x}px, ${displacement.y}px) scale(1.1)`
   
    return (
        <section className='Cinema_page h-full'>
            <link href="https://api.fontshare.com/v2/css?f[]=zodiak@401&f[]=boska@500&f[]=montserrat@400&f[]=melodrama@500&display=swap" rel="stylesheet"></link>
            
            <div className="relative min-h-screen overflow-hidden cursor-none">
                {/* Image de fond avec effet de displacement */}
                <div 
                    className="absolute inset-0"
                    style={{
                        transform: transformStyle,
                        backgroundImage: "url('/medias/Blade_runner.webp')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
                {/* Overlay sombre pour améliorer la lisibilité */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Contenu principal */}
                <section className="relative min-h-screen p-8 flex items-center justify-center w-full">
                  
                       
                    <div className='absolute w-full top-0 m-5 flex items-center justify-center list-none  text-xl text-white font-[montserrat] z-50'>
                         <div className='font-[melodrama] font-bold text-xl text-nowrap sm:text-3xl mr-auto m-5'>
                            <h1>STUDIOFILM &copy;</h1>
                        </div>
                          <div className='ml-auto gap-5 flex mr-7.5 text-xs sm:text-xl'>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>Home</a></li>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>Works</a></li>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>Art</a></li>
                        <li className='no-underline hover:text-black transition-all'><a href='#'>History</a></li>
                    </div>
                    </div>
                    <h1 className="text-5xl text-nowrap sm:text-9xl font-bold z-10 text-white font-[boska]">BEAUTY OF CINEMA</h1>
                    
                    <img 
                        className="image_runner absolute z-20 scale-[180%] sm:scale-100" 
                        style={{
                            transform: transformStyle,
                        }} 
                        src="/medias/Runner.webp"
                        alt="Runner"
                    />
                    <div className='absolute bottom-0 font-[montserrat] sm:text-xl text-xs flex align-center justify-center w-full text-white font-bold'><h3 className='mr-auto m-5'>Composition</h3><h3 className='mr-auto m-5'>Storyline</h3><h3 className='ml-auto m-5'>Plotwist</h3><h3 className='ml-auto m-5'>Lighting</h3></div>
                </section>

                {!isMobile && (
  <div
    ref={cursorRef}
    className="fixed pointer-events-none z-50 mix-blend-difference"
    style={{
      left: `${cursorPos.x}px`,
      top: `${cursorPos.y}px`,
      transform: "translate(-50%, -50%)",
    }}
  >
    <div className="w-10 h-10 border-2 border-white rounded-full opacity-50" />
    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
  </div>
)}


                {/* Effet de grain/texture */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
            </div>
            <section className='bg-black h-full w-screen text-white '>
                <h1 className='text-3xl font-[montserrat] p-8'>Composition </h1>
                 <div ref={cardsRef} className='cards relative w-screen bg-[#0f0f0f] text-white flex flex-col gap-[25svh]'>
                    <div ref={introCardRef} className='card relative w-full h-svh p-[1.5em]'>
                        <div className='card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden'>
                            <div className='marquee flex'>
                                <h1 className='text-[10vw] font-semibold mr-7.5 whitespace-nowrap '>Design Beyond Boundaries</h1>
                                <h1 className='text-[10vw] font-semibold mr-7.5 whitespace-nowrap '>Built for Tomorrow</h1>
                                <h1 className='text-[10vw] font-semibold mr-7.5 whitespace-nowrap '>Real Impact</h1>
                                <h1 className='text-[10vw] font-semibold mr-7.5 whitespace-nowrap '>Digital Visions</h1>
                            </div>
                        </div>
                        <div className='card-wrapper relative w-full h-full will-change-transform'>
                            <div className='card-content absolute w-full h-full flex items-end justify-center z-1'>
                                <div className='card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center'><h1 className='text-[5rem] font-medium tracking-[-0.1rem] leading-tight'>2001 : a space odyssey</h1></div>
                                <div className='card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0'><p className='text-[1.125rem] font-normal leading-tight'>a new perspection</p></div>
                            </div>
                            <div className='card-img absolute w-full h-full rounded-[150px] overflow-hidden'><img className='image_film relative w-full h-full object-cover will-change-transform transform-[scale(2)]' src={"/medias/space_odyssey.webp"}></img></div>
                        </div>
                    </div>
                    <div className='card mt-[50vh] relative w-full h-svh p-[1.5em]'>
                        <div className='card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden'>
                          
                        </div>
                        <div className='card-wrapper relative w-full h-full will-change-transform'>
                            <div className='card-content absolute w-full h-full flex items-end justify-center z-1'>
                                <div className='card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center'><h1 className='text-[5rem] font-medium tracking-[-0.1rem] leading-tight'>Interstellar</h1></div>
                                <div className='card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0'><p className='text-[1.125rem] font-normal leading-tight'>a new perspection</p></div>
                            </div>
                            <div className='card-img absolute w-full h-full rounded-[150px] overflow-hidden'><img className='image_film relative w-full h-full object-cover will-change-transform transform-[scale(2)]' src={"/medias/bg_final.webp"}></img></div>
                        </div>
                    </div>
                    <div className='card relative w-full h-svh p-[1.5em]'>
                        <div className='card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden'>
                        
                        </div>
                        <div className='card-wrapper relative w-full h-full will-change-transform'>
                            <div className='card-content absolute w-full h-full flex items-end justify-center z-1'>
                                <div className='card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center'><h1 className='text-[5rem] font-medium tracking-[-0.1rem] leading-tight'>Interstellar</h1></div>
                                <div className='card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0'><p className='text-[1.125rem] font-normal leading-tight'>a new perspection</p></div>
                            </div>
                            <div className='card-img absolute w-full h-full rounded-[150px] overflow-hidden'><img className='image_film relative w-full h-full object-cover will-change-transform transform-[scale(2)]' src={"/medias/bg_final.webp"}></img></div>
                        </div>
                    </div>
                 </div>
            </section>
            <section className='bg-black h-screen w-screen text-white'>
                <h1 className='text-3xl font-[montserrat] p-8'>Storyline </h1>
                <div className="w-[200vw] h-[70vh] grid grid-cols-3 md:grid-cols-6 grid-rows-3 md:grid-rows-3 gap-2 md:gap-5 m-4 ">
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-3 bg-gray-300 rounded-md p-10">0</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-3 bg-gray-300 rounded-md p-10">1</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-3 bg-gray-300 rounded-md p-10">2</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">3</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-4 md:row-start-3 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10">4</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-5 md:row-start-1 md:col-span-2 md:row-span-1 bg-gray-300 rounded-md p-10">5</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-5 md:row-start-2 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">6</div>
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1763152496539-302ef51ef66f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat md:block md:col-start-6 md:row-start-2 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">7</div>
      
    </div>
            </section>
            <section className='bg-black h-screen w-screen text-white'>
                <h1 className='text-3xl font-[montserrat] p-8'>Color </h1>
            </section>
            <section className='bg-black h-screen w-screen text-white'>
                <h1 className='text-3xl font-[montserrat] p-8'>Lighting </h1>
                <LampContainer>
                    <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl  tracking-tight text-transparent md:text-7xl font-[montserrat] font-bold">
        Lighting <br /> Is Everythings
      </motion.h1>
                </LampContainer>
            </section>
             <style jsx>{`
    .char {
      position: relative;
      overflow: hidden;
      display: inline-block;
    }
    .char span {
      transform: translateX(100%);
      display: inline-block
    }
  `}</style>
        </section>
    );
};

export default CinemaPage;
