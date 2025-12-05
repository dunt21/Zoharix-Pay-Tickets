"use client"

import type React from "react"
import { useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaCamera, FaClock, FaDollarSign, FaCheckCircle } from "react-icons/fa"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import "./Services.css"

interface Service {
  id: string
  name: string
  category: string
  price: number
  duration: string
  description: string
  availability: string
  bookings: number
  portfolio: string[]
}

const Services: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Haircut",
      category: "Hair",
      price: 35.0,
      duration: "30 mins",
      description: "Professional haircut with styling",
      availability: "Mon-Sat",
      bookings: 42,
      portfolio: [],
    },
  ])
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    availability: "",
  })

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in all required fields")
      return
    }

    const newService: Service = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      duration: formData.duration,
      description: formData.description,
      availability: formData.availability,
      bookings: 0,
      portfolio: [],
    }

    setServices([...services, newService])
    setFormData({
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      availability: "",
    })
    setShowCreateForm(false)
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const categories = ["Hair", "Makeup", "Fitness", "Spa", "Consulting", "Other"]

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Your Services</h1>
        <Button variant="primary" icon={<FaPlus />} onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Add New Service"}
        </Button>
      </div>

      {showCreateForm && (
        <div className="create-service-form">
          <h2>Add New Service</h2>
          <form onSubmit={handleCreateService}>
            <div className="form-row">
              <Input
                label="Service Name *"
                type="text"
                placeholder="e.g., Haircut, Makeup"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
              />
              <div className="form-group">
                <label className="input-label">Category *</label>
                <select
                  className="service-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <Input
                label="Price *"
                type="number"
                icon={<FaDollarSign />}
                placeholder="0.00"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                fullWidth
              />
              <Input
                label="Duration"
                type="text"
                icon={<FaClock />}
                placeholder="e.g., 30 mins"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                fullWidth
              />
            </div>

            <Input
              label="Availability"
              type="text"
              placeholder="e.g., Mon-Sat"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              fullWidth
            />

            <div className="form-group">
              <label className="input-label">Description</label>
              <textarea
                className="service-textarea"
                placeholder="Describe your service in detail"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                Add Service
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="services-list">
        <h2>Your Services ({services.length})</h2>
        {services.length === 0 ? (
          <p className="no-services">No services yet. Add your first service!</p>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-header">
                  <div>
                    <h3>{service.name}</h3>
                    <span className="service-category">{service.category}</span>
                  </div>
                  <span className="service-price">${service.price.toFixed(2)}</span>
                </div>

                {service.description && <p className="service-description">{service.description}</p>}

                <div className="service-details">
                  {service.duration && (
                    <div className="detail-item">
                      <FaClock />
                      <span>{service.duration}</span>
                    </div>
                  )}
                  {service.availability && (
                    <div className="detail-item">
                      <FaCheckCircle />
                      <span>{service.availability}</span>
                    </div>
                  )}
                </div>

                <div className="service-stats">
                  <span className="stat">Bookings: {service.bookings}</span>
                </div>

                <div className="service-actions">
                  <Button variant="secondary" icon={<FaCamera />} title="Add Portfolio">
                    Portfolio
                  </Button>
                  <Button variant="secondary" icon={<FaEdit />} title="Edit Service">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteService(service.id)}
                    title="Delete Service"
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

export default Services
