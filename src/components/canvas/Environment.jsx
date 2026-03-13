import React, { useMemo } from 'react';
import * as THREE from 'three';

const Environment = () => {
    // 3D cylindrical grid viewed from the side (architectural blueprint style)
    // Cylinder axis runs vertically (Y axis), camera views from front (Z)

    const lines = useMemo(() => {
        const data = [];
        const seed = (n) => Math.sin(n * 127.1 + 311.7) * 0.5 + 0.5;

        const radius = 8;
        const halfLength = 40;
        const longiCount = 32;    // longitudinal lines along the cylinder surface
        const ringCount = 24;     // ring cross-sections along the length
        const ringSpacing = (halfLength * 2) / ringCount;

        // --- Longitudinal lines (run along Y axis on cylinder surface) ---
        for (let i = 0; i < longiCount; i++) {
            const angle = (i / longiCount) * Math.PI * 2;
            const wobble = (seed(i + 10) - 0.5) * 0.06;
            const a = angle + wobble;

            const x = Math.cos(a) * radius;
            const z = Math.sin(a) * radius;

            for (let s = 0; s < ringCount; s++) {
                const y1 = -halfLength + s * ringSpacing;
                const y2 = -halfLength + (s + 1) * ringSpacing;

                const w1 = 1 + (seed(i * 100 + s) - 0.5) * 0.015;
                const w2 = 1 + (seed(i * 100 + s + 50) - 0.5) * 0.015;

                data.push({
                    points: [
                        new THREE.Vector3(x * w1, y1, z * w1),
                        new THREE.Vector3(x * w2, y2, z * w2)
                    ],
                    opacity: 0.09
                });
            }
        }

        // --- Ring cross-sections (circles perpendicular to Y axis) ---
        for (let r = 0; r <= ringCount; r++) {
            const y = -halfLength + r * ringSpacing;
            const segments = 64;

            for (let s = 0; s < segments; s++) {
                const a1 = (s / segments) * Math.PI * 2;
                const a2 = ((s + 1) / segments) * Math.PI * 2;

                const w1 = 1 + (seed(r * 200 + s) - 0.5) * 0.012;
                const w2 = 1 + (seed(r * 200 + s + 1) - 0.5) * 0.012;

                data.push({
                    points: [
                        new THREE.Vector3(Math.cos(a1) * radius * w1, y, Math.sin(a1) * radius * w1),
                        new THREE.Vector3(Math.cos(a2) * radius * w2, y, Math.sin(a2) * radius * w2)
                    ],
                    opacity: 0.09
                });
            }
        }

        return data;
    }, []);

    const geometryData = useMemo(() => {
        return lines.map(item => new Float32Array([
            item.points[0].x, item.points[0].y, item.points[0].z,
            item.points[1].x, item.points[1].y, item.points[1].z
        ]));
    }, [lines]);

    return (
        <>
            <color attach="background" args={['#F5F3F0']} />
            <fog attach="fog" args={['#F5F3F0', 15, 55]} />

            <group>
                {lines.map((item, i) => (
                    <line key={i}>
                        <bufferGeometry attach="geometry">
                            <bufferAttribute
                                attach="attributes-position"
                                count={2}
                                array={geometryData[i]}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial
                            attach="material"
                            color="#000000"
                            transparent
                            opacity={item.opacity}
                            linewidth={1}
                        />
                    </line>
                ))}
            </group>
        </>
    );
};

export default Environment;
