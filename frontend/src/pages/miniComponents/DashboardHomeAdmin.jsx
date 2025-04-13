import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHomeAdmin = ({ dashboard, users, spaces, reservations, comments }) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.slice(0, 6).map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des espaces */}
      <Card>
        <CardHeader>
          <CardTitle>Espaces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.slice(0, 6).map((space) => (
              <div key={space.id} className="p-4 border rounded-lg">
                <h3 className="font-medium">{space.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Capacité: {space.capacity} personnes
                </p>
                <div className="mt-2">
                  <Badge variant={space.status === 'available' ? 'default' : 'warning'}>
                    {space.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des réservations */}
      <Card>
        <CardHeader>
          <CardTitle>Réservations récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.slice(0, 5).map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{reservation.space}</p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.user} - {new Date(reservation.start).toLocaleDateString()}
                  </p>
                </div>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHomeAdmin; 