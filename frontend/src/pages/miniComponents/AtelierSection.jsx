import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';

const AtelierSection = () => {
    const [ateliers, setAteliers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAtelier, setSelectedAtelier] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const { token } = useAuth();

    const [newAtelier, setNewAtelier] = useState({
        nom: '',
        description: '',
        animateur: '',
        date: '',
        heure: '',
        idCalendar: '',
    });

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const fetchAteliers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/ateliers/ateliers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAteliers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des ateliers:', error);
            showNotification('Erreur lors de la récupération des ateliers', 'error');
        }
    };

    useEffect(() => {
        fetchAteliers();
    }, [token]);

    const handleAddAtelier = async () => {
        try {
            if (!newAtelier.nom || !newAtelier.description || !newAtelier.animateur || !newAtelier.date || !newAtelier.heure) {
                showNotification('Veuillez remplir tous les champs requis', 'error');
                return;
            }

            await axios.post('http://localhost:3000/api/ateliers/ateliers', newAtelier, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            await fetchAteliers();
            setIsAddModalOpen(false);
            setNewAtelier({ nom: '', description: '', animateur: '', date: '', heure: '', idCalendar: '' });
            showNotification('Atelier ajouté avec succès');
        } catch (err) {
            console.error('Erreur lors de l\'ajout de l\'atelier:', err);
            showNotification('Erreur lors de l\'ajout de l\'atelier', 'error');
        }
    };

    const handleEditAtelier = (atelier) => {
        setSelectedAtelier(atelier);
        setIsEditModalOpen(true);
    };

    const handleSaveAtelier = async () => {
        try {
            await axios.put(`http://localhost:3000/api/ateliers/ateliers/${selectedAtelier.idAtelier}`, selectedAtelier, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            await fetchAteliers();
            setIsEditModalOpen(false);
            showNotification('Atelier mis à jour avec succès');
        } catch (err) {
            console.error('Erreur lors de la mise à jour de l\'atelier:', err);
            showNotification('Erreur lors de la mise à jour de l\'atelier', 'error');
        }
    };

    const handleDeleteClick = (atelier) => {
        setSelectedAtelier(atelier);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/ateliers/ateliers/${selectedAtelier.idAtelier}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchAteliers();
            setIsDeleteModalOpen(false);
            showNotification('Atelier supprimé avec succès');
        } catch (err) {
            console.error('Erreur lors de la suppression de l\'atelier:', err);
            showNotification('Erreur lors de la suppression de l\'atelier', 'error');
        }
    };

    const filteredAteliers = ateliers.filter(atelier =>
        atelier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atelier.animateur.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Ateliers</CardTitle>
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
                            <TableHead>Description</TableHead>
                            <TableHead>Animateur</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Heure</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAteliers.map((atelier) => (
                            <TableRow key={atelier.idAtelier}>
                                <TableCell>{atelier.nom}</TableCell>
                                <TableCell>{atelier.description}</TableCell>
                                <TableCell>{atelier.animateur}</TableCell>
                                <TableCell>{format(new Date(atelier.date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{atelier.heure}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditAtelier(atelier)}>
                                            <FiEdit2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(atelier)}>
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
                    <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {notification.message}
                    </div>
                )}

                {/* Modal d'ajout */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajouter un atelier</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input placeholder="Nom" value={newAtelier.nom} onChange={(e) => setNewAtelier({ ...newAtelier, nom: e.target.value })} />
                            <Input placeholder="Description" value={newAtelier.description} onChange={(e) => setNewAtelier({ ...newAtelier, description: e.target.value })} />
                            <Input placeholder="Animateur" value={newAtelier.animateur} onChange={(e) => setNewAtelier({ ...newAtelier, animateur: e.target.value })} />
                            <Input type="date" value={newAtelier.date} onChange={(e) => setNewAtelier({ ...newAtelier, date: e.target.value })} />
                            <Input type="time" value={newAtelier.heure} onChange={(e) => setNewAtelier({ ...newAtelier, heure: e.target.value })} />
                            <Input placeholder="ID Calendar (optionnel)" value={newAtelier.idCalendar} onChange={(e) => setNewAtelier({ ...newAtelier, idCalendar: e.target.value })} />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Annuler</Button>
                            <Button onClick={handleAddAtelier}>Ajouter</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Modal d'édition */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modifier l'atelier</DialogTitle>
                        </DialogHeader>
                        {selectedAtelier && (
                            <div className="space-y-4">
                                <Input value={selectedAtelier.nom} onChange={(e) => setSelectedAtelier({ ...selectedAtelier, nom: e.target.value })} />
                                <Input value={selectedAtelier.description} onChange={(e) => setSelectedAtelier({ ...selectedAtelier, description: e.target.value })} />
                                <Input value={selectedAtelier.animateur} onChange={(e) => setSelectedAtelier({ ...selectedAtelier, animateur: e.target.value })} />
                                <Input type="date" value={selectedAtelier.date.split('T')[0]} onChange={(e) => setSelectedAtelier({ ...selectedAtelier, date: e.target.value })} />
                                <Input type="time" value={selectedAtelier.heure} onChange={(e) => setSelectedAtelier({ ...selectedAtelier, heure: e.target.value })} />
                                <Input value={selectedAtelier.idCalendar || ''} onChange={(e) => setSelectedAtelier({ ...selectedAtelier, idCalendar: e.target.value })} />
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Annuler</Button>
                            <Button onClick={handleSaveAtelier}>Enregistrer</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Modal de suppression */}
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                        </DialogHeader>
                        <p>Êtes-vous sûr de vouloir supprimer cet atelier ?</p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>Supprimer</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default AtelierSection;
