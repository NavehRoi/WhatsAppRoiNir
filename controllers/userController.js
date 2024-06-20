const { createUser, getUserById, addBlockedUser, isUserBlocked, getMessagesReceived, addMessage } = require('../models/userModel');

const createUserController = async (req, res) => {
    try {
        const { userId } = await createUser();
        res.status(201).json({ userId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

const getUserByIdController = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Error getting user' });
    }
};

const addBlockedUserController = async (req, res) => {
    const { userId, blockedUserId } = req.query;
    if (!userId || !blockedUserId) {
        return res.status(400).json({ error: 'Both User ID and Blocked User ID are required' });
    }

    try {
        const blocked = await isUserBlocked(userId, blockedUserId);
        if (blocked) {
            return res.status(400).json({ error: 'User is already blocked' });
        }
        await addBlockedUser(userId, blockedUserId);
        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error('Error blocking user:', error);
        res.status(500).json({ error: 'Error blocking user' });
    }
};

const getMessagesReceivedController = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const messages = await getMessagesReceived(userId);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Error getting messages' });
    }
};

const addMessageController = async (req, res) => {
    const { senderId, message, recipientId } = req.body;
    if (!senderId || !message || !recipientId) {
        return res.status(400).json({ error: 'Sender ID, Message, and Recipient ID are required' });
    }

    try {
        const sender = await getUserById(senderId);
        if (!sender) {
            return res.status(404).json({ error: 'Sender not found' });
        }
        const recipient = await getUserById(recipientId);
        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }
        await addMessage(senderId, message, recipientId);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
};

module.exports = {
    createUserController,
    getUserByIdController,
    addBlockedUserController,
    getMessagesReceivedController,
    addMessageController
};
