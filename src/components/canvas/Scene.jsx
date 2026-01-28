import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, OrbitControls } from '@react-three/drei';
import Network from './Network';
import Lights from './Lights';
import Environment from './Environment';

const Scene = ({ onNavigate }) => {
    const controlsRef = React.useRef();

    // Scroll to move (rotate) view logic
    React.useEffect(() => {
        const handleWheel = (e) => {
            if (!controlsRef.current) return;
            const delta = e.deltaY * 0.005; // Increased sensitivity (was 0.001)
            controlsRef.current.setAzimuthalAngle(controlsRef.current.getAzimuthalAngle() + delta);
            controlsRef.current.update();
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <Canvas
            className="w-full h-screen"
            camera={{ position: [0, 0, 10], fov: 100 }}
            dpr={[1, 2]} // Support high DPI
            gl={{ antialias: true, alpha: false }}
        >
            <Environment />

            <Suspense fallback={null}>
                <Lights />
                <Network onNavigate={onNavigate} />

                <OrbitControls
                    ref={controlsRef}
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Infinity}
                    maxAzimuthAngle={Infinity}
                    dampingFactor={0.05}
                    enableDamping
                    rotateSpeed={1.0} // Increased from 0.5
                />

                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default Scene;
