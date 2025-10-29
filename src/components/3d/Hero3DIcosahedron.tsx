import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface MousePosition {
  x: number;
  y: number;
}

function ParallaxIcosahedron() {
  const mesh = useRef<THREE.Group>(null);
  useThree(); // Only call to ensure context, but don't destructure unused values
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  const target = useRef<MousePosition>({ x: 0, y: 0 });
  const [radius, setRadius] = useState<number>(2.5);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      // Track all cursor movements, normalized to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.x = x * 0.5;
      target.current.y = y * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Always an empty array

  useEffect(() => {
    // Set radius based on screen width (mobile < 640px)
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 1.5 : 2.5);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useFrame((state, delta) => {
    // Smoothly interpolate to target
    mouse.current.x += (target.current.x - mouse.current.x) * 0.08;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.08;
    if (mesh.current) {
      mesh.current.rotation.x = mouse.current.y + state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = mouse.current.x + state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={mesh}>
      <Icosahedron args={[radius, 0]}>
        <meshBasicMaterial
          color={'#60a5fa'} // matches hero text color
          wireframe
          transparent
          opacity={0.95}
        />
      </Icosahedron>
      {/* Glow effect */}
      <Icosahedron args={[radius + 0.2, 0]}>
        <meshBasicMaterial
          color={'#60a5fa'}
          wireframe
          transparent
          opacity={0.13}
        />
      </Icosahedron>
    </group>
  );
}

const Hero3DIcosahedron: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Enhanced starry background */}
        <Stars
          radius={120} // larger radius
          depth={80}
          count={9000} // more stars
          factor={5} // increased for brighter/larger stars
          saturation={2} // increased for more vivid stars
          fade
          speed={2}
        />
        <ambientLight intensity={0.8} />
        <ParallaxIcosahedron />
      </Canvas>
    </div>
  );
};

export default Hero3DIcosahedron;