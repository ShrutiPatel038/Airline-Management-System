const express = require("express")
const mysql = require("mysql2/promise")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Shruti@123",
  database: process.env.DB_NAME || "airline",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test database connection
app.get("/api/test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as test")
    res.json({ message: "Database connection successful", data: rows })
  } catch (error) {
    console.error("Database connection error:", error)
    res.status(500).json({ message: "Database connection failed", error: error.message })
  }
})

// Get counts for dashboard
app.get("/api/counts", async (req, res) => {
  try {
    const [flightsCount] = await pool.query("SELECT COUNT(*) as count FROM flights")
    const [passengersCount] = await pool.query("SELECT COUNT(*) as count FROM passengers")
    const [ticketsCount] = await pool.query("SELECT COUNT(*) as count FROM tickets")
    const [airlinesCount] = await pool.query("SELECT COUNT(*) as count FROM airline")
    const [aircraftCount] = await pool.query("SELECT COUNT(*) as count FROM aircraft")
    const [airportsCount] = await pool.query("SELECT COUNT(*) as count FROM airports")
    const [pilotsCount] = await pool.query("SELECT COUNT(*) as count FROM pilots")
    const [boardingListCount] = await pool.query("SELECT COUNT(*) as count FROM boarding_list")
    const [paymentsCount] = await pool.query("SELECT COUNT(*) as count FROM payments")
    const [flightStatusCount] = await pool.query("SELECT COUNT(*) as count FROM flight_status")

    res.json({
      flights: flightsCount[0].count,
      passengers: passengersCount[0].count,
      tickets: ticketsCount[0].count,
      airlines: airlinesCount[0].count,
      aircraft: aircraftCount[0].count,
      airports: airportsCount[0].count,
      pilots: pilotsCount[0].count,
      boardingList: boardingListCount[0].count,
      payments: paymentsCount[0].count,
      flightStatus: flightStatusCount[0].count,
    })
  } catch (error) {
    console.error("Error fetching counts:", error)
    res.status(500).json({ message: "Error fetching counts", error: error.message })
  }
})

// Get all flights with related information
app.get("/api/flights", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DISTINCT
        f.flight_id,
        a.airline_id,
        ac.aircraft_id,
        p.pilot_id,
        f.departure_id ,
        f.arrival_id ,
        f.departure_time,
        f.arrival_time,
        f.durationMin,
        fs.flight_status_id
      FROM flights f
      JOIN airline a ON f.airline_id = a.airline_id
      JOIN aircraft ac ON f.aircraft_id = ac.aircraft_id
      JOIN pilots p ON f.pilot_id = p.pilot_id
      JOIN airports src ON f.arrival_id = src.airport_id
      JOIN airports dst ON f.departure_id = dst.airport_id
      LEFT JOIN flight_status fs ON f.flight_status_id = fs.flight_status_id
      ORDER BY f.departure_time DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching flights:", error); // Log the error
    res.status(500).json({ message: "Error fetching flights", error: error.message });
  }
})

// Get all passengers
app.get("/api/passengers", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM passengers")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching passengers:", error)
    res.status(500).json({ message: "Error fetching passengers", error: error.message })
  }
})

// Get all tickets with passenger and flight information
app.get("/api/tickets", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        t.ticket_id,
        t.flight_id,
        p.passenger_id,
        t.seat_number,
        t.class,
        t.booking_date,
        pay.payment_status
      FROM tickets t
      JOIN passengers p ON t.passenger_id = p.passenger_id
      LEFT JOIN payments pay ON t.ticket_id = pay.ticket_id
      ORDER BY t.booking_date DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching tickets:", error); // Log the error
    res.status(500).json({ message: "Error fetching tickets", error: error.message });
  }
})

// Get flight status summary
app.get("/api/flight-status-summary", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        fs.status_name,
        COUNT(*) as count
      FROM flight_status fs
      GROUP BY fs.status_name
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching flight status summary:", error); // Log the error
    res.status(500).json({ message: "Error fetching flight status summary", error: error.message });
  }
})

// Get all airlines
app.get("/api/airlines", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM airline")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching airlines:", error)
    res.status(500).json({ message: "Error fetching airlines", error: error.message })
  }
})

// Get all aircraft
app.get("/api/aircraft", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM aircraft")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching aircraft:", error)
    res.status(500).json({ message: "Error fetching aircraft", error: error.message })
  }
})

// Get all airports
app.get("/api/airports", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM airports")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching airports:", error)
    res.status(500).json({ message: "Error fetching airports", error: error.message })
  }
})

// Get all pilots
app.get("/api/pilots", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pilots")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching pilots:", error)
    res.status(500).json({ message: "Error fetching pilots", error: error.message })
  }
})

// Get all boarding list entries with related information
app.get("/api/boarding-list", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.passenger_id,
        p.full_name as passenger_name,
        t.flight_id,
        bl.seat_number
      FROM boarding_list bl
      JOIN tickets t ON bl.flight_id = t.flight_id
      JOIN passengers p ON t.passenger_id = p.passenger_id
      ORDER BY passenger_name DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching boarding list:", error); // Log the error
    res.status(500).json({ message: "Error fetching boarding list", error: error.message });
  }
})

// Get all payments
app.get("/api/payments", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM payments")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching payments:", error)
    res.status(500).json({ message: "Error fetching payments", error: error.message })
  }
})

// Get all flight statuses
app.get("/api/flight-status", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM flight_status")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching flight statuses:", error)
    res.status(500).json({ message: "Error fetching flight statuses", error: error.message })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
