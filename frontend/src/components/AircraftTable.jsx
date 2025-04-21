"use client";

import { useEffect, useState } from "react";
import "../styles/Tables.css";

function AircraftTable() {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/aircraft");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Log the fetched data for debugging
        console.log("Fetched aircraft data:", data);

        setAircraft(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching aircraft:", error);
        setError(error.message); // Set error message
        setLoading(false);
      }
    };

    fetchAircraft();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading aircraft data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error message
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Aircraft Information</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Aircraft ID</th>
              <th>Airline ID</th>
              <th>Model</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {aircraft.length > 0 ? (
              aircraft.map((plane) => (
                <tr key={plane.aircraft_id}>
                  <td>{plane.aircraft_id}</td>
                  <td>{plane.airline_id}</td>
                  <td>{plane.aircraft_model || "N/A"}</td> {/* Fallback to "N/A" if model is missing */}
                  <td>{plane.capacity || "N/A"}</td> {/* Fallback to "N/A" if capacity is missing */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-data-message">
                  No aircraft found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AircraftTable;
