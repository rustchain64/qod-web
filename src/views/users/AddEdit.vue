<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAgentReferCodeStore } from '@/stores';
import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const referallCodeStore = useAgentReferCodeStore();


const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add User...';
let user = null;
if (id) {
    // edit mode
    title = 'Edit User';
    ({ user } = storeToRefs(usersStore));
    usersStore.getById(id);
}

const schema = Yup.object().shape({
    persona: Yup.string()
        .required('Persona is required'),
    agentCode: Yup.string(),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .transform(x => x === '' ? undefined : x)
        // password optional in edit mode
        .concat(user ? null : Yup.string().required('Password is required'))
        .min(6, 'Password must be at least 6 characters')
});

async function onSubmit(values) {
    try {
        let message;
        if (user) {
            await usersStore.update(user.value.id, values)
            message = 'User updated';
        } else {
            await usersStore.register(values);
            message = 'User added';
        }
        await router.push('/users');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <div class="add_edit_header">
        <h1>{{title}}</h1>
    <button @click="fetchReferralCodes" class="btn btn-sm btn-danger">Fetch User Code</button>
        <!-- {{referallCodeStore.agentCodes[0][this.length].agentCode}} -->
        {{this.referCode}}
    </div>
    
    <template v-if="!(user?.loading || user?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Persona</label>
                    <input  type="radio" id="admin" value="admin" v-model="picked" />
                    <label for="admin" class="persona_label">Admin</label>

                    <input type="radio" id="agent" value="agent" v-model="picked" />
                    <label for="agent" class="persona_label">Agent</label>

                    <input type="radio" id="merchant" value="merchant" v-model="picked" />
                    <label for="two" class="persona_label">Merchant</label><br>

                    <Field name="persona" type="text" v-model="picked" class="form-control" :class="{ 'is-invalid': errors.persona }" />
                    <div class="invalid-feedback">{{ errors.persona }}</div>
                </div>
                <!-- <div class="form-group col">
                    <label>Agent Code</label>
                    <Field name="agentCode" type="text" v-if="this.picked=='agent'" value="test" class="form-control" :class="{ 'is-invalid': errors.agentCode }" />
                    <div class="invalid-feedback">{{ errors.agentCode }}</div>
                </div> -->
                <div class="form-group col">
                    <label>Agent Code</label>
                    <Field name="agentCode" type="text" value="test" class="form-control" :class="{ 'is-invalid': errors.agentCode }" />
                    <div class="invalid-feedback">{{ errors.agentCode }}</div>
                </div>
            </div>
            <div class="form-row">                
                <div class="form-group col">
                    <label>First Name</label>
                    <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group col">
                    <label>Last Name</label>
                    <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Username</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group col">
                    <label>
                        Password
                        <em v-if="user">(Leave blank to keep the same password)</em>
                    </label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/users" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="user?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="user?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading user: {{user.error}}</div>
        </div>
    </template>
</template>

<script>    
export default {
  name: "add-user",
  data: () => ({
    picked: '',
    length: 0,
    referCode: "", 
  }),
  methods: {
    setPicked(event) {
        this.picked = event.target.value;
        console.log(event.target.value)
    },
    fetchReferralCodes() {
        let returnCodes = this.referallCodeStore.agentCodes;
        console.log("User List : ",returnCodes[0]);
        let codesLength = returnCodes[0].length - 1;
        this.length = codesLength;
        console.log("Fetched Codes length: ",codesLength);   
        console.log("Fetched Code : ",returnCodes[0][codesLength].agentCode);
        this.referCode = returnCodes[0][codesLength].agentCode; 
        this.referallCodeStore.deleteOneAgentCodes();
    }
  },
 
};
</script>

<style scoped>
@import '@/assets/base.css';
@import '@/assets/main.css';
.add_edit_header {
    display: flex;
    height: 6vh;
    margin-bottom: 5%;
}
.add_edit_header button {
    float:right;
    margin-left: 50%;
    margin-right: 1%;
    height: 40px;
}
</style>
