# WhatsAppRoiNir
## Messaging System Backend
## Overview
This project is a cloud-based backend for a messaging system, similar to Telegram or WhatsApp. It provides endpoints to register users, send messages, create groups, and manage group members. The backend is built using Node.js and AWS DynamoDB.

## Features
  - Register a new user
  - Send messages between users
  - Block users
  - Create groups
  - Add/remove users from groups
  - Send messages to groups
  - Retrieve messages received by users and groups

## Technology Stack
- **Language**: JavaScript
- **Framework**: Node.js
- **Deployment**: AWS (EC2 Instance)

## Endpoints
HTTP endpoints are implemented:
### Users
  1. Create User
    -  POST /users/create
    -  Returns: A new user ID.
       http://localhost:3000/users/create
  2. Get User by ID
    -  GET /users/{userId}
    -  Returns: User details for the specified user ID.
       http://localhost:3000/users/{userId}
  3. Add Message
    -  POST /users/message
    -  Body: { "senderId": "sender-id", "message": "Hello, how are you?", "recipientId": "recipient-id" }
        Returns: Confirmation of message sent.
       http://localhost:3000/users/message -H "Content-Type: application/json" -d '{"senderId":"sender-id","message":"Hello, how are you?","recipientId":"recipient-id"}'
  4. Add Blocked User
    -  POST /users/block//{userId, blockedId}
    -  Returns: A new user ID.
       http://localhost:3000/users/create
  5. Create User
    -  POST /users/create
    -  Returns: A new user ID.
         http://localhost:3000/users/create



Add Blocked User

POST /users/block
Body: { "userId": "user-id", "blockedUserId": "blocked-user-id" }
Returns: Confirmation of user blocked.
bash
Copy code
curl -X POST http://localhost:3000/users/block -H "Content-Type: application/json" -d '{"userId":"user-id","blockedUserId":"blocked-user-id"}'
Check if User is Blocked

POST /users/isBlocked
Body: { "userId": "user-id", "blockedUserId": "blocked-user-id" }
Returns: Whether the user is blocked.
bash
Copy code
curl -X POST http://localhost:3000/users/isBlocked -H "Content-Type: application/json" -d '{"userId":"user-id","blockedUserId":"blocked-user-id"}'
Get Messages Received

GET /users/{userId}/messages
Returns: Messages received by the specified user.
bash
Copy code
curl -X GET http://localhost:3000/users/{userId}/messages
Groups
Create Group

POST /groups/create
Body: { "name": "Group Name" }
Returns: A new group ID.
bash
Copy code
curl -X POST http://localhost:3000/groups/create -H "Content-Type: application/json" -d '{"name":"Group Name"}'
Get Group by ID

GET /groups/{groupId}
Returns: Group details for the specified group ID.
bash
Copy code
curl -X GET http://localhost:3000/groups/{groupId}
Add Member to Group

POST /groups/addMember
Body: { "groupId": "group-id", "userId": "user-id" }
Returns: Confirmation of member added.
bash
Copy code
curl -X POST http://localhost:3000/groups/addMember -H "Content-Type: application/json" -d '{"groupId":"group-id","userId":"user-id"}'
Remove Member from Group

POST /groups/removeMember
Body: { "groupId": "group-id", "userId": "user-id" }
Returns: Confirmation of member removed.
bash
Copy code
curl -X POST http://localhost:3000/groups/removeMember -H "Content-Type: application/json" -d '{"groupId":"group-id","userId":"user-id"}'
Add Message to Group

POST /groups/addMessage
Body: { "groupId": "group-id", "senderId": "sender-id", "message": "Hello, group!" }
Returns: Confirmation of message sent.
bash
Copy code
curl -X POST http://localhost:3000/groups/addMessage -H "Content-Type: application/json" -d '{"groupId":"group-id","senderId":"sender-id","message":"Hello, group!"}'
Get Messages Received by Group

GET /groups/{groupId}/messages
Returns: Messages received by the specified group.
bash
Copy code
curl -X GET http://localhost:3000/groups/{groupId}/messages
Check if User is a Member of Group

POST /groups/isMember
Body: { "groupId": "group-id", "userId": "user-id" }
Returns: Whether the user is a member of the group.
bash
Copy code
curl -X POST http://localhost:3000/groups/isMember -H "Content-Type: application/json" -d '{"group

# CloudFormation Template
A CloudFormation template (`cloudFormation.json`) is provided in the repository to create the stack.

## Exposing Public URL
After deploying the CloudFormation stack, follow these steps to find the public URL:

1. Navigate to the AWS Management Console.
2. Go to the CloudFormation service.
3. Select the stack created by the CloudFormation template.
4. In the stack details, navigate to the "Outputs" tab.
5. Look for an output named something like "WebServerURL" or "PublicURL".
6. Copy the provided URL.
7. Paste the URL into a web browser.

Now, you should be able to access the web server of the WhatsAppRoiNir system using the public URL. ENJOY!!!
