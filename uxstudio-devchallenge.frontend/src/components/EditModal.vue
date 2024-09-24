<script setup lang="ts">
const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const closeModal = () => {
    emit('modal-close')
};

</script>

<template>
    <div class="modal" v-if="isOpen">
        <div class="modal-content">
            <slot class="modal-content-header"></slot>
            <div class="modal-content-body">

            </div>
            <div class="modal-content-footer">
                <button type="button">Cancel</button>
                <button type="button">Done</button>
            </div>
        </div>
    </div>
</template>

<style>
@import '../assets/base.css';

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
    width: 25%;
    min-width: 364px;
    height: 60%;
    padding: 24px;
    border-radius: 8px;
    background-color: var(--color-background);
    display: flex;
    flex-direction: column;
}

.modal-content-footer {
    display: flex;
    justify-content: right;
    padding: 8px;
}

button {
    width: 68px;
    height: 40px;
}
</style>