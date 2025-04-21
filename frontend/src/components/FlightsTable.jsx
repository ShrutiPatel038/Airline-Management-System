"use client"

import { useEffect, useState } from "react"
import { formatDate } from "../utils/formatDate"
import "../styles/Tables.css"

function FlightsTable() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flights")
        const data = await response.json()
        setFlights(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching flights:", error)
        setLoading(false)
      }
    }

    fetchFlights()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading flights data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Flights Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Airline ID</th>
              <th>Aircraft ID</th>
              <th>Pilot ID</th>
              <th>Departure From</th>
              <th>Arrival To</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Distance</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight.flight_id}>
                  <td>{flight.flight_id}</td>
                  <td>{flight.airline_id}</td>
                  <td>{flight.aircraft_id}</td>
                  <td>{flight.pilot_id}</td>
                  <td>{flight.departure_id}</td>
                  <td>{flight.arrival_id}</td>
                  <td>{formatDate(flight.departure_time)}</td>
                  <td>{formatDate(flight.arrival_time)}</td>
                  <td>{flight.durationMin} min</td>
                  {/* <td>
                    <span
                      className={`status-badge ${
                        flight.status === "On Time"
                          ? "status-green"
                          : flight.status === "Delayed"
                            ? "status-yellow"
                            : flight.status === "Cancelled"
                              ? "status-red"
                              : "status-blue"
                      }`}
                    >
                      {flight.status || "Unknown"}
                    </span>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="no-data-message">
                  No flights found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FlightsTable
