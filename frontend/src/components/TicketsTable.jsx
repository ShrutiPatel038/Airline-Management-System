"use client"

import { useEffect, useState } from "react"
import { formatDate } from "../utils/formatDate"
import "../styles/Tables.css"

function TicketsTable() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tickets")
        const data = await response.json()
        setTickets(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tickets:", error)
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading tickets data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Tickets Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Flight ID</th>
              <th>Passenger</th>
              <th>Seat Number</th>
              <th>Class</th>
              <th>Booking Date</th>
              {/* <th>Payment Status</th> */}
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td>{ticket.ticket_id}</td>
                  <td>{ticket.flight_id}</td>
                  <td>{ticket.passenger_id || "Unknown"}</td>
                  <td>{ticket.seat_number || "N/A"}</td>
                  <td>{ticket.class || "N/A"}</td>
                  <td>{formatDate(ticket.booking_date)}</td>
                  {/* <td>
                    <span
                      className={`status-badge ${
                        ticket.payment_status === "Paid"
                          ? "status-green"
                          : ticket.payment_status === "Pending"
                          ? "status-yellow"
                          : "status-red"
                      }`}
                    >
                      {ticket.payment_status || "Unknown"}
                    </span>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data-message">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TicketsTable
