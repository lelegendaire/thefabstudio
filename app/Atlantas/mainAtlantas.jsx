"use client"
import Image from "next/image";
import { venom } from "../fonts"
import {Menu,Heart} from "lucide-react"
import Copy_bloc from "../components/Copy_bloc"
import AnimatedLink from "../components/AnimatedLink"
import AnimatedCopy from "../components/AnimatedCopy"
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
// Données produits centralisées — plus facile à maintenir
const products = [
  {
    id: 1,
    name: "Atlantas XI",
    note: "Boisé & Ambré",
    price: "€ 145",
    img: "/medias/Atlantas/parfum1.png",
    w: 800, h: 1000,
    alt: "Atlantas XI"
  },
  {
    id: 2,
    name: "Noir Sauvage",
    note: "Épicé & Musqué",
    price: "€ 125",
    img: "/medias/Atlantas/parfum2.png",
    w: 700, h: 1000,
    alt: "Noir Sauvage"
  },
  {
    id: 3,
    name: "Velvet Oud",
    note: "Oriental & Chaleureux",
    price: "€ 165",
    img: "/medias/Atlantas/parfum3.png",
    w: 700, h: 1000,
    alt: "Velvet Oud"
  },
  {
    id: 4,
    name: "Cèdre Blanc",
    note: "Frais & Aromatic",
    price: "€ 115",
    img: "/medias/Atlantas/parfum1.png",
    w: 800, h: 1000,
    alt: "Cèdre Blanc"
  },
  {
    id: 5,
    name: "Musc Impérial",
    note: "Poudré & Sensuel",
    price: "€ 135",
    img: "/medias/Atlantas/parfum2.png",
    w: 700, h: 1000,
    alt: "Musc Impérial"
  },
  {
    id: 6,
    name: "Eau de Mystère",
    note: "Floral & Boisé",
    price: "€ 120",
    img: "/medias/Atlantas/parfum3.png",
    w: 700, h: 1000,
    alt: "Eau de Mystère"
  },
]

const bannerText = "Atlantas XI — L'élégance comme signature "

