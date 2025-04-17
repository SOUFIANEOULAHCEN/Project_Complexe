import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getUsers } from '../../services/dataService';
import { getTalents, getReservations, getEvents } from '../../services/dataService';

const DashboardContent = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [talents, setTalents] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);

    // Counts
    const [userCount, setUserCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [talentCount, setTalentCount] = useState(0);
    const [reservationCount, setReservationCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, talentsRes, reservationsRes, eventsRes] = await Promise.all([
                    getUsers(),
                    getTalents(),
                    getReservations(),
                    getEvents()
                ]);
                const usersData = usersRes.data ?? [];
                const talentsData = talentsRes.data ?? [];
                const reservationsData = reservationsRes.data ?? [];
                const eventsData = eventsRes.data ?? [];

                setUsers(usersData);
                setTalents(talentsData);
                setReservations(reservationsData);
                setEvents(eventsData);

                setUserCount(usersData.filter(u => u.typeUser === 'user').length);
                setAdminCount(usersData.filter(u => u.typeUser === 'admin').length);
                setTalentCount(talentsData.length);
                setReservationCount(reservationsData.length);
                setEventCount(eventsData.length);
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Chart data
    const chartData = [
        { name: 'Utilisateurs', count: userCount },
        { name: 'Admins', count: adminCount },
        { name: 'Talents', count: talentCount },
        { name: 'Réservations', count: reservationCount },
        { name: 'Événements', count: eventCount }
    ];

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Admins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Talents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{talentCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Réservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reservationCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Événements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{eventCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Bar Chart: Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Statistiques globales</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardContent;
