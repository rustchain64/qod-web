<template>
  <!-- <h2>Plugin Example</h2>
  <p>
    This example demonstrates usage of both local and global plugins, zoom being
    global and data labels being local.
  </p> -->
  <div
    style="
      width: 30vw;
      display: flex;
      flex-direction: column;
      margin-bottom: 5%;
    "
  >
    <vue3-chart-js v-bind="{ ...lineChart }" />
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";
import dataLabels from "chartjs-plugin-datalabels";

// globally registered and available for all charts
Vue3ChartJs.registerGlobalPlugins([zoomPlugin]);

export default {
  name: "App",
  components: {
    Vue3ChartJs,
  },
  setup() {
    const lineChart = {
      type: "line",
      // locally registered and available for this chart
      plugins: [dataLabels],
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Pending",
            data: [15, 59, 80, 81, 66, 70, 85],
            fill: false,
            borderColor: "#41B883",
            backgroundColor: "limegreen",
          },
          {
            label: "Completed",
            data: [30, 25, 90, 98, 65, 60, 100],
            fill: false,
            borderColor: "#333",
            tension: 0.5,
            backgroundColor: "black",
          },
        ],
      },
      options: {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "y",
            },
          },
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderRadius: 4,
            color: "white",
            font: {
              weight: "bold",
            },
            formatter: Math.round,
            padding: 6,
          },
        },
      },
    };

    return {
      lineChart,
    };
  },
};
</script>
