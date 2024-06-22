const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: 'eu-west-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Users';

const createUser = () => {
    const userId = uuidv4(); // Generate a new unique user ID

    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: userId,
            blockedUsers: [],
            messagesReceived: []
        }
    };

    return dynamoDB.put(params).promise()
        .then(() => ({ userId }))  // Return the new user ID after creation
        .catch((error) => {
            console.error('Error creating and initializing user:', error);
            throw error;
        });
};

const getUserById = (userId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: userId }
    };
    return dynamoDB.get(params).promise()
        .catch((error) => {
            console.error('Error getting user by id:', error);
            throw error;
        });
};

const addMessage = (senderId, message, recipientId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: recipientId },
        UpdateExpression: "SET messagesReceived = list_append(messagesReceived, :message)",
        ExpressionAttributeValues: {
            ":message": [`${senderId}: ${message}`]
        },
        ReturnValues: "UPDATED_NEW"
    };
    return dynamoDB.update(params).promise()
        .catch((error) => {
            console.error('Error adding message:', error);
            throw error;
        });
};

const addBlockedUser = (userId, blockedUserId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: userId },
        UpdateExpression: "SET blockedUsers = list_append(blockedUsers, :blockedUserId)",
        ExpressionAttributeValues: {
            ":blockedUserId": [blockedUserId]
        },
        ReturnValues: "UPDATED_NEW"
    };
    return dynamoDB.update(params).promise()
        .catch((error) => {
            console.error('Error adding blocked user:', error);
            throw error;
        });
};

const isUserBlocked = async (userId, blockedUserId) => {
    try {
        const user = await getUserById(userId);
        if (user.Item && user.Item.blockedUsers.includes(blockedUserId)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking if user is blocked:', error);
        throw error;
    }
};

const getMessagesReceived = async (userId) => {
    try {
        const user = await getUserById(userId);
        if (user.Item) {
            return user.Item.messagesReceived;
        }
        return [];
    } catch (error) {
        console.error('Error getting messages received:', error);
        throw error;
    }
};

module.exports = { createUser, getUserById, addBlockedUser, isUserBlocked, getMessagesReceived, addMessage };