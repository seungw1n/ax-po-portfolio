import React, { useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import useStore, { SECTIONS } from './store/useStore';
import Scene from './components/canvas/Scene';
import Layout from './components/overlay/Layout';

const RouteHandler = () => {
  const [location, setLocation] = useLocation();

  const setActiveNode = useStore((state) => state.setActiveNode);
  const setActiveProject = useStore((state) => state.setActiveProject);
  const setCurrentSection = useStore((state) => state.setCurrentSection);
  const activeNode = useStore((state) => state.activeNode);
  const activeProject = useStore((state) => state.activeProject);

  useEffect(() => {
    // 1. Project detail route: /project/:id
    const projectMatch = location.match(/^\/project\/([^/]+)$/);
    if (projectMatch) {
      const pid = projectMatch[1];
      if (activeNode !== 'projects' || activeProject !== pid) {
        setActiveNode('projects');
        setActiveProject(pid);
        setCurrentSection(SECTIONS.indexOf('projects'));
      }
      return;
    }

    // 2. Section route: /:node
    if (location !== '/' && !location.startsWith('/project/')) {
      const nodeName = location.substring(1);
      if (SECTIONS.includes(nodeName)) {
        if (activeNode !== nodeName || activeProject !== null) {
          setActiveNode(nodeName);
          setActiveProject(null);
        }
        setCurrentSection(SECTIONS.indexOf(nodeName));
        return;
      }
    }

    // 3. Root -> close modal
    if (location === '/' && activeNode !== null) {
      setActiveNode(null);
      setActiveProject(null);
    }
  }, [location, activeNode, activeProject, setActiveNode, setActiveProject, setCurrentSection]);

  return null;
};

import ErrorBoundary from './components/common/ErrorBoundary';
import useAnalytics from './hooks/useAnalytics';

function App() {
  useAnalytics();
  const [location, setLocation] = useLocation();

  return (
    <div className="relative w-full h-screen bg-white">
      <ErrorBoundary>
        <RouteHandler />
      </ErrorBoundary>
      <ErrorBoundary>
        <Scene onNavigate={setLocation} />
      </ErrorBoundary>
      <Layout />
    </div>
  );
}

export default App;
