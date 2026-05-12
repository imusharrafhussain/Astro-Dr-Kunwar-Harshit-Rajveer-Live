const mongoose = require('mongoose');
const Article = require('../models/Article');

// @desc    List articles (with pagination + category filter)
// @route   GET /api/articles
// @access  Public
exports.getAllArticles = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.category && req.query.category !== 'All') {
            filter['category.name'] = req.query.category;
        }

        const [articles, total] = await Promise.all([
            Article.find(filter)
                .select('-content')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Article.countDocuments(filter),
        ]);

        res.json({
            success: true,
            count: articles.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: articles,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get full article by slug
// @route   GET /api/articles/:slug
// @access  Public
exports.getArticleBySlug = async (req, res, next) => {
    try {
        const query = mongoose.Types.ObjectId.isValid(req.params.slug) 
            ? { _id: req.params.slug } 
            : { slug: req.params.slug };
            
        const article = await Article.findOneAndUpdate(
            query,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
        res.json({ success: true, data: article });
    } catch (err) {
        next(err);
    }
};
