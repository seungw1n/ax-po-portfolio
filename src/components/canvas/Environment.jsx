import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { createSheet, toGeometries, FLOOR_Y } from '../../utils/sketch';

/**
 * Home environment: an architectural drafting sheet.
 *
 * Instead of a symmetric cylinder, the space is defined by a one-point
 * perspective volume: a receding floor grid, a faint ceiling grid and a
 * wireframe stage box, all hand-inked. Anything belonging to the subject -
 * its guide cage and its shadow - is drawn by SubjectFrame, on this grid.
 */

const PAPER = '#F5F3F0';
const INK = '#000000';

// --- tones (line weight, expressed as material opacity) --------------------
const T_MAIN = 0.34;   // stage edges
const T_GRID = 0.19;   // major grid
const T_FINE = 0.11;   // minor grid
const T_FAINT = 0.065; // back wall
const T_GHOST = 0.04;  // ceiling - present, but never competing with the UI

const CEIL_Y = 8.5;
const Z_NEAR = 10;
const Z_FAR = -58;
const X_HALF = 30;

const BOX = { x: 13, zFront: 8, zBack: -28 };

function buildSheet() {
    const s = createSheet();
    const V = (x, y, z) => new THREE.Vector3(x, y, z);

    // --- floor: the main perspective plane ---------------------------------
    // Lines running into depth converge on the vanishing point at eye level.
    for (let x = -X_HALF; x <= X_HALF; x += 5) {
        const major = Math.abs(x) % 15 === 0;
        s.line(major ? T_GRID : T_FINE, V(x, FLOOR_Y, Z_NEAR), V(x, FLOOR_Y, Z_FAR), {
            passes: major ? 2 : 1,
            jitter: 0.07,
            overshoot: major ? 0.35 : 0,
        });
    }
    // Cross rows: spacing tightens with distance, the classic depth cue.
    for (let z = Z_NEAR; z >= Z_FAR; z -= 5) {
        const major = z % 15 === 0;
        s.line(major ? T_GRID : T_FINE, V(-X_HALF, FLOOR_Y, z), V(X_HALF, FLOOR_Y, z), {
            passes: major ? 2 : 1,
            jitter: 0.07,
            overshoot: major ? 0.35 : 0,
        });
    }

    // --- floor: fine sub-grid, near field only ------------------------------
    for (let x = -15; x <= 15; x += 2.5) {
        if (Math.abs(x) % 5 === 0) continue;
        s.line(T_FAINT, V(x, FLOOR_Y, Z_NEAR), V(x, FLOOR_Y, -18), { passes: 1, jitter: 0.06 });
    }
    for (let z = Z_NEAR; z >= -18; z -= 2.5) {
        if (z % 5 === 0) continue;
        s.line(T_FAINT, V(-15, FLOOR_Y, z), V(15, FLOOR_Y, z), { passes: 1, jitter: 0.06 });
    }

    // --- ceiling: same vanishing point, seen from below ---------------------
    for (let x = -X_HALF; x <= X_HALF; x += 10) {
        s.line(T_GHOST, V(x, CEIL_Y, -4), V(x, CEIL_Y, Z_FAR), { passes: 1, jitter: 0.05 });
    }
    for (let z = -4; z >= Z_FAR; z -= 10) {
        s.line(T_GHOST, V(-X_HALF, CEIL_Y, z), V(X_HALF, CEIL_Y, z), { passes: 1, jitter: 0.05 });
    }

    // --- the stage volume ---------------------------------------------------
    const bx = BOX.x;
    const corners = [
        [-bx, BOX.zFront], [bx, BOX.zFront], [bx, BOX.zBack], [-bx, BOX.zBack],
    ];

    // Uprights are inked strongly at the base and lifted off toward the top, so
    // the volume stays open rather than closing into a corridor.
    corners.forEach(([x, z]) => {
        const knee = FLOOR_Y + (CEIL_Y - FLOOR_Y) * 0.55;
        s.line(T_MAIN, V(x, FLOOR_Y, z), V(x, knee, z), { passes: 2, jitter: 0.075, overshoot: 0.5 });
        s.line(T_FINE, V(x, knee, z), V(x, CEIL_Y, z), { passes: 1, jitter: 0.075, overshoot: 0.5 });
    });
    for (let i = 0; i < 4; i++) {
        const [x1, z1] = corners[i];
        const [x2, z2] = corners[(i + 1) % 4];
        s.line(T_MAIN, V(x1, FLOOR_Y, z1), V(x2, FLOOR_Y, z2), { passes: 2, jitter: 0.075, overshoot: 0.5 });
        s.line(T_GHOST, V(x1, CEIL_Y, z1), V(x2, CEIL_Y, z2), { passes: 1, jitter: 0.075, overshoot: 0.5 });
    }

    // Side walls: verticals stepping into depth, reinforcing the recession.
    for (let z = BOX.zFront - 6; z > BOX.zBack; z -= 6) {
        [-bx, bx].forEach((x) => {
            s.line(T_FINE, V(x, FLOOR_Y, z), V(x, FLOOR_Y + 7, z), { passes: 1, jitter: 0.07 });
            s.line(T_GHOST, V(x, FLOOR_Y + 7, z), V(x, CEIL_Y, z), { passes: 1, jitter: 0.07 });
        });
    }
    // Back face grid.
    for (let x = -bx + 6.5; x < bx; x += 6.5) {
        s.line(T_FAINT, V(x, FLOOR_Y, BOX.zBack), V(x, CEIL_Y, BOX.zBack), { passes: 1, jitter: 0.07 });
    }
    for (let y = FLOOR_Y + 3.7; y < CEIL_Y; y += 3.7) {
        s.line(T_FAINT, V(-bx, y, BOX.zBack), V(bx, y, BOX.zBack), { passes: 1, jitter: 0.07 });
    }

    return s.layers;
}

const Environment = () => {
    const layers = useMemo(() => toGeometries(buildSheet()), []);

    useEffect(() => () => layers.forEach(({ geometry }) => geometry.dispose()), [layers]);

    return (
        <>
            <color attach="background" args={[PAPER]} />
            <fog attach="fog" args={[PAPER, 26, 78]} />

            <group>
                {layers.map(({ tone, geometry }, i) => (
                    <lineSegments key={i} geometry={geometry} frustumCulled={false}>
                        <lineBasicMaterial
                            attach="material"
                            color={INK}
                            transparent
                            opacity={tone}
                            depthWrite={false}
                        />
                    </lineSegments>
                ))}
            </group>
        </>
    );
};

export default Environment;
