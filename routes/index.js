const express = require("express");
const dataController = require("../controllers/dataController");

const router = express.Router();

// Route for getting all tables
router.get("/tables", dataController.getTables);

// Route for getting data from specific table
router.get("/data/:table", dataController.getTableData);

module.exports = router;
