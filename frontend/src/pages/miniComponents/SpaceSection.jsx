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

const SpaceSection = () => {
    // State variables
    const [espaces, setEspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEspace, setSelectedEspace] = useState(null);
    
    // New espace form data
    const [newEspace, setNewEspace] = useState({
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

    // Fetch espaces on component mount
    useEffect(() => {
        fetchEspaces();
    }, []);

    // Function to fetch espaces from API
    const fetchEspaces = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/espaces/espaces`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEspaces(response.data);
            showToast('Espaces chargés avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors du chargement des espaces:', error);
            showToast('Erreur lors du chargement des espaces', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new espace
    const handleAddEspace = async () => {
        try {
            // Validate required fields
            if (!newEspace.nom || !newEspace.dateDebut || !newEspace.dateFin || !newEspace.organisateur) {
                showToast('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            // Send API request
            await axios.post(`${API_URL}/espaces/espaces`, newEspace, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh espace list and reset form
            await fetchEspaces();
            setIsAddModalOpen(false);
            setNewEspace({
                nom: '',
                dateDebut: '',
                dateFin: '',
                organisateur: '',
                idCalendar: ''
            });
            showToast('Espace ajouté avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'espace:', error);
            showToast('Erreur lors de l\'ajout de l\'espace', 'error');
        }
    };

    // Function to update an espace
    const handleUpdateEspace = async () => {
        try {
            // Send API request
            await axios.put(`${API_URL}/espaces/espaces/${selectedEspace.idEspace}`, selectedEspace, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh espace list
            await fetchEspaces();
            setIsEditModalOpen(false);
            showToast('Espace mis à jour avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'espace:', error);
            showToast('Erreur lors de la mise à jour de l\'espace', 'error');
        }
    };

    // Function to delete an espace
    const handleDeleteEspace = async () => {
        try {
            // Send API request
            await axios.delete(`${API_URL}/espaces/espaces/${selectedEspace.idEspace}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh espace list
            await fetchEspaces();
            setIsDeleteModalOpen(false);
            showToast('Espace supprimé avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'espace:', error);
            showToast('Erreur lors de la suppression de l\'espace', 'error');
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

    // Filter espaces based on search term
    const filteredEspaces = espaces.filter(espace => 
        espace.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        espace.organisateur?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestion des Espaces</CardTitle>
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
                            {filteredEspaces.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">Aucun espace trouvé</TableCell>
                                </TableRow>
                            ) : (
                                filteredEspaces.map((espace) => (
                                    <TableRow key={espace.idEspace}>
                                        <TableCell>{espace.nom}</TableCell>
                                        <TableCell>{formatDate(espace.dateDebut)}</TableCell>
                                        <TableCell>{formatDate(espace.dateFin)}</TableCell>
                                        <TableCell>{espace.organisateur}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedEspace(espace);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedEspace(espace);
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

                {/* Add Espace Modal */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajouter un espace</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Nom</label>
                                <Input
                                    value={newEspace.nom}
                                    onChange={(e) => setNewEspace({ ...newEspace, nom: e.target.value })}
                                    placeholder="Nom de l'espace"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Date de début</label>
                                <Input
                                    type="date"
                                    value={newEspace.dateDebut}
                                    onChange={(e) => setNewEspace({ ...newEspace, dateDebut: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Date de fin</label>
                                <Input
                                    type="date"
                                    value={newEspace.dateFin}
                                    onChange={(e) => setNewEspace({ ...newEspace, dateFin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Organisateur</label>
                                <Input
                                    value={newEspace.organisateur}
                                    onChange={(e) => setNewEspace({ ...newEspace, organisateur: e.target.value })}
                                    placeholder="Nom de l'organisateur"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">ID Calendar (optionnel)</label>
                                <Input
                                    value={newEspace.idCalendar}
                                    onChange={(e) => setNewEspace({ ...newEspace, idCalendar: e.target.value })}
                                    placeholder="ID du calendrier"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleAddEspace}>
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Espace Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modifier l'espace</DialogTitle>
                        </DialogHeader>
                        {selectedEspace && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Nom</label>
                                    <Input
                                        value={selectedEspace.nom}
                                        onChange={(e) => setSelectedEspace({ ...selectedEspace, nom: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Date de début</label>
                                    <Input
                                        type="date"
                                        value={selectedEspace.dateDebut?.split('T')[0]}
                                        onChange={(e) => setSelectedEspace({ ...selectedEspace, dateDebut: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Date de fin</label>
                                    <Input
                                        type="date"
                                        value={selectedEspace.dateFin?.split('T')[0]}
                                        onChange={(e) => setSelectedEspace({ ...selectedEspace, dateFin: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Organisateur</label>
                                    <Input
                                        value={selectedEspace.organisateur}
                                        onChange={(e) => setSelectedEspace({ ...selectedEspace, organisateur: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">ID Calendar (optionnel)</label>
                                    <Input
                                        value={selectedEspace.idCalendar || ''}
                                        onChange={(e) => setSelectedEspace({ ...selectedEspace, idCalendar: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleUpdateEspace}>
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Espace Modal */}
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                        </DialogHeader>
                        <p>Êtes-vous sûr de vouloir supprimer cet espace ?</p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteEspace}>
                                Supprimer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default SpaceSection;