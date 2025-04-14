import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';

const TopBar = ({ setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-40 bg-background border-b">
            <div className="flex items-center justify-between h-16 px-4">
                <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                    <FiMenu className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-lg hover:bg-muted">
                        <FiBell className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
