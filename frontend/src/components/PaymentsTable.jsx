"use client"

import { useEffect, useState } from "react"
import { formatDate } from "../utils/formatDate"
import "../styles/Tables.css"

function PaymentsTable() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments")
        const data = await response.json()
        setPayments(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching payments:", error)
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) {
    return <div className="loading-message">Loading payments data...</div>
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Payments Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Ticket ID</th>
              <th>Passenger ID</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.payment_id}>
                  <td>{payment.payment_id}</td>
                  <td>{payment.ticket_id}</td>
                  <td>{payment.passenger_id}</td>
                  <td>{payment.currency || "USD"}</td> {/* Fallback to USD if currency is undefined */}
                  <td>${(payment.amount_paid || 0).toFixed(2)}</td> {/* Fallback to 0 if amount is undefined */}
                  <td>{formatDate(payment.payment_date)}</td>
                  <td>{payment.payment_method || "Unknown"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        payment.payment_status === "Completed"
                          ? "status-green"
                          : payment.payment_status === "Pending"
                          ? "status-yellow"
                          : "status-red"
                      }`}
                    >
                      {payment.payment_status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data-message">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentsTable
