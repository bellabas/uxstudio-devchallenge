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
            <div class="modal-content-body">
                <h2 class="modal-content-header">
                    <slot name="header"></slot>
                </h2>
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
                        <FancyButton :isPrimary="true" class="add-pic-button" v-else @click="uploadPicture">
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
                    <input type="text" name="input-name" id="input-name" v-model="contact.fullName"
                        placeholder="Jamie Wright">
                </div>
                <div class="modal-content-item">
                    <div class="modal-label">Phone number</div>
                    <input type="text" name="input-phone" id="input-phone" v-model="contact.phoneNumber" maxlength="20"
                        placeholder="+01 234 5678">
                </div>
                <div class="modal-content-item">
                    <div class="modal-label">Email address</div>
                    <input type="text" name="input-email" id="input-email" v-model="contact.emailAddress"
                        placeholder="jamie.wright@mail.com">
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

        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" class="hidden-upload" accept="image/*" />
    </div>
</template>

<style scoped>
@import '../assets/base.css';

.hidden-upload {
    display: none;
}

.picture-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 316px;
}

.contact-pic {
    width: 88px;
    height: 88px;
    border-radius: 44px;
    border: 1px solid var(--grey-70);
}

.picture-button-container {
    display: flex;
    justify-content: space-between;
    width: 212px;
}

.change-pic-button {
    width: 164px;
}

.add-pic-button {
    width: 139px;
}

.delete-pic-button {
    width: 40px;
}

.modal-content-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.modal-content-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60px;
}

.modal-label {
    font-size: 12px;
    font-family: 'LexendDeca';
    color: var(--color-text-secondary);

}

.modal-content-item input {
    width: 100%;
    background-color: var(--color-input-inactive);
    border: 1px solid var(--grey-60);
    border-radius: 8px;
    padding: 12px;
    height: 40px;
    color: var(--color-text-main);
    font-size: 14px;
    font-family: 'LexendDeca', Arial, sans-serif;
    outline: 0;
}

.modal-content-item input:focus {
    background-color: var(--grey-60);
    border: 1px solid var(--grey-10);
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
    align-items: center;
    border-radius: 8px;
    background-color: var(--color-background);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.modal-content-header {
    font-family: 'Glysa';
}

.modal-content-footer {
    display: flex;
    justify-content: right;
    padding: 24px 0px 24px 0px;
    width: 100%;
}

.modal-content-footer button {
    width: 68px;
    margin-left: 8px;

}

.modal-content-item input ::placeholder {
    color: var(--color-text-tertiary);
    font-family: 'LexendDeca', Arial, sans-serif;
}
</style>
