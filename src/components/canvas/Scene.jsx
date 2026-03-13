import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import SinglePlanet from './SinglePlanet';
import Lights from './Lights';
import Environment from './Environment';
import useStore, { SECTIONS } from '../../store/useStore';

const Scene = ({ onNavigate }) => {
    const scrollAccum = useRef(0);
    const cooldown = useRef(false);

    useEffect(() => {
        const handleWheel = (e) => {
            const { activeNode } = useStore.getState();
            if (activeNode) return;
            if (cooldown.current) return;

            scrollAccum.current += e.deltaY;

            const threshold = 50;
            const { currentSection, setCurrentSection } = useStore.getState();

            if (scrollAccum.current > threshold && currentSection < SECTIONS.length - 1) {
                setCurrentSection(currentSection + 1);
                scrollAccum.current = 0;
                cooldown.current = true;
                setTimeout(() => { cooldown.current = false; }, 600);
            } else if (scrollAccum.current < -threshold && currentSection > 0) {
                setCurrentSection(currentSection - 1);
                scrollAccum.current = 0;
                cooldown.current = true;
                setTimeout(() => { cooldown.current = false; }, 600);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [onNavigate]);

    return (
        <Canvas
            className="w-full h-screen"
            camera={{ position: [0, 0, 20], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
        >
            <Environment />

            <Suspense fallback={null}>
                <Lights />
                <SinglePlanet />
                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default Scene;
