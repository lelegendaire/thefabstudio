"use client";

import { useEffect,useRef, useState  } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import * as THREE from 'three';
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Mock slides data - replace with your actual slides
const slides = [
   {
    title: "Fabien CHEVALLEREAU",
    description: "A youg passionate of informatique enable to create infinity things with imagination.",
    type: "Web developper",
    field: "Foundator",
    date: "2 years",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop" // Real image URL
  },
  {
    title: "Noah CHEVALIER",
    description: "nobody can be better than him to explain the raw informatique to people.",
    type: "Community manager",
    field: "CO-foundator",
    date: "2 years",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop" // Real image URL
  },
  {
    title: "Rafaël ASTRO",
    description: "The best developper among us enable to create few project in the same time",
    type: "Fronted and backend",
    field: "Employe",
    date: "4 years",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop" // Real image URL
  }
];

const vertexShader = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uTexture1Size;
  uniform vec2 uTexture2Size;
  varying vec2 vUv;
  
  vec2 getCoverUv(vec2 uv, vec2 textureSize){
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }
  
  vec2 getDistortedUv(vec2 uv, vec2 direction, float factor){
    vec2 scaledDirection = direction;
    scaledDirection.y *= 2.0;
    return uv - scaledDirection * factor;
  }
    
  struct LensDistortion{
    vec2 distortedUv;
    float inside;
  };

  LensDistortion getLensDistortion(
    vec2 p,
    vec2 uv,
    vec2 sphereCenter,
    float sphereRadius,
    float focusFactor
  ){
    vec2 distortionDirection = normalize(p - sphereCenter); 
    float focusRadius = sphereRadius * focusFactor;
    float focusStrength = sphereRadius / 3000.0;
    float focusSdf = length(sphereCenter - p) - focusRadius;
    float sphereSdf = length(sphereCenter - p) - sphereRadius;
    float inside = smoothstep(0.0, 1.0, -sphereSdf / (sphereRadius * 0.001));
    float magnifierFactor = focusSdf / (sphereRadius - focusRadius);
    float mFactor = clamp(magnifierFactor * inside, 0.0, 1.0); 
    mFactor = pow(mFactor, 5.0);

    float distortionFactor = mFactor * focusStrength;

    vec2 distortedUV = getDistortedUv(uv, distortionDirection, distortionFactor);
    return LensDistortion(distortedUV, inside);
  }

  void main(){                  
    vec2 center = vec2(0.5, 0.5); 
    vec2 p = vUv * uResolution;

    vec2 uv1 = getCoverUv(vUv, uTexture1Size); 
    vec2 uv2 = getCoverUv(vUv, uTexture2Size);

    float maxRadius = length(uResolution) * 1.5; 
    float bubbleRadius = uProgress * maxRadius; 
    vec2 sphereCenter = center * uResolution; 
    float focusFactor = 0.25;

    float dist = length(sphereCenter - p); 
    float mask = step(bubbleRadius, dist);

    vec4 currentImg = texture2D(uTexture1, uv1);

    LensDistortion distortion = getLensDistortion(
      p, uv2, sphereCenter, bubbleRadius, focusFactor
    );
    vec4 newImg = texture2D(uTexture2, distortion.distortedUv);
    float finalMask = max(mask, 1.0 - distortion.inside);
    vec4 color = mix(newImg, currentImg, finalMask);
    
    gl_FragColor = color;
  }
