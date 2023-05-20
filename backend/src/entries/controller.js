const pool = require('../db');
const queries = require('./queries');

// GET all entries
const getEntries = async (req, res) => {
  const user_id = req.user_id;
  pool.query(queries.getEntries, [user_id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(results.rows);
  });
};

// GET a single entry
const getEntry = async (req, res) => {
  const { id } = req.params;
  pool.query(queries.getEntry, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    if (results.rows.length == 0) return res.status(500).json({ error: "No such entry."});
    res.status(200).json(results.rows[0]);
  });
};

// CREATE an entry

// DELETE an entry

// UPDATE an entry

module.exports = {
  getEntries,
  getEntry
}