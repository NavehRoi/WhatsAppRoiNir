const { createUser, getUserById, addBlockedUser, isUserBlocked, getMessagesReceived, addMessage } = require('./userModel');
const { v4: uuidv4 } = require('uuid');

const testUserFunctions = async () => {
    try {
        // Create a new user
        const { userId } = await createUser();
        console.log("The user ID is: " + userId);

        const { userId: userId2 } = await createUser();
        console.log("The user ID is: " + userId2);

        // Retrieve the user by ID
        const user = await getUserById(userId);
        console.log("Retrieved user: ", user.Item);

        // Add a blocked user
        const blockedUserId = uuidv4(); // Generate a unique blocked user ID
        await addBlockedUser(userId, blockedUserId);
        console.log("Blocked user added: " + blockedUserId);

        // Check if the user is blocked
        const isBlocked = await isUserBlocked(userId, blockedUserId);
        console.log("Is user blocked: " + isBlocked);

        // Check if the user is blocked
        const addMessaage = await addMessage(userId, "this is the longest message", userId2 );
        

        // Get messages received
        const messages = await getMessagesReceived(userId2);
        console.log("Messages received: ", messages);
    } catch (error) {
        console.error("Error in user functions: ", error);
    }
};

testUserFunctions();