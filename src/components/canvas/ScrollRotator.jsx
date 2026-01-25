import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { e } from 'maath';

const ScrollToRotate = () => {
    const { camera, gl } = useThree();
    const targetRotation = useRef(0);
    const isInteracting = useRef(false);

    useEffect(() => {
        const handleWheel = (event) => {
            // Adjust rotation sensitivity
            const sensitivity = 0.001;
            targetRotation.current += event.deltaY * sensitivity;
            isInteracting.current = true;

            // Clear interaction flag after delay to allow OrbitControls to settle/take over if needed, 
            // though usually we just want to offset the OrbitControls azimuth.
        };

        const canvas = gl.domElement;
        canvas.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            canvas.removeEventListener('wheel', handleWheel);
        };
    }, [gl.domElement]);

    return null;
};

// Actually, hooking into OrbitControls is cleaner if we can access it.
// Let's modify Scene.jsx to include logic directly or via a specific component that accesses OrbitControls ref.
export default ScrollToRotate;
