const { Match } = require("../../models");

module.exports = {
    async getMyMatches(req, res) {
        try {
            const userId = req.user._id;
            const matches = await Match.find({
                $or: [{ player1Id: userId }, { player2Id: userId }],
            })
                .populate("player1Id", "username")
                .populate("player2Id", "username");
            res.json(matches);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getMatch(req, res) {
        const id = req.params.id;
        try {
            const match = await Match.findById(id)
                .populate("player1Id", "username")
                .populate("player2Id", "username");
            res.json(match);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },

    async newGame(req, res) {
        try {
            const newGame = await Match.create(req.body);
            res.json(newGame);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async updateGameBoard(req, res) {
        try {
            const { id, boardState, currentTurn } = req.body;
            const numberfied = boardState.map((row) =>
                row.map((gameSquare) => Number(gameSquare))
            );
            const match = await Match.findByIdAndUpdate(
                id,
                { boardState: numberfied, currentTurn },
                { new: true }
            );
            res.json(match);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async declareWinner(req, res) {
        try {
            const match = await Match.findByIdAndUpdate(
                req.body.gameId,
                {
                    winnerId: req.body.winnerId,
                },
                { new: true }
            );
            res.json(match);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
