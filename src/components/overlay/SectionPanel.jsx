import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import useStore, { SECTIONS } from '../../store/useStore';
import { translations } from '../../data/translations';

const SectionPanel = () => {
    const currentSection = useStore((state) => state.currentSection);
    const setCurrentSection = useStore((state) => state.setCurrentSection);
    const activeNode = useStore((state) => state.activeNode);
    const language = useStore((state) => state.language);
    const [, setLocation] = useLocation();

    const sectionId = SECTIONS[currentSection];
    const sectionLabel = translations[language]?.nodes[sectionId] || sectionId;

    // Don't show when modal is open
    if (activeNode) return null;

    const handleSectionClick = (index) => {
        setCurrentSection(index);
    };

    const handleEnter = () => {
        setLocation('/' + sectionId);
    };

    return (
        <div className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none z-10">
            <div className="pl-12 flex items-center gap-10">
                {/* Section dots */}
                <div className="flex flex-col gap-3 pointer-events-auto">
                    {SECTIONS.map((id, i) => (
                        <button
                            key={id}
                            onClick={() => handleSectionClick(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === currentSection
                                    ? 'bg-black scale-150'
                                    : 'bg-black/20 hover:bg-black/40'
                            }`}
                            aria-label={translations[language]?.nodes[id] || id}
                        />
                    ))}
                </div>

                {/* Section label */}
                <div className="pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={sectionId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-xs text-black/40 tracking-widest uppercase mb-1">
                                {String(currentSection + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
                            </p>
                            <h2
                                className="text-4xl font-bold text-black cursor-pointer hover:opacity-70 transition-opacity"
                                onClick={handleEnter}
                            >
                                {sectionLabel}
                            </h2>
                            <button
                                onClick={handleEnter}
                                className="mt-4 text-sm text-black/50 hover:text-black transition-colors flex items-center gap-2"
                            >
                                <span>{language === 'KO' ? '자세히 보기' : 'View details'}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SectionPanel;
