import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import useStore from '../../store/useStore';
import { translations } from '../../data/translations';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import GenericContent from './GenericContent';

const Modal = () => {
    const activeNode = useStore((state) => state.activeNode);
    const activeProject = useStore((state) => state.activeProject);
    const language = useStore((state) => state.language);
    const [, setLocation] = useLocation();

    // Get content based on activeNode and language
    const data = activeNode ? translations[language]?.modal[activeNode] : null;

    // Resolve full project object if activeProject is set
    const selectedProjectData = activeProject && data?.items
        ? data.items.find(p => p.id === activeProject)
        : null;

    const isDetailView = !!activeProject;

    return (
        <AnimatePresence mode="wait">
            {activeNode && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-500 ${isDetailView ? 'p-0 bg-white' : 'p-10'}`}>
                    {/* 1. Backdrop for click-outside closure (only active in 1-depth/list view) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isDetailView ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLocation('/')}
                        className="fixed inset-0 bg-black/20 backdrop-blur-md pointer-events-auto"
                        style={{ display: isDetailView ? 'none' : 'block' }}
                    />

                    {/* 2. Modal Container */}
                    <motion.div
                        layout
                        initial={isDetailView ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            width: isDetailView ? "100%" : "100%",
                            height: isDetailView ? "100%" : "100%",
                            borderRadius: "0px"
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className={`relative bg-white/95 backdrop-blur-md border border-black/10 flex flex-col pointer-events-auto shadow-2xl overflow-hidden z-10 w-full h-full`}
                    >
                        {/* Close Button - Only in 1 Depth (List View) */}
                        {!isDetailView && (
                            <div className="flex justify-end p-4 z-20 absolute top-0 right-0">
                                <button
                                    onClick={() => setLocation('/')}
                                    className="w-[44px] h-[44px] flex items-center justify-center text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"
                                    aria-label="Close"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        <div className={`overflow-y-auto flex-1 h-full ${isDetailView ? 'p-0' : 'p-8 md:p-10 mt-6'}`}>
                            {/* Content Logic */}
                            {activeNode === 'projects' && selectedProjectData ? (
                                <div className="h-full w-full">
                                    <ProjectDetail
                                        project={selectedProjectData}
                                        onBack={() => setLocation('/projects')}
                                    />
                                </div>
                            ) : activeNode === 'projects' && data?.items ? (
                                <ProjectList
                                    title={data.title}
                                    description={data.description}
                                    items={data.items}
                                    onSelect={(item) => setLocation('/project/' + item.id)}
                                />
                            ) : (
                                <GenericContent
                                    title={data?.title}
                                    content={data?.content}
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
