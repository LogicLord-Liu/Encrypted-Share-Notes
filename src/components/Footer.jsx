// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    const appVersion = "1.0.0";
    const githubProfileUrl = 'https://github.com/LogicLord-Liu/';
    const githubRepoUrl = 'https://github.com/LogicLord-Liu/Encrypted-Share-Notes';

    return (
        <footer className="w-full bg-white border-t border-gray-100 py-4 px-6 text-center text-gray-500 text-xs shadow-sm tracking-wider uppercase font-semibold">
            <div className='container mx-auto'>
                <p>
                    Crafted by <a
                        href={githubProfileUrl}
                        target='_blank'
                        className='text-blue-600 hover:underline'
                        rel="noopener noreferrer"
                    >Vannik-Liu</a>. Source code available on <a
                        href={githubRepoUrl} // 请将 'https://github.com/your-github-repo' 替换为你的实际 GitHub 仓库链接
                        target="_blank"
                        className="text-blue-600 hover:underline"
                        rel="noopener noreferrer"
                    >GitHub</a
                    >. Version <span className='inline-block text-red-600 font-semibold hover:underline hover:scale-105 transition-transform cursor-pointer' title={`版本 ${appVersion}`}>
                        v{appVersion}</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;