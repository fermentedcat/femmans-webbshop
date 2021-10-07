const express = require('express');

const { getAllUsers, addNewUser, getOneUser, updateOneUser } = require('../controllers/users')

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', addNewUser);
router.post('/:id', updateOneUser);

module.exports = router;