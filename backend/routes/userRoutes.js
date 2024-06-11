const express = require('express')
const router = express.Router()
const {registerUser, loginUser, allUser} = require('../controller/userController');
const {protect} = require('../middleware/authMiddleware');

router.route("/").post(registerUser).get(protect, allUser)
router.post('/login', loginUser)

module.exports = router;