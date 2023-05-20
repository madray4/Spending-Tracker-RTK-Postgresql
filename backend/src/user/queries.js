const getUserByEmail = 'SELECT * FROM account WHERE email = $1';


const addUser = 'INSERT INTO account (email, password) VALUES ($1, $2)';

module.exports = {
  getUserByEmail,
  addUser
}