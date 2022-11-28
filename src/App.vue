<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import { useReferralStore } from "@/stores";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log("user : ", user);

const referralStore = useReferralStore();
const { ref } = storeToRefs(referralStore);
console.log("ref : ", ref);
</script>

<template>
  <div class="wrapper">
    <!-- {{ referralStore }} -->
    <div v-show="authStore.user" class="nav_wrapper">
      <img
        alt="Go Free logo"
        class="nav_logo"
        src="@/assets/images/transparent/pie_io_clr_slgn_trns.png"
        height="80"
      />
      <!-- <div class="navbar-nav"> -->
      <div class="nav_links">
        <RouterLink to="/referrals" class="nav-link">Referrals</RouterLink>
        <RouterLink to="/users" class="nav-item nav-link">Users</RouterLink>
        <!-- <RouterLink to="/list" class="nav-link">Referrals</RouterLink> -->
        <RouterLink to="/referral" class="nav-item nav-link"
          >Referral</RouterLink
        >
        <RouterLink to="/add" class="nav-item nav-link">Add</RouterLink>
      </div>

      <!-- </div> -->

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

    <!-- <div class="app-container" :class="authStore.user && 'bg-light'"> -->
    <div>
      <div class="container pt-4 pb-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/main.css";

.nav_wrapper {
  height: 10vh;
}

.nav_logo {
  float: left;
}
.nav_links {
  display: flex;
  flex-direction: row;
  float: left;
}

.logout_button {
  float: right;
  vertical-align: top;
}
</style>
