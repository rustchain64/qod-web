<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import ReferralsList from "./referrals/ListView.vue";
import AddReferralView from './referrals/AddReferralView.vue';
import ReferralView from './referrals/ReferralView.vue';
import AdminDashboardVue from './AdminDashboard.vue';
import { router } from '@/router';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<template>
    <div v-if="user">
    <!-- A FULL LIST OF THE USER OBJECT -->
      <!-- <div>get user.persona : {{user.persona}}</div> -->
      <!-- <div><span class="welcome-text"><h2>Welcome</h2>{{user.persona}} : {{user.firstName}} </span></div> -->

     
      <div class="main_header">
        <span v-if="user.persona !== 'admin'" class="welcome-text">{{user.persona}} : {{user.firstName}} </span>
        
        <!-- <span v-if="user.persona == 'admin'"><button @click="adminDashboard" class="btn btn-success" id="dash-button">Admin Dashboard</button></span> -->
        <span v-if="user.persona == 'merchant'"><button @click="merchantDashboard" class="btn btn-success" id="dash-button">Merchant Dashboard</button></span>
        <span v-if="user.persona == 'agent'"><button @click="agentDashboard" class="btn btn-success" id="dash-button">Agent Dashboard</button></span>
      </div>
      
      <!-- SELECT A VIEW ACCORDING TO USER PERSONA upon login -->
      <!-- <ReferralsList /> -->
      <div v-if="user.persona == 'admin'">
        <AdminDashboardVue />
        <!-- <div class="agent_list"><ReferralsList /></div> -->
        <!-- <div class="agent_register"><RegisterMerchant /></div> -->
      </div>  
      <div v-if="user.persona == 'agent'">
      <!-- change the form from the same as merchant to the complete form -->
        <!-- <ReferralView />  THis Referral View is actually the update form-->
        <ReferralsList />
        <!-- <div class="agent_list"><ReferralsList /></div> -->
        <!-- <div class="agent_register"><ReferralsList /></div> -->
      </div>
      <div v-if="user.persona == 'merchant'">  
        <!-- AddReferralView Loads: AddReferral.vue -->      
        <AddReferralView />        
      </div> 
      
      
    </div>   
</template>

<script>    
export default {
  name: "home",
  data() {
    return {
      agent: false,      
      submitted: false,
    };
  },
  methods: {
    adminDashboard() {
      console.log("dashboard Admin");
      router.push(this.returnUrl || '/adminDashboard');
    },
    merchantDashboard() {
      console.log("dashboard Merchant");
      router.push(this.returnUrl || '/merchantDashboard');
    },
    agentDashboard() {
      console.log("dashboard Agent");
      router.push(this.returnUrl || '/agentDashboard');
    },
  },
};
</script>

<style scoped>
.welcom_wrapper {
 
  width: 100%;
}

.main_header {
  background-color: silver;
  display: flex;
  justify-content: space-between;
}
.welcome-text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: rgb(22, 143, 6);
  margin-left: 25px;
  clear: both;
}
  #dash-button {
    color:black;
    font-weight: bold;
    float: right;
    margin-right: 25px;
    margin-top: 4px;
    background: url(@/assets/dash_button.png) 3px 5px no-repeat;  
    background-color: white;  
  }
  .agent_list {
    float:right;
  }
  .agent_register {
    float: left;
  }
</style>
