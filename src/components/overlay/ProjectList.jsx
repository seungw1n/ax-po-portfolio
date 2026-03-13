import React from 'react';
import { motion } from 'framer-motion';

const ProjectList = ({ title, description, items, onSelect }) => {
    // Helper to render tags
    const renderTags = (tags) => (
        <div className="flex gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                {tags.industry}
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                {tags.type}
            </span>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-0">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-3 text-black tracking-tight">{title}</h1>
                {description && <p className="text-xl text-gray-500 font-medium max-w-2xl">{description}</p>}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="group cursor-pointer bg-white border border-gray-100 rounded-none overflow-hidden hover:bg-gray-50 transition-all duration-300 flex flex-col"
                    >
                        {/* Thumbnail - Hero Mockup Style */}
                        <div className="aspect-[16/10] bg-gray-900 overflow-hidden relative border-b border-gray-100 flex items-center justify-center">
                            {item.thumbnailUrl ? (
                                <img
                                    src={item.thumbnailUrl}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-transparent opacity-50" />
                                    <motion.div
                                        className="relative z-10 flex flex-col items-center text-center space-y-2"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <span className="text-lg font-bold opacity-30 select-none text-gray-500">TITLE SLIDE IMAGE</span>
                                        <span className="text-xs opacity-40 uppercase tracking-widest font-semibold select-none text-gray-500">{item.title}</span>
                                    </motion.div>
                                </>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-sm font-bold px-4 py-2 border border-white/30 rounded-none backdrop-blur-md">View Case Study</span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex flex-col flex-1">
                            {renderTags(item.tags)}
                            <h3 className="text-xl font-bold mb-3 text-black group-hover:text-blue-600 transition-colors line-clamp-1">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                {item.summary}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
