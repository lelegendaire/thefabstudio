'use client';

import { useAssets } from '../context/AssetContext'
import { useRef, useEffect, useState } from 'react';

// ✅ Lazy load de toutes les dépendances Three.js
let Canvas, useFrame, useThree;
let MeshTransmissionMaterial, RoundedBox, Text;
let THREE;

async function loadThreeJS() {
  if (Canvas) return; // Déjà chargé
  
  const [fiber, drei, three] = await Promise.all([
    import('@react-three/fiber'),
    import('@react-three/drei'),
    import('three')
  ]);
  
  Canvas = fiber.Canvas;
  useFrame = fiber.useFrame;
  useThree = fiber.useThree;
  
  MeshTransmissionMaterial = drei.MeshTransmissionMaterial;
  RoundedBox = drei.RoundedBox;
  Text = drei.Text;
  
  THREE = three;
}

function BackgroundPlane() {
  const assets = useAssets()
  
  if (!assets?.bgTexture || !THREE) {
    return null
  }
  return (
    <mesh position={[0, 0, -2]} scale={[10, 10, 1]}>
      <planeGeometry args={[2.5, 1.5]} />
      <meshBasicMaterial map={assets.bgTexture} />
    </mesh>
  );
}


function InteractiveCube({ materialProps, canvasContainerRef,setIsHovered }) {
  const ref = useRef();
  const sphereRef = useRef();
  const ringRef = useRef();

  const { size, viewport, mouse } = useThree();
  const [isDragging, setIsDragging] = useState(false);

  // ---------- RESPONSIVE VALUES ----------
  const isMobile = viewport.width < 6;

  // Cube scale
  const responsiveScale = isMobile ? 0.55 : 1;

  // Internal sphere & torus scale
  const innerScale = isMobile ? 0.55 : 1;

  // Position responsive
  const originalPosition = useRef([
    isMobile ? 0 : viewport.width * 0.2,
    0,
    0
  ]);

  useEffect(() => {
    if (ref.current) {
      originalPosition.current = [...ref.current.position.toArray()];
    }
  }, []);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  if (!canvasContainerRef.current) return;

  const observer = new IntersectionObserver(([entry]) => {
    setIsVisible(entry.isIntersecting);
  });

  observer.observe(canvasContainerRef.current);
  return () => observer.disconnect();
}, []);


  useFrame((state, delta) => {
    if (!isVisible) return; // 🚫 stop render quand hors écran
    if (isMobile) delta *= 0.5; // ralenti sur mobile
    if (!ref.current) return;

    // NORMAL ROTATION
    if (!isDragging) {
      ref.current.rotation.y = mouse.x * Math.PI / 5;
      ref.current.rotation.x = -mouse.y * Math.PI / 5;
    }

    // MOVEMENT WHEN DRAGGING
    if (isDragging) {
      const movementLimit = isMobile ? 0.8 : 1.6;

      const x = mouse.x * movementLimit;
      const y = mouse.y * movementLimit;

      ref.current.position.x = x;
      ref.current.position.y = y;

      ref.current.scale.set(responsiveScale * 0.8, responsiveScale * 0.8, responsiveScale * 0.8);

    } else {
      // RETURN TO ORIGINAL POSITION
      ref.current.position.lerp(
        new THREE.Vector3(...originalPosition.current),
        0.1
      );

      // Return scale
      ref.current.scale.lerp(
        new THREE.Vector3(responsiveScale, responsiveScale, responsiveScale),
        0.1
      );
    }

    // SPHERE ANIMATION
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.5;
      sphereRef.current.rotation.x += delta * 0.2;
      sphereRef.current.scale.set(innerScale, innerScale, innerScale);
    }

    // TORUS ANIMATION
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.8;
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.scale.set(innerScale, innerScale, innerScale);
    }
  });

  return (
    <RoundedBox
      ref={ref}
      args={[3, 3, 3]}
      radius={0.15}
      smoothness={4}
      position={originalPosition.current}
      scale={[responsiveScale, responsiveScale, responsiveScale]}
      
      
    >

      {/* MATERIAL */}
      <MeshTransmissionMaterial {...materialProps} />

      {/* SPHERE (responsive) */}
      <lineSegments ref={sphereRef} position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.SphereGeometry(0.8, 16, 16)]} />
        <lineBasicMaterial color="white" transparent opacity={0.8} />
      </lineSegments>

      {/* TORUS (responsive) */}
      <lineSegments ref={ringRef} position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.TorusGeometry(1.2, 0.1, 16, 100)]} />
        <lineBasicMaterial color="white" transparent opacity={0.8} />
      </lineSegments>
    </RoundedBox>
  );
}

