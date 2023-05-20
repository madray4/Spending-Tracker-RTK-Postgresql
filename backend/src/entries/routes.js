const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getEntries } = require('./controller');

const router = express.Router();

// verify auth
router.use(requireAuth);

// GET all entries
router.get('/', getEntries);

// GET a single entry

// CREATE an entry

// DELETE an entry

// UPDATE an entry

module.exports = router;