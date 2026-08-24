import React from 'react';
import { motion } from 'framer-motion';
import useStore, { SECTIONS } from '../../store/useStore';
import { translations } from '../../data/translations';

const ease = [0.23, 1, 0.32, 1];

const sectionIndexLabel = (id) => {
    const index = SECTIONS.indexOf(id);
    return `${String(index + 1).padStart(2, '0')} / ${String(SECTIONS.length).padStart(2, '0')}`;
};

/* 좌측 라벨 + 우측 본문으로 구성된 이력서 블록 */
const Block = ({ label, index, children }) => (
    <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.25 + index * 0.06 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 border-t border-black/10 py-10 md:py-12"
    >
        <div className="md:col-span-3">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-black/40 md:sticky md:top-4">
                {label}
            </h2>
        </div>
        <div className="md:col-span-9">{children}</div>
    </motion.section>
);

const Bullets = ({ items = [] }) => (
    <ul className="space-y-2">
        {items.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-[15px] leading-relaxed text-black/65">
                <span className="mt-[9px] block w-1 h-1 shrink-0 rounded-full bg-black/30" />
                <span>{point}</span>
            </li>
        ))}
    </ul>
);

const ResumeContent = () => {
    const language = useStore((state) => state.language);
    const data = translations[language]?.modal?.resume;

    if (!data) return null;

    const {
        kicker,
        name,
        role,
        summary,
        updatedLabel,
        updated,
        labels = {},
        experience = [],
        projects = [],
        activities = [],
        education = [],
        skills = [],
        certifications = [],
        awards = [],
        meta = {},
    } = data;

    const links = [
        meta.portfolio && { label: 'Portfolio', href: meta.portfolio, text: 'notion.site' },
        meta.github && { label: 'GitHub', href: meta.github, text: 'github.com/seungw1n' },
        meta.contact && { label: 'Email', href: `mailto:${meta.contact}`, text: meta.contact },
    ].filter(Boolean);

    let blockIndex = 0;

    return (
        <div className="min-h-full w-full flex flex-col px-2 md:px-6 pb-6">
            {/* Top kicker line */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-baseline justify-between text-[11px] tracking-[0.25em] uppercase text-black/50"
            >
                <span>{sectionIndexLabel('resume')} — {kicker}</span>
                {updated && (
                    <span className="hidden md:inline">{updatedLabel} · {updated}</span>
                )}
            </motion.div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                style={{ transformOrigin: 'left' }}
                className="mt-4 h-px w-full bg-black/15"
            />

            {/* Masthead */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mt-10 md:mt-14">
                <div className="md:col-span-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.15 }}
                        className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-black"
                    >
                        {name}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.22 }}
                        className="mt-4 text-sm tracking-[0.2em] uppercase text-black/40"
                    >
                        {role}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.28 }}
                        className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-black/60"
                    >
                        {summary}
                    </motion.p>
                </div>

                <motion.aside
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.3 }}
                    className="md:col-span-4 md:pt-3"
                >
                    <dl className="divide-y divide-black/10 border-y border-black/10">
                        {meta.location && (
                            <div className="flex items-baseline gap-4 py-3">
                                <dt className="w-24 shrink-0 text-[10px] tracking-[0.25em] uppercase text-black/40">
                                    {labels.based}
                                </dt>
                                <dd className="text-sm text-black/70">{meta.location}</dd>
                            </div>
                        )}
                        {links.map((link) => (
                            <div key={link.label} className="flex items-baseline gap-4 py-3">
                                <dt className="w-24 shrink-0 text-[10px] tracking-[0.25em] uppercase text-black/40">
                                    {link.label}
                                </dt>
                                <dd className="text-sm text-black/70 break-all">
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel="noreferrer"
                                        className="underline-offset-4 hover:underline hover:text-black transition-colors"
                                    >
                                        {link.text}
                                    </a>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </motion.aside>
            </div>

            <div className="mt-12 md:mt-16">
                {/* 경력 */}
                {experience.length > 0 && (
                    <Block label={labels.experience} index={blockIndex++}>
                        <div className="space-y-12">
                            {experience.map((job) => (
                                <article key={`${job.company}-${job.period}`}>
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-black">
                                            {job.company}
                                            <span className="ml-3 text-sm md:text-base font-normal text-black/50">
                                                {job.role}
                                            </span>
                                        </h3>
                                        <span className="text-[11px] tracking-[0.2em] uppercase text-black/40">
                                            {job.period}
                                        </span>
                                    </div>

                                    {job.summary && (
                                        <p className="mt-3 max-w-2xl text-sm md:text-[15px] leading-relaxed text-black/60">
                                            {job.summary}
                                        </p>
                                    )}

                                    <div className="mt-6 space-y-6">
                                        {(job.groups || []).map((group) => (
                                            <div key={group.title}>
                                                <h4 className="text-sm md:text-[15px] font-semibold text-black/85">
                                                    {group.title}
                                                </h4>
                                                <div className="mt-2 pl-0 md:pl-1">
                                                    <Bullets items={group.points} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Block>
                )}

                {/* 프로젝트 */}
                {projects.length > 0 && (
                    <Block label={labels.projects} index={blockIndex++}>
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <article
                                    key={project.title}
                                    className="border border-black/10 bg-white/60 backdrop-blur-sm"
                                >
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4 border-b border-black/10">
                                        <h3 className="text-base md:text-lg font-semibold text-black">
                                            {project.title}
                                        </h3>
                                        <span className="text-[11px] tracking-[0.2em] uppercase text-black/40">
                                            {project.meta}
                                        </span>
                                    </div>
                                    <dl className="divide-y divide-black/10">
                                        {['problem', 'approach', 'impact', 'learn'].map((key) => (
                                            project[key] ? (
                                                <div key={key} className="px-5 py-4 grid grid-cols-12 gap-3 items-baseline">
                                                    <dt className="col-span-12 md:col-span-3 text-[11px] tracking-[0.2em] uppercase text-black/40">
                                                        {labels[key]}
                                                    </dt>
                                                    <dd className="col-span-12 md:col-span-9 text-sm md:text-[15px] leading-relaxed text-black/70">
                                                        {project[key]}
                                                    </dd>
                                                </div>
                                            ) : null
                                        ))}
                                    </dl>
                                </article>
                            ))}
                        </div>
                    </Block>
                )}

                {/* 활동 & 리더십 */}
                {activities.length > 0 && (
                    <Block label={labels.activities} index={blockIndex++}>
                        <div className="space-y-8">
                            {activities.map((activity) => (
                                <article key={activity.name}>
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <h3 className="text-base md:text-lg font-semibold text-black">
                                            {activity.name}
                                            <span className="ml-3 text-sm font-normal text-black/50">
                                                {activity.role}
                                            </span>
                                        </h3>
                                        <span className="text-[11px] tracking-[0.2em] uppercase text-black/40">
                                            {activity.period}
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <Bullets items={activity.points} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Block>
                )}

                {/* 학력 */}
                {education.length > 0 && (
                    <Block label={labels.education} index={blockIndex++}>
                        <div className="space-y-8">
                            {education.map((school) => (
                                <article key={school.school}>
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <h3 className="text-base md:text-lg font-semibold text-black">
                                            {school.school}
                                            <span className="ml-3 text-sm font-normal text-black/50">
                                                {school.degree}
                                            </span>
                                        </h3>
                                        <span className="text-[11px] tracking-[0.2em] uppercase text-black/40">
                                            {school.period}
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <Bullets items={school.points} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Block>
                )}

                {/* 보유 기술 */}
                {skills.length > 0 && (
                    <Block label={labels.skills} index={blockIndex++}>
                        <ul className="divide-y divide-black/10 border-y border-black/10">
                            {skills.map((group) => (
                                <li
                                    key={group.category}
                                    className="py-4 grid grid-cols-12 gap-3 items-baseline"
                                >
                                    <span className="col-span-12 md:col-span-4 text-[11px] tracking-[0.2em] uppercase text-black/40">
                                        {group.category}
                                    </span>
                                    <span className="col-span-12 md:col-span-8 text-sm md:text-[15px] leading-snug text-black/75">
                                        {group.items.join(' · ')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Block>
                )}

                {/* 자격 & 수상 */}
                {(certifications.length > 0 || awards.length > 0) && (
                    <Block label={labels.credentials} index={blockIndex++}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {certifications.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] tracking-[0.2em] uppercase text-black/40 mb-3">
                                        {labels.certifications}
                                    </h3>
                                    <Bullets items={certifications} />
                                </div>
                            )}
                            {awards.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] tracking-[0.2em] uppercase text-black/40 mb-3">
                                        {labels.awards}
                                    </h3>
                                    <div className="space-y-4">
                                        {awards.map((award) => (
                                            <div key={award.title}>
                                                <p className="text-sm md:text-[15px] font-semibold text-black/85">
                                                    {award.title}
                                                    <span className="ml-2 text-[11px] tracking-[0.2em] uppercase font-normal text-black/40">
                                                        {award.period}
                                                    </span>
                                                </p>
                                                <p className="mt-1 text-sm leading-relaxed text-black/60">
                                                    {award.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Block>
                )}
            </div>
        </div>
    );
};

export default ResumeContent;
