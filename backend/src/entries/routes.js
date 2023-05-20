const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getEntries,
        getEntry } = require('./controller');

const router = express.Router();

// verify auth
router.use(requireAuth);

// GET all entries
router.get('/', getEntries);

// GET a single entry
router.get('/:id', getEntry);
// CREATE an entry

// DELETE an entry

// UPDATE an entry

module.exports = router;