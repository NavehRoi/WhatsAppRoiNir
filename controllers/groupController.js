const {
    createGroup,
    getGroupById,
    addMemberToGroup,
    removeMemberFromGroup,
    addMessageToGroup,
    getMessagesReceivedByGroup,
} = require('../models/groupModel');
const { getUserById } = require('../models/userModel');

const createGroupController = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Group name is required' });
    }
    try {
        const { groupId } = await createGroup(name);
        res.status(201).json({ groupId });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Error creating group', details: error.message });
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
        console.error('Error getting group:', error);
        res.status(500).json({ error: 'Error getting group', details: error.message });
    }
};

const addMemberToGroupController = async (req, res) => {
    const { groupId, userId } = req.query;
    if (!groupId || !userId) {
        return res.status(400).json({ error: 'Group ID and User ID are required' });
    }
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const group = await getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await addMemberToGroup(groupId, userId);
        res.status(200).json({ message: 'Member added to group successfully' });
    } catch (error) {
        console.error('Error adding member to group:', error);
        res.status(500).json({ error: 'Error adding member to group', details: error.message });
    }
};

const removeMemberFromGroupController = async (req, res) => {
    const { groupId, userId } = req.query;
    if (!groupId || !userId) {
        return res.status(400).json({ error: 'Group ID and User ID are required' });
    }
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const group = await getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await removeMemberFromGroup(groupId, userId);
        res.status(200).json({ message: 'Member removed from group successfully' });
    } catch (error) {
        console.error('Error removing member from group:', error);
        res.status(500).json({ error: 'Error removing member from group', details: error.message });
    }
};

const addMessageToGroupController = async (req, res) => {
    const { groupId, senderId, message } = req.body;
    if (!groupId || !senderId || !message) {
        return res.status(400).json({ error: 'Group ID, Sender ID, and Message are required' });
    }
    try {
        const user = await getUserById(senderId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const group = await getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await addMessageToGroup(groupId, senderId, message);
        res.status(200).json({ message: 'Message added to group successfully' });
    } catch (error) {
        console.error('Error adding message to group:', error);
        res.status(500).json({ error: 'Error adding message to group', details: error.message });
    }
};

const getMessagesReceivedByGroupController = async (req, res) => {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    try {
        const group = await getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        
        const messages = await getMessagesReceivedByGroup(groupId);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error getting messages received by group:', error);
        res.status(500).json({ error: 'Error getting messages received by group', details: error.message });
    }
};

module.exports = {
    createGroupController,
    getGroupByIdController,
    addMemberToGroupController,
    removeMemberFromGroupController,
    addMessageToGroupController,
    getMessagesReceivedByGroupController,
};
