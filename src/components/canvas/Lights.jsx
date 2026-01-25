import React from 'react';

const Lights = () => {
    return (
        <>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
        </>
    );
};

export default Lights;
