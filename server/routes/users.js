const express = require('express');
const userAuth = require("../utils/userAuth");
const adminAuth = require("../utils/adminAuth");

const { getAllUsers, addNewUser, getOneUser, updateOneUser, deleteOneUser } = require('../controllers/users')

const router = express.Router();

router.get('/', adminAuth, getAllUsers);
router.get('/:id', userAuth, getOneUser);
router.post('/', addNewUser);
router.post('/:id', userAuth, updateOneUser);
router.delete('/:id', adminAuth, deleteOneUser);

module.exports = router;


