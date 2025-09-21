import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TorusMesh() {
  const ref = useRef();
  useFrame(({ clock }) => {
    // rotation légère en continu
    ref.current.rotation.x = Math.PI / 4;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2, 0.2, 16, 100]} />
      <meshStandardMaterial color="#ffae00" />
    </mesh>
  );
}
