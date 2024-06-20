const express = require('express');
const {
    createGroupController,
    getGroupByIdController,
    addMemberToGroupController,
    removeMemberFromGroupController,
    addMessageToGroupController,
    getMessagesReceivedByGroupController
} = require('../controllers/groupController');

const router = express.Router();

router.post('/create', createGroupController);
router.get('/:groupId', getGroupByIdController);
router.post('/addMember', addMemberToGroupController);
router.post('/removeMember', removeMemberFromGroupController);
router.post('/addMessage', addMessageToGroupController);
router.get('/:groupId/messages', getMessagesReceivedByGroupController);

module.exports = router;
