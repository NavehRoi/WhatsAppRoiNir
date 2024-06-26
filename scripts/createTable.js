const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });

const dynamoDB = new AWS.DynamoDB();

const createUsersTable = () => {
    const params = {
        TableName: 'Users',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' }, // id is String type
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        }
    };
    return dynamoDB.createTable(params).promise()
        .then(() => console.log('Users table created'))
        .catch((error) => console.error('Error creating Users table:', error));
};

const createGroupsTable = () => {
    const params = {
        TableName: 'Groups',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' }, // id is String type
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        }
    };
    return dynamoDB.createTable(params).promise()
        .then(() => console.log('Groups table created'))
        .catch((error) => console.error('Error creating Groups table:', error));
};

const createTables = async () => {
    try {
        await createUsersTable();
        await createGroupsTable();
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

createTables();