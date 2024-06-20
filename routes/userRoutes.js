const express = require('express');
const {
    createUserController,
    getUserByIdController,
    addBlockedUserController,
    isUserBlockedController,
    getMessagesReceivedController,
    addMessageController
} = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUserController);
router.get('/:userId', getUserByIdController);
router.post('/block', addBlockedUserController);
router.post('/isBlocked', isUserBlockedController);
router.get('/:userId/messages', getMessagesReceivedController);
router.post('/message', addMessageController);

module.exports = router;