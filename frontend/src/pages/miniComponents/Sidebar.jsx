import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiX, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen, navItems, user, handleLogout }) => {
    const location = useLocation();

    return (
        <motion.div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-2 rounded-lg transition-colors ${
                                location.pathname === item.path
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                            }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground">
                                    {user?.nom?.charAt(0) || 'A'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{user?.nom}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-muted">
                            <FiLogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
