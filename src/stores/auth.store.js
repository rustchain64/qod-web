import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";
import { useAlertStore } from "@/stores";

//const baseUrl = `http://localhost:4000/users`;
const baseUrl = `http://localhost:8080/api/users`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      console.log("A USER IS LOGGING IN", username);
      console.log("A USER IS LOGGING IN", password);
      console.log("A USER IS LOGGING IN");
      try {
        //const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
        // const user = await fetchWrapper.post(`${baseUrl}`, {
        //   username,
        //   password,
        // });

        const user = await fetchWrapper.get(`${baseUrl}/` + username);
        console.log("GET USERS: ", user);

        // update pinia state

        this.user = user;
        console.log("AUTHENTICATE RESPONSE ussr: ", this.user);

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        // redirect to previous url or default to home page
        router.push(this.returnUrl || "/");
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    logout() {
      console.log("USER LOGGING OUT");
      this.user = null;
      localStorage.removeItem("user");
      router.push("/account/login");
    },
  },
});
