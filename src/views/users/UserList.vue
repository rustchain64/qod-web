<script setup>
import { storeToRefs } from "pinia";
import { useAgentReferCodeStore } from "@/stores";
import { useUsersStore } from "@/stores";

const referallCodeStore = useAgentReferCodeStore();
const { refUsers } = storeToRefs(referallCodeStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
usersStore.getAll();
</script>

<template>
  <div class="main">
    <div class="user-list-header">
      <h3>Users List</h3>

      <button @click="fetchReferralCodes" class="btn btn-sm btn-danger">
        Fetch User Code
      </button>
      {{ this.referCode }}
      <div class="add-user-button">
        <router-link to="/users/add" class="btn btn-sm">Add User</router-link>
      </div>
    </div>

    <table class="table table-striped" id="table-width">
      <thead>
        <tr>
          <th style="width: 10%">Persona Type</th>
          <th style="width: 10%">Agent Code</th>
          <th style="width: 10%">First Name</th>
          <th style="width: 10%">Last Name</th>
          <th style="width: 10%">Username</th>
          <th style="width: 5%"></th>
        </tr>
      </thead>
      <tbody v-if="users.length">
        <template v-for="user in users" :key="user.id">
          <tr>
            <td>{{ user.persona }}</td>
            <td>{{ user.agentcode }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.username }}</td>
            <td style="white-space: nowrap">
              <router-link
                :to="`/users/edit/${user.id}`"
                class="btn btn-sm btn-primary mr-1"
                >Edit</router-link
              >
              <button
                @click="usersStore.delete(user.id)"
                class="btn btn-sm btn-danger btn-delete-user"
                :disabled="user.isDeleting"
              >
                <span
                  v-if="user.isDeleting"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span v-else>Delete</span>
              </button>
            </td>
          </tr>
        </template>
        <tr v-if="users.loading">
          <td colspan="4" class="text-center">
            <span class="spinner-border spinner-border-lg align-center"></span>
          </td>
        </tr>
        <tr v-if="users.error">
          <td colspan="4">
            <div class="text-danger">
              Error loading users: {{ users.error }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {};
  // },
  name: "add-list",
  data() {
    return {
      id: null,
      length: 0,
      referCode: "",
    };
  },
  methods: {
    fetchReferralCodes() {
      let returnCodes = refUsers.agentCodes;
      console.log("User List : ", returnCodes[0]);
      let codesLength = returnCodes[0].length - 1;
      this.length = codesLength;
      console.log("Fetched Codes length: ", codesLength);
      console.log("Fetched Code : ", returnCodes[0][codesLength].agentCode);
      this.referCode = returnCodes[0][codesLength].agentCode;
    },
  },
};
</script>

<style scoped>
.main {
  width: 60vw;
}

#table-width {
  width: 60vw;
}
.user-label {
  float: left;
}
.user-list-header {
  width: 60vw;
  background-color: rgba(181, 173, 173, 0.2);
}
.add-user-button {
  float: right;
  background: limegreen;
  background: -webkit-linear-gradient(limegreen, rgb(31, 179, 229));
  background: -o-linear-gradient(limegreen, rgb(31, 179, 229));
  background: -moz-linear-gradient(limegreen, rgb(31, 179, 229));
  background: linear-gradient(limegreen, rgb(31, 179, 229));
}
</style>