function AnimatedText({ children, offsetX, offsetY, font, delay = 0, isLoaded }) {
  const { viewport } = useThree();
  const ref = useRef();
  const [start, setStart] = useState(false);
const baseFont = viewport.width * 0.148;

  // Plus petit sur mobile
  const fontSize =
    viewport.width < 6
      ? baseFont * 1.9   // téléphone
      : viewport.width < 9
        ? baseFont * 0.8  // tablette
        : baseFont;       // desktop

         const responsiveOffsetX =
    viewport.width < 6 ? offsetX * 0.7 :
    viewport.width < 9 ? offsetX * 0.85 :
    offsetX;

  const responsiveOffsetY =
    viewport.width < 6 ? offsetY * 0.7 :
    viewport.width < 9 ? offsetY * 0.85 :
    offsetY;
  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => setStart(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isLoaded, delay]);

  useFrame(() => {
    if (!ref.current) return;
    // Animation: descend en douceur
    if (start) {
      ref.current.position.lerp(
        new THREE.Vector3(
         viewport.width * responsiveOffsetX,
          viewport.height * responsiveOffsetY,
          0
        ),
        0.05
      );
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={fontSize}
      position={[viewport.width * responsiveOffsetX, viewport.height * (responsiveOffsetY  + 1), 0]} // Commence plus haut
      anchorX="center"
      anchorY="middle"
      font={font}
    >
      {children}
      <meshBasicMaterial attach="material" color="#FFFFFF" />
    </Text>
  );
}

function Logo3D({ isLoaded }) {
  const { viewport } = useThree();

  const isPhone = viewport.width < 5.5;
  const isTablet = viewport.width < 8;

  const position_group = isPhone
    ? [viewport.width * -0.145, viewport.height * -0.20, 0]
    : isTablet
    ? [viewport.width * -0.18, viewport.height * -0.1, 0]
    : [viewport.width * -0.305, viewport.height * -0.29, 0];
const gap = isPhone ? [0.63,0.03] : isTablet ? [0.43,0.5] : [0.23,0.05]
  return (
    <>
      <AnimatedText offsetX={-0.358} offsetY={0.235} font="/fonts/Dirtyline.ttf" delay={0.2} isLoaded={isLoaded}>
        The
      </AnimatedText>

      <AnimatedText offsetX={-0.3647} offsetY={-0.03} font="/fonts/Dirtyline.ttf" delay={0.5} isLoaded={isLoaded}>
        Fab
      </AnimatedText>

      <group position={position_group}>
        <AnimatedText offsetX={0} offsetY={0} font="/fonts/Dirtyline.ttf" delay={0.8} isLoaded={isLoaded}>
          Studi
        </AnimatedText>

        <AnimatedText offsetX={gap[0]} offsetY={gap[1]} font="/fonts/PlayfairDisplay.ttf" delay={0.8} isLoaded={isLoaded}>
          O
        </AnimatedText>
      </group>
    </>
  );
}


export default function CubeOverlay({ isLoaded}) {
const [threeLoaded, setThreeLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
const canvasContainerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    // ✅ Charger Three.js seulement quand le loader est terminé
    const timer = setTimeout(() => {
      loadThreeJS().then(() => {
        setThreeLoaded(true);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [isLoaded]);

 

  // ✅ Afficher un placeholder pendant le chargement de Three.js
  if (!isLoaded || !threeLoaded || !Canvas) {
    return null;
  }

  
  const materialProps = {
  thickness: 0.8,
  roughness: 0.05,
  transmission: 1,
  ior: 1.5,
  chromaticAberration: 1,
  anisotropy: 0.1,
  distorsion: 0.1,
  distortionScale: 0.3,
  temporalDistortion: 0.2,
  resolution: 512,
  simples: 8,
  backside: true,
};




  return (
    <div ref={canvasContainerRef} className="absolute top-0 left-0 w-screen h-full pointer-events-none ">
<Canvas frameloop="demand" gl={{ alpha: true, premultipliedAlpha: false }}  dpr={[1, 1.5]} style={{ background: 'transparent' }}>
  
{/* Fond dupliqué dans la scène WebGL */}
 <BackgroundPlane />    
  <InteractiveCube canvasContainerRef={canvasContainerRef} materialProps={materialProps} setIsHovered={setIsHovered} />
   <Logo3D isLoaded />

        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    


    </div>
  );
}
