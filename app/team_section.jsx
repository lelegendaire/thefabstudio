"use client";

import { useEffect,useRef, useState  } from "react";

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
    image: "/medias/Fabien.jpg" // Real image URL
  },
  {
    title: "Noah CHEVALIER",
    description: "Nobody can be better than him to explain the raw informatique to people.",
    type: "Community manager",
    field: "CO-foundator",
    date: "2 years",
    image: "/medias/Noah.jpg" // Real image URL
  },
  {
    title: "Rafaël ASTRO",
    description: "The best developper among us enable to create few project in the same time",
    type: "Fronted and backend",
    field: "Employe",
    date: "4 years",
    image: "/medias/Rafaël.jpg" // Real image URL
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
    const slideContentRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const rendererRef = useRef(null);
    const shaderMaterialRef = useRef(null);
    const slideTexturesRef = useRef([]);
    const animationRef = useRef(null);

 

  const initializeRenderer = async () => {
      if (!canvasRef.current) return;
    // Éviter de charger plusieurs fois
    if (slideTexturesRef.current.length > 0) {
      console.log('Textures already loaded, skipping...');
      return;
    }
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
       const loadedTextures = []; // Utiliser un tableau local
      for (const slide of slides) {
        
        const texture = await new Promise((resolve) =>
          loader.load(slide.image, resolve)
        );
  
        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        texture.userData = {
          size: new THREE.Vector2(texture.image.width, texture.image.height),
        };
        loadedTextures.push(texture);
      }
        slideTexturesRef.current = loadedTextures;
console.log('Loaded textures:', slideTexturesRef.current.length);
    slideTexturesRef.current.forEach((tex, i) => {
      console.log(`Texture ${i}:`, slides[i].title, tex.uuid);
    });      if (slideTexturesRef.current.length >= 2) {
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
useEffect(() => {
  let timeout;

  const startAutoSlide = () => {
    timeout = setTimeout(() => {
      // On lance l’auto-slide SEULEMENT si rien n'est en transition
      if (!isTransitioning) {
        handleSlideChange();
      }
      startAutoSlide(); // relance la boucle
    }, 5000);
  };

  startAutoSlide();

  return () => clearTimeout(timeout);
}, [isTransitioning, currentSlideIndex]);

useEffect(() => {
     initializeRenderer();
 
     const handleResize = () => {
       if (rendererRef.current && shaderMaterialRef.current) {
         rendererRef.current.setSize(window.innerWidth, window.innerHeight*1.5);
         shaderMaterialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight*1.5);
       }
     };
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

const animateTextTransition = (nextIndex) => {
    if (!slideContentRef.current) return;

    const chars = slideContentRef.current.querySelectorAll('.char span');
    const lines = slideContentRef.current.querySelectorAll('.line span');
    // Timeline GSAP pour animer la sortie du texte
    const timeline = gsap.timeline();

    timeline.to(Array.from(chars), {
      y: '-100%',
      duration: 0.6,
      stagger: 0.025,
      ease: 'power2.inOut',
    }).to(
      Array.from(lines),
      {
        y: '-100%',
        duration: 0.6,
        stagger: 0.025,
        ease: 'power2.inOut',
      },
      0.1
    );

    // Changer le contenu du texte et réinitialiser les positions
    setTimeout(() => {
      setCurrentSlideIndex(nextIndex);
      setTimeout(() => {
        if (slideContentRef.current) {
          const newChars = slideContentRef.current.querySelectorAll('.char span');
          const newLines = slideContentRef.current.querySelectorAll('.line span');
          
          gsap.set(Array.from(newChars), { y: '100%' });
          gsap.set(Array.from(newLines), { y: '100%' });
          
          gsap.to(Array.from(newChars), {
            y: '0%',
            duration: 0.6,
            stagger: 0.025,
            ease: 'power2.inOut',
          });
          
          gsap.to(Array.from(newLines), {
            y: '0%',
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.inOut',
            delay: 0.3,
          });
        }
      }, 50);
    }, 500);
  };

 const handleSlideChange = () => {
    if (isTransitioning || !shaderMaterialRef.current || slideTexturesRef.current.length === 0) return;
    
    setIsTransitioning(true);
    const nextIndex = (currentSlideIndex + 1) % slides.length;


    
    // Mettre à jour les textures du shader AVANT d'animer
    shaderMaterialRef.current.uniforms.uTexture1.value = slideTexturesRef.current[currentSlideIndex];
    shaderMaterialRef.current.uniforms.uTexture2.value = slideTexturesRef.current[nextIndex];
    shaderMaterialRef.current.uniforms.uTexture1Size.value = slideTexturesRef.current[currentSlideIndex].userData.size;
    shaderMaterialRef.current.uniforms.uTexture2Size.value = slideTexturesRef.current[nextIndex].userData.size;
    // Animer le texte
    animateTextTransition(nextIndex);

    // Animation du shader avec requestAnimationFrame
    let progress = 0;
    const duration = 2500;
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
         
       if (shaderMaterialRef.current) {

  // Reset progress
  shaderMaterialRef.current.uniforms.uProgress.value = 0;

  // La texture finale DOIT être celle du nextIndex
  shaderMaterialRef.current.uniforms.uTexture1.value =
    slideTexturesRef.current[nextIndex];
  shaderMaterialRef.current.uniforms.uTexture1Size.value =
    slideTexturesRef.current[nextIndex].userData.size;

  // IMPORTANT : recharger uTexture2 avec la future image suivante
  const nextNextIndex = (nextIndex + 1) % slides.length;
  shaderMaterialRef.current.uniforms.uTexture2.value =
    slideTexturesRef.current[nextNextIndex];
  shaderMaterialRef.current.uniforms.uTexture2Size.value =
    slideTexturesRef.current[nextNextIndex].userData.size;
}

setCurrentSlideIndex(nextIndex);
setIsTransitioning(false);

      }
    };

    animate();
  };

 
  const currentSlide = slides[currentSlideIndex];
  
     const teamRef = useRef(null); // ✅ ton ref simple ici
  useEffect(() => {
    if (!contactRef?.current || typeof window === "undefined" || window.innerWidth < 900) return;

   const section = contactRef.current;


   

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
    };
  },[contactRef]);

  return (
    <section id="team_section" ref={teamRef} className="h-[150vh] bg-black relative" >
            <div 
      className="slider"
      onClick={handleSlideChange}
    >
            <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      
      <div className="absolute top-0 left-0 w-full h-full select-none z-10 text-white" ref={slideContentRef} >
        <h1 className="font-[Satoshi] font-bold text-8xl text-white m-4">Our team</h1>
        <div className="relative top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center" >
          <h1 className="uppercase text-[7vw] font-bold leading-none flex justify-center whitespace-pre-line font-[Satoshi] gap-[1em]">
            {currentSlide.title.split(' ').map((word, i) => (
              <div className="word flex" key={i}>
                {word.split('').map((char, j) => (
                  <div className="char overflow-hidden block" key={j}>
                    <span className="relative inline-block will-change-transform">{char}</span>
                  </div>
                ))}
              </div>
            ))}
          </h1>
        </div>
        
        <div className="relative top-[30%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-1/4 flex flex-col gap-8 lg:block overflow-hidden font-[Satoshi] ">
          <div className="line overflow-hidden">
            <span className="relative inline-block will-change-transform">{currentSlide.description}</span>
          </div>
        
        </div>
  <div className="space-y-1 relative top-[30%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 w-1/4 flex flex-col gap-8 lg:block overflow-hidden font-[Satoshi]">
             <div className="line overflow-hidden"><span className="relative inline-block will-change-transform">Type. {currentSlide.type}</span></div>
            <div className="line overflow-hidden"><span className="relative inline-block will-change-transform">Field. {currentSlide.field}</span></div>
            <div className="line overflow-hidden"><span className="relative inline-block will-change-transform">Date. {currentSlide.date}</span></div>
          </div>
        
       
      </div>
    </div>
        </section>
  );
}
