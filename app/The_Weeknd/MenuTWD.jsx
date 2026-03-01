import { useEffect, useRef, useState } from "react";
import {Menu} from "lucide-react"


const navLinks = [
  { label: "About us",   num: "01" },
  { label: "Our work",   num: "02" },
  { label: "Services",   num: "03" },
  { label: "Blog",       num: "04" },
  { label: "Contact us", num: "05" },
];




// ─── Component ────────────────────────────────────────────────────────────────

export default function OsmoMenu() {
  const [gsapReady, setGsapReady] = useState(false);

  // Refs for GSAP targets
  const navWrapRef      = useRef(null);
  const overlayRef      = useRef(null);
  const menuRef         = useRef(null);
  const bgPanelsRef     = useRef([]);
  const menuLinksRef    = useRef([]);
  const fadeTargetsRef  = useRef([]);
  const btnTextsRef     = useRef([]);
  const btnIconRef      = useRef(null);
  const tlRef           = useRef(null);
  const isOpenRef       = useRef(false);

  // Load GSAP + CustomEase from CDN
  useEffect(() => {
    const load = (src) =>
      new Promise((res) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement("script");
        s.src = src;
        s.onload = res;
        document.head.appendChild(s);
      });

    (async () => {
      await load("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js");
      await load("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js");
      setGsapReady(true);
    })();
  }, []);

  // Init animations once GSAP is loaded
  useEffect(() => {
    if (!gsapReady) return;
    const { gsap, CustomEase } = window;

    CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
    gsap.defaults({ ease: "main", duration: 0.7 });
    gsap.set(navWrapRef.current, { display: "none" });

    tlRef.current = gsap.timeline();

    const openNav = () => {
      isOpenRef.current = true;
      tlRef.current
        .clear()
        .set(navWrapRef.current, { display: "block" })
        .set(menuRef.current,    { xPercent: 0 }) 
        .fromTo(btnTextsRef.current,   { yPercent: 0   }, { yPercent: -100, stagger: 0.2 })
        .fromTo(btnIconRef.current,    { rotate: 0     }, { rotate: 315 }, "<")
        .fromTo(overlayRef.current,    { autoAlpha: 0  }, { autoAlpha: 1 }, "<")
        .fromTo(bgPanelsRef.current,   { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
        .fromTo(menuLinksRef.current,  { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
        .fromTo(fadeTargetsRef.current,{ autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2");
    };

    const closeNav = () => {
      isOpenRef.current = false;
      tlRef.current
        .clear()
        .to(overlayRef.current,  { autoAlpha: 0 })
        .to(menuRef.current,     { xPercent: 120 }, "<")
        .to(btnIconRef.current,  { rotate: 0 }, "<")
        .set(navWrapRef.current, { display: "none" });
    };

    const toggle = () => (isOpenRef.current ? closeNav() : openNav());
    const onKey  = (e) => e.key === "Escape" && isOpenRef.current && closeNav();

    // Expose on the ref so button/overlay can call them
    navWrapRef.current._open   = openNav;
    navWrapRef.current._close  = closeNav;
    navWrapRef.current._toggle = toggle;

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [gsapReady]);

  const toggle = () => navWrapRef.current?._toggle?.();
  const close  = () => navWrapRef.current?._close?.();

  return (
    <>
      {/* ── Custom font ── */}
      <style>{`
       
        .menu-heading {
          font-size: clamp(2.5rem, 5.5vw, 5.625rem);
          font-weight: 700;
          line-height: 0.75;
          text-transform: uppercase;
          text-shadow: 0px 1em 0px #e8e8e8;
          transition: transform 0.55s cubic-bezier(0.65, 0.05, 0, 1);
        }
        .menu-link:hover .menu-heading { transform: translateY(-1em); transition-delay: 0.1s; }
        .menu-link:hover .menu-link-bg { transform: scale(1, 1); }
        .menu-link-bg {
          transform-origin: 50% 100%;
          transform: scale3d(1, 0, 1);
          transition: transform 0.55s cubic-bezier(0.65, 0.05, 0, 1);
        }
        
      `}</style>

      {/* ── Toggle Button ── */}
      <button
        onClick={toggle}
        className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-stone-900 px-4 py-3 -mx-4 -my-3"
      >
        
        <div
          ref={btnIconRef}
          className="transition-transform duration-300 text-white"
          style={{ transition: "transform 0.4s cubic-bezier(0.65, 0.05, 0, 1)" }}
        >
          <Menu />
        </div>
      </button>

      {/* ── Nav Drawer ── */}
      <div ref={navWrapRef} className="fixed inset-0 z-50 w-full h-screen">

        {/* Overlay */}
        <div
          ref={overlayRef}
          onClick={close}
          className="absolute inset-0 bg-black/40 cursor-pointer"
        />

        {/* Menu Panel */}
        <nav
          ref={menuRef}
          className="relative ml-auto h-full flex flex-col justify-between overflow-auto"
          style={{ width: "min(35em, 100%)", paddingTop: "calc(3 * 2em)", paddingBottom: "2em" }}
        >
          {/* Stacked bg panels (wipe effect) */}
          <div className="absolute inset-0">
            {[
              "bg-[#e10430]",       // first  — primary accent
              "bg-[#efbe0a]",      // second — off-white
              "bg-[#000]",        // third  — final panel
            ].map((color, i) => (
              <div
                key={i}
                ref={(el) => (bgPanelsRef.current[i] = el)}
                className={`absolute inset-0 ${color} `}
              />
            ))}
          </div>

          {/* Inner content */}
          <div className="relative z-10 flex flex-col justify-between h-full overflow-auto gap-16">

            {/* Nav Links */}
            <ul className="flex flex-col w-full list-none p-0 m-0">
              {navLinks.map(({ label, num }, i) => (
                <li key={i} className="relative overflow-hidden">
                  <a
                    href="#"
                    className="menu-link flex items-center gap-3 w-full no-underline text-white"
                    style={{ padding: "0.75em 2em" }}
                    ref={(el) => (menuLinksRef.current[i] = el)}
                  >
                    {/* Hover background fill */}
                    <div className="menu-link-bg absolute inset-0 bg-[#e10430]" />

                    <span className="menu-heading relative z-10">{label}</span>
                    <span
                      className="relative z-10 font-mono text-sm font-normal uppercase text-white"
                    >
                      {num}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

          
          </div>
        </nav>
      </div>
    </>
  );
}