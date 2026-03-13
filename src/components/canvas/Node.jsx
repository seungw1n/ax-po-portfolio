import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import useStore from '../../store/useStore';
import { translations } from '../../data/translations';
import { easing } from 'maath';
import * as THREE from 'three';

const Node = ({ id, label: _label, position, onNavigate }) => {
    const groupRef = useRef();
    const textRef = useRef();

    const activeNode = useStore((state) => state.activeNode);
    const hoveredNode = useStore((state) => state.hoveredNode);
    const setHovered = useStore((state) => state.setHoveredNode);

    const isHovered = hoveredNode === id;
    const isActive = activeNode === id;
    const isOtherActive = activeNode && activeNode !== id;
    const isOtherHovered = hoveredNode && hoveredNode !== id;

    const visual = useMemo(() => ({ expansion: 1, turbulence: 0, trailRotation: 0 }), []);

    // 1. Generate Organic Random Points within a sphere
    const pointCount = 200; // Fewer points = more spacing
    const pointsData = useMemo(() => {
        const coords = new Float32Array(pointCount * 3);
        const velocities = new Float32Array(pointCount * 3);
        const radius = 2.7; // 100% larger than 1.35
        for (let i = 0; i < pointCount; i++) {
            // Random point in sphere using spherical coordinates
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.pow(Math.random(), 0.5); // Density favor towards surface

            coords[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            coords[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            coords[i * 3 + 2] = r * Math.cos(theta);

            // Initial jitter velocities
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
        return { coords, velocities };
    }, []);

    const geometryRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;

        const targetExpansion = isHovered ? 1.2 : 1.0;
        const targetTurbulence = isHovered ? 0.08 : 0.02;

        easing.damp(visual, 'expansion', targetExpansion, 0.2, delta);
        easing.damp(visual, 'turbulence', targetTurbulence, 0.5, delta);

        groupRef.current.scale.setScalar(visual.expansion);

        // Base Rotation
        visual.trailRotation += delta * (0.08 + visual.turbulence);
        groupRef.current.rotation.y = visual.trailRotation;

        // 2. Animate Point Jitter (Organic Movement)
        if (geometryRef.current) {
            const positions = geometryRef.current.attributes.position.array;
            for (let i = 0; i < pointCount; i++) {
                // Subtle swarming movement
                positions[i * 3] += Math.sin(t * 2 + i) * 0.002 * (visual.turbulence * 10);
                positions[i * 3 + 1] += Math.cos(t * 1.5 + i) * 0.002 * (visual.turbulence * 10);
                positions[i * 3 + 2] += Math.sin(t * 1.8 + i) * 0.002 * (visual.turbulence * 10);

                // Keep within bounds
                const dist = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2);
                if (dist > 0.8) {
                    positions[i * 3] *= 0.95;
                    positions[i * 3 + 1] *= 0.95;
                    positions[i * 3 + 2] *= 0.95;
                }
            }
            geometryRef.current.attributes.position.needsUpdate = true;
        }

        // Global opacity handling
        const targetOpacity = isOtherActive ? 0.15 : isOtherHovered ? 0.3 : 1;
        if (groupRef.current) {
            groupRef.current.traverse((child) => {
                if (child.material && child.material.transparent) {
                    easing.damp(child.material, 'opacity', targetOpacity, 0.3, delta);
                }
            });
        }
        if (textRef.current) {
            easing.damp(textRef.current, 'fillOpacity', targetOpacity, 0.3, delta);
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        if (onNavigate) onNavigate(isActive ? '/' : '/' + id);
    };

    // Complex Technical Construction Frame - Reverted to Cube/Box Grid on Hover
    const ConstructionFrame = ({ opacityScale = 1 }) => {
        const frameOpacity = useRef(0);
        const frameRef = useRef();

        useFrame((state, delta) => {
            const targetOpacity = (isHovered || isActive ? 0.35 : 0) * opacityScale;
            easing.damp(frameOpacity, 'current', targetOpacity, 0.2, delta);
            if (frameRef.current) {
                frameRef.current.traverse(child => {
                    if (child.material) child.material.opacity = frameOpacity.current;
                });
            }
        });

        const s = 0.65; // Cube size
        const ext = 0.25; // Extended edges length

        const lines = useMemo(() => [
            [[-s - ext, -s, -s], [s + ext, -s, -s]], [[-s - ext, -s, s], [s + ext, -s, s]],
            [[-s - ext, s, -s], [s + ext, s, -s]], [[-s - ext, s, s], [s + ext, s, s]],
            [[-s, -s - ext, -s], [-s, s + ext, -s]], [[s, -s - ext, -s], [s, s + ext, -s]],
            [[-s, -s - ext, s], [-s, s + ext, s]], [[s, -s - ext, s], [s, s + ext, s]],
            [[-s, -s, -s - ext], [-s, -s, s + ext]], [[s, -s, -s - ext], [s, -s, s + ext]],
            [[-s, s, -s - ext], [-s, s, s + ext]], [[s, s, -s - ext], [s, s, s + ext]],
            [[-s, -s, -s], [s, s, s]], [[-s, s, s], [s, -s, -s]],
            [[-s, s, -s], [s, -s, s]], [[-s, -s, s], [s, s, -s]],
        ], [s, ext]);

        return (
            <group ref={frameRef}>
                {lines.map((pts, i) => (
                    <line key={i}>
                        <bufferGeometry attach="geometry">
                            <bufferAttribute
                                attach="attributes-position"
                                count={2}
                                array={new Float32Array([...pts[0], ...pts[1]])}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial attach="material" color="#000000" transparent opacity={0} linewidth={1} />
                    </line>
                ))}
            </group>
        );
    };

    const dotTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Draw a circular dot with a subtle radial gradient to look more "spherical"
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.8, '#ffffff');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Soft edge for "sphere" look

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
    }, []);

    const language = useStore((state) => state.language);
    const nodeLabel = useMemo(() => translations[language]?.nodes[id] || _label, [language, id, _label]);

    return (
        <group position={position}>
            {/* 3. Text Label Above Node */}
            <Billboard
                follow={true}
                lockX={false}
                lockY={false}
                lockZ={false}
                position={[0, 2.2, 0]}
            >
                <Text
                    ref={textRef}
                    fontSize={1.02}
                    color="#444444"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#ffffff"
                    outlineOpacity={0.5}
                >
                    {nodeLabel}
                </Text>
            </Billboard>

            {/* Interaction Hit Box */}
            <mesh
                onClick={handleClick}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(id); }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(null); }}
                visible={false}
            >
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshBasicMaterial />
            </mesh>

            {/* Rotating Core - Motion Trail Removed */}
            <group ref={groupRef}>
                <group>
                    <points>
                        <bufferGeometry ref={geometryRef}>
                            <bufferAttribute
                                attach="attributes-position"
                                count={pointCount}
                                array={pointsData.coords}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <pointsMaterial
                            size={0.124}
                            color="#000000"
                            map={dotTexture}
                            sizeAttenuation
                            transparent
                            alphaTest={0.1}
                            opacity={0.6}
                        />
                    </points>

                    <ConstructionFrame opacityScale={1} />
                </group>
            </group>
        </group>
    );
};

export default Node;
