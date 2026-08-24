import { SECTIONS } from '../store/useStore';

/**
 * The point-cloud shape the home scene morphs through while scrolling.
 * Shared so the drafting guides and the floor shadow are derived from the very
 * same points the subject is drawn from.
 */

export const SUBJECT_POSITION = [2.5, 0, 0];
export const POINT_COUNT = 250;

export const sectionConfigs = {
    'about-me': { radius: 2.5, rotSpeed: 0.06, shape: 'sphere' },
    projects: { radius: 2.8, rotSpeed: 0.1, shape: 'cube' },
    resume: { radius: 2.2, rotSpeed: 0.04, shape: 'ring' },
    study: { radius: 2.6, rotSpeed: 0.08, shape: 'spiral' },
    peer: { radius: 2.4, rotSpeed: 0.07, shape: 'double' },
    library: { radius: 2.0, rotSpeed: 0.05, shape: 'column' },
    articles: { radius: 3.0, rotSpeed: 0.09, shape: 'cloud' },
};

/** Live rotation of the subject, so its shadow can spin with it. */
export const subjectSpin = { y: 0 };

export function generateShape(shape, radius, count) {
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

let targetCache = null;

/** Point positions per section, generated once and shared. */
export function getSectionTargets() {
    if (!targetCache) {
        targetCache = {};
        SECTIONS.forEach((id) => {
            const cfg = sectionConfigs[id];
            targetCache[id] = generateShape(cfg.shape, cfg.radius, POINT_COUNT);
        });
    }
    return targetCache;
}

/**
 * Half-size of the square guide cage for a section: the smallest cube that
 * contains the point cloud, padded and snapped to a quarter grid unit so the
 * guide sits on the same modular grid as the floor.
 */
export function getGuideHalfSize(sectionId) {
    const targets = getSectionTargets()[sectionId];
    let ext = 0;
    for (let i = 0; i < targets.length; i += 3) {
        ext = Math.max(ext, Math.abs(targets[i]), Math.abs(targets[i + 1]), Math.abs(targets[i + 2]));
    }
    return Math.round(ext * 1.16 * 4) / 4;
}

/**
 * Outline of the cloud projected straight down onto the floor - the shadow.
 * Sampled as a radius per angular bin, then smoothed into a closed polygon.
 */
export function getShadowOutline(sectionId, bins = 44) {
    const half = getGuideHalfSize(sectionId);
    const targets = getSectionTargets()[sectionId];
    const radii = new Array(bins).fill(0);

    for (let i = 0; i < targets.length; i += 3) {
        const x = targets[i];
        const z = targets[i + 2];
        const r = Math.hypot(x, z);
        let a = Math.atan2(z, x);
        if (a < 0) a += Math.PI * 2;
        const b = Math.min(bins - 1, Math.floor((a / (Math.PI * 2)) * bins));
        if (r > radii[b]) radii[b] = r;
    }

    // Empty bins borrow from their neighbours, then the outline is relaxed so
    // it reads as a cast shadow rather than a spiky histogram.
    for (let pass = 0; pass < 2; pass++) {
        const src = radii.slice();
        for (let i = 0; i < bins; i++) {
            if (src[i] > 0) continue;
            radii[i] = Math.max(src[(i - 1 + bins) % bins], src[(i + 1) % bins]) * 0.75;
        }
    }
    // Pulled part way toward the mean radius: the sampling is noisy, and a cast
    // shadow should keep the silhouette's character without its jitter.
    const mean = radii.reduce((a, b) => a + b, 0) / bins;
    for (let i = 0; i < bins; i++) {
        radii[i] = radii[i] * 0.6 + mean * 0.4;
    }
    for (let pass = 0; pass < 4; pass++) {
        const src = radii.slice();
        for (let i = 0; i < bins; i++) {
            radii[i] = (src[(i - 1 + bins) % bins] + 2 * src[i] + src[(i + 1) % bins]) / 4;
        }
    }

    return radii.map((r, i) => {
        const a = ((i + 0.5) / bins) * Math.PI * 2;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        // Never let the projection escape the guide's footprint square.
        const limit = (half * 0.96) / Math.max(Math.abs(cos), Math.abs(sin));
        const rr = Math.min(limit, Math.max(0.7, r * 1.04));
        return [cos * rr, sin * rr];
    });
}
