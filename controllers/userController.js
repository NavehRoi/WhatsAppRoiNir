const { createUser, getUserById, addBlockedUser, isUserBlocked, getMessagesReceived, addMessage } = require('../models/userModel');

const createUserController = async (req, res) => {
    try {
        const { userId } = await createUser();
        res.status(201).json({ userId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

const getUserByIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting user' });
    }
};

const addBlockedUserController = async (req, res) => {
    const { userId, blockedUserId } = req.body;
    try {
        await addBlockedUser(userId, blockedUserId);
        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error blocking user' });
    }
};

const isUserBlockedController = async (req, res) => {
    const { userId, blockedUserId } = req.body;
    try {
        const blocked = await isUserBlocked(userId, blockedUserId);
        res.status(200).json({ blocked });
    } catch (error) {
        res.status(500).json({ error: 'Error checking if user is blocked' });
    }
};

const getMessagesReceivedController = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await getMessagesReceived(userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error getting messages' });
    }
};

const addMessageController = async (req, res) => {
    const { senderId, message, recipientId } = req.body;
    try {
        await addMessage(senderId, message, recipientId);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

module.exports = {
    createUserController,
    getUserByIdController,
    addBlockedUserController,
    isUserBlockedController,
    getMessagesReceivedController,
    addMessageController
};