const getEntries = "SELECT * FROM entry WHERE user_id = $1";
const getEntry = "SELECT * FROM entry WHERE id = $1";
const createEntry = "INSERT INTO entry (store, item, totalcost, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";
const deleteEntry = "DELETE FROM entry WHERE id = $1 RETURNING id";
const updateEntry = "UPDATE entry " + 
        "SET store = $1, item = $2, totalcost = $3, date = $4 " +  
        "WHERE id = $5," +
        "RETURNING id, store, item, totalcost, date, user_id";

module.exports = {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry
}