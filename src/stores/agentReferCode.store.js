import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';
import referralCodeGenerator from 'referral-code-generator'

//const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;


export const useAgentReferCodeStore = defineStore({
    id: 'agentReferralCodes',
    state: () => ({
        agentCodes: [],
    }),
  actions: {
    getAgentReferralCode() {
        console.log("GET AGENT CODE:: ,", this.agentCodes);

        return this.agentCodes.length;
    },
    getLength() {
        console.log("get Length,", this.agentCodes.length);

        return {code: this.agentCodes};
    },
    // generate 100 codes
    putAllReferralCodes(value) {        
        //let newRefferalCode = referralCodeGenerator.alphaNumeric('uppercase', 5, 1);
        //console.log("putAll value: ,", value);
        this.agentCodes.push(value);
        console.log("AGENT REFERRAL CODE STRORE");
        console.log("length:", this.agentCodes[0].length);
        console.log("AgentCodes Array,", this.agentCodes[0]);
    },
    clearAgentCodes() {        
        this.agentCodes = [];
        console.log("CLEARING agentCodes,", this.agentCodes);
    },
    deleteOneAgentCodes() {        
        console.log("Delete Pre POP One ... length:");
        this.agentCodes[0].pop();
        console.log("POST One ... length:");
    }
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

