const express = require('express');
const { login, signupUser } = require('./controller');

const router = express.Router();

// login user
router.post('/login', login);

// signup user
router.post('/signup', signupUser);

module.exports = router;