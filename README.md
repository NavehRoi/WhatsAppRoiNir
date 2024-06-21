# WhatsAppRoiNir
## Messaging System Backend
## Overview
This project is a cloud-based backend for a messaging system, similar to Telegram or WhatsApp. It provides endpoints to register users, send messages, create groups, and manage group members. Backend only.

## Features
  - Register a new user
  - Send messages between users
  - Block users
  - Create groups
  - Add/remove users from groups
  - Send messages to groups
  - Retrieve messages received by users and groups
  - Retrieve Users and Groups

## Technology Stack
- **Language**: JavaScript
- **Framework**: Node.js
- **Deployment**: AWS (EC2 Instance)
- **Database**: Amazon DynamoDB
- **Infrastructure as Code**: AWS CloudFormation
- **Web Framework**: Express

## Endpoints
HTTP endpoints are implemented:
### Users
#### 1. Create User
      -  POST /users/create
      -  Returns: A new user ID.
      -  Example: `http://localhost:3000/users/create`
       
#### 2. Get User by ID
      -  GET /users/{userId}
      -  Returns: User details for the specified user ID.
      -  Example: `http://localhost:3000/users/{userId}`
         
#### 3. Add Message
      -  POST /users/message
      -  Body: { "senderId": "sender-id", "message": "Hello, how are you?", "recipientId": "recipient-id" }
      -  Returns: Confirmation of message sent.
      -  Example: `http://localhost:3000/users/message -H "Content-Type: application/json" -d '{"senderId":"sender-id","message":"Hello, how are you?","recipientId":"recipient-id"}'`
     
#### 4. Add Blocked User
      -  POST /users/block
      -  Params: userId, blockedUserId
      -  Returns: Confirmation of user blocked.
      -  Example: `http://localhost:3000/users/block?userId={user-id}&blockedUserId={blocked-user-id}`
       
#### 5. Get Messages Received
      -  GET /users/{userId}/messages
      -  Returns: Messages received by the specified user.
      -  Example: http://localhost:3000/users/{userId}/messages


### Groups
#### 1. Create Group
      -  POST /groups/create
      -  Params: name
      -  Returns: A new group ID.
      -  Example: http://localhost:3000/groups/create?name={Group Name}
       
#### 2. Get Group by ID
      -  GET /groups/{groupId}
      -  Returns: Group details for the specified group ID.
      -  Example: http://localhost:3000/groups/{groupId}
               
#### 3. Add Message to Group
      -  POST /groups/addMessage
      -  Body: { groupId: "Gruoup Id", senderId:"sender ID", message:"The Message" }
      -  Returns: Confirmation of message sent.
      -  Example: `http://localhost:3000/groups/addMessagee -H "Content-Type: application/json" -d '{groupId: "Gruoup Id", senderId:"sender ID", message:"The Message"}'`
     
#### 4. Add Member to Group
      -  POST /groups/addMember
      -  Params: groupId, userId
      -  Returns: Confirmation of member added.
      -  Example: http://localhost:3000/groups/addMember?groupId={group-id}&userId={user-id}`
      
#### 5. Remove Member from Group
      -  POST /groups/removeMember
      -  Params: groupId, userId
      -  Returns: Confirmation of member removed.
      -  Example: http://localhost:3000/groups/removeMember?groupId={group-id}&userId={user-id}
               
#### 6. Get Messages Received by Group
      -  GET /groups/{groupId}/messages
      -  Returns: Messages received by the specified group.
      -  Example: http://localhost:3000/groups/{groupId}/messages




# Scaling Discussion
## Scaling Effects and Costs
**1000s of Users:** The system can handle this load with moderate costs. DynamoDB's auto-scaling will manage read/write throughput as demand grows. Estimated monthly cost: $100-$500.

**10,000s of Users:** Requires sharding or partitioning data to avoid capacity limits. Increased read/write operations will be handled by DynamoDB auto-scaling, and additional EC2 instances may be necessary. Estimated monthly cost: $500-$2000.

**Millions of Users:** Robust scaling strategies needed, including DynamoDB auto-scaling, read replicas, and caching (e.g., Amazon ElastiCache) to reduce load. Infrastructure costs will be high but necessary for performance. Estimated monthly cost: $2000-$10,000+.


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
