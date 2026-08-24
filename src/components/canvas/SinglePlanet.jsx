import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore, { SECTIONS } from '../../store/useStore';
import * as THREE from 'three';
import {
    POINT_COUNT,
    SUBJECT_POSITION,
    getSectionTargets,
    sectionConfigs,
    subjectSpin,
} from '../../utils/subjectShapes';

const SinglePlanet = () => {
    const groupRef = useRef();
    const geometryRef = useRef();
    const currentSection = useStore((state) => state.currentSection);

    const visual = useRef({ rotation: 0 });

    const sectionTargets = useMemo(() => getSectionTargets(), []);

    const currentPositions = useMemo(() => {
        const initial = new Float32Array(POINT_COUNT * 3);
        initial.set(sectionTargets[SECTIONS[0]]);
        return initial;
    }, [sectionTargets]);

    const dotTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.8, '#ffffff');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();
        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        const sectionId = SECTIONS[currentSection];
        const cfg = sectionConfigs[sectionId];

        visual.current.rotation += delta * cfg.rotSpeed;
        groupRef.current.rotation.y = visual.current.rotation;
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;

        // Published so the floor shadow turns with the shape.
        subjectSpin.y = visual.current.rotation;

        if (geometryRef.current) {
            const positions = geometryRef.current.attributes.position.array;
            const target = sectionTargets[sectionId];
            const lerpSpeed = 3.0;

            for (let i = 0; i < POINT_COUNT * 3; i++) {
                positions[i] += (target[i] - positions[i]) * lerpSpeed * delta;
            }

            for (let i = 0; i < POINT_COUNT; i++) {
                positions[i * 3] += Math.sin(t * 2 + i) * 0.001;
                positions[i * 3 + 1] += Math.cos(t * 1.5 + i) * 0.001;
                positions[i * 3 + 2] += Math.sin(t * 1.8 + i) * 0.001;
            }

            geometryRef.current.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group position={SUBJECT_POSITION}>
            <group ref={groupRef}>
                <points>
                    <bufferGeometry ref={geometryRef}>
                        <bufferAttribute
                            attach="attributes-position"
                            count={POINT_COUNT}
                            array={currentPositions}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.12}
                        color="#000000"
                        map={dotTexture}
                        sizeAttenuation
                        transparent
                        alphaTest={0.1}
                        opacity={0.6}
                    />
                </points>
            </group>
        </group>
    );
};

export default SinglePlanet;
