<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.user" class="navbar navbar-expand navbar-light bg-light">
        <img
          alt="GoFree logo"
          class="logo"
          src="@/assets/images/pie_io_clr_slgn_white.jpg"
          height="80"
        />
        <div class="navbar-nav">
            <!-- <router-link to="/agentDashboard" class="nav-item nav-link">Dashboard</router-link> -->
            <router-link to="/referrals" class="nav-link">Referrals</router-link>
            <router-link to="/users" class="nav-item nav-link" v-if="authStore.user.picked=='Admin'">Users</router-link>
            <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
        </div>
    </nav>
</template>