// import React from "react";

// const DashboardSuperAdmin = () => {
//   return (
//     <div>
//       <h2>Welcome, Suoer Admin</h2>;
//     </div>
//   );
// };

// export default DashboardSuperAdmin;


import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FiBarChart2 as ChartBarIcon,
  FiUsers as UserGroupIcon,
  FiCalendar as CalendarIcon,
  FiUser as UsersIcon,
  FiImage as PhotographIcon,
  FiMessageSquare as ChatAltIcon,
  FiBookOpen as BookOpenIcon,
  FiCheckCircle as CheckCircleIcon,
  FiSettings as CogIcon,
  FiFileText as DocumentTextIcon,
  FiBell as NewsIcon,
  FiMenu, 
  FiX, 
  FiBell,
  FiLogOut
} from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const DashboardSuperAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: 'dashboard', icon: ChartBarIcon },
    { name: 'Users', path: 'users', icon: UserGroupIcon },
    { name: 'Events', path: 'events', icon: CalendarIcon },
    { name: 'Talents', path: 'talents', icon: UsersIcon },
    { name: 'Media', path: 'media', icon: PhotographIcon },
    { name: 'Chatbot', path: 'chatbot', icon: ChatAltIcon },
    { name: 'News', path: 'news', icon: NewsIcon },
    { name: 'Calendar', path: 'calendar', icon: CalendarIcon },
    { name: 'Workshops', path: 'workshops', icon: BookOpenIcon },
    { name: 'Spaces', path: 'spaces', icon: CheckCircleIcon },
    { name: 'Reservations', path: 'reservations', icon: CheckCircleIcon },
    { name: 'Comments', path: 'comments', icon: ChatAltIcon },
    { name: 'System', path: 'system', icon: CogIcon },
    { name: 'Reports', path: 'reports', icon: DocumentTextIcon },
  ];

  const handleLogout = async () => {
    await logout();
    // La redirection sera gérée par le ProtectedRoute
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Mobile */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-[#824B26]">Super Admin</h1>
          <button onClick={() => setSidebarOpen(false)}>
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-lg mb-2 ${
                location.pathname.includes(item.path)
                  ? 'bg-[#824B26]/10 text-[#824B26]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Sidebar Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-[#824B26]">Super Admin</h1>
            <button 
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg mb-2 ${
                  location.pathname.includes(item.path)
                    ? 'bg-[#824B26]/10 text-[#824B26]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <button 
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <FiBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{user?.nom}</span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#824B26] flex items-center justify-center text-white">
                    {user?.nom?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;