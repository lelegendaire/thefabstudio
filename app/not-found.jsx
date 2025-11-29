// app/not-found.jsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { OrbitControls, MeshTransmissionMaterial, RoundedBox, Environment, useTexture, Text, Text3D, useGLTF, Float    } from '@react-three/drei';


import styles from './not-found.module.css'
function BackgroundPlane({ textureUrl }) {
  const texture = useTexture(textureUrl);
  return (
    <mesh position={[0, 0, -2]} scale={[10, 10, 1]}>
      <planeGeometry args={[2.5, 1.5]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
function AnimatedText({ children, offsetX, offsetY, font, delay = 0, fontSize }) {
  const { viewport } = useThree();
  const ref = useRef();
const [start, setStart] = useState(false);

  useEffect(() => {
    
      const t = setTimeout(() => setStart(true), delay * 1000);
      return () => clearTimeout(t);
    
  }, [delay]);

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
      fontSize={viewport.width * fontSize}
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

function ForeGround({materialProps}){
  const { viewport } = useThree()

    const { nodes } = useGLTF('/medias/shards.glb')
    
      return (

        <group scale={viewport.width / 1.5} >

            {

                nodes.Scene.children.map( (mesh, i) => {

                    return (
                      <Float key={i}>
                      <mesh 
                        geometry={mesh.geometry}
                        position={mesh.position}
                        rotation={mesh.rotation}
                        scale={mesh.scale}
                      >
                         <MeshTransmissionMaterial {...materialProps} />
                      </mesh>
                      </Float>
                    )

                })

            }

        </group>

    )
}
export default function NotFound() {
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
};
  return (
    <>
    <section className='absolute top-0 left-0 w-screen h-full pointer-events-none'>
    <Canvas gl={{ alpha: true, premultipliedAlpha: false }} style={{ background: 'transparent' }}>

     <BackgroundPlane textureUrl="/medias/bg_final.jpg" />    
    <AnimatedText offsetX={0} offsetY={0.235} fontSize={0.05} font="/fonts/Dirtyline.ttf" delay={0.2} >
  We are lost ?
</AnimatedText>
    <AnimatedText offsetX={0} offsetY={0} fontSize={0.1} font="/fonts/Dirtyline.ttf" delay={0.4} >
 404
</AnimatedText>
<ForeGround materialProps={materialProps}></ForeGround>
    </Canvas>
    </section>
    
    </>
  )
}
