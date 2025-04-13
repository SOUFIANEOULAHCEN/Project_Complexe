import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const SystemSection = ({ system }) => {
  return (
    <div className="space-y-6">
      {/* Statistiques système */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisation CPU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{system.cpuUsage}%</div>
            <Progress value={system.cpuUsage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisation mémoire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{system.memoryUsage}%</div>
            <Progress value={system.memoryUsage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espace disque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{system.diskUsage}%</div>
            <Progress value={system.diskUsage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

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

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {system.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <Badge variant={service.status === 'running' ? 'default' : 'destructive'}>
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSection; 