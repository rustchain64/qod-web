<template>
  <div class="vue-tempalte">
    <form>
      <h3>Forgot Password</h3>

      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" />
      </div>

      <!-- <button type="submit" class="btn btn-dark btn-lg btn-block" class="btn btn-success" @click=""> -->
      <button type="submit" class="btn btn-success" @click="resetPassword">
        Reset password
      </button>
    </form>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {};
  // },
  name: "forgot-password",
  data() {
    return {
      renew: {
        id: null,
        email: "",
        password: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    resetPassword() {
      var data = {
        title: this.renew.title,
        description: this.renew.description,
      };

      DataService.create(data)
        .then((response) => {
          this.renew.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPassword() {
      this.submitted = false;
      this.renew = {};
    },
  },
};

import DataService from "../../services/DataService";
</script>
