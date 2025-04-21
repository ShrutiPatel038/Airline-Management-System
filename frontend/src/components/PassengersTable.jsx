"use client"

import { useEffect, useState } from "react"
import "../styles/Tables.css"

function PassengersTable() {
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/passengers")
        const data = await response.json()
        setPassengers(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching passengers:", error)
        setLoading(false)
      }
    }

    fetchPassengers()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading passengers data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Passengers Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Passenger ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {passengers.length > 0 ? (
              passengers.map((passenger) => (
                <tr key={passenger.passenger_id}>
                  <td>{passenger.passenger_id}</td>
                  <td>{passenger.full_name}</td>
                  <td>{passenger.email}</td>
                  <td>{passenger.gender}</td>
                  <td>{passenger.age}</td>
                  <td>{passenger.nationality}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data-message">
                  No passengers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PassengersTable
