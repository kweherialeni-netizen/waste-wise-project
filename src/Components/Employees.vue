<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const employee = ref({ name: '', points: 0, bottlesProcessed: 0 })
const transactions = ref([])
const loading = ref(true)

// Fetch employee profile and pending transactions
const fetchData = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/employee/pending-transactions', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    employee.value = res.data.employee
    transactions.value = res.data.transactions
  } catch (err) {
    console.error('Failed to fetch employee data', err)
  } finally {
    loading.value = false
  }
}

// Confirm a transaction
const confirmTransaction = async (transactionId) => {
  try {
    const res = await axios.post(`/api/transactions/${transactionId}/confirm`, {}, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })

    // Update frontend state
    const t = transactions.value.find(tr => tr.id === transactionId)
    if (t) {
      t.confirmed = true
    }

    employee.value.points = res.data.employee.points
    employee.value.bottlesProcessed = res.data.employee.bottlesProcessed

    alert(res.data.message)
  } catch (err) {
    console.error('Failed to confirm transaction', err)
    alert('Could not confirm transaction. Try again.')
  }
}

onMounted(fetchData)
</script>

<template>
  <v-container>
    <v-card class="pa-4 mb-6 hover-card" v-if="!loading">
      <v-card-title>{{ employee.name }}</v-card-title>
      <v-card-text>
        Points: {{ employee.points }} <br>
        Bottles processed: {{ employee.bottlesProcessed }}
      </v-card-text>
    </v-card>

    <h2>Pending Transactions</h2>
    <v-row v-if="!loading">
      <v-col v-for="transaction in transactions" :key="transaction.id" md="6">
        <v-card class="pa-4 hover-card">
          <v-img :src="transaction.bottle.img" height="250px" cover></v-img>
          <v-card-title>{{ transaction.user.name }}</v-card-title>
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
              @click="confirmTransaction(transaction.id)"
            >
              Confirm Bottles
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-skeleton-loader v-if="loading" type="card" height="200" />
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
.text-success { color: green; }
.text-warning { color: orange; }
</style>
