const getEntries = "SELECT * FROM entry WHERE user_id = $1";
const getEntry = "SELECT * FROM entry WHERE id = $1";
const createEntry = "INSERT INTO entry (store, item, totalcost, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";

module.exports = {
  getEntries,
  getEntry,
  createEntry,
}