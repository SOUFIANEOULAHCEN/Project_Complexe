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

const UsersSection = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            role: 'user',
            status: 'active'
        }
    });

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddUser = (data) => {
        // Logique d'ajout d'utilisateur
        console.log('Ajouter utilisateur:', data);
        setIsAddModalOpen(false);
        form.reset();
    };

    const handleEditUser = (data) => {
        // Logique de modification d'utilisateur
        console.log('Modifier utilisateur:', data);
        setIsEditModalOpen(false);
        form.reset();
    };

    const handleDeleteUser = (userId) => {
        // Logique de suppression d'utilisateur
        console.log('Supprimer utilisateur:', userId);
    };

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {users.filter(user => user.status === 'active').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {users.filter(user => user.status === 'inactive').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tableau des utilisateurs */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Users List</CardTitle>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search users..."
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
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <FiPlus className="mr-2" />
                                    Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                            <SelectItem value="user">User</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="submit">Add User</Button>
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
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
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
                                            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            form.reset({
                                                                name: user.name,
                                                                email: user.email,
                                                                role: user.role,
                                                                status: user.status
                                                            });
                                                        }}
                                                    >
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit User</DialogTitle>
                                                    </DialogHeader>
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
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
                                                                name="email"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Email</FormLabel>
                                                                        <FormControl>
                                                                            <Input {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="role"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Role</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select role" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="admin">Admin</SelectItem>
                                                                                <SelectItem value="user">User</SelectItem>
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
                                                onClick={() => handleDeleteUser(user.id)}
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

export default UsersSection; 