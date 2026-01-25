import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath';
import useStore from '../../store/useStore';
import { getNodesLayout } from '../../utils/layout';
import { useMemo } from 'react';

const CameraController = () => {
    const { camera, pointer } = useThree();
    const activeNode = useStore((state) => state.activeNode);

    // Pre-calculate node positions lookup
    const nodePositions = useMemo(() => {
        const layout = getNodesLayout();
        const map = {};
        layout.forEach(n => {
            map[n.id] = new THREE.Vector3(...n.position);
        });
        return map;
    }, []);

    useFrame((state, delta) => {
        // PARALLAX
        // Slight sway based on pointer
        const parallaxX = (pointer.x * 0.5); // Amplitude
        const parallaxY = (pointer.y * 0.5);

        let targetPos = new THREE.Vector3(0, 0, 10); // Default home
        let targetLookAt = new THREE.Vector3(0, 0, 0);

        if (activeNode && nodePositions[activeNode]) {
            const nodePos = nodePositions[activeNode];
            // Zoom in to node.
            // We want to be in front of the node.
            // Direction from center to node:
            const dir = nodePos.clone().normalize();

            // Position camera 'orbit' outwards from node
            targetPos = nodePos.clone().add(dir.multiplyScalar(3));
            targetLookAt = nodePos.clone();
        } else {
            // Apply parallax only when in "Orbit" mode (no active node)
            targetPos.x += parallaxX;
            targetPos.y += parallaxY;
        }

        // Smooth transition
        easing.damp3(camera.position, targetPos, 0.4, delta);

        // Smooth LookAt
        // We can't directly damp lookAt vector, we have to damp quaternion or use a dummy target
        // Easier approach: damp the dummy target point, then lookAt that point.
        // However, THREE.Camera doesn't have a 'target' property we can tween naturally without controls.
        // So we manually calculate rotation or use a proxy object.

        // Quick hack: Use a persistent vector for lookAt target
        if (!state.cameraTarget) state.cameraTarget = new THREE.Vector3();
        easing.damp3(state.cameraTarget, targetLookAt, 0.4, delta);
        camera.lookAt(state.cameraTarget);
    });

    return null;
};

export default CameraController;
