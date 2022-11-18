<script setup>
// import WelcomeItem from "./WelcomeItem.vue";
import { Pie } from "vue-chartjs";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
import UserList from "../views/users/UserList.vue";
import ReferralsList from "./ReferralsList.vue";
import Tooling from "./Tooling.vue";
import Reporting from "./Reporting.vue";

</script>

<template>
  <div class="left_menu">
      <button @click="userSplash">
        <img
          alt="Go Free logo"
          class="export_pdf"
          src="@/assets/images/user_list.png"          
          />
      </button>
      <button @click="referralListSplash">
        <img
          alt="Go Free logo"
          class="export_pdf"
          src="@/assets/images/list-256.png"          
          />
      </button>
      <button @click="chartSplash">
        <img
          alt="Go Free logo"
          class="export_pdf"
          src="@/assets/images/chart_icon.png"          
          />
      </button>
      <button @click="toolingSplash">
        <img
          alt="Go Free logo"
          class="export_pdf"
          src="@/assets/images/tool.png"          
          />
      </button>
      <button @click="ecoSplash">
        <img
          alt="Go Free logo"
          class="export_pdf"
          src="@/assets/images/data_feedback.png"          
          />
      </button>      
      <button @click="exportPdf">
        <img
          alt="Go Free logo"
          class="export_pdf"
          src="@/assets/images/pdf_exp.jpg"          
          />
        </button>
  </div>
  
  <div v-if="this.view == 'exportPdf'" >
    <img
      alt="Export as PDF"
      
      src="@/assets/images/pdf_exp.jpg"
      
    />
  </div>
  <div v-if="this.view == 'userList'"><UserList /></div>
  <div v-else-if="this.view == 'chart'" class="charting">
    <div><h2>Referrals by Status</h2><PieChart /></div>
    <div><h2>Referrals Rewards</h2><LineChart /></div>    
  </div>
  <div v-else-if="this.view == 'tooling'"><Tooling /></div>
  <div v-else-if="this.view =='eco'"><Reporting /></div>
  <div v-else-if="this.view =='support'">
    <!-- <h2>Referrals Details</h2> -->
     <ReferralsList />
  </div>
    
  <div v-else-if="this.view =='landing'" class="content">
    <div class="top_row">
      <div class="top_left">
        <div>
          <img
          alt="Go Free logo"
          class="logo"
          src="@/assets/images/dash_user_list.png"
          height="300px"
          />
        </div>
      </div>
      <div class="top_right">
        <div>
          <img
          alt="Go Free logo"
          class="logo"
          src="@/assets/images/referList.png"
          height="300px"
          /></div>
      </div>
    </div>
    
    <div class="bottom_row">
      <div class="bottom_left">
        <div>Bottom  Left</div>
      </div>
      <div class="bottom_right">
        <div>
          <img
          alt="Go Free logo"
          class="logo"
          src="@/assets/images/charts_button.png"
          height="300px"
          />
        </div>
      </div>
    </div>
  </div>

  
</template>

<script>    
export default {
    name: "admin_landing",
    data() {
        return {
            view: "landing",
        };
    },
    mounted() {
        console.log("view ?", this.view);
    },
    methods: {
        userSplash() {
            console.log("user List view");
            this.view = "userList";
        },        
        referralListSplash() {
            console.log("Support view");
            this.view = "support";
        },
        chartSplash() {
            console.log("Chart view");
            this.view = "chart";
        },
        toolingSplash() {
            console.log("tooling Test view");
            this.view = "tooling";
        },
        ecoSplash() {
            console.log("eco view");
            this.view = "eco";
        },
        exportPdf() {
            console.log("Export as PDF");
            this.view = "exportPdf";
        },
    },
    components: { Pie }
};
</script>

<style scoped>

.left_menu {
  float:left;
  display: flex;
  flex-direction: column;
  width: 4vw;
  height: 90vh;
  background-color: whitesmoke;
}
.left_menu button {
  margin-bottom: 30%;  
  border: none;
}
.content {
  max-width: 90vw;
}

.export_pdf {
  width: 3vw;
  height: 4vh;
}

.charting {
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 400px;
}
.top_row {
    display: flex;    
    height: 40vh;
}
.bottom_row {
    display: flex;
    height: 40vh;
}

.top_left {
  width: 45vw;
  background-color: aquamarine;
}

.top_right {
  width: 45vw;
  background-color: lemonchiffon;
}

.bottom_left {
  width: 45vw;
  background-color:violet;
}

.bottom_right {
  width: 45vw;
  background-color: silver;
}
</style>