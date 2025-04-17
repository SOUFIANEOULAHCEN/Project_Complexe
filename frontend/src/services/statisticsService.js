import axios from "axios";

export const getEventsPerMonth = () => axios.get("/statistics/evenements-mois");
export const getReservationsCount = () => axios.get("/statistics/reservations");
export const getUserEngagement = () => axios.get("/statistics/engagement-utilisateurs");