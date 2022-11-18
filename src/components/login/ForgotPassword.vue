<template>
  <div class="vue-tempalte">
    <form>
      <h3>Forgot Password</h3>

      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" />
      </div>

      <!-- <button type="submit" class="btn btn-dark btn-lg btn-block" class="btn btn-success" @click="newTutorial"> -->
      <button type="submit" class="btn btn-success" @click="newPassword">
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
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };

      DataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
  },
};

import DataService from "../../services/DataService";
</script>
