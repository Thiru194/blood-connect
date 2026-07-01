const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);
app.use(
  "/api/requests",
  require("./routes/requestRoutes")
);

app.use(
  "/api/donations",
  require("./routes/donationRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

app.use(
  "/api/donors",
  require("./routes/userRoutes")
);

app.get("/", (req, res) => {
  res.send("BloodConnect API Running");
});

// Lightweight health check for uptime monitors / deployment probes.
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// 404 handler for unknown API routes.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Centralized error handler — catches errors passed via next(err).
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});