import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const SpacesSection = ({ spaces }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            name: '',
            capacity: '',
            equipment: [],
            status: 'available'
        }
    });

    const filteredSpaces = spaces.filter(space => {
        const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || space.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddSpace = (data) => {
        // Logique d'ajout d'espace
        console.log('Ajouter espace:', data);
        setIsAddModalOpen(false);
        form.reset();
    };

    const handleEditSpace = (data) => {
        // Logique de modification d'espace
        console.log('Modifier espace:', data);
        setIsEditModalOpen(false);
        form.reset();
    };

    const handleDeleteSpace = (spaceId) => {
        // Logique de suppression d'espace
        console.log('Supprimer espace:', spaceId);
    };

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{spaces.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available Spaces</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {spaces.filter(space => space.status === 'available').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {spaces.filter(space => space.status === 'maintenance').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tableau des espaces */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Spaces List</CardTitle>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search spaces..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[200px]"
                        />
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <FiPlus className="mr-2" />
                                    Add Space
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Space</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleAddSpace)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter space name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="capacity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Capacity</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Enter capacity" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="available">Available</SelectItem>
                                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="submit">Add Space</Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Equipment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSpaces.map((space) => (
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
                                            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedSpace(space);
                                                            form.reset({
                                                                name: space.name,
                                                                capacity: space.capacity,
                                                                equipment: space.equipment,
                                                                status: space.status
                                                            });
                                                        }}
                                                    >
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Space</DialogTitle>
                                                    </DialogHeader>
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(handleEditSpace)} className="space-y-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="name"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Name</FormLabel>
                                                                        <FormControl>
                                                                            <Input {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="capacity"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Capacity</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="status"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Status</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select status" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="available">Available</SelectItem>
                                                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <DialogFooter>
                                                                <Button type="submit">Save Changes</Button>
                                                            </DialogFooter>
                                                        </form>
                                                    </Form>
                                                </DialogContent>
                                            </Dialog>
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={() => handleDeleteSpace(space.id)}
                                            >
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
        </div>
    );
};

export default SpacesSection; 