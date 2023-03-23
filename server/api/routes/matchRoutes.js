const router = require('express').Router();

const {
    getMyMatches,
    newGame,
    getMatch,
    updateGameBoard,
    declareWinner
} = require("../controllers/matchController");

router.route("/").get(getMyMatches).post(newGame).put(updateGameBoard);
router.route("/:id").get(getMatch);
router.route("/winner").put(declareWinner);

module.exports = router;