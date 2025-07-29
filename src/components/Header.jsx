// src/components/Header.jsx
import React from 'react';
import DropdownMenu from './DropdownMenu.jsx'; // 确保导入你的 DropdownMenu 组件

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center">
                <span className="font-bold text-2xl text-gray-800 mr-2">Enclosed</span>
                <span className="text-sm text-gray-500 hidden sm:block mt-2">发送私密和安全笔记</span>
            </div>
            <nav className="flex items-center space-x-4">
                {/* 新建笔记按钮 */}
                <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all shadow-sm"
                >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    新建笔记
                </button>

                {/* 第一个图标按钮 (可能是通知或类似功能) */}
                <button
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                </button>

                {/* 第二个图标按钮 (可能是设置或类似功能) */}
                <button
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                </button>

                {/* 下拉菜单按钮 (DropdownMenu 组件) */}
                <DropdownMenu client:load /> {/* 注意这里依然使用 client:load */}
            </nav>
        </header>
    );
};

export default Header;