import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { showToast } from './Toaster';

const UserSection = () => {
    // State variables
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    // New user form data
    const [newUser, setNewUser] = useState({
        nom: '',
        email: '',
        password: '',
        typeUser: 'user',
        status: 'active'
    });
    
    // Get auth token
    const { token } = useAuth();
    
    // API base URL
    const API_URL = 'http://localhost:3000/api';

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/users/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Filter to show only regular users
            const regularUsers = response.data.filter(user => user.typeUser === 'user');
            setUsers(regularUsers);
            showToast('Utilisateurs chargés avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
            showToast('Erreur lors du chargement des utilisateurs', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new user
    const handleAddUser = async () => {
        try {
            // Validate required fields
            if (!newUser.nom || !newUser.email || !newUser.password) {
                showToast('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            // Send API request
            await axios.post(`${API_URL}/users/register`, newUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh user list and reset form
            await fetchUsers();
            setIsAddModalOpen(false);
            setNewUser({
                nom: '',
                email: '',
                password: '',
                typeUser: 'user',
                status: 'active'
            });
            showToast('Utilisateur ajouté avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            showToast(error.response?.data?.message || 'Erreur lors de l\'ajout de l\'utilisateur', 'error');
        }
    };

    // Function to update a user
    const handleUpdateUser = async () => {
        try {
            // Prepare update data
            const updateData = {
                id: selectedUser.id,
                nom: selectedUser.nom,
                email: selectedUser.email,
                status: selectedUser.status
            };
            
            // Send API request
            await axios.put(`${API_URL}/users/profile`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh user list
            await fetchUsers();
            setIsEditModalOpen(false);
            showToast('Utilisateur mis à jour avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            showToast(error.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur', 'error');
        }
    };

    // Function to delete a user
    const handleDeleteUser = async () => {
        try {
            // Send API request
            await axios.delete(`${API_URL}/users/profile`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { id: selectedUser.id }
            });
            
            // Refresh user list
            await fetchUsers();
            setIsDeleteModalOpen(false);
            showToast('Utilisateur supprimé avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            showToast(error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur', 'error');
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user => 
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Rechercher..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <FiPlus className="mr-2" />
                        Ajouter
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center py-4">Chargement...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Aucun utilisateur trouvé</TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.nom}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                                {user.status || 'inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                >
                                                    <FiTrash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}

                {/* Add User Modal */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajouter un utilisateur</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Nom</label>
                                <Input
                                    value={newUser.nom}
                                    onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                                    placeholder="Nom de l'utilisateur"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="Email de l'utilisateur"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Mot de passe</label>
                                <Input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="Mot de passe"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleAddUser}>
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit User Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modifier l'utilisateur</DialogTitle>
                        </DialogHeader>
                        {selectedUser && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Nom</label>
                                    <Input
                                        value={selectedUser.nom}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, nom: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        value={selectedUser.email}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Statut</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedUser.status || 'inactive'}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                    >
                                        <option value="active">Actif</option>
                                        <option value="inactive">Inactif</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleUpdateUser}>
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete User Modal */}
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                        </DialogHeader>
                        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteUser}>
                                Supprimer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default UserSection;