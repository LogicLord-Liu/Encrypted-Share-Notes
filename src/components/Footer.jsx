// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    const appVersion = "1.0.1";
    const githubProfileUrl = 'https://github.com/LogicLord-Liu/';
    const githubRepoUrl = 'https://github.com/LogicLord-Liu/Encrypted-Share-Notes';

    return (
        <footer className="w-full px-6 py-4 glass-effect border-t border-white/10 text-center text-xs font-semibold tracking-wider uppercase transition-all">
            <div className='container mx-auto'>
                <p className="text-gray-500 dark:text-gray-400">
                    Crafted by 
                    <a
                        href={githubProfileUrl}
                        target='_blank'
                        className='ml-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-80 transition-opacity'
                        rel="noopener noreferrer"
                    >Vannik-Liu</a>
                    . Source code available on
                    <a
                        href={githubRepoUrl}
                        target="_blank"
                        className='ml-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-80 transition-opacity'
                        rel="noopener noreferrer"
                    >GitHub</a>
                    . Version
                    <span 
                        className='ml-1 inline-block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 font-bold hover:scale-105 transition-transform cursor-pointer' 
                        title={`版本 ${appVersion}`}
                    >
                        v{appVersion}
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;