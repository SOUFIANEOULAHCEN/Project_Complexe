import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const UserSection = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const { token } = useAuth();
    const [newUser, setNewUser] = useState({
        nom: '',
        email: '',
        password: '',
        typeUser: 'user',
        status: 'active'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/users', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Filtrer pour ne montrer que les utilisateurs de type 'user'
            const regularUsers = response.data.filter(user => user.typeUser === 'user');
            setUsers(regularUsers);
        } catch (error) {
            console.error('Error fetching users:', error.response || error);
            if (error.response) {
                showNotification(`Erreur: ${error.response.data.message || 'Erreur serveur'}`, 'error');
            } else if (error.request) {
                showNotification('Erreur: Pas de réponse du serveur', 'error');
            } else {
                showNotification('Erreur: Impossible de faire la requête', 'error');
            }
        }
    };

    const handleAddUser = async () => {
        try {
            // Vérification des champs requis
            if (!newUser.nom || !newUser.email || !newUser.password) {
                showNotification('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            // Log des données envoyées
            console.log('Tentative d\'ajout d\'utilisateur avec les données:', {
                ...newUser,
                password: '***' // On masque le mot de passe dans les logs
            });

            const response = await axios.post('http://localhost:3000/api/users/register', 
                {
                    nom: newUser.nom,
                    email: newUser.email,
                    password: newUser.password,
                    typeUser: 'user',
                    status: newUser.status || 'active'
                }, 
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Réponse du serveur:', response.data);
            await fetchUsers();
            setIsAddModalOpen(false);
            setNewUser({ nom: '', email: '', password: '', typeUser: 'user', status: 'active' });
            showNotification('Utilisateur ajouté avec succès');
        } catch (err) {
            console.error('Erreur détaillée:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                statusText: err.response?.statusText
            });

            if (err.response) {
                // Erreur avec réponse du serveur
                const errorMessage = err.response.data?.message || 'Erreur lors de l\'ajout';
                showNotification(`Erreur ${err.response.status}: ${errorMessage}`, 'error');
            } else if (err.request) {
                // Erreur sans réponse du serveur
                showNotification('Erreur: Le serveur ne répond pas. Vérifiez que le backend est en cours d\'exécution.', 'error');
            } else {
                // Erreur lors de la création de la requête
                showNotification(`Erreur de requête: ${err.message}`, 'error');
            }
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser({
            ...user,
            status: user.status || 'inactive'
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleSaveUser = async () => {
        try {
            const updateData = {
                id: selectedUser.id,
                nom: selectedUser.nom,
                email: selectedUser.email,
                status: selectedUser.status || 'inactive'
            };

            await axios.put(`http://localhost:3000/api/users/profile`, updateData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            fetchUsers();
            setIsEditModalOpen(false);
            showNotification('Utilisateur mis à jour avec succès');
        } catch (err) {
            console.error('Error updating user:', err);
            if (err.response) {
                if (err.response.status === 403) {
                    showNotification('Vous ne pouvez pas modifier un administrateur', 'error');
                } else {
                    showNotification(`Erreur: ${err.response.data.message || 'Erreur lors de la mise à jour'}`, 'error');
                }
            } else {
                showNotification('Erreur lors de la mise à jour', 'error');
            }
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { id: selectedUser.id }
            });
            fetchUsers();
            setIsDeleteModalOpen(false);
            showNotification('Utilisateur supprimé avec succès');
        } catch (err) {
            console.error('Error deleting user:', err);
            if (err.response && err.response.status === 403) {
                showNotification('Vous ne pouvez pas supprimer un administrateur', 'error');
            } else {
                showNotification('Erreur lors de la suppression', 'error');
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Rechercher..." 
                        className="w-[200px]" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <FiPlus className="mr-2" />
                        Ajouter un utilisateur
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
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
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.nom}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                                        {user.status || 'inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <FiEdit2 className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => handleDeleteUser(user)}
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

            {/* Modal d'ajout */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un utilisateur</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Nom</label>
                            <Input
                                placeholder="Nom de l'utilisateur"
                                value={newUser.nom}
                                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="Email de l'utilisateur"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Mot de passe</label>
                            <Input
                                type="password"
                                placeholder="Mot de passe"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Statut</label>
                            <Select
                                value={newUser.status}
                                onValueChange={(value) => setNewUser({ ...newUser, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Actif</SelectItem>
                                    <SelectItem value="inactive">Inactif</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => {
                            setIsAddModalOpen(false);
                            setNewUser({ nom: '', email: '', password: '', typeUser: 'user', status: 'active' });
                        }}>
                            Annuler
                        </Button>
                        <Button onClick={handleAddUser}>
                            Ajouter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal d'édition */}
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
                                <Select
                                    value={selectedUser.status}
                                    onValueChange={(value) => setSelectedUser({ ...selectedUser, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Actif</SelectItem>
                                        <SelectItem value="inactive">Inactif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Annuler
                        </Button>
                        <Button onClick={handleSaveUser}>
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal de suppression */}
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
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Supprimer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Notification */}
            {notification.show && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}>
                    {notification.message}
                </div>
            )}
        </Card>
    );
};

export default UserSection;
