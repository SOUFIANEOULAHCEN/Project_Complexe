import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';

const SpaceSection = () => {
    const [espaces, setEspaces] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEspace, setSelectedEspace] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    const [newEspace, setNewEspace] = useState({
        nom: '',
        dateDebut: '',
        dateFin: '',
        organisateur: '',
        idCalendar: ''
    });

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const fetchEspaces = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/espaces/espaces', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEspaces(response.data);
        } catch (error) {
            console.error('Error fetching espaces:', error);
            showNotification('Erreur lors de la récupération des espaces', 'error');
        }
    };

    useEffect(() => {
        fetchEspaces();
    }, [token]);

    const handleAddEspace = async () => {
        try {
            if (!newEspace.nom || !newEspace.dateDebut || !newEspace.dateFin || !newEspace.organisateur) {
                showNotification('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            await axios.post('http://localhost:3000/api/espaces/espaces', newEspace, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            await fetchEspaces();
            setIsAddModalOpen(false);
            setNewEspace({ nom: '', dateDebut: '', dateFin: '', organisateur: '', idCalendar: '' });
            showNotification('Espace ajouté avec succès');
        } catch (err) {
            console.error('Error adding espace:', err);
            showNotification('Erreur lors de l\'ajout de l\'espace', 'error');
        }
    };

    const handleEditEspace = (espace) => {
        setSelectedEspace(espace);
        setIsEditModalOpen(true);
    };

    const handleSaveEspace = async () => {
        try {
            await axios.put(`http://localhost:3000/api/espaces/espaces/${selectedEspace.idEspace}`, selectedEspace, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            await fetchEspaces();
            setIsEditModalOpen(false);
            showNotification('Espace mis à jour avec succès');
        } catch (err) {
            console.error('Error updating espace:', err);
            showNotification('Erreur lors de la mise à jour de l\'espace', 'error');
        }
    };

    const handleDeleteClick = (espace) => {
        setSelectedEspace(espace);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/espaces/espaces/${selectedEspace.idEspace}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchEspaces();
            setIsDeleteModalOpen(false);
            showNotification('Espace supprimé avec succès');
        } catch (err) {
            console.error('Error deleting espace:', err);
            showNotification('Erreur lors de la suppression de l\'espace', 'error');
        }
    };

    const filteredEspaces = espaces.filter(espace =>
        espace.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        espace.organisateur.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Espaces</CardTitle>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Rechercher..." 
                        className="w-[200px]"
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
                        {filteredEspaces.map((espace) => (
                            <TableRow key={espace.idEspace}>
                                <TableCell>{espace.nom}</TableCell>
                                <TableCell>{format(new Date(espace.dateDebut), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{format(new Date(espace.dateFin), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{espace.organisateur}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditEspace(espace)}>
                                            <FiEdit2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(espace)}>
                                            <FiTrash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Notification */}
                {notification.show && (
                    <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${
                        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                        {notification.message}
                    </div>
                )}

                {/* Modal d'ajout */}
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
                            <Button variant="outline" onClick={() => {
                                setIsAddModalOpen(false);
                                setNewEspace({ nom: '', dateDebut: '', dateFin: '', organisateur: '', idCalendar: '' });
                            }}>
                                Annuler
                            </Button>
                            <Button onClick={handleAddEspace}>
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Modal d'édition */}
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
                                        value={selectedEspace.dateDebut.split('T')[0]}
                                        onChange={(e) => setSelectedEspace({ ...selectedEspace, dateDebut: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Date de fin</label>
                                    <Input
                                        type="date"
                                        value={selectedEspace.dateFin.split('T')[0]}
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
                            <Button onClick={handleSaveEspace}>
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
                        <p>Êtes-vous sûr de vouloir supprimer cet espace ?</p>
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
            </CardContent>
        </Card>
    );
};

export default SpaceSection;
