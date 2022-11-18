<template>
  <div class="card m-3" id="form_bg">
  <img
      alt="Go Free logo"
      class="nav_logo"
      src="../assets/pie_logo.png"
      
  />

  <h4 class="card-header" >Create Login</h4>
  <div class="card-body">
  
      <h3>Add/Edit a Referral</h3>

  <form @submit.prevent="update">
      <div class="row">
      <div class="col-6">
          <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          ref="name"
          size="60"
          />
      </div>
      <div class="col-6">
          <input
          type="number"
          v-model="form.stock"
          placeholder="Stock"
          ref="stock"
          size="60"
          min="0"
          />
      </div>
      </div>
      <input type="submit" value="Save" />
  </form>
  </div>
      <h3>Referral List</h3>

      <div class="row">
          <div class="col-2">Name</div>
          <div class="col-2">Stock</div>
      </div>

      <div class="row" v-for="(fruit, index) in fruits" :key="index">
          <div class="col-2">{{ fruit.name }}</div>
          <div class="col-2">{{ fruit.stock }}</div>
          <div class="col-8">
          <a @click="edit( fruit )" class="btn">Edit</a>
          <a @click="remove( fruit )" class="btn">Remove</a>
          </div>
      </div>
  </div>
</template>


<script>
export default {
  name: "app",
  data: () => ({
      form: {
      id: -1,
      name: '',
      stock: 0,
      },
      fruits: [],
      method: '',
      url: '',
      data: {},
      fruit: '',
  }),
  methods: {
      edit(fruit) {
          console.log("EDIT FRUIT COUNT / NAME : ");
          this.form.name = fruit.name;
          this.form.stock = parseInt(fruit.stock);
          this.form.id = fruit.id;
      },
      async remove(fruit) {
      console.log("remove DELETE FRUIT : ");
      await fetch(`/api/fruits/${fruit.id}`, {
          method: 'DELETE',
      })
          .then(this._success)
          .catch(this._error);
      },
      async _refreshPageData() {
      const result = await fetch('/api/fruits', {
          method: 'GET',
      });
      if (result.ok) {
          const resultData = await result.json();
          this.fruits = resultData;
      } else {
          console.log(result.statusText);
      }
      },
      async update() {
      console.log("update SAVE : ");
      this.form.name = this.$refs.name.value;
      this.form.stock = this.$refs.stock.value;
      if (this.form.id == -1) {
          this.method = 'POST';
          this.url = '/api/fruits';
          this.data.name = this.form.name;
          this.data.stock = this.form.stock;
      } else {
          this.method = 'PUT';
          this.url = '/api/fruits/' + this.form.id;
          this.data.name = this.form.name;
          this.data.stock = this.form.stock;
      }

      await fetch(this.url, {
          method: this.method,
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.data),
      })
          .then(this._success)
          .catch(this._error);
      },
      // _success(response) {
      // this._refreshPageData();
      // this._clearForm();
      // },
      // _error(response) {
      // alert(
      //     response.data
      //     ? JSON.stringify(response.data)
      //     : response.statusText
      // );
      // },
      // _clearForm() {
      // this.form.name = '';
      // this.form.stock = 0;
      // this.form.id = -1;
      // },
  },
  mounted: function () {
      console.log("mounted::");
      this._refreshPageData();
  },
};
</script>

<style>
  @import '../assets/base.css';
  input[type='number'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: 0;
  font-family: 'Open Sans', serif;
  }
  .body {
      width: 100vw;
  }
  .nav_logo {
    max-width: 40vw;
  }
  #form_bg {
      background-color:rgba(255,255,255,.4);
      border-style: solid;
      border-width: 1px;
      border-color:whitesmoke;
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

  h1 {
      font-family:monospace;
  }

  @keyframes slide {
      0% {
          transform:translateX(-25%);
      }

      100% {
          transform:translateX(25%);
      }
  }
</style>

