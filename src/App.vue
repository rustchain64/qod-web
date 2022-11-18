<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<script setup>
//import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
//const { user } = storeToRefs(authStore);
</script>

<template>
  <div class="wrapper">
    <div class="header-row">
      <div class="pie_log">
        <img alt="pie" src="@/assets/images/pie_logo.png" height="80" />
      </div>
      <!-- <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div> -->
      <!-- <div class="navbar-nav"> -->
      <!-- <div class="nav_links">
      <RouterLink to="/referrals" class="nav-link">Referrals</RouterLink>
      <RouterLink to="/users" class="nav-item nav-link">Users</RouterLink>
      <RouterLink to="/list" class="nav-link">Referrals</RouterLink>
      <RouterLink to="/referral" class="nav-item nav-link">Referral</RouterLink>
      <RouterLink to="/add" class="nav-item nav-link">Add</RouterLink>
    </div> -->

      <div class="logout_button">
        <button
          @click="authStore.logout()"
          class="btn btn-link nav-item nav-link"
        >
          <img
            alt="Log Out"
            class="nav_logo"
            src="@/assets/images/logOut.png"
            height="30"
          />
        </button>
      </div>
    </div>
    <div class="contents">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-row {
  display: flex;
  width: 900px;
}
.pie_logo {
  float: left;
}

.logout_button {
  float: right;
  vertical-align: top;
}

.contents {
  clear: both;
}
</style>
