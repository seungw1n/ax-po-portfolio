import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Home environment: an architectural / mathematical drafting sheet.
 *
 * Instead of a symmetric cylinder, the space is defined by a one-point
 * perspective volume drawn on aged paper: a receding floor grid, a faint
 * ceiling grid, a wireframe "stage" box and plan-view construction circles
 * under the subject. Every line is redrawn as a hand-inked stroke
 * (wobble + double pass + overshoot) so the grid reads as a sketch rather
 * than a computer-perfect lattice.
 */

// --- paper & ink -----------------------------------------------------------
const PAPER = '#E9E0CB';
const INK = '#3B3125';

// --- tones (line weight, expressed as material opacity) --------------------
const T_MAIN = 0.62;   // construction edges, datum, shadow outline
const T_GRID = 0.34;   // major grid
const T_FINE = 0.20;   // minor grid
const T_FAINT = 0.11;  // back wall, hatching
const T_GHOST = 0.06;  // ceiling - present, but never competing with the UI

// --- stage volume ----------------------------------------------------------
const CAM_Z = 20;      // matches the Scene camera; used for screen-constant wobble
const FLOOR_Y = -6.2;
const CEIL_Y = 8.5;
const Z_NEAR = 10;
const Z_FAR = -58;
const X_HALF = 30;

const BOX = { x: 13, zFront: 8, zBack: -28 };
const SUBJECT = new THREE.Vector3(2.5, 0, 0); // SinglePlanet group position

// --- deterministic value noise --------------------------------------------
const hash = (n) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
    return s - Math.floor(s);
};

const vnoise = (x, seed) => {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    const a = hash(i + seed) - 0.5;
    const b = hash(i + 1 + seed) - 0.5;
    return a + (b - a) * u;
};

// Depth factor: keeps the wobble's amplitude and frequency roughly constant on
// screen, as if it belonged to the paper rather than to the 3D space.
const depthAt = (z) => Math.max(4, CAM_Z - z) / 20;

/** Walk a polyline and emit points spaced by their apparent (screen) size. */
function resample(pts, closed) {
    const src = closed ? [...pts, pts[0]] : pts;
    const out = [src[0].clone()];
    for (let i = 0; i + 1 < src.length; i++) {
        const a = src[i];
        const b = src[i + 1];
        const len = a.distanceTo(b);
        if (len < 1e-6) continue;
        const step = Math.max(1.6, 2.6 * depthAt((a.z + b.z) / 2));
        const n = Math.max(1, Math.round(len / step));
        for (let k = 1; k <= n; k++) out.push(a.clone().lerp(b, k / n));
    }
    if (closed) out.pop(); // duplicate of the first point
    return out;
}

/**
 * Ink a polyline into `verts` as a run of line segments.
 * Each pass is an independent hand stroke, so two passes read as a pencil line
 * gone over twice - the core of the sketch look.
 */
