import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mockData from '../../mockData.json';

const DashboardContent = () => {
    const { dashboard, users, spaces, reservations, system } = mockData;

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
};

export default DashboardContent;
