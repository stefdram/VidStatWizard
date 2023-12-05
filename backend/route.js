const express = require('express');
const router = express.Router();
const User = require('./user-query');
const Video= require('./video_titles');
const authenticateToken = require('./auth');

router.get('/users', User.getAllUsers);
router.get('/users/video_titles', Video.video_titles);
router.post('/create/user', User.createUser);
router.delete('/delete/:userid', User.deleteUser);
router.put('/update/user', User.updateUser);
router.post('/login', User.loginUser);
router.get('/test', authenticateToken, User.testProtected);

module.exports = router;