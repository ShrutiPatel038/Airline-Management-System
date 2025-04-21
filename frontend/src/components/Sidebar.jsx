"use client"

import { useState } from "react"
import "../styles/Sidebar.css"

function Sidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "flights", label: "Flights", icon: "✈️" },
    { id: "passengers", label: "Passengers", icon: "👥" },
    { id: "tickets", label: "Tickets", icon: "🎫" },
    { id: "airlines", label: "Airlines", icon: "🏢" },
    { id: "aircraft", label: "Aircraft", icon: "🛩️" },
    { id: "airports", label: "Airports", icon: "🏛️" },
    { id: "pilots", label: "Pilots", icon: "👨‍✈️" },
    { id: "boardingList", label: "Boarding List", icon: "📋" },
    { id: "payments", label: "Payments", icon: "💰" },
    { id: "flightStatus", label: "Flight Status", icon: "🔄" },
  ]

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">Airline System</h2>}
        <button className="toggle-button" onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-menu-item">
              <button
                className={`sidebar-menu-button ${activeTab === item.id ? "active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar-menu-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
