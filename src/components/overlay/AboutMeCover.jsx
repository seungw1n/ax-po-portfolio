import React from 'react';
import { motion } from 'framer-motion';
import useStore, { SECTIONS } from '../../store/useStore';
import { translations } from '../../data/translations';
import AboutTimeline from './AboutTimeline';

const ease = [0.23, 1, 0.32, 1];

const sectionIndex = `${String(SECTIONS.indexOf('about-me') + 1).padStart(2, '0')} / ${String(SECTIONS.length).padStart(2, '0')}`;

const AboutMeCover = () => {
    const language = useStore((state) => state.language);
    const data = translations[language]?.modal?.['about-me'];

    if (!data) return null;

    const {
        kicker,
        greeting,
        name,
        tagline,
        intro,
        highlights = [],
        principlesLabel,
        principles = [],
        stackLabel,
        skills = [],
        meta = {},
    } = data;

    return (
        <div className="min-h-full w-full flex flex-col px-2 md:px-6">
            {/* Top kicker line */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-baseline justify-between text-[11px] tracking-[0.25em] uppercase text-black/50"
            >
                <span>{sectionIndex} — {kicker}</span>
                <span className="hidden md:inline">Portfolio · v1.0</span>
            </motion.div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                style={{ transformOrigin: 'left' }}
                className="mt-4 h-px w-full bg-black/15"
            />

            {/* Body grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mt-10 md:mt-14 flex-1">
                {/* Left: intro */}
                <div className="md:col-span-7 flex flex-col">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.15 }}
                        className="text-sm tracking-widest uppercase text-black/40 mb-4"
                    >
                        {greeting}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-black"
                    >
                        {name}
                        <span className="block mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-black/70">
                            {tagline}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.35 }}
                        className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-black/60"
                    >
                        {intro}
                    </motion.p>

                    {/* Impact numbers */}
                    {highlights.length > 0 && (
                        <motion.dl
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease, delay: 0.45 }}
                            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-black/10 py-6"
                        >
                            {highlights.map((item) => (
                                <div key={item.label}>
                                    <dt className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                                        {item.value}
                                    </dt>
                                    <dd className="mt-1 text-[11px] tracking-[0.15em] uppercase text-black/40 leading-relaxed">
                                        {item.label}
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>
                    )}

                    {/* Working principles */}
                    {principles.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease, delay: 0.6 }}
                            className="mt-auto pt-10"
                        >
                            <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-black/30">
                                <span className="block w-8 h-px bg-black/30" />
                                <span>{principlesLabel}</span>
                            </p>
                            <ul className="mt-4 space-y-2">
                                {principles.map((line) => (
                                    <li key={line} className="flex gap-3 text-sm md:text-[15px] leading-relaxed text-black/60">
                                        <span className="mt-[9px] block w-1 h-1 shrink-0 rounded-full bg-black/30" />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>

                {/* Right: stack panel */}
                <motion.aside
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.35 }}
                    className="md:col-span-5 border border-black/10 bg-white/60 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 text-[10px] tracking-[0.3em] uppercase text-black/50">
                        <span>{stackLabel}</span>
                        <span>{String(skills.length).padStart(2, '0')} groups</span>
                    </div>

                    <ul className="divide-y divide-black/10">
                        {skills.map((group, i) => (
                            <motion.li
                                key={group.category}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, ease, delay: 0.45 + i * 0.05 }}
                                className="px-5 py-4 grid grid-cols-12 gap-3 items-baseline hover:bg-black/[0.02] transition-colors"
                            >
                                <span className="col-span-4 text-[11px] tracking-[0.2em] uppercase text-black/40">
                                    {group.category}
                                </span>
                                <span className="col-span-8 text-sm md:text-[15px] text-black/80 leading-snug">
                                    {group.items.join(' · ')}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.aside>
            </div>

            {/* Timeline + synthesis */}
            <AboutTimeline />

            {/* Bottom meta strip */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
                className="mt-14 md:mt-20 h-px w-full bg-black/15"
            />

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.6 }}
                className="mt-4 mb-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.25em] uppercase text-black/50"
            >
                <span className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {meta.availability}
                </span>
                <span className="opacity-40">·</span>
                <span>{meta.location}</span>
                <span className="opacity-40">·</span>
                <a
                    href={`mailto:${meta.contact}`}
                    className="underline-offset-4 hover:underline text-black/80 normal-case tracking-normal"
                >
                    {meta.contact}
                </a>
            </motion.div>
        </div>
    );
};

export default AboutMeCover;
