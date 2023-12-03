const express = require('express');
const router = express.Router();
const User = require('./user-query');

router.get('/users', User.getAllUsers);
router.post('/create/user', User.createUser);
router.delete('/delete/:userid', User.deleteUser);
router.put('/update/user', User.updateUser);

module.exports = router;