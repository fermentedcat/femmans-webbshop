const express = require('express');

const { getAllUsers, addNewUser, getOneUser } = require('../controllers/users')

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', addNewUser);

module.exports = router;