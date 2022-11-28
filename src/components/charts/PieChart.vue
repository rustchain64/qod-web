<template>
  <!-- <h2>Pie Chart</h2> -->
  <div style="width: 25vw; display: flex; flex-direction: column">
    <vue3-chart-js v-bind="{ ...pieChart }" />
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  name: "App",
  components: {
    Vue3ChartJs,
  },
  setup() {
    const pieChart = {
      type: "pie",
      data: {
        labels: ["Pending", "Completed", "Expired"],
        datasets: [
          {
            backgroundColor: ["limegreen", "#333", "silver"],
            data: [80, 40, 20],
          },
        ],
      },
    };

    return {
      pieChart,
    };
  },
};
</script>
