const express = require('express');

const { getAllUsers, addNewUser, getOneUser, updateOneUser, deleteOneUser } = require('../controllers/users')

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', addNewUser);
router.post('/:id', updateOneUser);
router.delete('/:id', deleteOneUser);

module.exports = router;