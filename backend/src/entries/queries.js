const getEntries = "SELECT * FROM entry WHERE user_id = $1";

module.exports = {
  getEntries,
}