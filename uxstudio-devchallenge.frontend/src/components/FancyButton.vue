<script setup lang="ts">
import { computed } from 'vue';
import { useSlots } from 'vue';

const props = defineProps({
    isPrimary: Boolean,
});

const slots = useSlots();
const hasTextSlot = computed(() => !!slots.text);
</script>

<template>
    <button type="button" :class="{ 'primary-button': props.isPrimary, 'secondary-button': !props.isPrimary }">
        <div v-if="$slots.icon" :class="['button-icon', { 'icon-with-text': hasTextSlot }]">
            <slot name="icon"></slot>
        </div>
        <div v-if="$slots.text" class="button-text">
            <slot name="text"></slot>
        </div>
    </button>
</template>

<style scoped>
@import '../assets/base.css';

button {
    border: 0;
    height: 40px;
    border-radius: 8px;
    padding: 8px;
    font-family: 'LexendDeca', Arial, sans-serif;
    color: var(--color-text-main);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.button-text,
.button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.primary-button,
.primary-button>svg {
    background-color: var(--color-button-primary-default);
}

.primary-button:hover,
.primary-button:hover>svg {
    background-color: var(--color-button-primary-hover);
}

.primary-button:active,
.primary-button:active>svg {
    background-color: var(--color-button-primary-active);
}

.secondary-button,
.secondary-button>svg {
    background-color: var(--color-button-secondary-default);
}

.secondary-button:hover,
.secondary-button:hover>svg {
    background-color: var(--color-button-secondary-hover);
}

.secondary-button:active,
.secondary-button:active>svg {
    background-color: var(--color-button-secondary-active);
}

.icon-with-text {
    margin-right: 8px;
}
</style>
