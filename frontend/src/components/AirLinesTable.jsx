"use client"

import { useEffect, useState } from "react"
import "../styles/Tables.css"

function AirlinesTable() {
  const [airlines, setAirlines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/airlines")
        const data = await response.json()
        setAirlines(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching airlines:", error)
        setLoading(false)
      }
    }

    fetchAirlines()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading airlines data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Airlines Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Airline ID</th>
              <th>Airline Name</th>
              <th>Airline Country</th>
            </tr>
          </thead>
          <tbody>
            {airlines.length > 0 ? (
              airlines.map((airline) => (
                <tr key={airline.airline_id}>
                  <td>{airline.airline_id}</td>
                  <td>{airline.airline_name}</td>
                  <td>{airline.airline_country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="no-data-message">
                  No airlines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AirlinesTable
