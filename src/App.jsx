import React, { useEffect, useRef } from 'react';
import { useRoute, useLocation } from 'wouter';
import useStore from './store/useStore';
import Scene from './components/canvas/Scene';
import Layout from './components/overlay/Layout';

const RouteHandler = () => {
  const [location, setLocation] = useLocation();
  const isInitialLoad = useRef(true);

  const setActiveNode = useStore((state) => state.setActiveNode);
  const setActiveProject = useStore((state) => state.setActiveProject);
  const activeNode = useStore((state) => state.activeNode);
  const activeProject = useStore((state) => state.activeProject);

  // Redirect to /projects on initial landing at root
  useEffect(() => {
    if (isInitialLoad.current && location === '/') {
      setLocation('/projects');
    }
    isInitialLoad.current = false;
  }, []);

  // Sync URL -> Store
  // We use regex matching on 'location' string which is primitive and stable
  useEffect(() => {
    // 1. Check Project Route: /project/:id
    const projectMatch = location.match(/^\/project\/([^/]+)$/);
    if (projectMatch) {
      const pid = projectMatch[1];
      if (activeNode !== 'projects' || activeProject !== pid) {
        setActiveNode('projects');
        setActiveProject(pid);
      }
      return;
    }

    // 2. Check Generic Node Route: /:node
    // Avoid matching if we are at root or project detail
    if (location !== '/' && !location.startsWith('/project/')) {
      const nodeName = location.substring(1); // remove leading slash
      const validNodes = ['projects', 'about', 'resume', 'study', 'peer', 'library', 'articles'];

      if (validNodes.includes(nodeName)) {
        // Fix: Also check if we need to clear activeProject even if activeNode matches
        if (activeNode !== nodeName || activeProject !== null) {
          setActiveNode(nodeName);
          setActiveProject(null);
        }
        return;
      }
    }

    // 3. Root or invalid path -> Reset
    if (location === '/' && activeNode !== null) {
      setActiveNode(null);
      setActiveProject(null);
    }
  }, [location, activeNode, activeProject, setActiveNode, setActiveProject]);

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
      {/* Pass setLocation to Scene for 3D interactions */}
      <ErrorBoundary>
        <Scene onNavigate={setLocation} />
      </ErrorBoundary>
      <Layout />
    </div>
  );
}

export default App;
