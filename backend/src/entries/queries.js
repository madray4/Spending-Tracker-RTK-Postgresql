const getEntries = "SELECT * FROM entry WHERE user_id = $1";
const getEntry = "SELECT * FROM entry WHERE id = $1";

module.exports = {
  getEntries,
  getEntry,
}