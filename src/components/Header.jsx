import React, { useState, useRef, useEffect } from 'react';

const PlusIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
);
const LanguageIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const MenuIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);
const BugIcon = () => (
    <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const SupportIcon = () => (
    <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const Header = () => {
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [mainMenuOpen, setMainMenuOpen] = useState(false);
    const langMenuRef = useRef(null);
    const mainMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) setLangMenuOpen(false);
            if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) setMainMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const languages = [
        { code: "zh", label: "简体中文" },
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
    ];

    return (
        <header className="sticky top-0 z-[60] w-full px-6 py-4 glass-effect border-b border-white/10 flex items-center justify-between transition-all">
            {/* Logo 区域 */}
            <div 
                className="flex items-center group cursor-pointer" 
                onClick={() => window.location.href = '/'}
            >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <span className="text-white font-black text-xl italic">T</span>
                </div>
                <div className="ml-3 flex flex-col">
                    <span className="font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 leading-none">
                        Transcrypt
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-500/80 mt-1.5 hidden sm:block">
                        Secure Note Sharing
                    </span>
                </div>
            </div>

            {/* 导航区域 */}
            <nav className="flex items-center gap-2 sm:gap-4">
                <button
                    className="flex items-center px-5 py-2.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 backdrop-blur-md border border-white/20"
                >
                    <PlusIcon />
                    <span className="hidden sm:block">新建笔记</span>
                </button>

                <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>

                {/* 语言选择 */}
                <div ref={langMenuRef} className="relative">
                    <button
                        onClick={() => setLangMenuOpen(!langMenuOpen)}
                        className={`p-2.5 rounded-xl transition-all ${langMenuOpen ? 'bg-white/20 text-blue-500' : 'text-gray-500 hover:bg-white/10'}`}
                        title="选择语言"
                    >
                        <LanguageIcon />
                    </button>
                    {langMenuOpen && (
                        <div className="absolute right-0 mt-3 w-40 glass-card rounded-2xl p-2 animate-in zoom-in-95 fade-in duration-200 shadow-2xl border-white/20">
                            {languages.map(({ code, label }) => (
                                <button
                                    key={code}
                                    className="w-full text-left px-4 py-2.5 hover:bg-blue-500/10 hover:text-blue-500 rounded-xl text-sm font-bold transition-colors"
                                    onClick={() => setLangMenuOpen(false)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 更多菜单 */}
                <div ref={mainMenuRef} className="relative">
                    <button
                        onClick={() => setMainMenuOpen(!mainMenuOpen)}
                        className={`p-2.5 rounded-xl transition-all ${mainMenuOpen ? 'bg-white/20 text-blue-500' : 'text-gray-500 hover:bg-white/10'}`}
                    >
                        <MenuIcon />
                    </button>
                    {mainMenuOpen && (
                        <div className="absolute right-0 mt-3 w-56 glass-card rounded-2xl p-2 animate-in zoom-in-95 fade-in duration-200 shadow-2xl border-white/20">
                            <a
                                href="https://github.com/LogicLord-Liu/Encrypted-Share-Notes/issues/new"
                                target="_blank"
                                className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors"
                                onClick={() => setMainMenuOpen(false)}
                            >
                                <BugIcon />
                                报告 Bug / 建议
                            </a>
                            <a
                                href="https://buymeacoffee.com/Vannik"
                                target="_blank"
                                className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-orange-500/10 hover:text-orange-500 rounded-xl transition-colors"
                                onClick={() => setMainMenuOpen(false)}
                            >
                                <SupportIcon />
                                支持该项目
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;