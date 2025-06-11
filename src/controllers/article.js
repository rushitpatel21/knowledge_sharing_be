const articleService = require('../services/articleService');
const { getGroqResponse } = require('../utils/groqApi');

exports.create = async (req, res) => {
    const { title, content } = req.body;

    const userId = req.userData.userId;

    try {
        const article = await articleService.createArticle({ title, content, createdBy: userId });
        res.status(201).json(article);
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: 'Server error' });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await articleService.getArticles();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOne = async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await articleService.getArticleById(articleId);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.userData.userId;
    
    try {
        const article = await articleService.getArticleByIdWithoutExtraData(articleId);
        
        if (!article) return res.status(404).json({ message: 'Article not found' });

        if (article.createdBy.toString() !== userId)
            return res.status(403).json({ message: 'Not authorized' });
        
        article.revisions = article.revisions || [];

        if (req.body.content) {
            article.revisions.push({
                content: article.content,
                updatedAt: new Date()
            });
    
            article.content = req.body.content;
        }
        
        if (req.body.title) {
            article.title = req.body.title;
        }

        await article.save();

        res.json(article);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.userData.userId;

    try {
        const article = await articleService.getArticleById(articleId);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        if (article.createdBy.toString() !== userId) return res.status(403).json({ message: 'Not authorized' });

        await articleService.deleteArticle(articleId);
        res.json({ message: 'Article deleted successfully', article });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.aIContent = async (req, res) => {
    try {
        const { title } = req.params;

        const content = await getGroqResponse(title);

        res.json({ message: 'Article deleted successfully', content });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
