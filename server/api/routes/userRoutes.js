const router = require('express').Router();

const {
    login,
    signup,
    allUsers
} = require("../controllers/userController")

router.route('/').get(allUsers)

router.route('/login').post(login);
router.route('/signup').post(signup);

module.exports = router;