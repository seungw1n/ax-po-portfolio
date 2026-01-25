import { create } from 'zustand';

const useStore = create((set) => ({
    activeNode: null, // The currently clicked/focused node ID (string)
    hoveredNode: null, // The currently hovered node ID
    activeProject: null, // Selected project ID for detail view
    language: 'KO', // Default language
    setActiveNode: (nodeId) => set({ activeNode: nodeId }),
    setHoveredNode: (nodeId) => set({ hoveredNode: nodeId }),
    setActiveProject: (projectId) => set({ activeProject: projectId }),
    setLanguage: (lang) => set({ language: lang }),
}));

export default useStore;
