import React, { useState } from 'react';
import Header from './Header';
import Modal from './Modal';
import SectionPanel from './SectionPanel';
import useStore from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const language = useStore((state) => state.language);
    const setLanguage = useStore((state) => state.setLanguage);
    const [isHovered, setIsHovered] = useState(false);

    const languages = ['KO', 'EN', 'CN', 'JP', 'ES'];

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
            <Header />

            <SectionPanel />

            <Modal />

            {/* Language Switcher (Bottom Left) */}
            <div
                className="absolute bottom-8 left-8 pointer-events-auto z-20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    layout
                    className="flex gap-4 p-2 bg-white/10 backdrop-blur-md rounded-full px-4 border border-white/20"
                    initial={{ width: 'auto' }}
                    animate={{ width: 'auto' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <AnimatePresence mode="wait">
                        {!isHovered ? (
                            <motion.button
                                key="active"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-bold text-black border-b-2 border-black px-1"
                            >
                                {language}
                            </motion.button>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex gap-4"
                            >
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        className={`text-sm font-medium transition-colors duration-200 px-1
                                        ${language === lang ? 'text-black font-bold border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Layout;
