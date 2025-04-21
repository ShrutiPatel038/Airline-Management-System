"use client"

import { useState, useEffect } from "react"
import "../styles/Dashboard.css"

function Dashboard({ counts }) {
  const [statusData, setStatusData] = useState([])

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flight-status-summary")
        const data = await response.json()
        setStatusData(Array.isArray(data) ? data : []) // Ensure data is an array
      } catch (error) {
        console.error("Error fetching flight status summary:", error)
        setStatusData([]) // Fallback to an empty array on error
      }
    }

    fetchStatusData()
  }, [])

  const cards = [
    {
      title: "Total Flights",
      value: counts.flights,
      icon: "✈️",
      color: "blue",
    },
    {
      title: "Total Passengers",
      value: counts.passengers,
      icon: "👥",
      color: "green",
    },
    {
      title: "Total Tickets",
      value: counts.tickets,
      icon: "🎫",
      color: "purple",
    },
    {
      title: "Airlines",
      value: counts.airlines,
      icon: "🏢",
      color: "red",
    },
    {
      title: "Aircraft",
      value: counts.aircraft,
      icon: "🛩️",
      color: "orange",
    },
  ]

  return (
    <div>
      <div className="dashboard-cards">
        {cards.map((card) => (
          <div key={card.title} className="dashboard-card">
            <div className="card-content">
              <div className="card-info">
                <p className="card-title">{card.title}</p>
                <p className="card-value">{card.value}</p>
              </div>
              <div className={`card-icon ${card.color}`}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-20">
        <div className="card-header">
          <h2 className="card-title">Flight Status Summary</h2>
        </div>
        <div className="card-content">
          <div className="status-grid">
            {statusData.length > 0 ? (
              statusData.map((status) => (
                <div key={status.status} className="status-card">
                  <div className="status-count">{status.count}</div>
                  <div className="status-label">{status.status_name}</div>
                  {/* <div className="status-reason">{status.status_reason || "No specific reason"}</div> */}
                </div>
              ))
            ) : (
              <div className="no-data">No flight status data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
