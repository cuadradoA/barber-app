const express = require("express");
const router = express.Router();

const { getServices } = require("../controllers/servicesController");

router.get("/services", getServices);

module.exports = router;