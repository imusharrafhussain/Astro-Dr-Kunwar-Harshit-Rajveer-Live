const router = require('express').Router();
const { getAllServices, getServiceBySlug } = require('../controllers/serviceController');
const responseCache = require('../middleware/responseCache');

// GET /api/services — List all active services (optional ?category= filter)
router.get('/', responseCache(300), getAllServices);

// GET /api/services/:slug — Get single service
router.get('/:slug', responseCache(600), getServiceBySlug);

module.exports = router;
