const { Match } = require("../../models");

module.exports = {
    async getMyMatches(req,res) {
        try {
            const userId = req.user._id;
            const matches = await Match.find({
                $or: [{player1Id: userId}, {player2Id:userId}]
            });
            console.log(matches);
        } catch (error) {
            console.log(error);
        }
    },

    async newGame(req,res){
        try {
            const newGame = await Match.create()
        }
    }

}