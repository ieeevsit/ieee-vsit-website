"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Icosahedron = () => {
  const mesh = useRef();
  const { viewport } = useThree();
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setTargetRotation({ x: y * 0.5, y: x * 0.5 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  useFrame(() => {
    if (!mounted) return;
    if (mesh.current) {
      mesh.current.rotation.x += 0.001;
      mesh.current.rotation.y += 0.001;
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotation.x, 0.05);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotation.y, 0.05);
    }
  });

  if (!mounted) return null;

  return (
    <mesh ref={mesh} scale={viewport.width / 5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe wireframeLinewidth={2} roughness={0.5} metalness={0.7} />
    </mesh>
  );
};

export default Icosahedron;
