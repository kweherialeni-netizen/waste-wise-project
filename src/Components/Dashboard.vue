<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <!-- Legend position selector -->
    <v-select
      v-model="legendMode"
      :items="[
          { prependIcon: 'mdi-arrow-left', value: 'left', title :'left' },
        { prependIcon: 'mdi-arrow-up', value: 'top', title :'top' },
        { prependIcon: 'mdi-arrow-right', value: 'right', title :'right' },
        { prependIcon: 'mdi-arrow-down', value: 'bottom', title :'bottom' },
        { prependIcon: 'mdi-eye-off', value: 'hidden', title :'hidden' },
      ]"
      prefix="Legend mode: "
      rounded="xl"
      variant="solo"
      width="350"
      item-props
      single-line
    ></v-select>

    <!-- Pie chart container -->
    <v-sheet class="pa-6 mt-6" elevation="6" rounded="xl">
      <v-pie
      
        :items="items"
        :legend="legendConfig"
        :tooltip="{
          subtitleFormat: (s) =>
            `${formatNumber(s.value)} recycled items (${(100 * s.value / total).toFixed(1)}%)`
        }"
        inner-cut="85"
        size="300"
        animation
        hide-slice
      >
        <template v-slot:legend-text="{ item }">
          <div class="d-flex ga-6">
            <div>{{ item.title }}</div>
            <div class="ml-auto font-weight-bold">
              {{ formatNumber(item.value) }}
            </div>
          </div>
        </template>
      </v-pie>
    </v-sheet>
      <v-btn to="/Stats" color="teal" variant="elevated" @click="Stats">
              View impact
            </v-btn>
  </v-container>
  
</template>

<script>
import { Colors } from 'chart.js';
import { VPie } from 'vuetify/labs/VPie'

function Stats(){}

export default {
  components: {
    VPie,
  },

  data() {
    return {
      legendMode: "left",

      // 12 months with sample values
      items: [
  { title: "January", value: 120, color: "#42a5f5" },
  { title: "February", value: 95, color: "#66bb6a" },
  { title: "March", value: 140, color: "#ffa726" },
  { title: "April", value: 110, color: "#ab47bc" },
  { title: "May", value: 160, color: "#26c6da" },
  { title: "June", value: 130, color: "#ef5350" },
  { title: "July", value: 150, color: "#8d6e63" },
  { title: "August", value: 170, color: "#d4e157" },
  { title: "September", value: 125, color: "#5c6bc0" },
  { title: "October", value: 145, color: "#ff7043" },
  { title: "November", value: 155, color: "#26a69a" },
  { title: "December", value: 180, color: "#7e57c2" },
],

    }
  },

  computed: {
    // Total for percentage calculations
    total() {
      return this.items.reduce((sum, item) => sum + item.value, 0)
    },

    // Legend configuration
    legendConfig() {
      return {
        position: this.legendMode,
        show: this.legendMode !== "hidden",
      }
    },
  },

  methods: {
    // Format numbers with commas
    formatNumber(n) {
      return new Intl.NumberFormat().format(n)
    },
  },
}
</script>

<style>
/* Optional styling */
.v-sheet {
  
  max-width: 700px;
  width: 100%;
}

.v-select {
  max-width: 350px;
  width: 100%;
}
</style>
