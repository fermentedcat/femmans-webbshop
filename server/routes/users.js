const express = require('express');

const { getAllUsers, addNewUser } = require('../controllers/users')

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addNewUser);

module.exports = router;