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

// login user


// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  // validate inputs
  if(!email || !password) return res.status(500).json({ error: "All fields must be filled" });
  if(!validator.isEmail(email)) return res.status(500).json({ error: "Email is not valid" });
  if(!validator.isStrongPassword(password)) return res.status(500).json({ error: "Password is not strong enough" });
  const hashedPassword = await hashPassword(password);

  // check if account already exists
  pool.query(queries.getUserByEmail, [email], (error, results) => {
    const userExists = results.rows.length > 0;
    if (userExists) return res.status(500).json({ error: "Account already exists" });

    // hash password
    pool.query(queries.addUser, [email, hashedPassword], (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      pool.query(queries.getUserByEmail, [email], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        // return user details upon successful insertion
        const token = createToken(results.rows[0].id);
        res.status(200).json({ email , token });
      });
    });
  });
};

module.exports = {
  signupUser,
}