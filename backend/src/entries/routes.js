const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getEntries,
        getEntry,
        createEntry } = require('./controller');

const router = express.Router();

// verify auth
router.use(requireAuth);

// GET all entries
router.get('/', getEntries);

// GET a single entry
router.get('/:id', getEntry);

// CREATE an entry
router.post('/', createEntry);

// DELETE an entry

// UPDATE an entry

module.exports = router;