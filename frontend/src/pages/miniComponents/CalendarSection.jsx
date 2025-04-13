import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CalendarSection = ({ reservations }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getReservationsForDate = (date) => {
    return reservations.filter(reservation => {
      const reservationDate = new Date(reservation.start);
      return reservationDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    // Ajouter les jours vides du début
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border" />);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayReservations = getReservationsForDate(date);
      
      days.push(
        <div
          key={day}
          className={`h-24 border p-2 ${
            date.toDateString() === selectedDate.toDateString()
              ? 'bg-primary/10'
              : 'hover:bg-muted'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="font-medium">{day}</div>
          <div className="space-y-1 overflow-y-auto max-h-20">
            {dayReservations.map((reservation) => (
              <Badge
                key={reservation.id}
                variant={
                  reservation.status === 'confirmed'
                    ? 'default'
                    : reservation.status === 'pending'
                    ? 'warning'
                    : 'destructive'
                }
                className="block text-xs truncate"
              >
                {reservation.space} - {reservation.user}
              </Badge>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Calendrier</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <FiChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <FiChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
              <div key={day} className="text-center font-medium py-2">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </CardContent>
      </Card>

      {/* Détails de la journée sélectionnée */}
      <Card>
        <CardHeader>
          <CardTitle>
            Réservations du {selectedDate.toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getReservationsForDate(selectedDate).map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{reservation.space}</p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.user} - {new Date(reservation.start).toLocaleTimeString()}
                  </p>
                </div>
                <Badge
                  variant={
                    reservation.status === 'confirmed'
                      ? 'default'
                      : reservation.status === 'pending'
                      ? 'warning'
                      : 'destructive'
                  }
                >
                  {reservation.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSection; 