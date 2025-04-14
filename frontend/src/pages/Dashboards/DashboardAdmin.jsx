import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FiBarChart2 as ChartBarIcon,
    FiUsers as UserGroupIcon,
    FiCalendar as CalendarIcon,
    FiUser as UsersIcon,
    FiCheckCircle as CheckCircleIcon,
    FiMessageSquare as ChatAltIcon,
    FiBookOpen as BookOpenIcon,
    FiSettings as CogIcon,
    FiFileText as DocumentTextIcon,
    FiMenu,
    FiX,
    FiBell,
    FiLogOut,
} from 'react-icons/fi';
import Sidebar from '../miniComponents/Sidebar';
import TopBar from '../miniComponents/TopBar';
import UserSection from '../miniComponents/UserSection';
import SpaceSection from '../miniComponents/SpaceSection';
import ReservationSection from '../miniComponents/ReservationSection';
import DashboardContent from '../miniComponents/DashboardContent';
import CalendarSection from '../miniComponents/CalendarSection';
import CommentsSection from '../miniComponents/CommentsSection';
import ReportsSection from '../miniComponents/ReportsSection';
import mockData from '../../mockData.json';
const DashboardAdmin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard-admin', icon: ChartBarIcon },
        { name: 'Utilisateur', path: '/dashboard-admin/users', icon: UserGroupIcon },
        { name: 'Calendrier', path: '/dashboard-admin/calendar', icon: CalendarIcon },
        { name: 'Espace', path: '/dashboard-admin/spaces', icon: CheckCircleIcon },
        { name: 'Reservations', path: '/dashboard-admin/reservations', icon: CheckCircleIcon },
        { name: 'Commentaire', path: '/dashboard-admin/comments', icon: ChatAltIcon },
        { name: 'Systeme', path: '/dashboard-admin/system', icon: CogIcon },
        { name: 'Raport', path: '/dashboard-admin/reports', icon: DocumentTextIcon },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const renderContent = () => {
        switch (location.pathname) {
            case '/dashboard-admin/users':
                return <UserSection />;
            case '/dashboard-admin/spaces':
                return <SpaceSection />;
            case '/dashboard-admin/reservations':
                return <ReservationSection />;
            case '/dashboard-admin/calendar':
                return <CalendarSection reservations={mockData.reservations} />;
            case '/dashboard-admin/comments':
                return <CommentsSection comments={mockData.comments} users={mockData.users} />; // Ajoutez cette ligne
            case '/dashboard-admin/reports':
                return <ReportsSection dashboard={mockData.dashboard} users={mockData.users} spaces={mockData.spaces} reservations={mockData.reservations} />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                navItems={navItems}
                user={user}
                handleLogout={handleLogout}
            />
            <div className="flex-1 md:ml-64">
                <TopBar setSidebarOpen={setSidebarOpen} />
                <main className="p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardAdmin;
