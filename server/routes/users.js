const express = require('express');

const { getAllUsers, addNewUser, getOneUser, deleteOneUser } = require('../controllers/users')

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', addNewUser);
router.delete('/:id', deleteOneUser);

module.exports = router;