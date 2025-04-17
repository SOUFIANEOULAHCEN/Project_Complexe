import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import mockData from '../../mockData.json'; // Remove mockData import
import { getEventsPerMonth, getReservationsCount, getUserEngagement } from '../../services/statisticsService';
// Add imports for new services
import { getReservations, getEvents, getTalents } from '../../services/dataService';

const DashboardContent = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Add state for real data
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);
    const [talents, setTalents] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const [eventsRes, reservationsRes, engagementRes] = await Promise.all([
                    getEventsPerMonth(),
                    getReservationsCount(),
                    getUserEngagement()
                ]);
                setStats({
                    eventsPerMonth: eventsRes.data,
                    reservations: reservationsRes.data,
                    engagement: engagementRes.data
                });
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };

        // Fetch real data for reservations, events, talents
        const fetchData = async () => {
            try {
                const [reservationsData, eventsData, talentsData] = await Promise.all([
                    getReservations(),
                    getEvents(),
                    getTalents()
                ]);
                // Map reservations
                setReservations((reservationsData.data ?? []).map(r => ({
                    id: r.idReservation || r.id || r.id_reservation,
                    name: r.nom || r.name || r.user || r.utilisateur || '',
                    date: r.dateReservation || r.date || r.date_debut || '',
                    status: r.statut || r.status || r.statut_reservation || ''
                })));
                // Map events
                setEvents((eventsData.data ?? []).map(e => ({
                    id: e.idEvenement || e.id || e.id_event,
                    title: e.titre || e.title || '',
                    date: e.dateDebut || e.date || e.date_event || '',
                    location: e.lieu || e.location || ''
                })));
                // Map talents
                setTalents((talentsData.data ?? []).map(t => ({
                    id: t.id || t.idTalent,
                    name: t.nom || t.name || '',
                    discipline: t.domaineExpertise || t.discipline || 'Aucune',
                    status: t.statut || t.status || ''
                })));
            } catch (err) {
                // handle error
            }
        };

        fetchStats();
        fetchData();
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Événements (mois courant)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats?.eventsPerMonth?.total ?? 0}
                        </div>
                        <Progress value={stats?.eventsPerMonth?.progress ?? 0} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Réservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats?.reservations?.total ?? 0}
                        </div>
                        <Progress value={stats?.reservations?.progress ?? 0} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Utilisateurs engagés</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats?.engagement?.totalUsers ?? 0}
                        </div>
                        <Progress value={stats?.engagement?.progress ?? 0} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Commentaires</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats?.engagement?.totalComments ?? 0}
                        </div>
                        <Progress value={stats?.engagement?.commentsProgress ?? 0} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            {/* Bar Chart: Events per Month */}
            <Card>
                <CardHeader>
                    <CardTitle>Événements par mois</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.eventsPerMonth?.months ?? []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Table: User Engagement */}
            <Card>
                <CardHeader>
                    <CardTitle>Engagement des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Utilisateur</TableHead>
                                <TableHead>Commentaires</TableHead>
                                <TableHead>Réservations</TableHead>
                                <TableHead>Newsletter</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(stats?.engagement?.users ?? []).map((user, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.comments > 0 ? 'default' : 'destructive'}>
                                            {user.comments}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.reservations}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.newsletter ? 'default' : 'secondary'}>
                                            {user.newsletter ? 'Oui' : 'Non'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Reservation Management Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Réservations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(reservations ?? []).map((res, idx) => (
                                <TableRow key={res.id || idx}>
                                    <TableCell>{res.name}</TableCell>
                                    <TableCell>{res.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={res.status === 'confirmé' ? 'default' : 'secondary'}>
                                            {res.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <button className="btn btn-sm btn-primary mr-2">Voir</button>
                                        <button className="btn btn-sm btn-secondary">Modifier</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Event Management Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Événements</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Lieu</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(events ?? []).map((event, idx) => (
                                <TableRow key={event.id || idx}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>
                                        <button className="btn btn-sm btn-primary mr-2">Voir</button>
                                        <button className="btn btn-sm btn-secondary">Modifier</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Talent Management Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Talents</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Discipline</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(talents ?? []).map((talent, idx) => (
                                <TableRow key={talent.id || idx}>
                                    <TableCell>{talent.name}</TableCell>
                                    <TableCell>{talent.discipline}</TableCell>
                                    <TableCell>
                                        <Badge variant={talent.status === 'validé' ? 'default' : 'secondary'}>
                                            {talent.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <button className="btn btn-sm btn-primary mr-2">Voir</button>
                                        <button className="btn btn-sm btn-secondary">Modifier</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Reports Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Rapports & Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="btn btn-primary">Exporter en PDF</button>
                        <button className="btn btn-secondary">Exporter en Excel</button>
                    </div>
                    {/* You can add more report visualizations here */}
                </CardContent>
            </Card>

            {/* Social Media Sharing Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Partager sur les Réseaux Sociaux</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <button className="btn btn-outline">Partager un événement</button>
                        <button className="btn btn-outline">Partager un talent</button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardContent;
