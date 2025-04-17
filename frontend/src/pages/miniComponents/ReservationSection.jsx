import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { showToast } from './Toaster';

const ReservationSection = () => {
    // State variables
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    
    // New reservation form data
    const [newReservation, setNewReservation] = useState({
        dateReservation: '',
        idUtilisateur: '',
        idEvenement: ''
    });
    
    // Get auth token
    const { token } = useAuth();
    
    // API base URL
    const API_URL = 'http://localhost:3000/api';

    // Fetch data on component mount
    useEffect(() => {
        fetchReservations();
        fetchUsers();
        fetchEvents();
    }, []);

    // Function to fetch reservations from API
    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/reservations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReservations(response.data);
            showToast('Réservations chargées avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors du chargement des réservations:', error);
            showToast('Erreur lors du chargement des réservations', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch users for dropdown
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
        }
    };

    // Function to fetch events for dropdown
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}/events`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des événements:', error);
        }
    };

    // Function to add a new reservation
    const handleAddReservation = async () => {
        try {
            // Validate required fields
            if (!newReservation.dateReservation || !newReservation.idUtilisateur || !newReservation.idEvenement) {
                showToast('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            // Send API request
            await axios.post(`${API_URL}/reservations`, newReservation, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh reservation list and reset form
            await fetchReservations();
            setIsAddModalOpen(false);
            setNewReservation({
                dateReservation: '',
                idUtilisateur: '',
                idEvenement: ''
            });
            showToast('Réservation ajoutée avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réservation:', error);
            showToast('Erreur lors de l\'ajout de la réservation', 'error');
        }
    };

    // Function to delete a reservation
    const handleDeleteReservation = async () => {
        try {
            // Send API request
            await axios.delete(`${API_URL}/reservations/${selectedReservation.idReservation}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh reservation list
            await fetchReservations();
            setIsDeleteModalOpen(false);
            showToast('Réservation supprimée avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
            showToast('Erreur lors de la suppression de la réservation', 'error');
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch (error) {
            return 'Date invalide';
        }
    };

    // Get user name by ID
    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.nom : 'Utilisateur inconnu';
    };

    // Get event name by ID
    const getEventName = (eventId) => {
        const event = events.find(e => e.idEvent === eventId);
        return event ? event.nom : 'Événement inconnu';
    };

    // Filter reservations based on search term
    const filteredReservations = reservations.filter(reservation => {
        const userName = getUserName(reservation.idUtilisateur).toLowerCase();
        const eventName = getEventName(reservation.idEvenement).toLowerCase();
        return userName.includes(searchTerm.toLowerCase()) || 
               eventName.includes(searchTerm.toLowerCase());
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestion des Réservations</CardTitle>
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
                                <TableHead>Date</TableHead>
                                <TableHead>Utilisateur</TableHead>
                                <TableHead>Événement</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReservations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Aucune réservation trouvée</TableCell>
                                </TableRow>
                            ) : (
                                filteredReservations.map((reservation) => (
                                    <TableRow key={reservation.idReservation}>
                                        <TableCell>{formatDate(reservation.dateReservation)}</TableCell>
                                        <TableCell>{getUserName(reservation.idUtilisateur)}</TableCell>
                                        <TableCell>{getEventName(reservation.idEvenement)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedReservation(reservation);
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

                {/* Add Reservation Modal */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajouter une réservation</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Date de réservation</label>
                                <Input
                                    type="date"
                                    value={newReservation.dateReservation}
                                    onChange={(e) => setNewReservation({ ...newReservation, dateReservation: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Utilisateur</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={newReservation.idUtilisateur}
                                    onChange={(e) => setNewReservation({ ...newReservation, idUtilisateur: e.target.value })}
                                >
                                    <option value="">Sélectionner un utilisateur</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Événement</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={newReservation.idEvenement}
                                    onChange={(e) => setNewReservation({ ...newReservation, idEvenement: e.target.value })}
                                >
                                    <option value="">Sélectionner un événement</option>
                                    {events.map(event => (
                                        <option key={event.idEvent} value={event.idEvent}>{event.nom}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleAddReservation}>
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Reservation Modal */}
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                        </DialogHeader>
                        <p>Êtes-vous sûr de vouloir supprimer cette réservation ?</p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteReservation}>
                                Supprimer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default ReservationSection;