import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

//const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;


export const useReferStore = defineStore({
    id: 'referrals',
    state: () => ({
        users: {},
        loggedIn: null,
    }),
  actions: {
    success(message) {
        this.loggedIn = { message, type: 'alert-success' };
        console.log("REGISTER LOGGED IN STATUS,", message);
    },
    register(refferal) {        
        this.users = {...refferal};
        console.log("REGISTER BACK UP DATA,", this.users);
        //localStorage.setItem('referralAttributes', JSON.stringify(refferal));
    },
    clear() {        
        //this.users = {};
        console.log("CLEARING OUT FORM VALUES,", this.users);
        //localStorage.setItem('referralAttributes', JSON.stringify(refferal));
    }
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

