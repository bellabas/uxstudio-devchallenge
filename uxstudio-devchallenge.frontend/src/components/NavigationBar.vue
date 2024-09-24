<script setup lang="ts">
import BackArrowIcon from './icons/IconBackArrow.vue';
import SettingsIcon from './icons/IconSettings.vue';
import AddIcon from './icons/IconAdd.vue';
import LightModeIcon from './icons/IconLightMode.vue';
import ProfilePicIcon from './icons/IconProfilePic.vue';
import FancyButton from './FancyButton.vue';
import AddModal from './ContactModal.vue';
import { ref } from 'vue';

const addModalVisible = ref(false);

const openAddContactModal = () => {
    addModalVisible.value = true;
};

const closeAddContactModal = () => {
    addModalVisible.value = false;
};

</script>

<template>
    <div class="navbar-container">
        <div class="back-button-container">
            <BackArrowIcon class="back-button" />
        </div>
        <div class="navbar-main-section">
            <div class="page-title">
                <slot name="page-title"></slot>
            </div>
            <div class="navbar-icons-container">
                <SettingsIcon />
                <ProfilePicIcon />
                <FancyButton class="add-button" :isPrimary="true" @click="openAddContactModal" @click.stop>
                    <template v-slot:icon>
                        <AddIcon class="add-icon" />
                    </template>
                    <template v-slot:text>
                        Add new
                    </template>
                </FancyButton>
            </div>
        </div>
        <div class="light-dark-mode-container">
            <LightModeIcon class="light-button" />
        </div>
    </div>
    <AddModal :isOpen="addModalVisible" :contactId="''" :fullName="''" :phoneNumber="''" :emailAddress="''"
        :profilePicBase64="''" @modal-close="closeAddContactModal">
        <template v-slot:header>
            Add contact
        </template>
    </AddModal>
</template>

<style scoped>
@import '../assets/base.css';

.navbar-container {
    display: flex;
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0px;
    border-top: 1px solid var(--grey-60);
    border-bottom: 1px solid var(--grey-60);
    width: 100%;
    height: var(--navbar-height);
    justify-content: center;
    align-items: center;
    margin-top: var(--navbar-margin-top);
}

.back-button-container {
    display: flex;
    justify-content: right;
    align-items: center;
}

.back-button {
    margin-right: 24px;
}

.navbar-main-section {
    width: 53.3%;
    min-width: 392px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.page-title {
    margin-left: 12px;
    font-family: 'Glysa';
    font-size: 32px;
}

.navbar-icons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 32.22%;
    min-width: 190px;
    margin-right: 12px;
}

.navbar-icons-container>button {
    width: auto;
    padding: 8px 16px 8px 12px;
    border-radius: 25px;
}

.add-icon {
    margin-right: 8px;
}

.light-dark-mode-container {
    display: flex;
    justify-content: left;
}

.light-button {
    margin-left: 24px;
}
</style>