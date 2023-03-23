const { Schema, model } = require("mongoose");

const matchSchema = new Schema(
    {
        player1Id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        player2Id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        boardState: {
            type: [[Number]],
            required: true,
            default: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ],
        },
        currentTurn: {
           type: Schema.Types.ObjectId,
           required: true,
        },
        winnerId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    },
    {
        timestamps: true,
    }
);

const Match = model("match", matchSchema);

module.exports = Match;
