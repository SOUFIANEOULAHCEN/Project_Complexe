import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import mockData from '../../mockData.json';

const SpaceSection = () => {
    const { spaces } = mockData;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Espaces</CardTitle>
                <div className="flex gap-2">
                    <Input placeholder="Rechercher..." className="w-[200px]" />
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
};

export default SpaceSection;
