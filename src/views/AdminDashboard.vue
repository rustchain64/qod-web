<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import LandingPage from '../components/LandingPage.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
      <h2 class="card-header">Admin Dashboard: {{user.firstName}} </h2>
      <div>
          <LandingPage />      
      </div>
    </div>
</template>
