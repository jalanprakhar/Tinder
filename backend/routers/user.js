const express = require('express');
const userRouter = new express.Router();
const userController = require('../controllers/user.js');
userRouter.get('/users', userController.getAllUsers)
userRouter.get('/matched-users', userController.getMatchedUsers)
userRouter.get('/user', userController.getCurrentUser)


userRouter.put('/user', userController.updateCurrentUser)


userRouter.get('/gendered-users', userController.getGenderedUser)


userRouter.put('/addmatch', userController.addMatch)

module.exports = userRouter