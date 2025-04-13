import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CommentsSection = ({ comments, users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            user: '',
            content: '',
            rating: 5
        }
    });

    const filteredComments = comments.filter(comment => {
        return comment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
               comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleAddComment = (data) => {
        // Logique d'ajout de commentaire
        console.log('Ajouter commentaire:', data);
        setIsAddModalOpen(false);
        form.reset();
    };

    const handleEditComment = (data) => {
        // Logique de modification de commentaire
        console.log('Modifier commentaire:', data);
        setIsEditModalOpen(false);
        form.reset();
    };

    const handleDeleteComment = (commentId) => {
        // Logique de suppression de commentaire
        console.log('Supprimer commentaire:', commentId);
    };

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{comments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length).toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Set(comments.map(comment => comment.user)).size}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tableau des commentaires */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Comments List</CardTitle>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search comments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[200px]"
                        />
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <FiPlus className="mr-2" />
                                    Add Comment
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Comment</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleAddComment)} className="space-y-4">
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
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Content</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Enter comment content" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="rating"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Rating</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select rating" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {[1, 2, 3, 4, 5].map(rating => (
                                                                <SelectItem key={rating} value={rating}>
                                                                    {rating} stars
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="submit">Add Comment</Button>
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
                                <TableHead>User</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredComments.map((comment) => (
                                <TableRow key={comment.id}>
                                    <TableCell>{comment.user}</TableCell>
                                    <TableCell>{comment.content}</TableCell>
                                    <TableCell>
                                        <Badge variant="default">
                                            {comment.rating} stars
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(comment.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedComment(comment);
                                                            form.reset({
                                                                user: comment.user,
                                                                content: comment.content,
                                                                rating: comment.rating
                                                            });
                                                        }}
                                                    >
                                                        <FiEdit2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Comment</DialogTitle>
                                                    </DialogHeader>
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(handleEditComment)} className="space-y-4">
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
                                                                name="content"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Content</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="rating"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Rating</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select rating" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {[1, 2, 3, 4, 5].map(rating => (
                                                                                    <SelectItem key={rating} value={rating}>
                                                                                        {rating} stars
                                                                                    </SelectItem>
                                                                                ))}
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
                                                onClick={() => handleDeleteComment(comment.id)}
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

export default CommentsSection; 