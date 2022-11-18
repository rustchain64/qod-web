<script setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  
</script>

<template>
  <!-- TutorialDataService methods:
       getAll()
       deleteAll()
       findByTitle()
  -->
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="card m-3" id="card-body-bg">
  <h4 class="card-header" id="card-header">Update Referral's info to Complete Registration</h4>
  <div class="card-body" >
    <div class="list row">
      <!-- <div class="col-md-8">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search by title"
            v-model="title"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
        </div>
      </div> -->
      <div class="col-md-6">
        <h4>Referrals List</h4>
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(tutorial, index) in tutorials"
            :key="index"
            @click="setActiveReferral(tutorial, index)"
          >
            {{ tutorial.yourName }}
            {{ tutorial.agentName }}
            {{ tutorial.agentCode }}
            {{ tutorial.phone }}
          </li>
        </ul>        
      </div>
      <div class="col-md-6">
        <div v-if="currentReferral">
          <h4>Referral ??</h4>
          <div>
            <label><strong>Merchant Name:</strong></label>
            {{ currentReferral.yourName }}
          </div>
          <div>
            <label><strong>Referral Name:</strong></label>
            {{ currentReferral.referralName }}
          </div>
          <div>
            <label><strong>Agent Name:</strong></label>
            {{ currentReferral.agentName }}
          </div>
          <div>
            <label><strong>Agent Code:</strong></label>
            {{ currentReferral.agentCode }}
          </div>
          <div>
            <label><strong>BusinessName:</strong></label>
            {{ currentReferral.businessName }}
          </div>
          <div>
            <label><strong>Phone:</strong></label>
            {{ currentReferral.phone }}
          </div>
          <div>
            <label><strong>Email:</strong></label>
            {{ currentReferral.email }}
          </div>
          <div>
            <label><strong>Note:</strong></label>
            {{ currentReferral.title }}
          </div>
          <div>
            <label><strong>Description:</strong></label>
            {{ currentReferral.description }}
          </div>
          <div>
            <label><strong>Status:</strong></label>
            {{ currentReferral.published ? "Published" : "Pending" }}
          </div>
          
          <router-link
            :to="{ name: 'Referral', params: { id: currentReferral.id }}"
            class="badge badge-primary"
            >
            Edit
            </router-link>
        </div>

        <div v-else>
          <br />
          <p>Please click on a Referral...</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "referral-list",
  data() {
    return {
      tutorials: [],
      currentReferral: null,
      currentIndex: -1,
      title: "",
      userData: "",
    };
  },
  created() {
    let currentUser = this.user;    
    this.userData = currentUser.agentCode;
    this.question = currentUser.agentCode;
    console.log("REFERRALS LIST USER AGENT CODE IS : ", this.userData);
    //this.searchTitle();
  },
  methods: {
    retrieveTutorials() {
      console.log("GETTING ALL TUTORIALS");
      DataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentReferral = null;
      this.currentIndex = -1;
    },

    setActiveReferral(tutorial, index) {
      this.currentReferral = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
      DataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchTitle() {
      DataService.findByTitle(this.userData)
        .then((response) => {
          this.tutorials = response.data;
          this.setActiveReferral(null);
          console.log("SEARCH TITLE RESPONSE DATA:::  ",response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    //this.retrieveTutorials();
    this.searchTitle();
  },
};
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

#card-header {
  display: flex;
  justify-content: space-between;
  background-color:rgba(255,255,255,.4);
}

#card-body-bg {
  background-color:rgba(255,255,255,.4);
  width: 80vw;
}
.bg {
    animation:slide 4s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
    bottom:0;
    left:-50%;
    opacity:.5;
    position:fixed;
    right:-50%;
    top:0;
    z-index:-1;
}
 
.bg2 {
    animation-direction:alternate-reverse;
    animation-duration:2s;
}
 
.bg3 {
    animation-duration:4s;
}
</style>
