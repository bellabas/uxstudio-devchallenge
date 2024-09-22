<script setup lang="ts">
import { onMounted } from 'vue';
import { useContactsStore } from '../stores/useContactsStore';
import ContactListItem from './ContactListItem.vue';

const contactsStore = useContactsStore();

onMounted(() => {
    contactsStore.fetchContacts();
});
</script>

<template>
    <div>
        <ContactListItem v-for="contact in contactsStore.contacts" :key="contact.contactId"
            :contactId="contact.contactId" :fullName="contact.fullName" :phoneNumber="contact.phoneNumber"
            :emailAddress="contact.emailAddress" :profilePicBase64="contact.profilePicBase64" />
    </div>
</template>
