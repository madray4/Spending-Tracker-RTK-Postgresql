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
  const response = await pool.query(queries.getUserByEmail, [email]);
  return response.rows;
  //   if (error) return error;
  //   console.log(results);
  //   return results;
  // });
  // console.log(response);
  // return response;
};  

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(500).json({ error: "All fields must be filled" });

  // check if user exists
  const results = await getUserInfo(email);
  if (!results[0]) return res.status(500).json({ error: "Invalid Credentials" });

  // validate password
  const match = await validatePassword(password, results[0].password);
  if (!match) return res.status(500).json({ error: "Invalid Credentials" });

  // return userinfo
  const token = createToken(results[0].id);
  res.status(200).json({ email, token });
  // console.log(userInfo);
  // let userInfo = "";
  // pool.query(queries.getUserByEmail, [email], (error, results) => {
  //   const userExists = results.rows.length > 0;
  //   if (!userExists) return res.status(500).json({ error: "Account doesn't exists" });
  //   userInfo = results.rows[0];
  //   console.log(userInfo);
  //   const match = validatePassword()
    
  // });
};

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
  login,
  signupUser,
}