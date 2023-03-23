const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            
            if (!user) {
                throw new Error("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error("Incorrect credentials");
            }

            const token = signToken(user);

            res.json(token);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    async signup(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.create({ username, password });
            console.log(user)
            const token = signToken(user);
            res.json(token);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    async allUsers (req,res) {
        const users = await User.find({}).select('username');
        res.json(users)
    }
};
