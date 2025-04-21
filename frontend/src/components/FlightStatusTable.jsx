"use client";

import { useEffect, useState } from "react";
import "../styles/Tables.css";

function FlightStatusTable() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightStatuses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flight-status");
        const data = await response.json();
        setStatuses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight statuses:", error);
        setLoading(false);
      }
    };

    fetchFlightStatuses();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading flight status data...</div>;
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Flight Status Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Flight Status ID</th>
              
              <th>Status Reason</th>
              <th>Status Name</th>
            </tr>
          </thead>
          <tbody>
            {statuses.length > 0 ? (
              statuses.map((status) => (
                <tr key={status.flight_id || `${status.flight_id}-${status.status}`}>
                  <td>{status.flight_id}</td>
                  <td>{status.flight_status_id}</td>
                  {/* <td>{status.status_name}</td> */}
                  <td>{status.status_reason}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        status.status_name === "On Time"
                          ? "status-green"
                          : status.status_name === "Delayed"
                          ? "status-yellow"
                          : status.status_name === "Cancelled"
                          ? "status-red"
                          : "status-blue"
                      }`}
                    >
                      {status.status_name}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-data-message">
                  No flight statuses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightStatusTable;
