<script setup lang="ts">
import FancyButton from './FancyButton.vue';
import DefaultIcon from './icons/IconDefault.vue';
import ChangeIcon from './icons/IconChange.vue';
import DeleteIcon from './icons/IconDelete.vue';
import AddIcon from './icons/IconAdd.vue';
import { useContactsStore } from '../stores/useContactsStore';
import { computed, reactive, ref } from 'vue';
import { type IContact } from '@/types/iContact';

const props = defineProps({
    isOpen: Boolean,
    contactId: Number,
    fullName: String,
    phoneNumber: String,
    emailAddress: String,
    profilePicBase64: String,
});

const contact = reactive({
    contactId: props.contactId,
    emailAddress: props.emailAddress,
    fullName: props.fullName,
    phoneNumber: props.phoneNumber,
    profilePicBase64: props.profilePicBase64
});

const contactsStore = useContactsStore();
const emit = defineEmits(["modal-close"]);

const closeModal = () => {
    emit('modal-close');
    contact.contactId = props.contactId;
    contact.emailAddress = props.emailAddress;
    contact.fullName = props.fullName;
    contact.phoneNumber = props.phoneNumber;
    contact.profilePicBase64 = props.profilePicBase64;
};

const saveModal = async () => {
    await contactsStore.updateContact({
        contactId: contact.contactId,
        fullName: contact.fullName,
        phoneNumber: contact.phoneNumber,
        emailAddress: contact.emailAddress,
        profilePicBase64: contact.profilePicBase64
    } as IContact);
    emit('modal-close');
};

const isContactPicture = computed(() => {
    return !(contact.profilePicBase64 === '');
});

const contactPicture = computed(() => {
    if (contact.profilePicBase64?.includes('data:image/png;base64,')) {
        return contact.profilePicBase64;
    }
    return `data:image/png;base64,${contact.profilePicBase64}`;
});

const fileInput = ref<HTMLInputElement | null>(null);

const uploadPicture = () => {
    console.log('cucc');
    fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            contact.profilePicBase64 = e.target?.result as string;
        };
        reader.readAsDataURL(target.files[0]);
    }
};

const deletePicture = () => {
    contact.profilePicBase64 = '';
};
</script>

<template>
    <div class="modal" v-if="isOpen">
        <div class="modal-content">
            <h2 class="modal-content-header">
                <slot name="header"></slot>
            </h2>
            <div class="modal-content-body">
                <div class="picture-container">
                    <img v-if="isContactPicture" :src="contactPicture" class="contact-pic" />
                    <DefaultIcon v-else class="contact-pic" />
                    <div class="picture-button-container">
                        <FancyButton :isPrimary="true" class="change-pic-button" v-if="isContactPicture"
                            @click="uploadPicture">
                            <template v-slot:icon>
                                <ChangeIcon />
                            </template>
                            <template v-slot:text>
                                Change picture
                            </template>
                        </FancyButton>
                        <FancyButton :isPrimary="true" class="change-pic-button" v-else @click="uploadPicture">
                            <template v-slot:icon>
                                <AddIcon />
                            </template>
                            <template v-slot:text>
                                Add picture
                            </template>
                        </FancyButton>
                        <FancyButton :isPrimary="true" class="delete-pic-button" v-if="isContactPicture"
                            @click="deletePicture">
                            <template v-slot:icon>
                                <DeleteIcon />
                            </template>
                        </FancyButton>
                    </div>
                </div>
                <div class="modal-content-item">
                    <div class="modal-label">Name</div>
                    <input type="text" name="input-name" id="input-name" v-model="contact.fullName">
                </div>
                <div class="modal-content-item">
                    <div class="modal-label">Phone number</div>
                    <input type="text" name="input-phone" id="input-phone" v-model="contact.phoneNumber">
                </div>
                <div class="modal-content-item">
                    <div class="modal-label">Email address</div>
                    <input type="text" name="input-email" id="input-email" v-model="contact.emailAddress">
                </div>
            </div>
            <div class="modal-content-footer">
                <FancyButton :is-primary="false" @click="closeModal">
                    <template v-slot:text>
                        Cancel
                    </template>
                </FancyButton>
                <FancyButton :is-primary="true" @click="saveModal">
                    <template v-slot:text>
                        Done
                    </template>
                </FancyButton>
            </div>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" class="hidden-upload" />
    </div>
</template>

<style>
@import '../assets/base.css';

.hidden-upload {
    display: none;
}

.picture-button-container {
    display: flex;
    justify-content: space-between;
}

.change-pic-button {
    width: 164px;
}

.delete-pic-button {
    width: 40px;
}

.modal-label {
    margin-top: 24px;
}

.modal-content-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-content-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-label {
    font-size: 12px;
    font-family: 'LexendDeca';
    color: var(--color-text-secondary);
    margin-bottom: 4px;
}

.modal-content-item input {
    width: 100%;
    background-color: var(--color-input-inactive);
    border: 1px;
    border-radius: 8px;
    border-color: var(--grey-60);
    padding: 12px;
    color: var(--color-text-main);
    font-size: 14px;
}

.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /**overflow: auto;**/
    background-color: var(--color-dim);
}

.modal-content {
    min-width: 364px;
    height: 60%;
    padding: 24px;
    border-radius: 8px;
    background-color: var(--color-background);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.modal-content-header {
    font-family: 'Glysa';
}

.modal-content-footer {
    display: flex;
    justify-content: right;
    width: 100%;
    margin-top: 24px;
}

button {
    width: 68px;
    margin-left: 8px;
}

.contact-pic {
    width: 88px;
    height: 88px;
    border-radius: 44px;
    border: 1px;
    border-color: var(--grey-70);
}

.picture-container {
    display: flex;
    align-items: center;
}
</style>
