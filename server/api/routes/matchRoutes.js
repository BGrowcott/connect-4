const router = require('express').Router();

const {
    getMyMatches
} = require("../controllers/matchController");

router.route("/").get(getMyMatches);

module.exports = router;