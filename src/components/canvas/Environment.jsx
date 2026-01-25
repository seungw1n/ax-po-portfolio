import React from 'react';
import * as THREE from 'three';

const Environment = () => {
    // Volumetric 3D Grid: forms cubes/boxes in space
    // X (Red), Y (Yellow/Depth), Z (Blue/Vertical)

    const lines = React.useMemo(() => {
        const data = [];
        const count = 12; // 12 lines per axis
        const range = 40;
        const spacing = 4;

        // Define grid extent
        const min = -count * spacing / 2;
        const max = count * spacing / 2;

        // 1. X-axis lines (Red) - parallel to Width
        for (let j = 0; j < count; j++) {
            for (let k = 0; k < count; k++) {
                const y = min + j * spacing;
                const z = min + k * spacing;
                data.push({
                    points: [new THREE.Vector3(min, y, z), new THREE.Vector3(max, y, z)],
                    color: '#ff4d4d',
                    opacity: 0.15
                });
            }
        }

        // 2. Y-axis lines (Yellow) - parallel to Depth
        for (let i = 0; i < count; i++) {
            for (let k = 0; k < count; k++) {
                const x = min + i * spacing;
                const z = min + k * spacing;
                data.push({
                    points: [new THREE.Vector3(x, min, z), new THREE.Vector3(x, max, z)],
                    color: '#facc15',
                    opacity: 0.15
                });
            }
        }

        // 3. Z-axis lines (Blue) - parallel to Height
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = min + i * spacing;
                const y = min + j * spacing;
                data.push({
                    points: [new THREE.Vector3(x, y, min), new THREE.Vector3(x, y, max)],
                    color: '#3b82f6',
                    opacity: 0.15
                });
            }
        }

        return data;
    }, []);

    return (
        <>
            <color attach="background" args={['#F0F2F5']} />
            <fog attach="fog" args={['#F0F2F5', 10, 60]} />

            {lines.map((item, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                item.points[0].x, item.points[0].y, item.points[0].z,
                                item.points[1].x, item.points[1].y, item.points[1].z
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color={item.color} transparent opacity={item.opacity} linewidth={1} />
                </line>
            ))}
        </>
    );
};

export default Environment;
