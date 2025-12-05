"use client"

import type React from "react"
import { useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaQrcode, FaShare, FaCalendar, FaMapMarkerAlt } from "react-icons/fa"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import "./Events.css"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  ticketsSold: number
  description: string
  price: number
}

const Events: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Tech Conference 2025",
      date: "2025-03-15",
      time: "10:00 AM",
      location: "Convention Center",
      ticketsSold: 150,
      description: "Annual technology conference",
      price: 49.99,
    },
  ])
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
  })

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.date || !formData.price) {
      alert("Please fill in all required fields")
      return
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      ticketsSold: 0,
      price: Number.parseFloat(formData.price),
    }

    setEvents([...events, newEvent])
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      price: "",
    })
    setShowCreateForm(false)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Your Events</h1>
        <Button variant="primary" icon={<FaPlus />} onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Create New Event"}
        </Button>
      </div>

      {showCreateForm && (
        <div className="create-event-form">
          <h2>Create New Event</h2>
          <form onSubmit={handleCreateEvent}>
            <div className="form-row">
              <Input
                label="Event Title *"
                type="text"
                placeholder="Enter event name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
              />
              <Input
                label="Price *"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                fullWidth
              />
            </div>

            <div className="form-row">
              <Input
                label="Date *"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                fullWidth
              />
              <Input
                label="Time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                fullWidth
              />
            </div>

            <Input
              label="Location"
              type="text"
              icon={<FaMapMarkerAlt />}
              placeholder="Event location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />

            <div className="form-group">
              <label className="input-label">Description</label>
              <textarea
                className="event-textarea"
                placeholder="Add details about your event"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                Create Event
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="events-list">
        <h2>Your Events ({events.length})</h2>
        {events.length === 0 ? (
          <p className="no-events">No events yet. Create your first event!</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-card-header">
                  <h3>{event.title}</h3>
                  <span className="event-price">${event.price.toFixed(2)}</span>
                </div>

                <div className="event-details">
                  <div className="event-detail-item">
                    <FaCalendar />
                    <span>
                      {event.date} at {event.time || "TBD"}
                    </span>
                  </div>
                  {event.location && (
                    <div className="event-detail-item">
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                {event.description && <p className="event-description">{event.description}</p>}

                <div className="event-stats">
                  <span className="stat">Tickets Sold: {event.ticketsSold}</span>
                </div>

                <div className="event-actions">
                  <Button variant="secondary" icon={<FaQrcode />} title="Generate QR Code">
                    QR Code
                  </Button>
                  <Button variant="secondary" icon={<FaShare />} title="Share Event">
                    Share
                  </Button>
                  <Button variant="secondary" icon={<FaEdit />} title="Edit Event">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteEvent(event.id)}
                    title="Delete Event"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
