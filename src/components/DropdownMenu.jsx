// src/components/DropdownMenu.jsx
import React, { useState, useRef, useEffect } from 'react';

// Report Bug 图标 (例如，一个bug图标)
const BugIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
);

// Support 图标 (例如，一个帮助或聊天图标)
const SupportIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 0A7 7 0 0121 12a9 9 0 01-9 9m-5.636-5.636l-3.536 3.536m0 0A7 7 0 003 12a9 9 0 009-9m-5.636 5.636l-3.536-3.536m0 0A7 7 0 013 12a9 9 0 019 9m5.636-5.636l3.536 3.536m0 0A7 7 0 0021 12a9 9 0 00-9-9"></path>
    </svg>
);

// 菜单图标 (即你提供的三条横线图标)
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // 用于检测点击外部

    // 处理点击外部关闭菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuItemClick = (action) => {
        setIsOpen(false); // 关闭菜单
        if (action === 'reportBug') {
            window.location.href = 'https://github.com/LogicLord-Liu/Encrypted-Share-Notes/issues/new';
        } else if (action === 'support') {
            window.location.href = 'https://github.com/LogicLord-Liu/Encrypted-Share-Notes/issues/new';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <MenuIcon />
            </button>

            {isOpen && (
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
    );
};

export default DropdownMenu;