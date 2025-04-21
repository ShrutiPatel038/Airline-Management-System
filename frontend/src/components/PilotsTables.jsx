"use client"

import { useEffect, useState } from "react"
import "../styles/Tables.css"

function PilotsTable() {
  const [pilots, setPilots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pilots")
        const data = await response.json()
        setPilots(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching pilots:", error)
        setLoading(false)
      }
    }

    fetchPilots()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading pilots data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Pilots Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Pilot ID</th>
              <th>Airline ID</th>
              <th>Name</th>
              <th>Flying Hours</th>
            </tr>
          </thead>
          <tbody>
            {pilots.length > 0 ? (
              pilots.map((pilot) => (
                <tr key={pilot.pilot_id}>
                  <td>{pilot.pilot_id}</td>
                  <td>{pilot.airline_id}</td>
                  <td>{pilot.pilot_name}</td>
                  <td>{pilot.flight_hours}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-data-message">
                  No pilots found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PilotsTable
