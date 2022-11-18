<script setup>
import referralCodeGenerator from 'referral-code-generator'

import { useAgentReferCodeStore } from '@/stores';

const agentReferStore = useAgentReferCodeStore();


</script>

<template>
    
            <h2>Admin Tools : Generate Referral Codes</h2>
            <div class="tool_actions">
                <h3>Generate Batch Code</h3>
                <span><button @click="deleteAll" class="btn btn-danger">Delete All Codes</button></span>
                <span>Number of Agent Referral Codes: {{this.numberOfCodes}}</span>
                <span><button @click="generateCode" class="btn btn-primary">Generate Code</button></span>
                <span>Code: {{this.agentCode}}</span>
                <span><button @click="commitAgentCode" class="btn btn-success">Commit Code</button></span>
                <span>Code: {{this.agnetCode}}</span>
                <span><button @click="getAllAgentCode" class="btn btn-warning">Get All Codes</button></span>

                <div>
                    <ul>
                        <li v-for="code in this.allAgentCodes" class="code_list">
                            {{code.agentCode}}
                        </li>
                    </ul>
                </div>
            </div>
           
            
         
</template>

<script>
import AgentCodeDataService from "../services/AgentCodeDataService";

export default {
  name: "tooling-genrateAgentCode",
  data() {
    return {
        id: null,
        title: ' NO NO',
        agnetCode: '',  
        allAgentCodes: '',
        numberOfCodes: 0,  
    };
  },
  methods: {
    generateCode() {
        let newRefferalCode = referralCodeGenerator.alphaNumeric('uppercase', 2, 1);
        console.log("TOOLING GENERATED CODE,", newRefferalCode);
        this.agentCode = "AG"+newRefferalCode;
        console.log("TOOLING GENERATED CODE,", this.agentCode);
    },
    commitAgentCode(values) {
      var data = {
        agentCode: this.agentCode,
      };
      console.log("SAVE THIS AGENT CODE ", this.agentCode)
      // call the create function POST with data
      AgentCodeDataService.create(data)
        .then(response => {
          //this.agentCode.id = response.data.id;
          console.log("RESPONSE .DATA.id : ", response.data.id);
          console.log("RESPONSE .DATA.agentCode : ", response.data.agentCode);
          this.agentCode = response.data.agentCode;
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAllAgentCode() {
        AgentCodeDataService.getAll()
        .then((response) => {
          this.allAgentCodes = response.data;
          this.numberOfCodes = response.data.length;
          //localStorage.setItem('aentReferralCodes', JSON.stringify(response.data));
          this.agentReferStore.putAllReferralCodes(response.data); // change this to get all codes
          let returnCodes = this.agentReferStore.agentCodes;
          console.log("Refer Stroe Codes Return : ",returnCodes[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteAll() {
        AgentCodeDataService.deleteAll()
        .then((response) => {
          console.log("DELETE ALL CODES length : ",response.data.length);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }
};
</script>

<style scoped>
@import '@/assets/base.css';
@import '@/assets/main.css';

.tool_actions_row {
    display: flex;
    flex-direction: column;
}
.tool_actions {
    display: flex;
    flex-direction: column;
}
.tool_actions button {
    width: 20vw;
    justify-content: center;
}

.code_list {
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
}
</style>

