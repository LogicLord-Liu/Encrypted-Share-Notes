// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';

// 图标组件
const PlusIcon = () => (
    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
);
const LanguageIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"></circle>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 010 20"></path>
    </svg>
);
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);
const BugIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
);
const SupportIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 0A7 7 0 0121 12a9 9 0 01-9 9m-5.636-5.636l-3.536 3.536m0 0A7 7 0 003 12a9 9 0 009-9m-5.636 5.636l-3.536-3.536m0 0A7 7 0 013 12a9 9 0 019 9m5.636-5.636l3.536 3.536m0 0A7 7 0 0021 12a9 9 0 00-9-9"></path>
    </svg>
);

const Header = () => {
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [mainMenuOpen, setMainMenuOpen] = useState(false);
    const langMenuRef = useRef(null);
    const mainMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setLangMenuOpen(false);
            }
            if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
                setMainMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const languages = [
        { code: "en", label: "English" },
        { code: "zh", label: "中文" },
        { code: "fr", label: "Français" },
    ];

    const handleMenuItemClick = (action) => {
        setMainMenuOpen(false);
        if (action === 'reportBug') {
            window.location.href = 'https://github.com/LogicLord-Liu/Encrypted-Share-Notes/issues/new';
        } else if (action === 'support') {
            window.location.href = 'https://buymeacoffee.com/Vannik';
        }
    };

    return (
        <header className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center">
                <span className="font-bold text-xl sm:text-2xl text-gray-800 mr-2">Transcrypt</span>
                <span className="text-xs sm:text-sm text-gray-500 hidden sm:block mt-2">发送私密和安全笔记</span>
            </div>

            <nav className="flex items-center space-x-2 sm:space-x-4">
                <button
                    className="flex items-center px-3 sm:px-4 py-2 bg-sky-500/60 text-white rounded-lg text-sm font-medium hover:bg-sky-500/80 focus:outline-none focus:ring-2 focus:bg-sky-500/100 focus:ring-opacity-50 transition-all shadow-sm"
                >
                    <PlusIcon />
                    <span className="hidden sm:block">新建笔记</span>
                </button>

                {/* 语言菜单 */}
                <div ref={langMenuRef} className="relative">
                    <button
                        onClick={() => setLangMenuOpen(!langMenuOpen)}
                        className="flex items-center p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        aria-haspopup="true"
                        aria-expanded={langMenuOpen}
                        aria-label="选择语言"
                        type="button"
                    >
                        <LanguageIcon />
                    </button>
                    {langMenuOpen && (
                        <ul className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                            {languages.map(({ code, label }) => (
                                <li
                                    key={code}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                                    onClick={() => {
                                        alert(`选择语言: ${label}`);
                                        setLangMenuOpen(false);
                                    }}
                                    role="menuitem"
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 主菜单 (Report Bug, Support) */}
                <div ref={mainMenuRef} className="relative">
                    <button
                        onClick={() => setMainMenuOpen(!mainMenuOpen)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                        aria-expanded={mainMenuOpen}
                        aria-haspopup="true"
                        aria-label="更多选项"
                    >
                        <MenuIcon />
                    </button>
                    {mainMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleMenuItemClick('reportBug'); }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                <BugIcon />
                                报告 Bug
                            </a>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleMenuItemClick('support'); }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                <SupportIcon />
                                支持
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;