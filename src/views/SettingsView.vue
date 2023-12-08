<script setup>
import { ref, onMounted } from 'vue';
import userService from '../services/userService';
import { auth } from '@/js/firebase.js';
import { update } from 'firebase/database';

const displayName = ref('');
let errorMessage = ref('');
const successMessage = ref('Display name updated successfully!');
const updateDone = ref(false);
const userId = ref(auth.currentUser.uid);

const fetchDisplayName = async () => {
    displayName.value = await userService.getDisplayNameByUid(userId.value);
};

onMounted(fetchDisplayName);

const updateDisplayName = async () => {
    updateDone.value = false;
    if (validateDisplayName(displayName.value)) {
        await userService.changeDisplayName(userId.value, displayName.value);
        updateDone.value = true;
    }
};

const validateDisplayName = (name) => {
    const regex = /^[a-zA-Z0-9- ]{3,15}$/;
    if (!regex.test(name)) {
        errorMessage.value = 'Display name must be between 3-15 characters and can include only letters, numbers, spaces, and hyphens.';
        return false;
    }
    errorMessage.value = '';
    return true;
};
</script>

<template>
    <div class="container mx-auto px-4 py-6" style="max-width: 768px">
        <h1 class="text-2xl font-bold mb-4">Settings</h1>
        <div class="mx-auto">
            <div>
                <label class="block mb-2 font-semibold">Display Name</label>
                <input
                    type="text"
                    v-model="displayName"
                    placeholder="Display Name"
                    class="w-full px-3 py-2 border rounded"
                />
                <p class="text-red-500">{{ errorMessage }}</p>
                <p v-if="updateDone" class="text-green-500">{{ successMessage }}</p>
            </div>

            <button type="submit" @click="updateDisplayName" class="mt-4 px-4 py-2 rounded bg-blue-500 text-white">Update</button>
        </div>
    </div>
</template>