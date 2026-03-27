const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAppointments,
  getStats
} = require("../controllers/dashboardController");

router.get("/dashboard/appointments", authMiddleware, getAppointments);

router.get("/dashboard/stats", authMiddleware, getStats);

module.exports = router;