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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const ReservationsSection = ({ reservations, users, spaces }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            space: '',
            user: '',
            start: new Date(),
            end: new Date(),
            status: 'pending'
        }
    });

    const filteredReservations = reservations.filter(reservation => {
        const matchesSearch = reservation.space.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            reservation.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddReservation = (data) => {
        // Logique d'ajout de réservation
        console.log('Ajouter réservation:', data);
        setIsAddModalOpen(false);
        form.reset();
    };

    const handleEditReservation = (data) => {
        // Logique de modification de réservation
        console.log('Modifier réservation:', data);
        setIsEditModalOpen(false);
        form.reset();
    };

    const handleDeleteReservation = (reservationId) => {
        // Logique de suppression de réservation
        console.log('Supprimer réservation:', reservationId);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reservations.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {reservations.filter(r => r.status === 'confirmed').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {reservations.filter(r => r.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tableau des réservations */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Reservations List</CardTitle>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search reservations..."
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
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <FiPlus className="mr-2" />
                                    Add Reservation
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Reservation</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleAddReservation)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="space"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Space</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select space" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {spaces.map(space => (
                                                                <SelectItem key={space.id} value={space.id}>
                                                                    {space.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="user"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>User</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select user" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {users.map(user => (
                                                                <SelectItem key={user.id} value={user.id}>
                                                                    {user.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="start"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Start Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full pl-3 text-left font-normal"
                                                                >
                                                                    {field.value ? (
                                                                        formatDate(field.value)
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="end"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>End Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full pl-3 text-left font-normal"
                                                                >
                                                                    {field.value ? (
                                                                        formatDate(field.value)
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="submit">Add Reservation</Button>
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
                                <TableHead>Space</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.space}</TableCell>
                                    <TableCell>{reservation.user}</TableCell>
                                    <TableCell>{formatDate(reservation.start)}</TableCell>
                                    <TableCell>{formatDate(reservation.end)}</TableCell>
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
                                            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedReservation(reservation);
                                                            form.reset({
                                                                space: reservation.space,
                                                                user: reservation.user,
                                                                start: new Date(reservation.start),
                                                                end: new Date(reservation.end),
                                                                status: reservation.status
                                                            });
                                                        }}
                                                    >
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Reservation</DialogTitle>
                                                    </DialogHeader>
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(handleEditReservation)} className="space-y-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="space"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Space</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select space" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {spaces.map(space => (
                                                                                    <SelectItem key={space.id} value={space.id}>
                                                                                        {space.name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="user"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>User</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select user" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {users.map(user => (
                                                                                    <SelectItem key={user.id} value={user.id}>
                                                                                        {user.name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="start"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex flex-col">
                                                                        <FormLabel>Start Date</FormLabel>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <FormControl>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        className="w-full pl-3 text-left font-normal"
                                                                                    >
                                                                                        {field.value ? (
                                                                                            formatDate(field.value)
                                                                                        ) : (
                                                                                            <span>Pick a date</span>
                                                                                        )}
                                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                                    </Button>
                                                                                </FormControl>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                                <Calendar
                                                                                    mode="single"
                                                                                    selected={field.value}
                                                                                    onSelect={field.onChange}
                                                                                    initialFocus
                                                                                />
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="end"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex flex-col">
                                                                        <FormLabel>End Date</FormLabel>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <FormControl>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        className="w-full pl-3 text-left font-normal"
                                                                                    >
                                                                                        {field.value ? (
                                                                                            formatDate(field.value)
                                                                                        ) : (
                                                                                            <span>Pick a date</span>
                                                                                        )}
                                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                                    </Button>
                                                                                </FormControl>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                                <Calendar
                                                                                    mode="single"
                                                                                    selected={field.value}
                                                                                    onSelect={field.onChange}
                                                                                    initialFocus
                                                                                />
                                                                            </PopoverContent>
                                                                        </Popover>
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
                                                onClick={() => handleDeleteReservation(reservation.id)}
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

export default ReservationsSection; 