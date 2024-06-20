const { createUser, getUserById, addBlockedUser, isUserBlocked, getMessagesReceived, addMessage } = require('./userModel');
const { v4: uuidv4 } = require('uuid');

const testUserFunctions = async () => {
    try {
        
        // Create a new user
        const { userId } = await createUser();
        console.log("The user ID is: " + userId);

        // const { userId: userId2 } = await createUser();
        // console.log("The user ID is: " + userId2);

        // // Retrieve the user by ID
        // const user = await getUserById(userId);
        // console.log("Retrieved user: ", user.Item);

        // // Add a blocked user
        // //const blockedUserId = uuidv4(); // Generate a unique blocked user ID
        // await addBlockedUser(userId, "ewttww");
        // console.log("Blocked user added: " );

        // // Check if the user is blocked
        // const isBlocked = await isUserBlocked(userId, "ewttww");
        // console.log("Is user blocked: " + isBlocked);

        // Check if the user is blocked
        await addMessage(userId, "this is the longest message", "e042a536-0a14-4530-ad90-e2754015837f" );
        

        // Get messages received
        const messages = await getMessagesReceived("e042a536-0a14-4530-ad90-e2754015837f");
        console.log("Messages received: ", messages);
    } catch (error) {
        console.error("Error in user functions: ", error);
    }
};

testUserFunctions();