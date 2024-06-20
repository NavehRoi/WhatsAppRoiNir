const express = require('express');
const {
    createUserController,
    getUserByIdController,
    addBlockedUserController,
    getMessagesReceivedController,
    addMessageController
} = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUserController);
router.get('/:userId', getUserByIdController);
router.post('/block', addBlockedUserController);
router.get('/:userId/messages', getMessagesReceivedController);
router.post('/message', addMessageController);

module.exports = router;