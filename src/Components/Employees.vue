<script setup>
import { ref } from 'vue'

// Sample employees data
const employees = ref([
  { id: 1, name: 'Alice Johnson', role: 'Cashier', points: 50, bottlesProcessed: 12 },
  { id: 2, name: 'Bob Smith', role: 'Manager', points: 120, bottlesProcessed: 30 },
  { id: 3, name: 'Charlie Brown', role: 'Stock Clerk', points: 30, bottlesProcessed: 5 }
])

function processBottle(employeeId) {
  const emp = employees.value.find(e => e.id === employeeId)
  emp.points += 5 // example points per bottle
  emp.bottlesProcessed += 1
  alert(`${emp.name} processed a bottle! Total points: ${emp.points}`)
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="employee in employees" :key="employee.id" md="4">
        <v-card class="pa-4 hover-card">
          <v-card-title>{{ employee.name }}</v-card-title>
          <v-card-subtitle>{{ employee.role }}</v-card-subtitle>
          <v-card-text>
            Points: {{ employee.points }} <br>
            Bottles processed: {{ employee.bottlesProcessed }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="teal" @click="processBottle(employee.id)">
              Process Bottle
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.hover-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
</style>
