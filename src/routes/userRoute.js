const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const checkConnection = require('../middlewares/checkConnection');

router.post('/insert/user', userController.insertUser);
router.put('/update/user/:id', checkConnection.verifyJWT, userController.update);
router.delete('/delete/user/:id', checkConnection.verifyJWT, userController.delete);
router.get('/find/users/:id', checkConnection.verifyJWT, userController.find);
router.get('/find/users', checkConnection.verifyJWT, userController.findAll);
router.post('/login', userController.generateToken);
router.post('/logout', userController.deleteToken);

module.exports = router;