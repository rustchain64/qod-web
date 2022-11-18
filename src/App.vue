

<template>
  <div class="container pt-4 pb-4">
    <img alt="Vue logo" src="./assets/pie_logo.png" width="250">
    <div class="my-row">
      <div class="value">ROOT API ::  {{ this.envValue }}</div>
      <button @click="showRootApi()">SHOW ROOT API</button>
    </div>

    <div class="my-row">
      <div class="value"> QUOTE API ::  {{ this.qodApiUrl }}</div>
      <button @click="showQuoteApi()">SHOW QUOTE API</button>
    </div>
    <!-- <HelloWorld msg="Apple Pie"/> -->
  </div>
  <div class="container pt-4 pb-4">
      <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {     
      envValue: 'test',
      qodApiUrl: 'greetings',
    };
  },
  methods: {
    showRootApi() {
      console.log(process.env.VUE_APP_ROOT_API);
      this.envValue = process.env.VUE_APP_ROOT_API;
      //router.push(this.returnUrl || '/adminDashboard');
    },
    showQuoteApi() {
      console.log(process.env.VUE_APP_QOD_API_URL);
      this.qodApiUrl = process.env.VUE_APP_QOD_API_URL;
      //router.push(this.returnUrl || '/adminDashboard');
    },
    mounted() {
      console.log("mounted");      
    },
  }
}
</script>

<style>
@import '@/assets/main.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.my-row {
  width: 50vw;
  display: flex;
  justify-content: center;
}
.value {
  margin-right: 10%;
}
</style>
