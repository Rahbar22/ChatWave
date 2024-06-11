const express = require('express');
const {accessChat, fetchChats, createGroupChat, renameGroupChat, removefromGroup, addToGroup} = require('../controller/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").put(protect, createGroupChat);
router.route("/rename").put(protect, renameGroupChat);
router.route("/groupremove").get(protect, removefromGroup);
router.route("/groupadd").get(protect, addToGroup);

module.exports = router;