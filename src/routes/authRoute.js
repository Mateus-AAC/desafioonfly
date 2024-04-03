const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const checkConnection = require('../middlewares/checkConnection');

router.post('/insert/expenses', checkConnection.verifyJWT, authController.insertExpenses);
router.put('/update/expenses/:id', checkConnection.verifyJWT, authController.update);
router.delete('/delete/expenses/:id', checkConnection.verifyJWT, authController.delete);
router.get('/find/expenses/:id', checkConnection.verifyJWT, authController.find);
router.get('/find/expenses', checkConnection.verifyJWT, authController.findAll);

module.exports = router;