<!-- eslint-disable no-unused-vars -->
<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import { useReferStore, useAlertStore } from "@/stores";
import { router } from "@/router";
import { reactive } from "vue";

import { useUsersStore } from "@/stores";
const usersStore = useUsersStore();
usersStore.getAll();
const { users } = storeToRefs(usersStore);
//usersStore.getAll(); see the moved method

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const referralStore = useReferStore();
const { refferal } = storeToRefs(referralStore);
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;
const terms = reactive({});
let testValue = process.env.VUE_APP_QOD_API_URL;
console.log("TEST ENV VALUES: ", testValue);
let title = "Who would you like to refer?" + testValue;
let referral = null;
let isDisabled = true;
if (id) {
  // edit mode
  title = "Edit User";
  ({ referral } = storeToRefs(referralStore));
  referralStore.getById(id);
}
const schema = Yup.object().shape({
  agentCode: Yup.string(),
  yourName: Yup.string().required("First Name is required"),
  refferlName: Yup.string().required("Last Name is required"),
  title: Yup.string().required("Username is required"),
  description: Yup.string().required("Username is required"),
});
</script>

<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="header_row">
    <!-- <img
      alt="Go Free logo"
      class="nav_logo"
      src="@/assets/images/transparent/pie_io_clr_slgn_trns.png"
      height="60"
    /> -->
    <h2 class="card-header" id="header_bg">{{ title }}</h2>
  </div>

  <div class="form_bg">
    <div>
      <div v-if="!submitted">
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          :initial-values="referralStore.users"
          v-slot="{ errors }"
        >
          <div class="form-row" id="form_row_bg">
            <div class="form-group col">
              <label>Your Name</label>
              <Field
                name="yourName"
                type="text"
                v-model="tutorial.yourName"
                class="form-control"
                :class="{ 'is-invalid': errors.yourName }"
              />
              <div class="invalid-feedback">{{ errors.yourName }}</div>
            </div>
            <div class="form-group col">
              <label>Referral Name</label>
              <Field
                name="referralName"
                type="text"
                v-model="tutorial.referralName"
                class="form-control"
                :class="{ 'is-invalid': errors.referralName }"
              />
              <div class="invalid-feedback">{{ errors.referralName }}</div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Agent Name</label>
              <Field
                name="agentName"
                type="text"
                v-model="tutorial.agentName"
                class="form-control"
                :class="{ 'is-invalid': errors.agentName }"
              />
              <div class="invalid-feedback">{{ errors.agentName }}</div>
            </div>
            <div class="form-group col">
              <label>Agent Code</label>
              <Field
                name="agentCode"
                type="text"
                v-model="tutorial.agentCode"
                class="form-control"
                id="code-width"
                :class="{ 'is-invalid': errors.agentCode }"
              />
              <div class="invalid-feedback">{{ errors.agentCode }}</div>
            </div>
            <button
              @click="getAgentCode(this.tutorial.agentName)"
              class="btn btn-warning"
              id="codeButton"
            >
              Get Agent Code
            </button>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Business Name</label>
              <Field
                name="businessName"
                type="text"
                v-model="tutorial.businessName"
                class="form-control"
                :class="{ 'is-invalid': errors.businessName }"
              />
              <div class="invalid-feedback">{{ errors.businessName }}</div>
            </div>
            <div class="form-group col">
              <label>Phone</label>
              <Field
                name="phone"
                type="text"
                v-model="tutorial.phone"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
              />
              <div class="invalid-feedback">{{ errors.phone }}</div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Note</label>
              <Field
                name="title"
                type="text"
                v-model="tutorial.title"
                class="form-control"
                :class="{ 'is-invalid': errors.title }"
              />
              <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
            <div class="form-group col">
              <label>Description</label>
              <Field
                name="description"
                type="text"
                v-model="tutorial.description"
                class="form-control"
                :class="{ 'is-invalid': errors.description }"
              />
              <div class="invalid-feedback">{{ errors.description }}</div>
            </div>
          </div>

          <div v-if="referralStore.loggedIn == null">
            <button
              @click="redirect_to_login"
              class="btn btn-success"
              id="login_button"
            >
              Login
            </button>
          </div>

          <div v-if="referralStore.loggedIn !== null">
            <button
              @click="saveTutorial"
              class="btn btn-success"
              id="login_button"
            >
              Refer Now
            </button>
          </div>
        </Form>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <h4>Thanks {{ user.firstName }}</h4>
        <h4>Agent {{ user.agentName }} will contact you shortly!</h4>
        <button class="btn btn-success" @click="newReferral">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        yourName: "",
        referralName: "",
        agentName: "",
        agentCode: "",
        businessName: "",
        phone: "",
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  mounted() {
    let formValues = referralStore.users;
    console.log("FORMS VALUES from referralStore.users : ", formValues);
    //this.getAgentCode("James Bond");
  },
  methods: {
    redirect_to_login() {
      console.log("COMMIT FORM VALUES TO STORE v-model : ", this.tutorial);
      //force a login in order to Submit Referral
      router.push("/account/login");
      // set loggedIn state
      let message;
      message = "User added";
      alertStore.success(message);
      referralStore.success(true);
      // commit form data
      referralStore.register(this.tutorial);
    },
    saveTutorial() {
      var data = {
        yourName: referralStore.users.yourName,
        referralName: referralStore.users.referralName,
        agentName: referralStore.users.agentName,
        agentCode: referralStore.users.agentCode,
        businessName: referralStore.businessName,
        phone: referralStore.phone,
        title: referralStore.users.title,
        description: referralStore.users.description,
      };
      // call the create function POST with data
      DataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log("ADD REFERRAL RESPONSE DATA: ", response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newReferral() {
      this.submitted = false;
      this.tutorial = {};
      this.tutorial.yourName = "";
      this.tutorial.referralName = "";
      this.tutorial.agentName = "";
      this.tutorial.agentCode = "";
      this.tutorial.title = "";
      this.tutorial.description = "";
      referralStore.clear();
    },
    getAgentCode(agentNamed) {
      let nameArray = agentNamed.split(" ");
      let firstName = nameArray[0];
      let lastName = nameArray[1];
      // console.log("FIRST NAME IS: ", nameArray[0]);
      // console.log("LAST NAME IS: ", nameArray[1]);
      console.log(">>> FUll NAME IS: ", firstName + " " + lastName);

      if (this.users.length != undefined) {
        console.log(">>> USERS LENGTH :: ", this.users.length);
        if (this.users.length > 0) {
          let text = "";
          for (let i = 0; i < this.users.length; i++) {
            text = this.users[i].firstName;
            // console.log("MATCH FIRST NAME : ", firstName);
            // console.log("AGENTS CODE ", this.users[i].agentCode);

            if (text == firstName) {
              console.log("FIRST NAME IS: ", firstName);
              console.log(
                "AGENT CODE FOR THIS NAME IS: ",
                this.users[i].agentCode
              );
              this.tutorial.agentCode = this.users[i].agentCode;
              //text = "";
            }
          }
        }
      } else {
        console.log("NO USERS LIST OBTAINED");
      }
    },
  },
};
</script>

<style>
#codeButton {
  height: 40px;
  margin-top: 37px;
}
#code-width {
  width: 80%;
}
.header_row {
  display: flex;
  background-color: whitesmoke;
}
Form {
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 2%;
}
.form_bg {
  background-color: rgba(255, 255, 255, 0.4);
  border-style: solid;
  border-width: 1px;
  border-color: whitesmoke;
}
label {
  opacity: 1;
  font-weight: 900;
  font-size: larger;
}

#login_button {
  margin-top: 2%;
  margin-bottom: 5%;
}

#header_bg {
  background-color: whitesmoke;
  opacity: 0.9;
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
/*  
.content {
    background-color:rgba(255,255,255,.8);
    border-radius:.25em;
    box-shadow:0 0 .25em rgba(0,0,0,.25);
    box-sizing:border-box;
    left:50%;
    padding:10vmin;
    position:fixed;
    text-align:center;
    top:50%;
    transform:translate(-50%, -50%);
} */

h1 {
  font-family: monospace;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}
</style>
