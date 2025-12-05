<script setup>
import { ref } from 'vue'

// -----------------------------
// Single employee profile
// -----------------------------
const employee = ref({
  id: 1,
  name: 'Alice Johnson',
  points: 50,
  bottlesProcessed: 12
})

// -----------------------------
// Pending transactions (users returning bottles)
// Each transaction has the bottle info and bottles returned
// -----------------------------
const transactions = ref([
  {
    id: 1,
    userName: 'John Doe',
    bottlesReturned: 3,
    confirmed: false,
    bottle: {
      name: "Sprite Energy Drink",
      pointsPerBottle: 5,
      img: "/images/bottles/derrick-payton-s6xYsISI9Zk-unsplash.jpg"
    }
  },
  {
    id: 2,
    userName: 'Jane Smith',
    bottlesReturned: 5,
    confirmed: false,
    bottle: {
      name: "Coca-Cola",
      pointsPerBottle: 5,
      img: "/images/bottles/easylife-designs-IJlyaf4q0_s-unsplash.jpg"
    }
  },
  {
    id: 3,
    userName: 'Mark Lee',
    bottlesReturned: 2,
    confirmed: false,
    bottle: {
      name: "Pepsi",
      pointsPerBottle: 5,
      img: "/images/nikhil-82LJQZGwW5o-unsplash.jpg"
    }
  }
])

// -----------------------------
// Confirm a user's returned bottles
// -----------------------------
function confirmTransaction(transactionId) {
  const transaction = transactions.value.find(t => t.id === transactionId)

  if (!transaction || transaction.confirmed) {
    alert('This transaction is already confirmed or does not exist.')
    return
  }

  // Calculate total points for this transaction
  const totalPoints = transaction.bottlesReturned * transaction.bottle.pointsPerBottle

  // Update employee points and bottles processed
  employee.value.points += totalPoints
  employee.value.bottlesProcessed += transaction.bottlesReturned

  // Mark transaction as confirmed
  transaction.confirmed = true

  alert(`${employee.value.name} confirmed ${transaction.bottlesReturned} ${transaction.bottle.name} bottles from ${transaction.userName}. Points earned: ${totalPoints}`)
}
</script>

<template>
  <v-container>
    <!-- Employee Profile -->
    <v-card class="pa-4 mb-6 hover-card">
      <v-card-title>{{ employee.name }}</v-card-title>
      <v-card-text>
        Points: {{ employee.points }} <br>
        Bottles processed: {{ employee.bottlesProcessed }}
      </v-card-text>
    </v-card>

    <!-- Pending Transactions -->
    <h2>Pending Transactions</h2>
    <v-row>
      <v-col v-for="transaction in transactions" :key="transaction.id" md="6">
        <v-card class="pa-4 hover-card">
          <!-- Bottle Image -->
          <v-img :src="transaction.bottle.img" height="250px" cover></v-img>

          <v-card-title>{{ transaction.userName }}</v-card-title>
          <v-card-subtitle>
            Bottles: {{ transaction.bottlesReturned }} <br>
            Bottle: {{ transaction.bottle.name }} <br>
            Points per bottle: {{ transaction.bottle.pointsPerBottle }}
          </v-card-subtitle>

          <v-card-text>
            Status: 
            <span :class="transaction.confirmed ? 'text-success' : 'text-warning'">
              {{ transaction.confirmed ? 'Confirmed' : 'Pending' }}
            </span>
          </v-card-text>

          <v-card-actions>
            <v-btn 
              color="teal" 
              :disabled="transaction.confirmed"
              @click="confirmTransaction(transaction.id)">
              Confirm Bottles
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

.text-success {
  color: green;
}

.text-warning {
  color: orange;
}
</style>
