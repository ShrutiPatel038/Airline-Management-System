"use client"

import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import FlightsTable from "./components/FlightsTable"
import PassengersTable from "./components/PassengersTable"
import TicketsTable from "./components/TicketsTable"
import AirlinesTable from "./components/AirLinesTable"
import AircraftTable from "./components/AircraftTable"
import AirportsTable from "./components/AirportsTable"
import PilotsTable from "./components/PilotsTables"
import PaymentsTable from "./components/PaymentsTable"
import BoardingListTable from "./components/BoardingListTable"
import FlightStatusTable from "./components/FlightStatusTable"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [counts, setCounts] = useState({
    flights: 0,
    passengers: 0,
    tickets: 0,
    airlines: 0,
    aircraft: 0,
    airports: 0,
    pilots: 0,
    boardingList: 0,
    payments: 0,
    flightStatus: 0,
  })

  useEffect(() => {
    // Fetch counts for dashboard
    const fetchCounts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/counts")
        const data = await response.json()
        setCounts(data)
      } catch (error) {
        console.error("Error fetching counts:", error)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <h1 className="page-title">Airline Management System</h1>

        {activeTab === "dashboard" && <Dashboard counts={counts} />}
        {activeTab === "flights" && <FlightsTable />}
        {activeTab === "passengers" && <PassengersTable />}
        {activeTab === "tickets" && <TicketsTable />}
        {activeTab === "airlines" && <AirlinesTable />}
        {activeTab === "aircraft" && <AircraftTable />}
        {activeTab === "airports" && <AirportsTable />}
        {activeTab === "pilots" && <PilotsTable />}
        {activeTab === "boardingList" && <BoardingListTable />}
        {activeTab === "payments" && <PaymentsTable />}
        {activeTab === "flightStatus" && <FlightStatusTable />}
      </main>
    </div>
  )
}

export default App
