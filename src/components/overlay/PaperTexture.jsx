import React from 'react';

/**
 * Aged-parchment treatment laid over the 3D drafting sheet.
 * Sits between the canvas and the UI layer, so it tints the grid without
 * ever dulling the interface. Purely decorative: no pointer events.
 */

const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PaperTexture = () => (
    <div className="absolute inset-0 pointer-events-none select-none">
        {/* paper fibre */}
        <div
            className="absolute inset-0"
            style={{ backgroundImage: GRAIN, opacity: 0.1, mixBlendMode: 'multiply' }}
        />

        {/* uneven aging: warm blooms and darkened edges */}
        <div
            className="absolute inset-0"
            style={{
                mixBlendMode: 'multiply',
                background: [
                    'radial-gradient(ellipse 70% 60% at 22% 18%, rgba(196,168,116,0.10), transparent 65%)',
                    'radial-gradient(ellipse 55% 50% at 82% 72%, rgba(186,154,102,0.09), transparent 60%)',
                    'radial-gradient(ellipse 120% 110% at 50% 50%, transparent 48%, rgba(120,95,58,0.16) 100%)',
                ].join(','),
            }}
        />

        {/* binder holes along the bottom edge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-32">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="block w-3.5 h-3.5 rounded-full"
                    style={{
                        background: 'rgba(78,64,46,0.16)',
                        boxShadow:
                            'inset 0 1px 3px rgba(59,49,37,0.42), 0 1px 0 rgba(255,255,255,0.55)',
                    }}
                />
            ))}
        </div>
    </div>
);

export default PaperTexture;
