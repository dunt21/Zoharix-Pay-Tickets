"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { FaPlus, FaCalendar, FaBriefcase, FaTicketAlt, FaWallet } from "react-icons/fa"
import "./DashboardHome.css"

const DashboardHome: React.FC = () => {
  const navigate = useNavigate()

  const quickActions = [
    {
      icon: <FaPlus />,
      label: "Create Event",
      description: "Launch a new event and start selling tickets",
      onClick: () => navigate("/dashboard/events"),
      color: "primary",
    },
    {
      icon: <FaBriefcase />,
      label: "Create Service",
      description: "Add a new service to your portfolio",
      onClick: () => navigate("/dashboard/services"),
      color: "secondary",
    },
    {
      icon: <FaTicketAlt />,
      label: "View Bookings",
      description: "Manage your upcoming bookings",
      onClick: () => navigate("/dashboard/bookings"),
      color: "primary",
    },
    {
      icon: <FaWallet />,
      label: "Wallet",
      description: "Check your balance and earnings",
      onClick: () => navigate("/dashboard/wallet"),
      color: "secondary",
    },
  ]

  const stats = [
    { label: "Total Events", value: "12", icon: <FaCalendar /> },
    { label: "Active Services", value: "8", icon: <FaBriefcase /> },
    { label: "Total Bookings", value: "156", icon: <FaTicketAlt /> },
    { label: "Revenue", value: "$4,250", icon: <FaWallet /> },
  ]

  return (
    <div className="dashboard-home">
      <div className="dashboard-greeting">
        <h1>Welcome back!</h1>
        <p>Here's your EventZ dashboard overview</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className={`quick-action-card action-${action.color}`} onClick={action.onClick}>
              <div className="action-icon">{action.icon}</div>
              <h3>{action.label}</h3>
              <p>{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <FaCalendar />
            </div>
            <div className="activity-content">
              <p className="activity-title">Event Created</p>
              <p className="activity-description">Tech Conference 2025</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <FaTicketAlt />
            </div>
            <div className="activity-content">
              <p className="activity-title">New Booking</p>
              <p className="activity-description">Haircut service booked</p>
              <span className="activity-time">5 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <FaWallet />
            </div>
            <div className="activity-content">
              <p className="activity-title">Payment Received</p>
              <p className="activity-description">$150 from event sales</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
