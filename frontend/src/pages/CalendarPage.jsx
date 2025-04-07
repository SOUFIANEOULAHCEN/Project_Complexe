"use client"

import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import ReservationModal from "../components/ReservationModal"
import { Dialog } from "@headlessui/react"

export default function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleDateClick = (info) => {
    setSelectedDate(info.date)
    setIsModalOpen(true)
  }

  const handleEventClick = (info) => {
    setSelectedEvent(info.event)
    setEventModalOpen(true)
  }

  const addEvent = (formData) => {
    setEvents((prev) => [
      ...prev,
      {
        id: `${formData.title}-${new Date().getTime()}`,
        title: formData.title,
        start: formData.startDate,
        end: formData.endDate,
        description: `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}`,
        backgroundColor: "#FFA500", // Orange for pending
        extendedProps: {
          validated: false,
        },
      },
    ])
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-serif text-[#8B4513] mb-8">Calendrier des Réservations</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => (
              <div>
                <b>{eventInfo.event.title}</b>
              </div>
            )}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth",
            }}
            locale="fr"
            height="auto"
          />
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={addEvent}
      />

      <Dialog open={eventModalOpen} onClose={() => setEventModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full bg-white rounded-xl shadow-xl p-6">
            {selectedEvent && (
              <>
                <h2 className="text-xl font-bold text-[#8B4513]">{selectedEvent.title}</h2>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                  {selectedEvent.extendedProps.description}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Du {selectedEvent.start.toLocaleDateString()} au {selectedEvent.end.toLocaleDateString()}
                </p>
              </>
            )}
            <button
              onClick={() => setEventModalOpen(false)}
              className="mt-4 px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#6d3710]"
            >
              Fermer
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
