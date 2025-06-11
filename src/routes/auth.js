const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/validateUser', authMiddleware, auth.validateUser);

module.exports = router;
