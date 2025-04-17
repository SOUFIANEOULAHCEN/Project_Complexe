import axios from 'axios';

// Fetch reservations from the backend
export const getReservations = () => {
    return axios.get('/reservations');
};

// Fetch events from the backend
export const getEvents = () => {
    return axios.get('/events');
};

// Fetch talents from the backend
export const getTalents = () => {
    return axios.get('/talents');
};