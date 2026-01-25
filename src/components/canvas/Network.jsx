import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import Node from './Node';
import { getNodesLayout } from '../../utils/layout';

const Network = ({ onNavigate }) => {
    const nodes = useMemo(() => getNodesLayout(), []);

    // Create connections (Minimum Spanning Tree relative or just nearest neighbors)
    // For visual "Constellation", let's connect each node to the next 2 closest nodes
    const connections = useMemo(() => {
        const lines = [];
        nodes.forEach((node, i) => {
            // Connect to next index (loop)
            const next = nodes[(i + 1) % nodes.length];
            lines.push([node.position, next.position]);

            // Connect to one-after-next (cross connection)
            const skip = nodes[(i + 2) % nodes.length];
            lines.push([node.position, skip.position]);
        });
        return lines;
    }, [nodes]);

    return (
        <group>
            {/* Nodes */}
            {nodes.map((n) => (
                <Node
                    key={n.id}
                    {...n}
                    onNavigate={onNavigate}
                />
            ))}

            {/* Connections (Lines) */}
            {connections.map((line, index) => (
                <Line
                    key={index}
                    points={line}
                    color="#000000" // Black lines
                    lineWidth={0.5}
                    transparent
                    opacity={0.1}
                />
            ))}
        </group>
    );
};

export default Network;
