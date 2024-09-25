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
                <button type="button" @click="openAddContactModal" @click.stop class="dynamic-button">
                    <AddIcon class="dynamic-button-icon" />
                    <div class="dynamic-button-text">Add new</div>
                </button>
            </div>
        </div>
        <div class="light-dark-mode-container">
            <LightModeIcon class="light-button" />
        </div>
    </div>
    <AddModal :isOpen="addModalVisible" :contactId="0" :fullName="''" :phoneNumber="''" :emailAddress="''"
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
    min-height: 75px;
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
    padding: 0px 24px;
}

.page-title {
    font-family: 'Glysa';
    font-size: 32px;
}

.navbar-icons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 32.22%;
    max-width: 220px;
    min-width: 190px;
}

.navbar-icons-container>button {
    width: auto;
    padding: 8px 16px 8px 12px;
    border-radius: 25px;
}


.light-dark-mode-container {
    display: flex;
    justify-content: left;
}

.light-button {
    margin-left: 24px;
}


.dynamic-button {
    border: 0;
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px 8px 16px;
    font-family: 'LexendDeca', Arial, sans-serif;
    color: var(--color-text-main);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(20, 20, 20, 1);
    background-image: linear-gradient(180deg, rgba(40, 40, 40, 0.7), rgba(40, 40, 40, 1));
    position: relative;
}

.dynamic-button::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(60, 60, 60, 1), rgba(60, 60, 60, 0));
    z-index: -1;
}

.dynamic-button-text,
.dynamic-button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dynamic-button>svg {
    background-color: transparent;
}

.dynamic-button:hover {
    background-color: rgba(20, 20, 20, 1);
    background-image: linear-gradient(180deg, rgba(40, 40, 40, 0.7), rgba(40, 40, 40, 1), rgba(255, 255, 255, 0.04));
}

.dynamic-button:active {
    background-color: rgba(20, 20, 20, 1);
    background-image: linear-gradient(180deg, rgba(40, 40, 40, 0.7), rgba(40, 40, 40, 1), rgba(255, 255, 255, 0.04));
}

@media only screen and (max-width: 600px) {
    .navbar-main-section {
        width: 75%;
        min-width: fit-content;
    }

    .page-title {
        font-size: 18px;
    }

    .back-button {
        margin-right: 3px;
    }

    .light-button {
        margin-left: 3px;
    }

    .dynamic-button-text {
        display: none;
    }

    .navbar-icons-container {
        min-width: 120px;
    }


}

@media only screen and (max-width: 845px) {
    .dynamic-button-text {
        display: none;
    }

    .navbar-icons-container {
        min-width: 120px;
    }
}
</style>