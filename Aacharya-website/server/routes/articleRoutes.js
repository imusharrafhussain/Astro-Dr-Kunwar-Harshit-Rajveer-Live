const router = require('express').Router();
const { getAllArticles, getArticleBySlug } = require('../controllers/articleController');
const responseCache = require('../middleware/responseCache');

// GET /api/articles — List (with pagination + category filter)
router.get('/', responseCache(300), getAllArticles);

// GET /api/articles/:slug — Full article
router.get('/:slug', responseCache(600), getArticleBySlug);

module.exports = router;
