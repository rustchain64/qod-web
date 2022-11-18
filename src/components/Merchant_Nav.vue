<script setup>
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();


// const usersStore = useUsersStore();
// const { users } = storeToRefs(usersStore);
</script>

<template >
     <!-- <div>{{user.picked}}</div> -->
    <nav v-show="authStore.user" class="navbar navbar-expand navbar-light bg-light">
        <img
          alt="GoFree logo"
          class="logo"
          src="@/assets/images/.jpg"          
          height="80"
        />
        
        <!-- <div>{{user.picked}}</div> -->
        <div class="navbar-nav">
            <router-link to="/referralsList" class="nav-link">Referrals List</router-link>
            <router-link to="/merchantDashboard" class="nav-item nav-link">Dashboard</router-link>
            <router-link to="/users" class="nav-item nav-link" >Users</router-link>
            <!-- <router-link to="/users" class="nav-item nav-link" v-if="authStore.user.picked=='Admin'">Users</router-link> -->

            <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
        </div>
    </nav>
</template>