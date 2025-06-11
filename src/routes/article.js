const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const article = require('../controllers/article');

router.post('/', authMiddleware, article.create);
router.get('/', authMiddleware, article.getArticles);
router.get('/:id', authMiddleware, article.getOne);
router.put('/:id', authMiddleware, article.update);
router.delete('/:id', authMiddleware, article.remove);
router.post('/:title/summary', authMiddleware, article.aIContent);

module.exports = router;
