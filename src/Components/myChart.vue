<!-- <template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';

export default {
  props: {
    chartType: {
      type: String,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    Chart.register(...registerables); // Register all necessary Chart.js components
    this.renderChart();
  },
  watch: {
    chartData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    chartOptions: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.myChart = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions,
      });
    },
    updateChart() {
      if (this.myChart) {
        this.myChart.data = this.chartData;
        this.myChart.options = this.chartOptions;
        this.myChart.update();
      }
    },
  },
  beforeUnmount() {
    if (this.myChart) {
      this.myChart.destroy();
    }
  },
};
</script> -->
<template></template>
<script></script>