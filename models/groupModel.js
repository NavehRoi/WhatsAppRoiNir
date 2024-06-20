
const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');


//add here


const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Groups';

const createGroup = (name) => {
    const groupId = uuidv4(); // Generate a new unique group ID

    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: groupId,
            name: name,
            members: [],
            messagesReceived: []
        }
    };

    return dynamoDB.put(params).promise()
        .then(() => ({ groupId }))  // Return the new group ID after creation
        .catch((error) => {
            console.error('Error creating and initializing group:', error);
            throw error;
        });
};

const getGroupById = (groupId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: groupId },
    };
    return dynamoDB.get(params).promise()
        .catch((error) => console.error('Error getting group by id:', error));
};

const addMemberToGroup = (groupId, userId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: groupId },
        UpdateExpression: "SET members = list_append(members, :userId)",
        ExpressionAttributeValues: {
            ":userId": [userId]
        },
        ReturnValues: "UPDATED_NEW"
    };
    return dynamoDB.update(params).promise()
        .catch((error) => console.error('Error adding member to group:', error));
};

const removeMemberFromGroup = async (groupId, userId) => {
    const group = await getGroupById(groupId);
    const updatedMembers = group.Item.members.filter(member => member !== userId);

    const params = {
        TableName: TABLE_NAME,
        Key: { id: groupId },
        UpdateExpression: "SET members = :members",
        ExpressionAttributeValues: {
            ":members": updatedMembers
        },
        ReturnValues: "UPDATED_NEW"
    };
    return dynamoDB.update(params).promise()
        .catch((error) => console.error('Error removing member from group:', error));
};

const addMessageToGroup = (groupId, senderId, message) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: groupId },
        UpdateExpression: "SET messagesReceived = list_append(messagesReceived, :message)",
        ExpressionAttributeValues: {
            ":message": [`${senderId}: ${message}`]
        },
        ReturnValues: "UPDATED_NEW"
    };
    return dynamoDB.update(params).promise()
        .catch((error) => console.error('Error adding message to group:', error));
};

const getMessagesReceivedByGroup = async (groupId) => {
    try {
        const group = await getGroupById(groupId);
        if (group.Item) {
            return group.Item.messagesReceived;
        }
        return [];
    } catch (error) {
        console.error('Error getting messages received by group:', error);
        return [];
    }
};

const isUserMemberOfGroup = async (groupId, userId) => {
    try {
        const group = await getGroupById(groupId);
        if (group.Item && group.Item.members.includes(userId)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking if user is a member of the group:', error);
        return false;
    }
};

module.exports = {
    createGroup,
    getGroupById,
    addMemberToGroup,
    removeMemberFromGroup,
    addMessageToGroup,
    getMessagesReceivedByGroup,
    isUserMemberOfGroup
};