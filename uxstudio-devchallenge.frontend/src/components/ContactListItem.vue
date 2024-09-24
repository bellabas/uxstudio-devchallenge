<script setup lang="ts">
import CallIcon from './icons/IconCall.vue';
import MuteIcon from './icons/IconMute.vue';
import MoreIcon from './icons/IconMore.vue';
import DefaultIcon from './icons/IconDefault.vue';
import SettingsIcon from './icons/IconSettings.vue';
import FavouriteIcon from './icons/IconFavourite.vue';
import DeleteIcon from './icons/IconDelete.vue';
import EditModal from './ContactModal.vue';
import FancyButton from './FancyButton.vue';
import { ref, computed } from 'vue';
import { useContactsStore } from '../stores/useContactsStore';
import type { IContact } from '@/types/iContact';

const props = defineProps<IContact>();
const contactButtonsVisible = ref(false);
const dropdownVisible = ref(false);
const editModalVisible = ref(false);
const contactsStore = useContactsStore();

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
};

const handleMouseOver = (event: Event) => {
    if ((event.target as HTMLElement).closest('.contact')) {
        contactButtonsVisible.value = true;
    }
};

const handleMouseLeave = (event: Event) => {
    if ((event.target as HTMLElement).matches('.contact')) {
        dropdownVisible.value = false;
        contactButtonsVisible.value = false;
    }
};

const closeDropdownClick = (event: Event) => {
    if (!(event.target as HTMLElement).closest('.contact-dropdown')) {
        dropdownVisible.value = false;
    }
};

const isContactPicture = computed(() => {
    return !(props.profilePicBase64 === '');
});

const contactPicture = computed(() => {
    if (props.profilePicBase64?.includes('data:image/png;base64,')) {
        return props.profilePicBase64;
    }
    return `data:image/png;base64,${props.profilePicBase64}`;
});

const openEditContactModal = () => {
    dropdownVisible.value = false;
    contactButtonsVisible.value = false;
    editModalVisible.value = true;
};

const closeEditContactModal = () => {
    editModalVisible.value = false;
};

const deleteContact = async () => {
    await contactsStore.deleteContact(props.contactId);
};
</script>

<template>
    <div class="contact" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" @click="closeDropdownClick">
        <div class="contact-entity">
            <img v-if="isContactPicture" :src="contactPicture" class="contact-pic" />
            <DefaultIcon v-else class="contact-pic" />
            <div class="contact-info">
                <h3 class="contact-name">{{ props.fullName }}</h3>
                <div class="contact-number">{{ props.phoneNumber }}</div>
            </div>
        </div>

        <div class="contact-buttons" v-if="contactButtonsVisible">
            <FancyButton :isPrimary="false">
                <template v-slot:icon>
                    <MuteIcon />
                </template>
            </FancyButton>
            <FancyButton :isPrimary="false">
                <template v-slot:icon>
                    <CallIcon />
                </template>
            </FancyButton>
            <div class="contact-dropdown">
                <FancyButton :isPrimary="false" @click="toggleDropdown" @click.stop
                    :class="{ 'more-button-active': dropdownVisible }">
                    <template v-slot:icon>
                        <MoreIcon />
                    </template>
                </FancyButton>
                <div v-if="dropdownVisible" class="contact-dropdown-content">
                    <FancyButton :isPrimary="true" @click="openEditContactModal" @click.stop>
                        <template v-slot:icon>
                            <SettingsIcon class="dropdown-icon" color="var(--color-text-secondary)" />
                        </template>
                        <template v-slot:text>
                            Edit
                        </template>
                    </FancyButton>
                    <FancyButton :isPrimary="true">
                        <template v-slot:icon>
                            <FavouriteIcon class="dropdown-icon" color="var(--color-text-secondary)" />
                        </template>
                        <template v-slot:text>
                            Favourite
                        </template>
                    </FancyButton>
                    <FancyButton :isPrimary="true" @click="deleteContact" @click.stop>
                        <template v-slot:icon>
                            <DeleteIcon class="dropdown-icon" color="var(--color-text-secondary)" />
                        </template>
                        <template v-slot:text>
                            Delete
                        </template>
                    </FancyButton>
                </div>
            </div>
        </div>
    </div>
    <EditModal :isOpen="editModalVisible" :contactId="contactId" :fullName="fullName" :phoneNumber="phoneNumber"
        :emailAddress="emailAddress" :profilePicBase64="profilePicBase64" @modal-close="closeEditContactModal">
        <template v-slot:header>
            Edit contact
        </template>
    </EditModal>
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
}

.contact-entity {
    display: flex;
}

.contact-pic {
    width: 40px;
    height: 40px;
    border-radius: 25px;
    border: 1px solid var(--grey-60);
}

.contact-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
}

.contact-number {
    font-size: 12px;
    color: var(--color-text-secondary);
}

.contact-buttons {
    display: flex;
    flex-direction: row;
}

.contact-buttons button {
    width: 40px;
}

.contact-dropdown {
    position: relative;
    display: inline-block;
}

.contact-dropdown-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: var(--color-button-secondary-active);
    min-width: 219px;
    z-index: 1;
    border-radius: 8px;
    margin-top: 0.5rem;
}

.contact-dropdown-content button {
    background-color: var(--color-button-secondary-active);
    width: 100%;
    justify-content: left;
}

.contact-dropdown-content button>svg {
    background-color: var(--color-button-secondary-active);
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

.more-button-active,
.more-button-active>svg {
    background-color: var(--color-button-secondary-active) !important;
}


@media only screen and (max-width: 768px) {
    .contact-dropdown-content {
        min-width: 115px;
        right: 0;
    }
}
</style>