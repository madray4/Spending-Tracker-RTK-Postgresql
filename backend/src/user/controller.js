const jwt = require('jsonwebtoken');
const pool = require('../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const validator = require('validator');


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const validatePassword = async (password, userPassword) => {
  const match = await bcrypt.compare(password, userPassword);
  return match;
};

const getUserInfo = async(email) => {
  let response, error = null;
  try {
    response = await pool.query(queries.getUserByEmail, [email]);
  } catch (err) {
    error = err;
  }
  return { rows: response.rows, error }; 
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(500).json({ error: "All fields must be filled" });

  // check if user exists
  let { rows, error } = await getUserInfo(email);
  if (error) return res.status(500).json({ error: error.message });
  if (!rows[0]) return res.status(500).json({ error: "Invalid Credentials" });

  // validate password
  const match = await validatePassword(password, rows[0].password);
  if (!match) return res.status(500).json({ error: "Invalid Credentials" });

  const token = createToken(rows[0].id);
  res.status(200).json({ email, token });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  // validate inputs
  if(!email || !password) return res.status(500).json({ error: "All fields must be filled" });
  if(!validator.isEmail(email)) return res.status(500).json({ error: "Email is not valid" });
  if(!validator.isStrongPassword(password)) return res.status(500).json({ error: "Password is not strong enough" });
  
  // check if user exists
  let { rows, error } = await getUserInfo(email);
  if (error) return res.status(500).json({ error: error.message });
  if (rows[0]) return res.status(500).json({ error: "Account Already Exists" });

  // hash password
  const hashedPassword = await hashPassword(password);

  // add account credentials to database
  try {
    await pool.query(queries.addUser, [email, hashedPassword]);
    let { rows, error } = await getUserInfo(email);
    if (error) return res.status(500).json({ error: error.message });

    // return user information
    const token = createToken(rows[0].id);
    res.status(200).json({ email, token });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  signupUser,
}