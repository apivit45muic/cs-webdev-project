import { getDatabase, ref as dbRef, set } from 'firebase/database';

const createUserOnDatabase = async (user) => {
    try {
        // Add user information to the database
        const database = getDatabase();
        const userRef = dbRef(database, `users/${user.uid}`);
        await set(userRef, {
            email: user.email,
            displayName: user.email
            // Add any other user information you'd like to store
        });
    } catch (error) {
        alert(error.message);
    }

}

export default {
    createUserOnDatabase
}