<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import ContactListItem from './ContactListItem.vue';
import ApiService from '../services/apiService';
import type { IContact } from '../types/iContact';

const contacts = reactive<IContact[]>([]);

onMounted(async () => {
    try {
        const response = await ApiService.get<IContact[]>('/contacts');
        contacts.push(...response.data);
    } catch (error) {
        console.error('Failed to load contacts:', error);
    }
});
</script>

<template>
    <div>
        <ContactListItem v-for="contact in contacts" :key="contact.contactId" :contactId="contact.contactId"
            :fullName="contact.fullName" :phone="contact.phoneNumber" :email="contact.emailAddress"
            :picture="contact.profilePicBase64" />
    </div>
</template>
