<script setup lang="ts">
import PeopleList from '@/components/PeopleList.vue';
import SocketIssue from '@/components/SocketIssue.vue';
</script>

<template>
  <main class="main">
    <PeopleList />
    <SocketIssue />
  </main>
</template>

<style scoped>
.main {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 150px;
}
</style>
