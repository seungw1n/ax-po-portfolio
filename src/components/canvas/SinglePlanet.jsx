import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore, { SECTIONS } from '../../store/useStore';
import * as THREE from 'three';

const sectionConfigs = {
    about:    { radius: 2.5, rotSpeed: 0.06, shape: 'sphere' },
    projects: { radius: 2.8, rotSpeed: 0.1,  shape: 'cube' },
    resume:   { radius: 2.2, rotSpeed: 0.04, shape: 'ring' },
    study:    { radius: 2.6, rotSpeed: 0.08, shape: 'spiral' },
    peer:     { radius: 2.4, rotSpeed: 0.07, shape: 'double' },
    library:  { radius: 2.0, rotSpeed: 0.05, shape: 'column' },
    articles: { radius: 3.0, rotSpeed: 0.09, shape: 'cloud' },
};

function generateShape(shape, radius, count) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const t = i / count;
        let x, y, z;
        switch (shape) {
            case 'cube': {
                x = (Math.random() - 0.5) * radius * 2;
                y = (Math.random() - 0.5) * radius * 2;
                z = (Math.random() - 0.5) * radius * 2;
                break;
            }
            case 'ring': {
                const angle = t * Math.PI * 2;
                const r = radius * (0.8 + Math.random() * 0.4);
                x = Math.cos(angle) * r;
                y = (Math.random() - 0.5) * radius * 0.3;
                z = Math.sin(angle) * r;
                break;
            }
            case 'spiral': {
                const sa = t * Math.PI * 6;
                const sr = radius * t;
                x = Math.cos(sa) * sr;
                y = (t - 0.5) * radius * 3;
                z = Math.sin(sa) * sr;
                break;
            }
            case 'double': {
                const cluster = i < count / 2 ? -1 : 1;
                const phi = Math.random() * Math.PI * 2;
                const theta = Math.acos(2 * Math.random() - 1);
                const r = radius * 0.6 * Math.pow(Math.random(), 0.5);
                x = r * Math.sin(theta) * Math.cos(phi) + cluster * radius * 0.6;
                y = r * Math.sin(theta) * Math.sin(phi);
                z = r * Math.cos(theta);
                break;
            }
            case 'column': {
                const ca = Math.random() * Math.PI * 2;
                const cr = radius * 0.4 * Math.pow(Math.random(), 0.5);
                x = Math.cos(ca) * cr;
                y = (Math.random() - 0.5) * radius * 3;
                z = Math.sin(ca) * cr;
                break;
            }
            case 'cloud': {
                x = (Math.random() - 0.5) * radius * 3;
                y = (Math.random() - 0.5) * radius * 2;
                z = (Math.random() - 0.5) * radius * 3;
                break;
            }
            default: {
                const phi = Math.random() * Math.PI * 2;
                const theta = Math.acos(2 * Math.random() - 1);
                const r = radius * Math.pow(Math.random(), 0.5);
                x = r * Math.sin(theta) * Math.cos(phi);
                y = r * Math.sin(theta) * Math.sin(phi);
                z = r * Math.cos(theta);
            }
        }
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

const POINT_COUNT = 250;

const SinglePlanet = () => {
    const groupRef = useRef();
    const geometryRef = useRef();
    const currentSection = useStore((state) => state.currentSection);

    const visual = useMemo(() => ({ rotation: 0 }), []);

    const sectionTargets = useMemo(() => {
        const targets = {};
        SECTIONS.forEach(id => {
            const cfg = sectionConfigs[id];
            targets[id] = generateShape(cfg.shape, cfg.radius, POINT_COUNT);
        });
        return targets;
    }, []);

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

        visual.rotation += delta * cfg.rotSpeed;
        groupRef.current.rotation.y = visual.rotation;
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;

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
        <group position={[2.5, 0, 0]}>
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
