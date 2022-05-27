const router = require('express').Router();
const homeRoutes = require('./homeRoute');

//telling router to use homeroutes
router.use('/', homeRoutes);

module.exports = router;