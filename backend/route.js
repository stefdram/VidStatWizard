const express = require('express');
const router = express.Router();
const User = require('./user-query');
const Video= require('./video_titles');

router.get('/users', User.getAllUsers);
router.get('/users/video_titles', Video.video_titles);
router.post('/create/user', User.createUser);
router.delete('/delete/:userid', User.deleteUser);
router.put('/update/user', User.updateUser);

module.exports = router;