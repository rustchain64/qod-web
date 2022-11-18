<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart.vue";


const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
    <h2>Agent Dashboard: {{user.firstName}} </h2>
    <div>
      <div class="pie" id="pie_left">
          <h2>Referrals by Status</h2>
          <PieChart />
        </div>
        <div class="line" id="line_right">
          <h2>Referrals Rewards</h2>
          <LineChart />
        </div>
      <div class="line">
        <h2>Referrals Details</h2>
        <div>
            <div class="card-header" id="details_header">
                <span class="spread">Merchant Name</span>
                <span class="spread">Representative</span>
                <span class="spread">Email</span>
                <span class="spread">Status</span>
            </div>
            <div  class="card-body" id="details_content">
                <span class="spread">Kit Carson</span>
                <span class="spread">John@Bill</span>
                <span class="spread">billy.bob@gmail.com</span>
                <span class="spread">pending</span>
            </div>
            <div  class="card-body" id="details_content">
                <span class="spread">Briton Paris</span>
                <span class="spread">John@Bill</span>
                <span class="spread">bleen.kong@gmail.com</span>
                <span class="spread">completed</span>
            </div>
        </div>
      </div>
    </div>
    <!-- <main>    
        <TheWelcome />
    </main> -->
    <!-- <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
    <p><router-link to="/users">Manage Users</router-link></p> -->
    </div>
</template>

<style scoped>
#pie_left {
  float: left;
}

#line_right {
  float: right;
}
</style>
