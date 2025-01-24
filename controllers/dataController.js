const dataModel = require("../models/dataModel");

// Fetch all the tables in the db
const getTables = async (req, res) => {
  try {
    const tables = await dataModel.fetchTables();
    res.json(tables);
  } catch (err) {
    console.error("Error fetching tables:", err.message);
  }
};

// Fetch all data from a specific table
const getTableData = async (req, res) => {
  const { table } = req.params;

  try {
    const data = await dataModel.fetchTableData(table);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching data from table ${table}:`, err.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getTables,
  getTableData,
};
