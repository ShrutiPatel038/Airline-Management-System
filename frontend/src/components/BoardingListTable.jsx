"use client"

import { useEffect, useState } from "react"
import { formatDate } from "../utils/formatDate"
import "../styles/Tables.css"

function BoardingListTable() {
  const [boardingList, setBoardingList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoardingList = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/boarding-list")
        const data = await response.json()
        setBoardingList(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching boarding list:", error)
        setLoading(false)
      }
    }

    fetchBoardingList()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading boarding list data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Boarding List Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Passenger ID</th>
              {/* <th>Airline ID</th> */}
              <th>Passenger Name</th>
              <th>Flight</th>
              {/* <th>Boarding Time</th> */}
              {/* <th>Gate</th> */}
              <th>Seat Number</th>
            </tr>
          </thead>
          <tbody>
            {boardingList.length > 0 ? (
              boardingList.map((boarding) => (
                <tr key={boarding.passenger_id}>
                  <td>{boarding.passenger_id}</td>
                  {/* <td>{boarding.airline_id}</td> */}
                  <td>{boarding.passenger_name}</td>
                  <td>{boarding.flight_id}</td>
                  {/* <td>{formatDate(boarding.boarding_time)}</td> */}
                  {/* <td>{boarding.gate_no}</td> */}
                  <td>{boarding.seat_number}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data-message">
                  No boarding records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BoardingListTable
