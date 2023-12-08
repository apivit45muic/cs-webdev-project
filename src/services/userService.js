import { getDatabase, ref as dbRef, set, get, update, remove, child } from 'firebase/database';
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

const changeDisplayName = async (userId, displayName) => {
    console.log("User ID: ", userId);
    console.log("Changing display name to: ", displayName);
    const userRef = dbRef(database, `users/${userId}`);
    await update(userRef, {
        displayName: displayName
    });
}

// Add a new recipe to the user's list of recipes
const addRecipeToUser = async (userId, recipeId) => {
    const userRecipesRef = dbRef(database, `users/${userId}/recipes`);
    try {
        const snapshot = await get(userRecipesRef);
        if (snapshot.exists()) {
            const recipeIds = snapshot.val();
            recipeIds.push(recipeId);
            await set(userRecipesRef, recipeIds);
        } else {
            await set(userRecipesRef, [recipeId]);
        }
    } catch (error) {
        console.error("Error adding recipe to user:", error);
        throw error;
    }
}

const getUserRecipes = async (userId) => {
    try {
        const userRef = dbRef(database, `users/${userId}/recipes`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const recipeIds = snapshot.val();
            const recipes = [];
            for (const recipeId of Object.values(recipeIds)) {
                const recipeRef = dbRef(database, `recipes/${recipeId}`);
                const recipeSnapshot = await get(recipeRef);
                if (recipeSnapshot.exists()) {
                    recipes.push(recipeSnapshot.val());
                }
            }
            return recipes;
        } else {
            console.log("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
}

const deleteRecipeFromUser = async (userId, recipeId) => {
    try {
        console.log("Deleting recipe from user: ", userId, recipeId);
        const userRecipesRef = dbRef(database, `users/${userId}/recipes`);
        const snapshot = await get(userRecipesRef);

        if (snapshot.exists()) {
            const recipes = snapshot.val();
            const recipeKey = Object.keys(recipes).find(key => recipes[key] === recipeId);

            if (recipeKey) {
                await remove(child(userRecipesRef, recipeKey));
            } else {
                console.log("Recipe not found in user's recipes");
            }
        } else {
            console.log("User's recipes not found");
        }
    } catch (error) {
        console.error("Error deleting recipe from user:", error);
        throw error;
    }
}

export default {
    createUser,
    changeDisplayName,
    getDisplayNameByUid,
    addRecipeToUser,
    getUserRecipes,
    deleteRecipeFromUser
}