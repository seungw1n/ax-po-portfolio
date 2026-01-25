import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// --- Fixed Visual Components (Defined outside to avoid remount flicker) ---
const VisualWrapper = ({ children, index, className = "" }) => (
    <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`absolute inset-0 w-full h-full flex items-center justify-center p-0 lg:p-0 overflow-hidden ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50" />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            {children}
        </div>
    </motion.div>
);

const VisualContent = ({ section, index }) => {
    if (section.type === 'intro') {
        return (
            <VisualWrapper index={index}>
                <div className="w-full h-full bg-gray-900 overflow-hidden shadow-2xl flex flex-col items-center justify-center text-gray-500">
                    <span className="text-2xl font-bold mb-2">TITLE SLIDE IMAGE</span>
                    <span className="text-sm">4시간 동안 가설 3개 검증하기</span>
                </div>
            </VisualWrapper>
        );
    }

    // Feature Visuals
    return (
        <VisualWrapper index={index}>
            <div className={`w-full h-full shadow-xl flex items-center justify-center text-white text-lg font-bold p-8 text-center ${section.placeholderColor || 'bg-gray-400'}`}>
                <div className="max-w-md">
                    <p className="mb-2 uppercase tracking-widest text-xs opacity-70">Project Visual</p>
                    <p className="text-2xl">{section.title}</p>
                    <p className="text-sm font-normal opacity-80 mt-4 leading-relaxed">
                        {section.subtitle || "Original Image Placeholder"}
                    </p>
                </div>
            </div>
        </VisualWrapper>
    );
};

const ProjectDetail = ({ project, onBack }) => {
    const [activeSection, setActiveSection] = useState(0);
    const observer = useRef(null);

    // Prepare sections data: Intro + Features (Memoized)
    const sections = React.useMemo(() => [
        {
            type: 'intro',
            title: project.title,
            sectionType: '배경', // Intro default type
            subtitle: project.subtitle,
            content: project.description || project.summary,
            visual: 'dashboard'
        },
        ...(project.features || []).map(f => ({
            type: 'feature',
            title: f.title,
            sectionType: f.sectionType || '실험', // Fallback for safety
            subtitle: f.subtitle,
            content: f.content || f.description,
            visual: 'feature',
            placeholderColor: f.placeholderColor
        }))
    ], [project]);

    const [scrollProgress, setScrollProgress] = useState(0);
    const [showHeaderTitle, setShowHeaderTitle] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollProgress(progress);

            // Show title when scrolled past the first section (intro)
            setShowHeaderTitle(scrollTop > clientHeight * 0.5);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index'), 10);
                    setActiveSection(index);
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersect, {
            root: null, // viewport
            rootMargin: '-40% 0px -40% 0px', // Trigger when section is in middle 20% of screen
            threshold: 0
        });

        const elements = document.querySelectorAll('.project-section');
        elements.forEach((el) => observer.current.observe(el));

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [project]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-white relative overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar"
            id="project-scroll-container"
        >
            {/* Sticky Header Bar (64px) */}
            <header className="fixed top-0 left-0 right-0 h-[64px] bg-white z-[60] border-b border-gray-100 flex items-center px-4 lg:px-8 justify-between shadow-sm">
                {/* 1. Left: Back Button */}
                <div className="flex-1 flex items-center">
                    <button
                        onClick={onBack}
                        className="w-[44px] h-[44px] flex items-center justify-center rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                        aria-label="Back"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                </div>

                {/* 2. Center: Project Title (Visible after scroll) */}
                <div className="flex-[3] flex justify-center overflow-hidden px-4 text-center">
                    <AnimatePresence>
                        {showHeaderTitle && (
                            <motion.h1
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                className="text-base font-bold text-black truncate max-w-[200px] lg:max-w-none"
                            >
                                {project.title}
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. Right: Current Section Type (Visible after scroll) */}
                <div className="flex-1 flex justify-end">
                    <AnimatePresence>
                        {showHeaderTitle && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs font-bold text-black bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap"
                            >
                                {sections[activeSection]?.sectionType}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* 4. Bottom: Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-black origin-left"
                    style={{ width: `${scrollProgress}%` }}
                />
            </header>

            <div className="flex flex-col lg:flex-row min-h-screen pt-[64px]">
                {/* 2. Left Column: Sticky Visuals */}
                <div className="hidden lg:block lg:w-1/2 sticky top-[64px] h-[calc(100vh-64px)] z-0 bg-gray-50 border-r border-gray-100 overflow-hidden">
                    <AnimatePresence mode='popLayout'>
                        <VisualContent section={sections[activeSection]} index={activeSection} />
                    </AnimatePresence>
                </div>

                {/* 3. Right Column: Scrollable Text Sections */}
                <div className="w-full lg:w-1/2 relative z-10 bg-white">
                    {/* Render Sections */}
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            data-index={idx}
                            className={`project-section min-h-[calc(100vh-64px)] flex flex-col justify-center p-8 lg:p-24 border-b border-gray-50 last:border-0 ${idx === 0 ? 'pt-24' : ''}`}
                        >
                            {/* Mobile Visual (Visible only on small screens) */}
                            <div className="lg:hidden w-full aspect-video bg-gray-100 rounded-lg mb-8 flex items-center justify-center text-gray-400 text-xs font-medium">
                                {section.title} Visual
                            </div>

                            <div className="mb-8">
                                {idx === 0 && (
                                    <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-6">
                                        {project.tags?.industry || 'PROJECT'}
                                    </div>
                                )}
                                <h2 className={`font-bold mb-4 text-black tracking-tight leading-tight ${idx === 0 ? 'text-4xl lg:text-5xl' : 'text-3xl'}`}>
                                    {section.title}
                                </h2>
                                {section.subtitle && (
                                    <p className="text-xl text-gray-500 font-medium leading-relaxed">{section.subtitle}</p>
                                )}
                            </div>

                            {/* Render Content */}
                            <div className="prose prose-lg text-gray-600 font-light leading-relaxed">
                                <ReactMarkdown
                                    components={{
                                        strong: ({ node, ...props }) => <span className="font-bold text-gray-800" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-black mt-8 mb-4 border-l-4 border-black pl-3" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                                        li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-4" {...props} />
                                    }}
                                >
                                    {section.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {/* Footer padding */}
                    <div className="h-[20vh]" />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
