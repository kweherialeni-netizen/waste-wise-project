<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const auth = useAuthStore();

// Reactive points bound directly to auth store
const points = computed(() => auth.user?.points || 0);

const transactions = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch transaction history
onMounted(async () => {
  try {
    loading.value = true;
    const res = await axios.get("/api/profile", {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    transactions.value = res.data.data
  } catch (err) {
    console.error("Failed to fetch profile", err);
    error.value = "Failed to load profile data.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container class="py-6" max-width="900">
    <v-card elevation="3">
      <v-card-title>
        <h2>User Profile</h2>
      </v-card-title>

      <v-card-text>
        <v-alert v-if="error" type="error" dense class="mb-4">
          {{ error }}
        </v-alert>

        <v-skeleton-loader v-if="loading" type="card" height="150"/>

        <div v-else>
          <!-- Points Display -->
          <v-card class="mb-6 pa-4" color="teal lighten-4">
            <v-row justify="space-between" align="center">
              <v-col cols="auto">
                <span class="text-h6 font-medium">Current Points:</span>
              </v-col>
              <v-col cols="auto">
                <span class="text-h5 font-bold">{{ points }}</span>
              </v-col>
            </v-row>
          </v-card>

          <!-- Transaction History -->
          <h3 class="mb-2">Transaction History</h3>
          <v-data-table
            :items="transactions"
            :headers="[
              { text: 'Date', value: 'created_at' },
              { text: 'Type', value: 'type' },
              { text: 'Points', value: 'points_change' },
              { text: 'Description', value: 'description' }
            ]"
            :items-per-page="5"
            class="elevation-1"
          >
            <template #item.created_at="{ item }">
              {{ new Date(item.created_at).toLocaleString() }}
            </template>

            <template #item.points_change="{ item }">
              <span :class="item.points_change > 0 ? 'text-green' : 'text-red'">
                {{ item.points_change }}
              </span>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.text-green { color: #4caf50; }
.text-red { color: #f44336; }
</style>
