<template>
    <div class="line_chart">
      <!-- <div style="display: flex; justify-content: center">
        <button type="button" @click="shuffleData">Shuffle</button>
        <button type="button" @click="switchLegend">Swicth legends</button>
      </div> -->
      <LineChart v-bind="lineChartProps" />
    </div>
  </template>
  
  <script lang='ts'>
  import { computed } from "vue";
  import { LineChart, useLineChart } from "vue-chart-3";
  import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
  Chart.register(...registerables);
  
  export default {
    name: "Home",
    components: { LineChart },
    setup() {
      const getData = computed<ChartData<"line">>(() => ({
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Pending",
            data: [45, 59, 80, 81, 56, 55, 40, 80, 70, 93, 95, 98],
            fill: false,
            borderColor: "limegreen",
          },
          {
            label: "Completed",
            data: [28, 48, 40,29, 46, 57, 70, 78, 65, 88, 90, 92],
            fill: false,
            borderColor: "#565656",
          },
        ],
      }));
  
      const options = computed<ChartOptions<"line">>(() => ({
        plugins: {
          legend: {
            display: false,
          },
        },
      }));
  
      const { lineChartProps } = useLineChart({
        options,
        chartData: getData,
      });
  
      return {
        getData,
        options,
        lineChartProps,
      };
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .line_chart {
    width: 600px;
  }
  
  </style>
  