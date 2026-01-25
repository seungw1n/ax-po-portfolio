// Shared layout logic to ensure CameraController knows where nodes are.

export const nodeData = [
    { id: 'projects', label: 'Projects', color: '#00f3ff' },
    { id: 'about', label: 'About Me', color: '#ff0055' },
    { id: 'resume', label: 'Resume', color: '#dddddd' },
    { id: 'study', label: 'Study Archive', color: '#ffff00' },
    { id: 'peer', label: 'Peer Review', color: '#00ff66' },
    { id: 'library', label: 'Library', color: '#0066ff' },
    { id: 'articles', label: 'Articles', color: '#aa00ff' },
];

export const getNodesLayout = () => {
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return nodeData.map((node, i) => {
        const y = 1 - (i / (nodeData.length - 1)) * 2;
        const radius = Math.sqrt(1 - y * y) * 4;
        const theta = phi * i * 3;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        return {
            ...node,
            position: [x, y * 2, z]
        };
    });
};
