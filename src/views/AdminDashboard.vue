<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import LandingPage from "../components/LandingPage.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div v-if="user">
    <h2 class="card-header">Admin Dashboard: {{ user.firstname }}</h2>
    <div class="page-width">
      <LandingPage />
    </div>
  </div>
</template>

<style scoped>
.page-width {
  width: 90vw;
}
</style>
