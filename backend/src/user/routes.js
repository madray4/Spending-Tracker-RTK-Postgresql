const express = require('express');
const { signupUser } = require('./controller');

const router = express.Router();

// login user


// signup user
router.post('/signup', signupUser);

module.exports = router;