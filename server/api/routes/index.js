const router = require('express').Router();
const exampleRoutes = require('./exampleRoutes');
const userRoutes = require('./userRoutes');
const matchRoutes = require("./matchRoutes")

router.use('/examples', exampleRoutes);
router.use('/user', userRoutes);
router.use('/match', matchRoutes);

module.exports = router;