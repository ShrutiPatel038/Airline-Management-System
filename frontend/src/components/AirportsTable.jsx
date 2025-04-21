"use client"

import { useEffect, useState } from "react"
import "../styles/Tables.css"

function AirportsTable() {
  const [airports, setAirports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/airports")
        const data = await response.json()
        setAirports(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching airports:", error)
        setLoading(false)
      }
    }

    fetchAirports()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading airports data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Airports Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Airport ID</th>
              <th>Airport Name</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {airports.length > 0 ? (
              airports.map((airport) => (
                <tr key={airport.airport_id}>
                  <td>{airport.airport_id}</td>
                  <td>{airport.airport_name}</td>
                  <td>{airport.city}</td>
                  <td>{airport.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-data-message">
                  No airports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AirportsTable
