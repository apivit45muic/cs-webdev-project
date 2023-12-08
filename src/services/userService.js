import { getDatabase, ref as dbRef, set, get } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const database = getDatabase();

const createUser = async (auth, email, password) => {
    await createUserWithEmailAndPassword(auth, email.value, password.value);

    console.log("User created successfully: ", auth.currentUser.uid);

    try {
        const userRef = dbRef(database, `users/${auth.currentUser.uid}`);
        await set(userRef, {
            email: email.value,
            displayName: email.value
        });
    } catch (error) {
        alert(error.message);
    }

}

const getDisplayNameByUid = async (uid) => {
    const userRef = dbRef(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val().displayName;
    } else {
        return null;
    }
}

const changeDisplayName = async (user, displayName) => {
    const userRef = dbRef(database, `users/${user.uid}`);
    await set(userRef, {
        displayName: displayName
    });
}

export default {
    createUser,
    changeDisplayName,
    getDisplayNameByUid
}