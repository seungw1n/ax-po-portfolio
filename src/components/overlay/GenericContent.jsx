import React from 'react';

const GenericContent = ({ title, content }) => {
    return (
        <>
            <h1 className="text-4xl font-bold mb-6 text-black">
                {title}
            </h1>
            <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                {content}
            </div>
        </>
    );
};

export default GenericContent;
