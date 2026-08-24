import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useStore, { SECTIONS } from '../../store/useStore';
import { createSheet, toGeometries, scanlineHatch, FLOOR_Y } from '../../utils/sketch';
import {
    SUBJECT_POSITION,
    getGuideHalfSize,
    getShadowOutline,
    subjectSpin,
} from '../../utils/subjectShapes';

/**
 * Drafting guides around the shape the scroll builds up.
 *
 * A square guide cage is drawn around the subject, axis-aligned to the floor
 * grid and extended by construction lines that run along it, so the cage reads
 * as sitting inside the same perspective space. Straight below, the cloud is
 * projected onto the floor as a hatched shadow that turns with the subject.
 */

const INK = '#000000';

const T_CAGE = 0.40;    // the square guide itself
const T_AUX = 0.17;     // drop lines, extensions, footprint
const T_SHADOW = 0.34;  // shadow outline
const T_HATCH = 0.13;  // shadow hatching

const V = (x, y, z) => new THREE.Vector3(x, y, z);

function buildCage(sectionId) {
    const s = createSheet();
    const h = getGuideHalfSize(sectionId);

    // Footprint corners, in grid order.
    const corners = [[-h, -h], [h, -h], [h, h], [-h, h]];

    // --- the square guide: 12 edges, corners deliberately overshot ---------
    corners.forEach(([x, z]) => {
        s.line(T_CAGE, V(x, -h, z), V(x, h, z), { passes: 1, jitter: 0.055, overshoot: 0.6 });
    });
    [-h, h].forEach((y) => {
        for (let i = 0; i < 4; i++) {
            const [x1, z1] = corners[i];
            const [x2, z2] = corners[(i + 1) % 4];
            s.line(T_CAGE, V(x1, y, z1), V(x2, y, z2), { passes: 1, jitter: 0.055, overshoot: 0.6 });
        }
    });

    // Corners re-inked as brackets, so the square reads even where the faces
    // cross the point cloud.
    const bracket = h * 0.3;
    [-h, h].forEach((y) => {
        corners.forEach(([x, z]) => {
            s.line(T_CAGE, V(x, y, z), V(x - Math.sign(x) * bracket, y, z), { passes: 2, jitter: 0.05 });
            s.line(T_CAGE, V(x, y, z), V(x, y, z - Math.sign(z) * bracket), { passes: 2, jitter: 0.05 });
            s.line(T_CAGE, V(x, y, z), V(x, y - Math.sign(y) * bracket, z), { passes: 2, jitter: 0.05 });
        });
    });

    // --- tied to the grid: footprint, drop lines and extensions -------------
    for (let i = 0; i < 4; i++) {
        const [x1, z1] = corners[i];
        const [x2, z2] = corners[(i + 1) % 4];
        s.line(T_AUX, V(x1, FLOOR_Y, z1), V(x2, FLOOR_Y, z2), { passes: 1, jitter: 0.04, overshoot: 0.4 });
    }
    corners.forEach(([x, z]) => {
        s.dashed(T_AUX, V(x, -h, z), V(x, FLOOR_Y, z), 0.42, 0.36, { passes: 1, jitter: 0.03 });
    });

    // The footprint edges carried on along the grid directions - this is what
    // shows the guide is aligned to the perspective grid and not floating.
    const reach = h + 5.5;
    [-h, h].forEach((z) => {
        s.dashed(T_AUX, V(-reach, FLOOR_Y, z), V(reach, FLOOR_Y, z), 0.7, 0.55, { passes: 1, jitter: 0.035 });
    });
    [-h, h].forEach((x) => {
        s.dashed(T_AUX, V(x, FLOOR_Y, -reach), V(x, FLOOR_Y, reach), 0.7, 0.55, { passes: 1, jitter: 0.035 });
    });

    // Elevation graduations up the front-left upright.
    for (let y = -h + 1; y < h; y += 1) {
        const long = Math.abs(y % 3) < 0.001;
        s.line(long ? T_CAGE : T_AUX,
            V(-h, y, h), V(-h - (long ? 0.5 : 0.26), y, h),
            { passes: 1, jitter: 0.028 });
    }

    return toGeometries(s.layers);
}

function buildShadow(sectionId) {
    const s = createSheet();
    const poly = getShadowOutline(sectionId);

    s.path(T_SHADOW, poly.map(([x, z]) => V(x, 0, z)), { closed: true, passes: 2, jitter: 0.055 });
    scanlineHatch(poly, 0.34, Math.PI / 4).forEach(([a, b]) => {
        s.line(T_HATCH, V(a[0], 0, a[1]), V(b[0], 0, b[1]), { passes: 1, jitter: 0.022 });
    });

    return toGeometries(s.layers);
}

/** One section's drawing, faded in or out as the scroll moves between sections. */
const Strokes = ({ layers, anim, index, spin, position }) => {
    const group = useRef();

    useFrame(() => {
        const g = group.current;
        if (!g) return;
        const { from, to, fade } = anim.current;

        let f = 0;
        if (index === to) f = fade;
        else if (index === from) f = 1 - fade;

        g.visible = f > 0.001;
        if (!g.visible) return;

        for (let i = 0; i < g.children.length; i++) {
            g.children[i].material.opacity = layers[i].tone * f;
        }
        if (spin) g.rotation.y = subjectSpin.y;
    });

    return (
        <group ref={group} position={position}>
            {layers.map(({ geometry }, i) => (
                <lineSegments key={i} geometry={geometry} frustumCulled={false}>
                    <lineBasicMaterial
                        attach="material"
                        color={INK}
                        transparent
                        opacity={0}
                        depthWrite={false}
                    />
                </lineSegments>
            ))}
        </group>
    );
};

const SubjectFrame = () => {
    const currentSection = useStore((state) => state.currentSection);

    const drawings = useMemo(
        () => SECTIONS.map((id) => ({ cage: buildCage(id), shadow: buildShadow(id) })),
        []
    );

    useEffect(() => () => drawings.forEach(({ cage, shadow }) => {
        [...cage, ...shadow].forEach(({ geometry }) => geometry.dispose());
    }), [drawings]);

    // Every section's drawing is mounted; the crossfade only decides which two
    // are visible. Kept in a ref so it is driven entirely from the render loop.
    const anim = useRef({ from: currentSection, to: currentSection, fade: 1 });

    useFrame((_, delta) => {
        const a = anim.current;
        if (a.to !== currentSection) {
            a.from = a.to;
            a.to = currentSection;
            a.fade = 0;
        }
        a.fade = Math.min(1, a.fade + delta * 2.2);
    });

    const floor = [0, FLOOR_Y, 0];

    return (
        <group position={SUBJECT_POSITION}>
            {drawings.map(({ cage, shadow }, i) => (
                <React.Fragment key={SECTIONS[i]}>
                    <Strokes layers={cage} anim={anim} index={i} />
                    <Strokes layers={shadow} anim={anim} index={i} spin position={floor} />
                </React.Fragment>
            ))}
        </group>
    );
};

export default SubjectFrame;
