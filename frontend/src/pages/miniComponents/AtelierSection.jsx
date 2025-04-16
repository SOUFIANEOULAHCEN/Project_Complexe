import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { showToast } from './Toaster';

const AtelierSection = () => {
    // State variables
    const [ateliers, setAteliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAtelier, setSelectedAtelier] = useState(null);
    
    // New atelier form data
    const [newAtelier, setNewAtelier] = useState({
        nom: '',
        dateDebut: '',
        dateFin: '',
        organisateur: '',
        idCalendar: ''
    });
    
    // Get auth token
    const { token } = useAuth();
    
    // API base URL
    const API_URL = 'http://localhost:3000/api';

    // Fetch ateliers on component mount
    useEffect(() => {
        fetchAteliers();
    }, []);

    // Function to fetch ateliers from API
    const fetchAteliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/ateliers/ateliers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAteliers(response.data);
            showToast('Ateliers chargés avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors du chargement des ateliers:', error);
            showToast('Erreur lors du chargement des ateliers', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new atelier
    const handleAddAtelier = async () => {
        try {
            // Validate required fields
            if (!newAtelier.nom || !newAtelier.dateDebut || !newAtelier.dateFin || !newAtelier.organisateur) {
                showToast('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            // Send API request
            await axios.post(`${API_URL}/ateliers/ateliers`, newAtelier, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh atelier list and reset form
            await fetchAteliers();
            setIsAddModalOpen(false);
            setNewAtelier({
                nom: '',
                dateDebut: '',
                dateFin: '',
                organisateur: '',
                idCalendar: ''
            });
            showToast('Atelier ajouté avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'atelier:', error);
            showToast('Erreur lors de l\'ajout de l\'atelier', 'error');
        }
    };

    // Function to update an atelier
    const handleUpdateAtelier = async () => {
        try {
            // Send API request
            await axios.put(`${API_URL}/ateliers/ateliers/${selectedAtelier.idAtelier}`, selectedAtelier, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh atelier list
            await fetchAteliers();
            setIsEditModalOpen(false);
            showToast('Atelier mis à jour avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'atelier:', error);
            showToast('Erreur lors de la mise à jour de l\'atelier', 'error');
        }
    };

    // Function to delete an atelier
    const handleDeleteAtelier = async () => {
        try {
            // Send API request
            await axios.delete(`${API_URL}/ateliers/ateliers/${selectedAtelier.idAtelier}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh atelier list
            await fetchAteliers();
            setIsDeleteModalOpen(false);
            showToast('Atelier supprimé avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'atelier:', error);
            showToast('Erreur lors de la suppression de l\'atelier', 'error');
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

    // Filter ateliers based on search term
    const filteredAteliers = ateliers.filter(atelier => 
        atelier.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atelier.organisateur?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestion des Ateliers</CardTitle>
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
                                <TableHead>Date Début</TableHead>
                                <TableHead>Date Fin</TableHead>
                                <TableHead>Organisateur</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAteliers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">Aucun atelier trouvé</TableCell>
                                </TableRow>
                            ) : (
                                filteredAteliers.map((atelier) => (
                                    <TableRow key={atelier.idAtelier}>
                                        <TableCell>{atelier.nom}</TableCell>
                                        <TableCell>{formatDate(atelier.dateDebut)}</TableCell>
                                        <TableCell>{formatDate(atelier.dateFin)}</TableCell>
                                        <TableCell>{atelier.organisateur}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedAtelier(atelier);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedAtelier(atelier);
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

                {/* Add Atelier Modal */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajouter un atelier</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Nom</label>
                                <Input
                                    value={newAtelier.nom}
                                    onChange={(e) => setNewAtelier({ ...newAtelier, nom: e.target.value })}
                                    placeholder="Nom de l'atelier"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Date de début</label>
                                <Input
                                    type="date"
                                    value={newAtelier.dateDebut}
                                    onChange={(e) => setNewAtelier({ ...newAtelier, dateDebut: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Date de fin</label>
                                <Input
                                    type="date"
                                    value={newAtelier.dateFin}
                                    onChange={(e) => setNewAtelier({ ...newAtelier, dateFin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Organisateur</label>
                                <Input
                                    value={newAtelier.organisateur}
                                    onChange={(e) => setNewAtelier({ ...newAtelier, organisateur: e.target.value })}
                                    placeholder="Nom de l'organisateur"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">ID Calendar (optionnel)</label>
                                <Input
                                    value={newAtelier.idCalendar}
                                    onChange={(e) => setNewAtelier({ ...newAtelier, idCalendar: e.target.value })}
                                    placeholder="ID du calendrier"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleAddAtelier}>
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Atelier Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modifier l'atelier</DialogTitle>
                        </DialogHeader>
                        {selectedAtelier && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Nom</label>
                                    <Input
                                        value={selectedAtelier.nom}
                                        onChange={(e) => setSelectedAtelier({ ...selectedAtelier, nom: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Date de début</label>
                                    <Input
                                        type="date"
                                        value={selectedAtelier.dateDebut?.split('T')[0]}
                                        onChange={(e) => setSelectedAtelier({ ...selectedAtelier, dateDebut: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Date de fin</label>
                                    <Input
                                        type="date"
                                        value={selectedAtelier.dateFin?.split('T')[0]}
                                        onChange={(e) => setSelectedAtelier({ ...selectedAtelier, dateFin: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Organisateur</label>
                                    <Input
                                        value={selectedAtelier.organisateur}
                                        onChange={(e) => setSelectedAtelier({ ...selectedAtelier, organisateur: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">ID Calendar (optionnel)</label>
                                    <Input
                                        value={selectedAtelier.idCalendar || ''}
                                        onChange={(e) => setSelectedAtelier({ ...selectedAtelier, idCalendar: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleUpdateAtelier}>
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Atelier Modal */}
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                        </DialogHeader>
                        <p>Êtes-vous sûr de vouloir supprimer cet atelier ?</p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteAtelier}>
                                Supprimer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default AtelierSection;