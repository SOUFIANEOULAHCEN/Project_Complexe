import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsSection = ({ dashboard, users, spaces, reservations }) => {
  // Préparer les données pour les graphiques
  const userActivityData = users.map(user => ({
    name: user.name,
    reservations: reservations.filter(r => r.user === user.name).length
  }));

  const spaceUtilizationData = spaces.map(space => ({
    name: space.name,
    reservations: reservations.filter(r => r.space === space.name).length
  }));

  const reservationStatusData = [
    { name: 'Confirmées', value: reservations.filter(r => r.status === 'confirmed').length },
    { name: 'En attente', value: reservations.filter(r => r.status === 'pending').length },
    { name: 'Annulées', value: reservations.filter(r => r.status === 'cancelled').length }
  ];

  return (
    <div className="space-y-6">
      {/* Graphique d'activité des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Activité des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservations" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Graphique d'utilisation des espaces */}
      <Card>
        <CardHeader>
          <CardTitle>Utilisation des espaces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spaceUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservations" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Graphique des statuts de réservation */}
      <Card>
        <CardHeader>
          <CardTitle>Statut des réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reservationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {reservationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des statistiques détaillées */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Métrique</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Tendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Utilisateurs actifs</TableCell>
                <TableCell>{users.filter(u => u.status === 'active').length}</TableCell>
                <TableCell>
                  <Badge variant="default">+12%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Espaces disponibles</TableCell>
                <TableCell>{spaces.filter(s => s.status === 'available').length}</TableCell>
                <TableCell>
                  <Badge variant="default">+5%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Réservations confirmées</TableCell>
                <TableCell>{reservations.filter(r => r.status === 'confirmed').length}</TableCell>
                <TableCell>
                  <Badge variant="default">+8%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Taux d'occupation</TableCell>
                <TableCell>75%</TableCell>
                <TableCell>
                  <Badge variant="default">+3%</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection; 