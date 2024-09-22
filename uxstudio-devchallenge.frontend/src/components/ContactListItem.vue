<script setup lang="ts">
import CallIcon from './icons/IconCall.vue';
import MuteIcon from './icons/IconMute.vue';
import MoreIcon from './icons/IconMore.vue';
import DefaultIcon from './icons/IconDefault.vue';
import SettingsIcon from './icons/IconSettings.vue';
import FavouriteIcon from './icons/IconFavourite.vue';
import DeleteIcon from './icons/IconDelete.vue';

import { ref, computed } from 'vue';
import { useContactsStore } from '../stores/useContactsStore';
import type { IContact } from '@/types/iContact';

const props = defineProps<IContact>();

const dropdownVisible = ref(false);
const contactsStore = useContactsStore();

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
};

const closeDropdown = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.more-button')) {
        dropdownVisible.value = false;
    }
};

const contactPicture = computed(() => {
    return props.profilePicBase64 ? `data:image/png;base64,${props.profilePicBase64}` : null;
});


const deleteContact = async () => {
    await contactsStore.deleteContact(props.contactId);
};
</script>

<template>
    <div class="contact" @mouseleave="closeDropdown">
        <div class="contact-entity">
            <img v-if="contactPicture" :src="contactPicture" class="contact-pic" />
            <DefaultIcon v-else class="contact-pic" />
            <div class="contact-info">
                <div class="contact-name">{{ fullName }}</div>
                <div class="contact-number">{{ phoneNumber }}</div>
            </div>
        </div>

        <div class="contact-buttons">
            <button type="button">
                <MuteIcon />
            </button>
            <button type="button">
                <CallIcon />
            </button>
            <div class="contact-dropdown">
                <button type="button" class="more-button" @click="toggleDropdown"
                    :class="{ 'more-button-active': dropdownVisible }">
                    <MoreIcon :class="{ 'more-button-active': dropdownVisible }" />
                </button>
                <div v-if="dropdownVisible" class="contact-dropdown-content">
                    <button type="button">
                        <SettingsIcon />
                        Edit
                    </button>
                    <button type="button">
                        <FavouriteIcon />
                        Favourite
                    </button>
                    <button type="button" @click="deleteContact">
                        <DeleteIcon />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/base.css';

.contact {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    font-family: 'LexendDeca', Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
}

.contact-entity {
    display: flex;
}

.contact-pic {
    width: 40px;
    height: 40px;
    border-radius: 25px;
    border: 1px;
    border-color: grey;
}

.contact-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
}

.contact-number {
    font-size: 12px;
    line-height: 16px;
    color: var(--color-text-secondary);
}

.contact-buttons {
    display: none;
}

.contact:hover .contact-buttons {
    display: flex;
    flex-direction: row;
}

.contact-buttons button {
    background-color: var(--color-background);
    width: 40px;
    height: 40px;
    border-radius: 8px;
    padding: 8px;
}

.contact-buttons button>svg {
    background-color: var(--color-background);
}

.contact-buttons button:hover,
.contact-buttons button:hover>svg {
    background-color: var(--grey-90);
}

.contact-buttons button:active,
.contact-buttons button:active>svg {
    background-color: var(--grey-80);
}

.contact-dropdown {
    position: relative;
    display: inline-block;
}

.contact-dropdown-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: var(--grey-80);
    min-width: 219px;
    z-index: 1;
    border-radius: 8px;
    margin-top: 0.5rem;
}

.contact-dropdown-content button {
    background-color: var(--grey-80);
    color: var(--color-text-primary);
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 16px;
}

.contact-dropdown-content button>svg {
    background-color: var(--grey-80);
    margin-right: 8px;
}

.contact-dropdown-content button:hover,
.contact-dropdown-content button:hover>svg {
    background-color: var(--grey-70);
}

.contact-dropdown-content button:active,
.contact-dropdown-content button:active>svg {
    background-color: var(--grey-60);
}

.contact-dropdown-content button:first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.contact-dropdown-content button:last-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.contact-dropdown-content>*:not(:first-child):not(:last-child) {
    border-radius: 0;
}

.more-button-active {
    background-color: var(--grey-80) !important;
}
</style>