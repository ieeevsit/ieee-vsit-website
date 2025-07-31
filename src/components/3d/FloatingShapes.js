"use client";
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingShape = ({ position, rotation, scale, rotationSpeed }) => {
    const mesh = useRef();
    useFrame(() => {
        if(mesh.current) {
            mesh.current.rotation.x += rotationSpeed.x;
            mesh.current.rotation.y += rotationSpeed.y;
            mesh.current.rotation.z += rotationSpeed.z;
        }
    });
    return (
        <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
            <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
            <meshStandardMaterial color="#ffffff" wireframe roughness={0.5} metalness={0.7} />
        </mesh>
    );
};

const FloatingShapes = () => {
    const { viewport } = useThree();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const shapes = useMemo(() => {
        if (!mounted) return [];
        // Only generate random shapes after mount (client-side)
        return Array.from({ length: 15 }).map((_, i) => {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * viewport.width,
                (Math.random() - 0.5) * viewport.height * 1.5,
                (Math.random() - 0.5) * 10
            );
            const rotation = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            const scale = 0.1 + Math.random() * 0.2;
            const rotationSpeed = new THREE.Vector3(Math.random() * 0.005, Math.random() * 0.005, Math.random() * 0.005);
            return { id: i, position, rotation, scale, rotationSpeed };
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewport, mounted]); // Only regenerate on viewport/mounted

    if (!mounted) return null; // Don't render on server
    return (
        <group>
            {shapes.map(shapeInfo => (
                <FloatingShape key={shapeInfo.id} {...shapeInfo} />
            ))}
        </group>
    );
};

export default FloatingShapes;
