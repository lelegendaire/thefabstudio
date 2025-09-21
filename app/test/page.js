"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BackgroundPlane({ textureUrl }) {
  const texture = useTexture(textureUrl);
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, -2]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Bracelet({ outerradius, innerradius, position_Y, axis = "y" }) {
  const outerRadius = outerradius;
  const innerRadius = innerradius;
  const braceletDepth = 0.4;
  const meshRef = useRef();
const orbitLightRef = useRef();
  // Création du bracelet
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: braceletDepth,
    bevelEnabled: false,
    curveSegments: 1024,
  });

  // Animation au scroll
  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.rotation, {
      [axis]: Math.PI * 2, // rotation sur l’axe choisi
      scrollTrigger: {
        trigger: "#scroll-area",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
     // orbite de la lumière
    gsap.to({}, {
      scrollTrigger: {
        trigger: "#scroll-area",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * Math.PI * 2; // 0 → 2π
          const radius = 3;
          orbitLightRef.current.position.x = Math.cos(progress) * radius;
          orbitLightRef.current.position.z = Math.sin(progress) * radius;
          orbitLightRef.current.position.y = Math.sin(progress * 2) * 1.5; // petit mouvement vertical
        },
      },
    });
  }, [axis]);

  return (
    <group ref={meshRef} rotation={[Math.PI / 2 + 0.2, position_Y, 0]}>
      <mesh geometry={geometry}>
        {/* Matériau doré */}
        <meshStandardMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.2}
        />
      </mesh>
       <pointLight
        ref={orbitLightRef}
        intensity={20}
        distance={15}
        color="white"
      />
    </group>
  );
}

export default function Page() {
  return (
    <>
      {/* zone scroll pour ScrollTrigger */}
      <div id="scroll-area" style={{ height: "300vh" }}></div>

      <div className="w-screen h-screen bg-black fixed top-0 left-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          {/* Fond cover */}
          <BackgroundPlane textureUrl="/medias/noir_bg.jpg" />

          {/* Lumières améliorées */}
          <pointLight position={[0, 0, 0]} intensity={30} color="white" />
        <ambientLight intensity={30} />
          {/* Bracelets dorés */}
          <Bracelet outerradius={2.2} innerradius={2.1} position_Y={Math.PI / 4} axis="x" />
          <Bracelet outerradius={2} innerradius={1.9} position_Y={Math.PI / 8} axis="y" />
          <Bracelet outerradius={1.8} innerradius={1.7} position_Y={Math.PI / 1} axis="x" />
          <Bracelet outerradius={1} innerradius={0.9} position_Y={Math.PI / 3} axis="y" />
        </Canvas>
      </div>

      {/* UI fixe */}
      <div className="fixed top-0 w-full h-full left-0 opacity-0">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="w-50 h-80 bg-amber-50 rounded-2xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1753213509442-fb00d9d0eeba?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="text-white border-2 rounded-4xl flex justify-center items-center w-50">
            <h1>Fabien</h1>
          </div>
        </div>
      </div>
    </>
  );
}