export default function MainAtlantas(){
         const router = useRouter();
const stickyRef      = useRef(null);
const cardContainerRef = useRef(null);
const stickyHeaderRef  = useRef(null);
useEffect(() => {
  if (typeof window === "undefined") return;
  let killed = false;

  async function init() {
    const gsapMod = await import("gsap");
    const stMod   = await import("gsap/ScrollTrigger");
    const gsap          = gsapMod.default || gsapMod.gsap;
    const ScrollTrigger = stMod.default   || stMod.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    if (killed) return;

    let isGapAnimationCompleted  = false;
    let isFlipAnimationCompleted = false;

    function initAnimation() {
    ScrollTrigger.getById("cards-flip")?.kill();
      isGapAnimationCompleted  = false;
      isFlipAnimationCompleted = false;

      const mm = gsap.matchMedia();

      // Mobile — reset tout
      mm.add("(max-width: 999px)", () => {
        [
          cardContainerRef.current,
          stickyHeaderRef.current,
          ...document.querySelectorAll(".card"),
        ].forEach(el => el && (el.style.cssText = ""));
        return () => {};
      });

      // Desktop
      mm.add("(min-width: 1000px)", () => {
        ScrollTrigger.create({
        id: "cards-flip",
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // ── Header fade-in ───────────────────────────────────────────────
            if (progress >= 0.1 && progress <= 0.25) {
              const p  = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
              gsap.set(stickyHeaderRef.current, {
                y:       gsap.utils.mapRange(0, 1, 40, 0, p),
                opacity: gsap.utils.mapRange(0, 1, 0,  1, p),
              });
            } else if (progress < 0.1) {
              gsap.set(stickyHeaderRef.current, { y: 40, opacity: 0 });
            } else if (progress > 0.25) {
              gsap.set(stickyHeaderRef.current, { y: 0,  opacity: 1 });
            }

            // ── Card container width ─────────────────────────────────────────
            if (progress <= 0.25) {
              gsap.set(cardContainerRef.current, {
                width: `${gsap.utils.mapRange(0, 0.25, 75, 60, progress)}%`,
              });
            } else {
              gsap.set(cardContainerRef.current, { width: "60%" });
            }

            // ── Gap + border-radius ──────────────────────────────────────────
            if (progress >= 0.35 && !isGapAnimationCompleted) {
              gsap.to(cardContainerRef.current, { gap: "20px",   duration: 0.5, ease: "power3.out" });
              gsap.to(".card",                  { borderRadius: "20px", duration: 0.5, ease: "power3.out" });
              isGapAnimationCompleted = true;
            } else if (progress < 0.35 && isGapAnimationCompleted) {
              gsap.to(cardContainerRef.current, { gap: "0px",    duration: 0.5, ease: "power3.out" });
              gsap.to("#card-1", { borderRadius: "20px 0 0 20px",   duration: 0.5, ease: "power3.out" });
              gsap.to("#card-2", { borderRadius: "0",               duration: 0.5, ease: "power3.out" });
              gsap.to("#card-3", { borderRadius: "0 20px 20px 0",   duration: 0.5, ease: "power3.out" });
              isGapAnimationCompleted = false;
            }

            // ── Flip cards ───────────────────────────────────────────────────
            if (progress >= 0.7 && !isFlipAnimationCompleted) {
              gsap.to(".card",           { rotationY: 180, duration: 0.5,  ease: "power3.inOut", stagger: 0.1 });
              gsap.to(["#card-1","#card-3"], {
                y: 30,
                rotationZ: (i) => [-15, 15][i],
                duration: 0.75, ease: "power3.inOut",
              });
              isFlipAnimationCompleted = true;
            } else if (progress < 0.7 && isFlipAnimationCompleted) {
              gsap.to(".card",           { rotationY: 0, duration: 0.75, ease: "power3.inOut", stagger: -0.1 });
              gsap.to(["#card-1","#card-3"], { y: 0, rotationZ: 0, duration: 0.75, ease: "power3.inOut" });
              isFlipAnimationCompleted = false;
            }
          },
        });
      });
    }

    initAnimation();

    // Resize debounce
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAnimation, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
       ScrollTrigger.getById("cards-flip")?.kill();
    };
  }

  let cleanupFn;
  init().then(fn => { cleanupFn = fn; });
  return () => { killed = true; cleanupFn?.(); };
}, []);
    return (
        <main className="w-full h-full">
        {/* ─── HERO ─── */}
        <section className="intro bg-[#EFE9E1] h-screen flex flex-col justify-between items-center">
            <div className="flex items-start justify-between w-full">
                <Copy_bloc blockColor="#72383D">
                    <p className="text-[#72383D] ml-5 mt-5">Nouvelle collection</p>
                </Copy_bloc>
                <h1 className={`${venom.className} text-[#322D29] text-9xl text-center z-5`}>ATLANTAS</h1>
                <Menu className="text-[#72383D] mr-5 mt-5"/>
            </div>

            <div className="flex justify-center items-center relative w-full h-full">
                <Image src={"/medias/Atlantas/Parfum.webp"} width={700} height={1000} alt="Atlantas XI – Flacon signature" className="rounded-lg absolute -top-10 z-3"/>
                <div className="absolute w-full overflow-hidden">
                    <div className="flex whitespace-nowrap animate-[scrollRight_10s_linear_infinite]">
                        {[...Array(3)].map((_, i) => (
                            <span key={i} className={`${venom.className} text-8xl text-[#D8B0B4] mx-16`}>
                                {bannerText}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between w-full">
                <Copy_bloc blockColor="#72383D">
                    <p className="text-[#72383D] ml-5 mb-2">2026</p>
                </Copy_bloc>
                <Copy_bloc blockColor="#72383D">
                    <p className="text-[#72383D] mr-5 mb-2">
                        Une fragrance pensée pour ceux qui laissent une trace — sans mot.
                    </p>
                </Copy_bloc>
            </div>
        </section>

        {/* ─── PRODUITS ─── */}
        <section className="h-screen bg-[#EFE9E1]">
            <div className="flex items-baseline justify-between px-5 pt-6 pb-0">
                <h1 className="text-5xl text-[#322D29]">Nos fragrances</h1>
                <span className="text-[#72383D] text-sm tracking-widest uppercase">
                    Collection 2026 — {products.length} créations
                </span>
            </div>

            <div className="flex gap-3 p-5 mt-5 overflow-x-auto">
                {products.map((p) => (
                    <div key={p.id}  className="card group shrink-0 w-60 h-85 rounded-[20px] overflow-hidden relative cursor-pointer snap-start bg-[#AC9C8D]">
    <div className="card-img hover:transform-[scale(1.06)] absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-linear-150 from-[#c5a898] via-[#7a5545] to-[#3d2218]" ><Image src={p.img} width={p.w} height={p.h} alt={p.alt} className="rounded-lg relative z-5 transition-transform duration-500 group-hover:scale-105"/></div>
    <div className="card-shine hover:opacity-0 absolute top-[-40%] left-[-40%] w-[80] h-[80%] pointer-events-none z-2 transition-opacity duration-400 "></div>
    <div className="card-vignette absolute inset-0 z-3"></div>
    <div className="card-badge absolute top-3.5 left-3.5 z-5 text-[0.65rem] tracking-[0.18em] text-[rgba(255,255,255,0.55)] uppercase">N° {p.id}</div>
    <div className="card-heart absolute top-3.5 right-3.5 z-5 w-8 h-8 rounded-[50%] border border-solid border-[rgba(255,255,255,0.25)] flex items-center justify-center cursor-pointer transition-background duration-250 transition-border-color backdrop-blur-2xl hover:bg-[rgba(220,60,60,0.3)] hover:border-[#e05a5a] ">
      <Heart/>
    </div>
    <div className="card-intensity absolute top-1/2 right-3.5 z-5 flex flex-col gap-1 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 delay-100 hover:opacity-100 ">
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)] "></span>
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)]"></span>
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)]"></span>
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)]"></span>
      <span></span>
    </div>
    <div className="card-info absolute bottom-0 left-0 right-0 z-6 p-4 transform translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
      <p className="card-note text-[0.6rem] tracking-[0.22em] uppercase text-[#D8B0B4] mb-1">{p.note}</p>
      <p className="card-name text-[1.15rem] text-[#f5ede6] font-400 tracking-[0.02em] leading-[1.2]">{p.name}</p>
      <p className="card-price text-[0.85rem] mt-0.75 text-[#D1C7BD]">{p.price}</p>
      <div className="card-divider group-hover:scale-x-100 h-px bg-[rgba(255,255,255,0.15)] mt-2.5 transform scale-x-0 origin-left transition-transform duration-400 delay-100"></div>
      <div className="card-cta group-hover:max-h-13 group-hover:mt-2.5 overflow-hidden max-h-0 mt-0 transition-[max-height,margin-top] duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"><button className="w-full px-0 py-1.75 hover:bg-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.6)] bg-transparent text-orange-100 text-xs uppercase cursor-pointer backdrop-blur-2xl transition-[background,border-color] duration-200 text-[0.7rem] tracking-[0.16em] rounded-[30px] border border-solid border-[rgba(255,255,255,0.35)] ">Ajouter au panier</button></div>
    </div>
  </div>
                ))}
            </div>

            <div className="flex justify-center items-center w-full mt-4">
                <p className="text-[#72383D] text-base italic">
                    Chaque flacon, un univers. Chaque note, une intention.
                </p>
            </div>
        </section>

        {/* ─── UNIVERS (Man / Woman / Teenager) ─── */}
        <section className="h-screen bg-[#EFE9E1] flex justify-center items-center overflow-hidden">
            {[
                { src: "/medias/Atlantas/Man.webp", w: 700, h: 700, label: "Homme", sub: "Force & Profondeur" },
                { src: "/medias/Atlantas/Woman.webp", w: 700, h: 700, label: "Femme", sub: "Grâce & Intensité" },
                { src: "/medias/Atlantas/Teenager.webp", w: 900, h: 1000, label: "Jeunesse", sub: "Liberté & Fraîcheur" },
            ].map(({ src, w, h, label, sub }) => (
                <div key={label} className="h-screen w-1/3 relative group cursor-pointer overflow-hidden">
                    <Image src={src} width={w} height={h} alt={label} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"/>
                    {/* Overlay dégradé */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"/>
                    {/* Texte vertical + accroche au survol */}
                    <h2 className="-rotate-90 text-white absolute text-3xl z-4 top-20 left-2 tracking-widest">{label}</h2>
                    <div className="absolute bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-4 px-4">
                        <p className="text-[#D8B0B4] text-sm tracking-wider uppercase mb-2">{sub}</p>
                        <button className="border border-white text-white text-xs px-4 py-1.5 rounded-full hover:bg-white hover:text-[#322D29] transition-colors duration-200">
                            Découvrir
                        </button>
                    </div>
                </div>
            ))}
        </section>

        {/* ─── HISTOIRE ─── */}
        <section className="h-full bg-[#EFE9E1]">
            <h1 className="relative left-5 pt-6 text-5xl text-[#322D29]">Notre histoire</h1>
            <div className="flex justify-center items-center w-full mt-10">
                <AnimatedCopy >
                    <div className="p-6 max-w-3xl">
                        {/* Notes olfactives — ajout éditorial */}
                        <div className="flex gap-6 mb-6 text-sm tracking-widest uppercase">
                            <span className="text-[#72383D]">Tête — Bergamote, Poivre</span>
                            <span className="text-[#72383D]">Cœur — Oud, Iris</span>
                            <span className="text-[#72383D]">Fond — Cèdre, Ambre</span>
                        </div>
                        <h2 className="leading-relaxed text-[#322D29] text-xl">
                            Né d'une recherche d'élégance et de caractère, Atlantas XI incarne
                            une vision moderne du parfum de luxe. Plus qu'une fragrance,
                            il s'agit d'une signature olfactive pensée pour révéler la présence,
                            l'identité et la subtilité de celui qui le porte.
                            <br /><br />
                            Inspiré par l'équilibre entre puissance et finesse, chaque note a été
                            soigneusement imaginée pour créer une expérience sensorielle profonde,
                            où la chaleur des accords boisés rencontre la délicatesse des nuances
                            aromatiques. Le parfum ne suit pas une tendance — il raconte une histoire,
                            celle d'une élégance intemporelle.
                            <br /><br />
                            Conçu comme une œuvre sensorielle, Atlantas XI s'adresse aux esprits
                            exigeants : à ceux qui recherchent bien plus qu'un parfum — une aura,
                            une identité, une trace mémorable. Car le véritable luxe ne se voit
                            pas seulement, il se ressent.
                        </h2>
                        {/* CTA */}
                        <div className="mt-6">
                            <button className="bg-[#72383D] text-[#EFE9E1] px-6 py-2.5 rounded-3xl text-sm tracking-wider hover:bg-[#5a2c30] transition-colors duration-200">
                                Explorer la collection →
                            </button>
                        </div>
                    </div>
                </AnimatedCopy>
            </div>
        </section>
<section>
    <section className="intro relative w-full h-screen p-8 bg-[#EFE9E1] text-[#322D29] content-center text-center"><h1 className="w-30/100 mx-auto my-0">Everey idea </h1></section>
    <section ref={stickyRef} className="sticky2 flex justify-center items-center relative w-full h-screen p-8 bg-[#EFE9E1] text-[#322D29]">
        <div className="sticky-header absolute top-20/100 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 ref={stickyHeaderRef} className="relative text-center will-change-[transform,opacity] translate-y-10 opacity-0 ">ueyuvbhebsjbv</h2>
        </div>
        <div ref={cardContainerRef} className="card-container" style={{ display: "flex", width: "75%" }}>
            <div className="card relative flex-1 aspect-5/7 transform-3d origin-top rounded-[20px_0px_0px_20px]" id="card-1">
               <div className="card-front absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden" >
                <img src={"/medias/Atlantas/Parfum.webp"} className="w-full h-full object-cover"></img>
            </div>
            <div className="card-back bg-[#b2b2b2] flex justify-center items-center text-center rotate-y-180 p-8 absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                <span className="absolute top-8 left-8 opacity-40">(01)</span>
                <p className="text-[2rem] font-medium leading-none">Interactive</p>

            </div>
            </div>
            <div className="card relative flex-1 aspect-5/7 transform-3d origin-top " id="card-2">
               <div className="card-front absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden" >
                <img src={"/medias/Atlantas/Parfum.webp"} className="w-full h-full object-cover"></img>
            </div>
            <div className="card-back bg-[#ce2017] flex justify-center items-center text-center rotate-y-180 p-8 absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                <span>(01)</span>
                <p className="text-[2rem] font-medium leading-none">Interactive</p>

            </div>
            </div>
            <div className="card relative flex-1 aspect-5/7 transform-3d origin-top rounded-[0px_20px_20px_0px]" id="card-3">
               <div className="card-front absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden" >
                <img src={"/medias/Atlantas/Parfum.webp"} className="w-full h-full object-cover"></img>
            </div>
            <div className="card-back bg-[#2f2f2f]  flex justify-center items-center text-center rotate-y-180 p-8 absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                <span>(01)</span>
                <p className="text-[2rem] font-medium leading-none">Interactive</p>

            </div>
            </div>
        </div>
    </section>
    <section className="outro relative w-full h-screen p-8 bg-[#EFE9E1] text-[#322D29] content-center text-center"><h1 className="w-30/100 mx-auto my-0">uhduebdvuiou</h1></section>
</section>
        {/* ─── FOOTER ─── */}
        <section className="footer overflow-hidden h-screen bg-[#EFE9E1] flex relative justify-center items-center">
            <div className="flex justify-between items-center w-full">
                <div className="w-full ml-5">
                    <h2 className="font-bold text-[#322D29] mb-2">Navigation</h2>
                    <ul className="space-y-1 text-[#72383D]">
                        <li>Accueil</li>
                        <li>Fragrances</li>
                        <li>Boutique</li>
                        <li>Notre histoire</li>
                    </ul>
                </div>
                <div className="w-full ml-5">
                    <h2 className="font-bold text-[#322D29] mb-2">Nous suivre</h2>
                    <ul className="space-y-1">
                        <li><AnimatedLink color="black" href="#">Instagram</AnimatedLink></li>
                        <li><AnimatedLink color="black" href="#">Twitter / X</AnimatedLink></li>
                        <li><AnimatedLink color="black" href="#">TikTok</AnimatedLink></li>
                        <li><AnimatedLink color="black" href="#">Facebook</AnimatedLink></li>
                    </ul>
                </div>
                <div className="mr-5 w-full">
                    <h2 className="font-bold text-[#322D29] mb-2">Mentions légales</h2>
                    <ul className="space-y-1 text-[#72383D]">
                        <li><p className="text-nowrap">© 2026 Atlantas XI. Tous droits réservés.</p></li>
                        <li><p className="text-nowrap">Conditions générales & Confidentialité</p></li>
                        <li><p className="text-nowrap">Livraison & Retours</p></li>
                        <li><AnimatedLink color={"#322D29"} onClick={() => router.push('/')} >Created by TheFabStudio</AnimatedLink></li>
                    </ul>
                </div>
            </div>
            <h1 className={`${venom.className} text-[#322D29] text-9xl text-center z-5 absolute -bottom-10`}>ATLANTAS</h1>
        </section>

        <style jsx>{`
            @keyframes scrollRight {
                0%   { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
        </main>
    )
}