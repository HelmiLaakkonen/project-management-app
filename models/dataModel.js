const db = require("../db/connection");

// Fetch all the tables in the db
const fetchTables = () => {
  return new Promise((resolve, reject) => {
    const query = "SHOW TABLES";
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Fetch all the data from a specific table
const fetchTableData = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ??`;
    db.query(query, [tableName], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  fetchTables,
  fetchTableData,
};
