<script setup lang="ts">
import NavigationBar from '../components/NavigationBar.vue';
import ContactList from '../components/ContactList.vue';




</script>

<template>
  <div class="page-body">
    <NavigationBar class="navbar">
      <template v-slot:page-title>
        Contacts
      </template>
    </NavigationBar>
    <div class="page-main">
      <ContactList class="contact-list" />
    </div>

  </div>
</template>

<style scoped>
.page-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-main {
  height: 100%;
  width: 53.3%;
  min-width: 392px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--grey-60);
  border-right: 1px solid var(--grey-60);
}

.contact-list {
  margin-top: 21.71vh;
}
</style>