function inkPath(verts, pts, ctx, opts = {}) {
    const { passes = 2, jitter = 0.05, overshoot = 0, closed = false } = opts;
    if (pts.length < 2) return;

    const samples = resample(pts, closed);
    if (samples.length < 2) return;

    // Arc length remapped to apparent length, so the wobble keeps the same
    // rhythm whether the line is near the camera or deep inside the volume.
    const params = [0];
    for (let i = 1; i < samples.length; i++) {
        const d = samples[i].distanceTo(samples[i - 1]);
        params.push(params[i - 1] + d / (3.0 * depthAt(samples[i].z)));
    }

    for (let p = 0; p < passes; p++) {
        const seed = ctx.seed + p * 3571;
        const drift = p === 0 ? 0 : (hash(ctx.seed + p * 17) - 0.5) * 0.06;

        const stroke = samples.map((v, i) => {
            const depth = depthAt(v.z);
            const amp = jitter * depth;
            const nx = vnoise(params[i], seed) * 2 + drift;
            const ny = vnoise(params[i] + 57.3, seed + 91) * 2 + drift;
            return new THREE.Vector3(v.x + nx * amp, v.y + ny * amp, v.z);
        });

        if (!closed && overshoot > 0) {
            const first = stroke[0];
            const head = first.clone().sub(stroke[1]).normalize()
                .multiplyScalar(overshoot * depthAt(first.z) * (0.4 + hash(seed) * 0.9));
            const last = stroke[stroke.length - 1];
            const tail = last.clone().sub(stroke[stroke.length - 2]).normalize()
                .multiplyScalar(overshoot * depthAt(last.z) * (0.4 + hash(seed + 5) * 0.9));
            stroke.unshift(first.clone().add(head));
            stroke.push(last.clone().add(tail));
        }

        for (let i = 0; i + 1 < stroke.length; i++) {
            const a = stroke[i];
            const b = stroke[i + 1];
            verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
        if (closed) {
            const a = stroke[stroke.length - 1];
            const b = stroke[0];
            verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
    }

    ctx.seed += 131;
}

/** Drafting sheet: collects strokes into one buffer per tone. */
function createSheet() {
    const layers = new Map();
    const ctx = { seed: 7 };

    const draw = (tone, pts, opts) => {
        const key = tone.toFixed(3);
        if (!layers.has(key)) layers.set(key, { tone, verts: [] });
        inkPath(layers.get(key).verts, pts, ctx, opts);
    };

    return {
        layers,
        line: (tone, a, b, opts) => draw(tone, [a, b], opts),
        path: (tone, pts, opts) => draw(tone, pts, opts),
        /** Broken (dashed) construction line. */
        dashed: (tone, a, b, dash, gap, opts) => {
            const total = a.distanceTo(b);
            const stride = dash + gap;
            for (let d = 0; d < total; d += stride) {
                const t0 = d / total;
                const t1 = Math.min(1, (d + dash) / total);
                if (t1 - t0 < 1e-3) continue;
                draw(tone, [a.clone().lerp(b, t0), a.clone().lerp(b, t1)], opts);
            }
        },
        /** Circle lying flat on the y-plane of `center`. */
        circle: (tone, center, radius, segments, opts) => {
            const pts = [];
            for (let i = 0; i < segments; i++) {
                const ang = (i / segments) * Math.PI * 2;
                pts.push(new THREE.Vector3(
                    center.x + Math.cos(ang) * radius,
                    center.y,
                    center.z + Math.sin(ang) * radius
                ));
            }
            draw(tone, pts, { closed: true, ...opts });
        },
    };
}

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

    // --- the stage volume: 12 edges of the wireframe box --------------------
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

    // --- plan-view construction under the subject ---------------------------
    const plan = V(SUBJECT.x, FLOOR_Y, SUBJECT.z);
    s.circle(T_GRID, plan, 8, 56, { passes: 2, jitter: 0.05 });
    s.circle(T_FINE, plan, 5.5, 48, { passes: 1, jitter: 0.05 });
    s.circle(T_FINE, plan, 3.2, 40, { passes: 1, jitter: 0.05 });

    for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const dir = V(Math.cos(ang), 0, Math.sin(ang));
        s.line(T_FAINT,
            plan.clone().add(dir.clone().multiplyScalar(3.2)),
            plan.clone().add(dir.clone().multiplyScalar(8)),
            { passes: 1, jitter: 0.06 });
        // graduation ticks just outside the outer circle
        s.line(T_FINE,
            plan.clone().add(dir.clone().multiplyScalar(8)),
            plan.clone().add(dir.clone().multiplyScalar(8.7)),
            { passes: 1, jitter: 0.035 });
    }

    // --- projected shadow of the subject, hatched ---------------------------
    const shadowR = 2.7;
    s.circle(T_MAIN, plan, shadowR, 40, { passes: 2, jitter: 0.085 });
    const u = V(Math.cos(Math.PI / 4), 0, Math.sin(Math.PI / 4));
    const w = V(-Math.sin(Math.PI / 4), 0, Math.cos(Math.PI / 4));
    for (let d = -shadowR + 0.3; d < shadowR; d += 0.38) {
        const half = Math.sqrt(Math.max(0, shadowR * shadowR - d * d));
        const mid = plan.clone().add(u.clone().multiplyScalar(d));
        s.line(T_FAINT,
            mid.clone().add(w.clone().multiplyScalar(-half)),
            mid.clone().add(w.clone().multiplyScalar(half)),
            { passes: 1, jitter: 0.03 });
    }

    // --- datum: broken vertical from the subject down to its plan -----------
    s.dashed(T_GRID, V(SUBJECT.x, SUBJECT.y - 0.4, SUBJECT.z), plan, 0.55, 0.45,
        { passes: 1, jitter: 0.03 });
    // elevation graduations on the datum
    for (let y = FLOOR_Y + 1; y < SUBJECT.y - 0.6; y += 1) {
        const long = Math.round(y) % 3 === 0;
        s.line(long ? T_GRID : T_FAINT,
            V(SUBJECT.x - (long ? 0.55 : 0.28), y, SUBJECT.z),
            V(SUBJECT.x + (long ? 0.55 : 0.28), y, SUBJECT.z),
            { passes: 1, jitter: 0.03 });
    }

    return s.layers;
}

const Environment = () => {
    const layers = useMemo(() => {
        return Array.from(buildSheet().values()).map(({ tone, verts }) => {
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
            return { tone, geometry };
        });
    }, []);

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
