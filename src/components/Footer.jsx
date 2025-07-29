// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-4 px-6 text-center text-gray-500 text-xs shadow-sm tracking-wider uppercase font-semibold">
            Crafted by <a
                href='https://github.com/LogicLord-Liu/'
                target='_blank'
                className='text-blue-600 hover:underline'
                rel="noopener noreferrer"
            >Vannik-Liu</a>. Source code available on <a
                href="https://github.com/LogicLord-Liu/Encrypted-Share-Notes" // 请将 'https://github.com/your-github-repo' 替换为你的实际 GitHub 仓库链接
                target="_blank"
                className="text-blue-600 hover:underline"
                rel="noopener noreferrer"
            >GitHub</a
            >. Version <span className='text-red-600 font-semibold hover:underline hover:scale-105 transition-transform cursor-pointer'>v1.0.0</span>
        </footer>
    );
};

export default Footer;