import * as THREE from 'three';

/**
 * Hand-inked line drawing for the 3D scene.
 *
 * Every line is redrawn as a stroke: value-noise wobble, optional second pass
 * (a line gone over twice) and corner overshoot. Amplitude and frequency are
 * corrected for camera distance, so the wobble reads as a property of the
 * paper rather than of the 3D space.
 */

export const CAM_Z = 20;   // matches the Scene camera
export const FLOOR_Y = -6.2;

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

export const depthAt = (z) => Math.max(4, CAM_Z - z) / 20;

/** Walk a polyline and emit points spaced by their apparent (screen) size. */
function resample(pts, closed) {
    const src = closed ? [...pts, pts[0]] : pts;
    const out = [src[0].clone()];
    for (let i = 0; i + 1 < src.length; i++) {
        const a = src[i];
        const b = src[i + 1];
        const len = a.distanceTo(b);
        if (len < 1e-6) continue;
        const step = Math.max(1.2, 2.4 * depthAt((a.z + b.z) / 2));
        const n = Math.max(1, Math.round(len / step));
        for (let k = 1; k <= n; k++) out.push(a.clone().lerp(b, k / n));
    }
    if (closed) out.pop(); // duplicate of the first point
    return out;
}

function inkPath(verts, pts, ctx, opts = {}) {
    const { passes = 2, jitter = 0.05, overshoot = 0, closed = false } = opts;
    if (pts.length < 2) return;

    const samples = resample(pts, closed);
    if (samples.length < 2) return;

    const params = [0];
    for (let i = 1; i < samples.length; i++) {
        const d = samples[i].distanceTo(samples[i - 1]);
        params.push(params[i - 1] + d / (3.0 * depthAt(samples[i].z)));
    }

    for (let p = 0; p < passes; p++) {
        const seed = ctx.seed + p * 3571;
        const drift = p === 0 ? 0 : (hash(ctx.seed + p * 17) - 0.5) * 0.06;

        const stroke = samples.map((v, i) => {
            const amp = jitter * depthAt(v.z);
            const nx = vnoise(params[i], seed) * 2 + drift;
            const ny = vnoise(params[i] + 57.3, seed + 91) * 2 + drift;
            return new THREE.Vector3(v.x + nx * amp, v.y + ny * amp, v.z);
        });

        if (!closed && overshoot > 0 && stroke.length >= 2) {
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

/** A drafting sheet: collects strokes into one vertex buffer per tone. */
export function createSheet() {
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

/** Turn a sheet's tone layers into renderable geometries. */
export function toGeometries(layers) {
    return Array.from(layers.values()).map(({ tone, verts }) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
        return { tone, geometry };
    });
}

const cross2 = (ax, az, bx, bz) => ax * bz - az * bx;

/**
 * Fill a closed 2D polygon (array of [x, z]) with parallel hatch chords.
 * Returns segments as [[x1, z1], [x2, z2]] - the drafting way to shade a face.
 */
export function scanlineHatch(poly, spacing, angle) {
    const ux = Math.cos(angle);
    const uz = Math.sin(angle);
    const vx = -uz;
    const vz = ux;

    let dMin = Infinity;
    let dMax = -Infinity;
    poly.forEach(([x, z]) => {
        const d = x * vx + z * vz;
        if (d < dMin) dMin = d;
        if (d > dMax) dMax = d;
    });

    const out = [];
    for (let d = dMin + spacing * 0.5; d < dMax; d += spacing) {
        const px = vx * d;
        const pz = vz * d;
        const hits = [];

        for (let i = 0; i < poly.length; i++) {
            const [ax, az] = poly[i];
            const [bx, bz] = poly[(i + 1) % poly.length];
            const ex = bx - ax;
            const ez = bz - az;
            const denom = cross2(ex, ez, ux, uz);
            if (Math.abs(denom) < 1e-9) continue;
            const s = cross2(px - ax, pz - az, ux, uz) / denom;
            if (s < 0 || s > 1) continue;
            const hx = ax + ex * s;
            const hz = az + ez * s;
            hits.push((hx - px) * ux + (hz - pz) * uz);
        }

        hits.sort((a, b) => a - b);
        for (let i = 0; i + 1 < hits.length; i += 2) {
            const t0 = hits[i];
            const t1 = hits[i + 1];
            if (t1 - t0 < 0.05) continue;
            out.push([
                [px + ux * t0, pz + uz * t0],
                [px + ux * t1, pz + uz * t1],
            ]);
        }
    }

    return out;
}