`;
gsap.registerPlugin(ScrollTrigger);

export default function Team({contactRef }) {
   const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const rendererRef = useRef(null);
  const shaderMaterialRef = useRef(null);
  const slideTexturesRef = useRef([]);
  const animationRef = useRef(null);
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Character animation component
 const AnimatedChar = ({ char, delay = 0, animate }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const charRef = useRef(null);

  useEffect(() => {
    if (!charRef.current) return;

    // Sortie (vers le haut)
    charRef.current.style.transition = `transform 0.5s ease, opacity 0.5s ease`;
    charRef.current.style.transform = "translateY(-100%)";
    charRef.current.style.opacity = "0";

    // Après la sortie → changer le char → entrée
    const timeout = setTimeout(() => {
      setDisplayChar(char);

      if (!charRef.current) return;
      charRef.current.style.transition = "none"; // reset instantané
      charRef.current.style.transform = "translateY(100%)";
      charRef.current.style.opacity = "0";

      requestAnimationFrame(() => {
        if (!charRef.current) return;
        charRef.current.style.transition = `transform 0.5s ease ${delay}s, opacity 0.5s ease ${delay}s`;
        charRef.current.style.transform = "translateY(0%)";
        charRef.current.style.opacity = "1";
      });
    }, 500); // durée sortie

    return () => clearTimeout(timeout);
  }, [char, delay, animate]);

  return (
    <span 
      ref={charRef}
      className="inline-block will-change-transform"
    >
      {displayChar}
    </span>
  );
};


  // Line animation component
 const AnimatedLine = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;

    // Animation sortie
    lineRef.current.style.transition = `transform 0.6s ease, opacity 0.6s ease`;
    lineRef.current.style.transform = "translateY(-100%)";
    lineRef.current.style.opacity = "0";

    // Après la sortie → changer le texte → entrée
    const timeout = setTimeout(() => {
      setDisplayText(text);

      if (!lineRef.current) return;
      lineRef.current.style.transition = "none"; // reset instant
      lineRef.current.style.transform = "translateY(100%)";
      lineRef.current.style.opacity = "0";

      requestAnimationFrame(() => {
        if (!lineRef.current) return;
        lineRef.current.style.transition = `transform 0.6s ease ${delay}s, opacity 0.6s ease ${delay}s`;
        lineRef.current.style.transform = "translateY(0%)";
        lineRef.current.style.opacity = "1";
      });
    }, 600); // durée sortie

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div className="overflow-hidden">
      <span ref={lineRef} className="inline-block will-change-transform">
        {displayText}
      </span>
    </div>
  );
};

  const initializeRenderer = async () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight * 1.5);

    shaderMaterialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight * 1.5) },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader,
      fragmentShader
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterialRef.current));

    const loader = new THREE.TextureLoader();
    for (const slide of slides) {
      const texture = await new Promise((resolve) =>
        loader.load(slide.image, resolve)
      );

      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      texture.userData = {
        size: new THREE.Vector2(texture.image.width, texture.image.height),
      };
      slideTexturesRef.current.push(texture);
    }

    if (slideTexturesRef.current.length >= 2) {
      shaderMaterialRef.current.uniforms.uTexture1.value = slideTexturesRef.current[0];
      shaderMaterialRef.current.uniforms.uTexture2.value = slideTexturesRef.current[1];
      shaderMaterialRef.current.uniforms.uTexture1Size.value = slideTexturesRef.current[0].userData.size;
      shaderMaterialRef.current.uniforms.uTexture2Size.value = slideTexturesRef.current[1].userData.size;
    }

    const render = () => {
      animationRef.current = requestAnimationFrame(render);
      rendererRef.current.render(scene, camera);
    };
    render();
  };

   const handleSlideChange = () => {
    if (isTransitioning || !shaderMaterialRef.current) return;
    
    setIsTransitioning(true);
    const nextIndex = (currentSlideIndex + 1) % slides.length;

    // Check if textures exist and have userData before accessing
  
      
      shaderMaterialRef.current.uniforms.uTexture1.value = slideTexturesRef.current[currentSlideIndex];
      shaderMaterialRef.current.uniforms.uTexture2.value = slideTexturesRef.current[nextIndex];
      shaderMaterialRef.current.uniforms.uTexture1Size.value = slideTexturesRef.current[currentSlideIndex].userData.size;
      shaderMaterialRef.current.uniforms.uTexture2Size.value = slideTexturesRef.current[nextIndex].userData.size;
    

    // Simple progress animation
    let progress = 0;
    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / duration, 1);
      
      // Easing function (power2.inOut)
      const easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.uProgress.value = easedProgress;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Reset and update for next transition
        if (shaderMaterialRef.current && slideTexturesRef.current[nextIndex]?.userData) {
          shaderMaterialRef.current.uniforms.uProgress.value = 0;
          shaderMaterialRef.current.uniforms.uTexture1.value = slideTexturesRef.current[nextIndex];
          shaderMaterialRef.current.uniforms.uTexture1Size.value = slideTexturesRef.current[nextIndex].userData.size;
        }
        
        setCurrentSlideIndex(nextIndex);
        setIsTransitioning(false);
      }
    };

    animate();
  };

  const handleResize = () => {
    if (rendererRef.current && shaderMaterialRef.current) {
      rendererRef.current.setSize(window.innerWidth, window.innerHeight * 1.5);
      shaderMaterialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight * 1.5);
    }
  };

  useEffect(() => {
    initializeRenderer();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const currentSlide = slides[currentSlideIndex];
  const titleChars = currentSlide.title.split('');
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
      { maxWidth: 1100, translateY: -100, movMultiplier: 450 },
      { maxWidth: 1100, translateY: -105, movMultiplier: 500 },
      { maxWidth: 1200, translateY: -90, movMultiplier: 550 },
      { maxWidth: 1300, translateY: -85, movMultiplier: 600 },
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

    const animate_contatc = () => {
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
      requestAnimationFrame(animate_contatc);
    };

    const handleMouseMove = (e) => {
      animationState.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate_contatc()

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
       clearTimeout(timeoutId);
    };
  },[contactRef]);

  return (
    <section id="team_section" ref={teamRef} className="h-[150vh] bg-black relative" onClick={handleSlideChange}>
            
            <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      
      <div className="absolute top-0 left-0 w-full h-full select-none z-10 text-white" >
        <h1 className="font-[Satoshi] font-bold text-8xl text-white m-4">Our team</h1>
        <div className="relative top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <h1 className="uppercase text-[7vw] font-bold leading-none flex justify-center gap-1">
            {titleChars.map((char, index) => (
              <AnimatedChar 
                key={`${currentSlideIndex}-${index}`}
                char={char === ' ' ? '\u00A0' : char}
                delay={index * 0.025}
              />
            ))}
          </h1>
        </div>
        
        <div className="relative top-[30%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-1/4 flex flex-col gap-8 lg:block overflow-hidden">
          <AnimatedLine 
            key={`desc-${currentSlideIndex}`}
            text={currentSlide.description} 
            delay={0.2}
          />
          
          <div className="space-y-1">
            <AnimatedLine 
              key={`type-${currentSlideIndex}`}
              text={`Work. ${currentSlide.type}`}
              delay={0.3}
            />
            <AnimatedLine 
              key={`field-${currentSlideIndex}`}
              text={`Status. ${currentSlide.field}`}
              delay={0.35}
            />
            <AnimatedLine 
              key={`date-${currentSlideIndex}`}
              text={`Experience. ${currentSlide.date}`}
              delay={0.4}
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden relative bottom-[5%] left-1/2 transform -translate-x-1/2 w-3/4 text-center flex flex-col gap-8">
          <AnimatedLine 
            key={`mobile-desc-${currentSlideIndex}`}
            text={currentSlide.description} 
            delay={0.2}
          />
          
          <div className="space-y-1 uppercase text-sm">
            <AnimatedLine 
              key={`mobile-type-${currentSlideIndex}`}
              text={`Type. ${currentSlide.type}`}
              delay={0.3}
            />
            <AnimatedLine 
              key={`mobile-field-${currentSlideIndex}`}
              text={`Field. ${currentSlide.field}`}
              delay={0.35}
            />
            <AnimatedLine 
              key={`mobile-date-${currentSlideIndex}`}
              text={`Date. ${currentSlide.date}`}
              delay={0.4}
            />
          </div>
        </div>
      </div>
    
        </section>
  );
}
