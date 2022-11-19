import { defineStore } from "pinia";
// import { fetchWrapper } from "@/helpers";
// import { useAuthStore } from "@/stores";

//const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;

export const useReferStore = defineStore({
  id: "referrals",
  state: () => ({
    refUsers: {},
    loggedIn: null,
  }),
  actions: {
    success(message) {
      this.loggedIn = { message, type: "alert-success" };
      console.log("REGISTER LOGGED IN STATUS,", message);
    },
    register(refferal) {
      this.refUsers = { ...refferal };
      console.log("REGISTER BACK UP DATA,", this.refUsers);
      //localStorage.setItem('referralAttributes', JSON.stringify(refferal));
    },
    clear() {
      //this.users = {};
      console.log("CLEARING OUT FORM VALUES,", this.refUsers);
      //localStorage.setItem('referralAttributes', JSON.stringify(refferal));
    },
  },
});

//localStorage.setItem('referral', JSON.stringify(referral));
