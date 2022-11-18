<script setup>
import { storeToRefs } from 'pinia';
import { useAgentReferCodeStore } from '@/stores';
import { useUsersStore } from '@/stores';

const referallCodeStore = useAgentReferCodeStore();
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
usersStore.getAll();

</script>

<template>
    <div class="card m-3">
    <div class="card-header">
        <div class="user-label">
            <h3>Users List</h3>
        </div>
        <!-- <button @click="fetchReferralCodes" class="btn btn-sm btn-danger">
        Fetch User Code</button>
        {{this.referCode}} -->
        <div class="add-user-button">
            <router-link to="/users/add" class="btn btn-sm" >Add User</router-link>
        </div>
        
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 20%">Persona Type</th>
                <th style="width: 20%">Agent Code</th>
                <th style="width: 20%">First Name</th>
                <th style="width: 20%">Last Name</th>
                <th style="width: 20%">Username</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="users.length" v-for="user in users" :key="user.id">
                <tr>
                    <td>{{ user.persona }}</td>
                    <td>{{ user.agentCode }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.username }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/users/edit/${user.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="usersStore.delete(user.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="user.isDeleting">
                            <span v-if="user.isDeleting" class="spinner-border spinner-border-sm"></span>
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
                    <div class="text-danger">Error loading users: {{users.error}}</div>
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
  name: "add-tutorial",
  data() {
    return {
        id: null,
        length: 0,
        referCode: "",     
    };
  },
  methods: {
    fetchReferralCodes() {
        let returnCodes = this.referallCodeStore.agentCodes;
        console.log("User List : ",returnCodes[0]);
        let codesLength = returnCodes[0].length - 1;
        this.length = codesLength;
        console.log("Fetched Codes length: ",codesLength);   
        console.log("Fetched Code : ",returnCodes[0][codesLength].agentCode);
        this.referCode = returnCodes[0][codesLength].agentCode; 
    }
  },
};
</script>

<style scoped>
    .user-bar {
        background-color: rgb(138, 106, 106);
    }
    
    .user-label {
        float: left;
        height: 3vh;
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
