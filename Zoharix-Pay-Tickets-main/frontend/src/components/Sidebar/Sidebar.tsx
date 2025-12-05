"use client"

import type React from "react"
import { NavLink } from "react-router-dom"
import {
  FaThLarge,
  FaCalendarAlt,
  FaBriefcase,
  FaTicketAlt,
  FaWallet,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa"
import { IoWalletOutline } from "react-icons/io5"
import "./Sidebar.css"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/dashboard", icon: <FaThLarge />, label: "Dashboard" },
    { path: "/dashboard/events", icon: <FaCalendarAlt />, label: "Events" },
    { path: "/dashboard/services", icon: <FaBriefcase />, label: "Services" },
    { path: "/dashboard/bookings", icon: <FaTicketAlt />, label: "Tickets & Bookings" },
    { path: "/dashboard/wallet", icon: <FaWallet />, label: "Wallet" },
    { path: "/dashboard/analytics", icon: <FaChartPie />, label: "Analytics" },
    { path: "/dashboard/settings", icon: <FaCog />, label: "Settings" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />

      {/* Sidebar Container */}
      <aside className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <IoWalletOutline className="logo-icon" />
            <span className="logo-text">EventZ</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="user-profile-summary">
            <div className="user-avatar">
              <span>JD</span>
            </div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Organizer</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                end={item.path === "/dashboard"}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
