"use client"

import { useEffect, useState } from "react"
import "../styles/Tables.css"

function CrewTable() {
  const [crew, setCrew] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/crew")
        const data = await response.json()
        setCrew(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching crew:", error)
        setLoading(false)
      }
    }

    fetchCrew()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading crew data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Crew Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Crew ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Flight ID</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {crew.length > 0 ? (
              crew.map((member) => (
                <tr key={member.crew_id}>
                  <td>{member.crew_id}</td>
                  <td>{member.crew_name}</td>
                  <td>{member.position}</td>
                  <td>{member.flight_id}</td>
                  <td>{member.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data-message">
                  No crew found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CrewTable
