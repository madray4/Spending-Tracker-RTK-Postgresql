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
const createEntry = async (req, res) => {
  const user_id = req.user_id;
  const { store, item, totalcost, date } = req.body;
  let emptyFields = [];
  if(!store) emptyFields.push('store');
  if(!item) emptyFields.push('item');
  if(!totalcost) emptyFields.push('totalcost');
  if(!date) emptyFields.push('date');
  if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

  pool.query(queries.createEntry, [store, item, totalcost, date, user_id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    const newEntry = {store, item, totalcost, date, id: results.rows[0].id};
    res.status(200).json(newEntry);
  });
};

// DELETE an entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;
  pool.query(queries.deleteEntry, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(results.rows[0].id);
  });
};

// UPDATE an entry
const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { store, item, totalcost, date } = req.body;

  // empty fields check
  let emptyFields = [];
  if(!store) emptyFields.push('store');
  if(!item) emptyFields.push('item');
  if(!totalcost) emptyFields.push('totalcost');
  if(!date) emptyFields.push('date');
  if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});
  // check if entry exists
  // pool.query(queries.updateEntry, [store, item, totalcost, date, id], (error, results) => {
  //   if (error) return res.status(500).json({ error: error.message });
  //   res.status(200).json(results.row[0]);
  // });
  // update entry if entry exists
  res.status(200).json("Works");
};

module.exports = {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry
}