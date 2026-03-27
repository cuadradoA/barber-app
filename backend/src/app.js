require("dotenv").config();


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const servicesRoutes = require("./routes/servicesRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", servicesRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", dashboardRoutes);

module.exports = app;