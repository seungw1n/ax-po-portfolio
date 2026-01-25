import React from 'react';
import useStore from '../../store/useStore';
import { translations } from '../../data/translations';

const Header = () => {
    const language = useStore((state) => state.language);
    const data = translations[language]?.header;

    return (
        <div className="absolute top-0 left-0 p-8 pointer-events-none z-10">
            <h1 className="text-2xl font-bold tracking-wider text-black">
                SEUNGW1N <span className="text-gray-500">{data?.title}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">{data?.subtitle}</p>
        </div>
    );
};

export default Header;
