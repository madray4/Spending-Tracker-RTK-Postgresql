const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getEntries,
        getEntry,
        createEntry,
        deleteEntry, } = require('./controller');

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
router.delete('/:id', deleteEntry);

// UPDATE an entry

module.exports = router;