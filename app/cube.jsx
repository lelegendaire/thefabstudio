'use client';
import { SpinningText } from "../components/magicui/spinning-text";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial, RoundedBox, Environment, useTexture, Text, Text3D   } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import styles from "./style.module.css"
function BackgroundPlane({ textureUrl }) {
  const texture = useTexture(textureUrl);
  return (
    <mesh position={[0, 0, -2]} scale={[10, 10, 1]}>
      <planeGeometry args={[2.5, 1.5]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
function InteractiveCube({ materialProps, setIsHovered }) {
  const ref = useRef();

  const { size, viewport, mouse } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const originalPosition = useRef([viewport.width * 0.2, 0, 0]);

  useEffect(() => {
    if (ref.current) {
      originalPosition.current = [...ref.current.position.toArray()];
    }
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    // Rotation standard
    if (!isDragging) {
      ref.current.rotation.y = mouse.x * Math.PI / 5;
      ref.current.rotation.x = -mouse.y * Math.PI / 5;
    }

    // Suivi souris pendant drag
    if (isDragging) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      ref.current.position.x = x;
      ref.current.position.y = y;
      ref.current.scale.set(0.7, 0.7, 0.7);
    } else {
      // Revenir à l'état normal
      ref.current.position.lerp(
        new THREE.Vector3(...originalPosition.current),
        0.1
      );
      ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <RoundedBox
  ref={ref}
  args={[3, 3, 3]}
  radius={0.15}
  smoothness={4}
  position={originalPosition.current}
  onPointerDown={() => {setIsDragging(true);setIsHovered(false)}}
  onPointerUp={() => {setIsDragging(false);setIsHovered(true)}}
  onPointerLeave={() => {
    setIsDragging(false);
    setIsHovered(false);
  }}
  onPointerOver={() => setIsHovered(true)}
  onPointerOut={() => setIsHovered(false)}
>
  <MeshTransmissionMaterial {...materialProps} />
</RoundedBox>

  );
}
function AnimatedText({ children, offsetX, offsetY, font, delay = 0, isLoaded }) {
  const { viewport } = useThree();
  const ref = useRef();
  const [start, setStart] = useState(false);

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
          viewport.width * offsetX,
          viewport.height * offsetY,
          0
        ),
        0.05
      );
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={viewport.width * 0.148}
      position={[viewport.width * offsetX, viewport.height * (offsetY + 1), 0]} // Commence plus haut
      anchorX="center"
      anchorY="middle"
      font={font}
    >
      {children}
      <meshBasicMaterial attach="material" color="#FFFFFF" />
    </Text>
  );
}



export default function CubeOverlay({ isLoaded }) {
  

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
  resolution: 1024,
  backside: true,
};
const [isHovered, setIsHovered] = useState(false);

useEffect(() => {
  const ring = document.getElementById('cursor-ring');
  const handleMouseMove = (e) => {
    if (ring) {
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    }
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

  return (
    <div className="absolute top-0 left-0 w-screen h-full pointer-events-none ">
<Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
{/* Fond dupliqué dans la scène WebGL */}
          <BackgroundPlane textureUrl="/medias/background.jpg" />        
<InteractiveCube materialProps={materialProps} setIsHovered={setIsHovered} />
 <AnimatedText offsetX={-0.358} offsetY={0.235} font="/fonts/Dirtyline.ttf" delay={0.2} isLoaded={isLoaded}>
  The
</AnimatedText>
<AnimatedText offsetX={-0.3647} offsetY={-0.03} font="/fonts/Dirtyline.ttf" delay={0.5} isLoaded={isLoaded}>
  Fab
</AnimatedText>
<AnimatedText offsetX={-0.306} offsetY={-0.287} font="/fonts/Dirtyline.ttf" delay={0.8} isLoaded={isLoaded}>
  Studi
</AnimatedText>
<AnimatedText offsetX={-0.0705} offsetY={-0.234} font="/fonts/PlayfairDisplay.ttf" delay={1} isLoaded={isLoaded}>
  O
</AnimatedText>


      
       
        
       

        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
      <div id="cursor-ring" className={`${styles['cursor-ring']} ${isHovered ? styles.visible : ''}`}>
  <SpinningText duration={7} className="text-white">hold me • hold me • hold me •</SpinningText>
</div>


    </div>
  );
}
