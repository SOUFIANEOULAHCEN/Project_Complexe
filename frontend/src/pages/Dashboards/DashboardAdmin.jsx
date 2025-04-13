// import React from "react";

// const DashboardSuperAdmin = () => {
//   return (
//     <div>
//       <h2>Welcome, Suoer Admin</h2>;
//     </div>
//   );
// };

// export default DashboardSuperAdmin;


import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
    FiLogOut,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiFilter
} from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import mockData from '../../mockData.json';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardAdmin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { dashboard, users, spaces, reservations, comments, system } = mockData;

    const navItems = [
        { name: 'Dashboard', path: '/dashboard-admin', icon: ChartBarIcon },
        { name: 'Users', path: '/dashboard-admin/users', icon: UserGroupIcon },
        { name: 'Calendar', path: '/dashboard-admin/calendar', icon: CalendarIcon },
        { name: 'Spaces', path: '/dashboard-admin/spaces', icon: CheckCircleIcon },
        { name: 'Reservations', path: '/dashboard-admin/reservations', icon: CheckCircleIcon },
        { name: 'Comments', path: '/dashboard-admin/comments', icon: ChatAltIcon },
        { name: 'System', path: '/dashboard-admin/system', icon: CogIcon },
        { name: 'Reports', path: '/dashboard-admin/reports', icon: DocumentTextIcon },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const renderContent = () => {
        switch (location.pathname) {
            case '/dashboard-admin/users':
                return (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Utilisateurs</CardTitle>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Rechercher..."
                                    className="w-[200px]"
                                />
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filtrer par statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="active">Actif</SelectItem>
                                        <SelectItem value="inactive">Inactif</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <FiPlus className="mr-2" />
                                            Ajouter
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ajouter un utilisateur</DialogTitle>
                                        </DialogHeader>
                                        {/* Formulaire d'ajout d'utilisateur */}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Rôle</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Date d'inscription</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm">
                                                        <FiTrash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );
            case '/dashboard-admin/spaces':
                return (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Espaces</CardTitle>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Rechercher..."
                                    className="w-[200px]"
                                />
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filtrer par statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="available">Disponible</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <FiPlus className="mr-2" />
                                            Ajouter
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ajouter un espace</DialogTitle>
                                        </DialogHeader>
                                        {/* Formulaire d'ajout d'espace */}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Capacité</TableHead>
                                        <TableHead>Équipements</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {spaces.map((space) => (
                                        <TableRow key={space.id}>
                                            <TableCell>{space.name}</TableCell>
                                            <TableCell>{space.capacity} personnes</TableCell>
                                            <TableCell>{space.equipment.join(', ')}</TableCell>
                                            <TableCell>
                                                <Badge variant={space.status === 'available' ? 'default' : 'warning'}>
                                                    {space.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm">
                                                        <FiTrash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );
            case '/dashboard-admin/reservations':
                return (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Réservations</CardTitle>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Rechercher..."
                                    className="w-[200px]"
                                />
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filtrer par statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="confirmed">Confirmé</SelectItem>
                                        <SelectItem value="pending">En attente</SelectItem>
                                        <SelectItem value="cancelled">Annulé</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <FiPlus className="mr-2" />
                                            Ajouter
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ajouter une réservation</DialogTitle>
                                        </DialogHeader>
                                        {/* Formulaire d'ajout de réservation */}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Espace</TableHead>
                                        <TableHead>Utilisateur</TableHead>
                                        <TableHead>Date de début</TableHead>
                                        <TableHead>Date de fin</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reservations.map((reservation) => (
                                        <TableRow key={reservation.id}>
                                            <TableCell>{reservation.space}</TableCell>
                                            <TableCell>{reservation.user}</TableCell>
                                            <TableCell>{new Date(reservation.start).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(reservation.end).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        reservation.status === 'confirmed'
                                                            ? 'default'
                                                            : reservation.status === 'pending'
                                                            ? 'warning'
                                                            : 'destructive'
                                                    }
                                                >
                                                    {reservation.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm">
                                                        <FiTrash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );
            default:
                return (
                    <div className="space-y-6">
                        {/* Statistiques globales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboard.statistics.totalUsers}</div>
                                    <Progress value={75} className="mt-2" />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Espaces</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboard.statistics.totalSpaces}</div>
                                    <Progress value={60} className="mt-2" />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Réservations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboard.statistics.totalReservations}</div>
                                    <Progress value={85} className="mt-2" />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Commentaires</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboard.statistics.totalComments}</div>
                                    <Progress value={90} className="mt-2" />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Graphique d'activité */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Activité hebdomadaire</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dashboard.activityChart}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="reservations" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Liste des utilisateurs */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Utilisateurs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Rôle</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead>Date d'inscription</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>
                                                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Liste des espaces */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Espaces</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom</TableHead>
                                            <TableHead>Capacité</TableHead>
                                            <TableHead>Équipements</TableHead>
                                            <TableHead>Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {spaces.map((space) => (
                                            <TableRow key={space.id}>
                                                <TableCell>{space.name}</TableCell>
                                                <TableCell>{space.capacity} personnes</TableCell>
                                                <TableCell>{space.equipment.join(', ')}</TableCell>
                                                <TableCell>
                                                    <Badge variant={space.status === 'available' ? 'default' : 'warning'}>
                                                        {space.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Liste des réservations */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Réservations récentes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Espace</TableHead>
                                            <TableHead>Utilisateur</TableHead>
                                            <TableHead>Date de début</TableHead>
                                            <TableHead>Date de fin</TableHead>
                                            <TableHead>Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {reservations.map((reservation) => (
                                            <TableRow key={reservation.id}>
                                                <TableCell>{reservation.space}</TableCell>
                                                <TableCell>{reservation.user}</TableCell>
                                                <TableCell>{new Date(reservation.start).toLocaleString()}</TableCell>
                                                <TableCell>{new Date(reservation.end).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            reservation.status === 'confirmed'
                                                                ? 'default'
                                                                : reservation.status === 'pending'
                                                                ? 'warning'
                                                                : 'destructive'
                                                        }
                                                    >
                                                        {reservation.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Logs système */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Logs système</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Message</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {system.logs.map((log, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            log.type === 'info'
                                                                ? 'default'
                                                                : log.type === 'warning'
                                                                ? 'warning'
                                                                : 'destructive'
                                                        }
                                                    >
                                                        {log.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{log.message}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <motion.div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo and Toggle */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                        <button
                            className="md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
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

                    {/* User Info and Logout */}
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
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg hover:bg-muted"
                            >
                                <FiLogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 bg-background border-b">
                    <div className="flex items-center justify-between h-16 px-4">
                        <button
                            className="md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-muted">
                                <FiBell className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardAdmin;