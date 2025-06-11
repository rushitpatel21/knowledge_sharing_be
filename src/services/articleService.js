const Article = require('../models/Article');

exports.createArticle = async ({ title, content, createdBy }) => {
    const article = new Article({ title, content, createdBy });
    return await article.save();
};

exports.getArticles = async () => {
    return await Article.find({})
        .sort({ createdAt: -1 })
        .populate('createdBy', 'name'); 
};

exports.getArticleById = async (articleId) => {
    return await Article.findById(articleId).populate('createdBy', 'name');
};

exports.getArticleByIdWithoutExtraData = async (articleId) => {
    return await Article.findById(articleId);
};

exports.updateArticle = async (articleId, updateData) => {
    return await Article.findByIdAndUpdate(articleId, updateData, { new: true });
};

exports.deleteArticle = async (articleId) => {
    return await Article.findByIdAndDelete(articleId);
};