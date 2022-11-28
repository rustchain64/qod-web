<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log("user is: ", user);
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
    <h4 class="card-header" id="card-header">
      Update Referral's info to Complete Registration
    </h4>
    <div class="card-body">
      <div class="list row">
        <div class="col-md-8">
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
                @click="searchReferral"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h4><em>Referrals List</em></h4>
          <ul class="list-group">
            <li
              class="list-group-item"
              :class="{ active: index == currentIndex }"
              v-for="(referral, index) in referrals"
              :key="index"
              @click="setActiveReferral(referral, index)"
            >
              {{ referral.referralname }}
              <!-- {{ referral.agentName }}
              {{ referral.agentCode }}
              {{ referral.phone }} -->
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <div v-if="currentReferral">
            <h4><em>Referral Info</em></h4>
            <div>
              <label><strong>Merchant Name:</strong></label>
              {{ currentReferral.yourname }}
            </div>
            <div>
              <label><strong>Referral Name:</strong></label>
              {{ currentReferral.referralname }}
            </div>
            <div>
              <label><strong>Agent Name:</strong></label>
              {{ currentReferral.agentname }}
            </div>
            <div>
              <label><strong>Agent Code:</strong></label>
              {{ currentReferral.agentcode }}
            </div>
            <div>
              <label><strong>BusinessName:</strong></label>
              {{ currentReferral.businessname }}
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
              :to="{ name: 'Referral', params: { id: currentReferral.id } }"
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
      referrals: [],
      currentReferral: null,
      currentIndex: -1,
      title: "",
      userData: "",
    };
  },
  created() {
    // let currentUser = user;
    // this.userData = currentUser.agentCode;
    // this.question = currentUser.agentCode;
    // console.log("REFERRALS LIST USER AGENT CODE IS : ", this.userData);
    //this.searchReferral();
  },
  methods: {
    retrieveReferrals() {
      console.log("GETTING ALL REFERRALS");
      DataService.getAll()
        .then((response) => {
          this.referrals = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveReferrals();
      this.currentReferral = null;
      this.currentIndex = -1;
    },

    setActiveReferral(tutorial, index) {
      this.currentReferral = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllReferrals() {
      DataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchReferral() {
      DataService.findByTitle(this.userData)
        .then((response) => {
          this.referrals = response.data;
          this.setActiveReferral(null);
          console.log("SEARCH TITLE RESPONSE DATA:::  ", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    // let currentUser = user;
    //this.userData = currentUser.agentCode;
    //this.question = currentUser.agentCode;
    //console.log("REFERRALS LIST USER AGENT CODE IS : ", this.userData);
    this.searchReferral();
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
  background-color: rgba(255, 255, 255, 0.4);
}

#card-body-bg {
  background-color: rgba(255, 255, 255, 0.4);
  width: 80vw;
}
.bg {
  animation: slide 4s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 2s;
}

.bg3 {
  animation-duration: 4s;
}
</style>
