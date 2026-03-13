import { create } from 'zustand';

export const SECTIONS = ['about', 'projects', 'resume', 'study', 'peer', 'library', 'articles'];

const useStore = create((set) => ({
    activeNode: null,
    hoveredNode: null,
    activeProject: null,
    language: 'KO',
    currentSection: 0,
    setActiveNode: (nodeId) => set({ activeNode: nodeId }),
    setHoveredNode: (nodeId) => set({ hoveredNode: nodeId }),
    setActiveProject: (projectId) => set({ activeProject: projectId }),
    setLanguage: (lang) => set({ language: lang }),
    setCurrentSection: (index) => set({ currentSection: index }),
}));

export default useStore;
