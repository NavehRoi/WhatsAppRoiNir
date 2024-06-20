const {
    createGroup,
    getGroupById,
    addMemberToGroup,
    removeMemberFromGroup,
    addMessageToGroup,
    getMessagesReceivedByGroup,
    isUserMemberOfGroup
} = require('../models/groupModel');

const createGroupController = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Group name is required' });
    }
    try {
        const { groupId } = await createGroup(name);
        res.status(201).json({ groupId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating group' });
    }
};

const getGroupByIdController = async (req, res) => {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    try {
        const group = await getGroupById(groupId);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting group' });
    }
};

const addMemberToGroupController = async (req, res) => {
    const { groupId, userId } = req.body;
    if (!groupId || !userId) {
        return res.status(400).json({ error: 'Group ID and User ID are required' });
    }
    try {
        await addMemberToGroup(groupId, userId);
        res.status(200).json({ message: 'Member added to group successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding member to group' });
    }
};

const removeMemberFromGroupController = async (req, res) => {
    const { groupId, userId } = req.body;
    if (!groupId || !userId) {
        return res.status(400).json({ error: 'Group ID and User ID are required' });
    }
    try {
        await removeMemberFromGroup(groupId, userId);
        res.status(200).json({ message: 'Member removed from group successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing member from group' });
    }
};

const addMessageToGroupController = async (req, res) => {
    const { groupId, senderId, message } = req.body;
    if (!groupId || !senderId || !message) {
        return res.status(400).json({ error: 'Group ID, Sender ID, and Message are required' });
    }
    try {
        await addMessageToGroup(groupId, senderId, message);
        res.status(200).json({ message: 'Message added to group successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding message to group' });
    }
};

const getMessagesReceivedByGroupController = async (req, res) => {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    try {
        const messages = await getMessagesReceivedByGroup(groupId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error getting messages received by group' });
    }
};

const isUserMemberOfGroupController = async (req, res) => {
    const { groupId, userId } = req.body;
    if (!groupId || !userId) {
        return res.status(400).json({ error: 'Group ID and User ID are required' });
    }
    try {
        const isMember = await isUserMemberOfGroup(groupId, userId);
        res.status(200).json({ isMember });
    } catch (error) {
        res.status(500).json({ error: 'Error checking if user is a member of the group' });
    }
};

module.exports = {
    createGroupController,
    getGroupByIdController,
    addMemberToGroupController,
    removeMemberFromGroupController,
    addMessageToGroupController,
    getMessagesReceivedByGroupController,
    isUserMemberOfGroupController
};
