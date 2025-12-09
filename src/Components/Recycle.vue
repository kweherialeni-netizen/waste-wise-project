<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from "@/stores/auth";

export default {
  setup() {
    const router = useRouter()
    const bottles = ref([])
    const loading = ref(true)
    const userPoints = ref(0) // display user's points
    const auth = useAuthStore();

    // Fetch bottles from backend
    const fetchBottles = async () => {
      loading.value = true
      try {
        const response = await axios.get('http://localhost:8000/api/items')
        bottles.value = response.data.data
      } catch (err) {
        console.error('Failed to fetch bottles:', err)
      } finally {
        loading.value = false
      }
    }

    // Navigate to bottle details page
    const openDetails = (id) => {
      if (!id) return
      router.push(`/bottle_details/${id}`)
    }

    // Recycle a bottle
    const recycleBottle = async (id) => {
      try {
        const token = localStorage.getItem('token') 

        const response = await axios.post(
          `http://localhost:8000/api/items/${id}/recycle`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        alert(response.data.message)
        userPoints.value = response.data.user_points

        // Update auth store so profile shows latest points
        if (auth.user) {
          auth.user.points = response.data.user_points
        }

        // Refresh bottles list if needed
        await fetchBottles()
      } catch (err) {
        console.error('Failed to recycle bottle:', err.response?.data || err)
        alert(err.response?.data?.message || 'Recycle failed')
      }
    }

    onMounted(fetchBottles)

    return { bottles, openDetails, loading, recycleBottle, userPoints }
  }
}
</script>

<template>
  <v-container>
    <v-row v-if="loading">
      <v-col>
        <v-card class="pa-4" elevation="6">
          Loading bottles...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="bottle in bottles"
        :key="bottle.id"
        md="4"
        class="d-flex"
      >
        <v-card
          color="teal"
          class="pa-2 hover-card"
          elevation="6"
        >
          <v-img
            :src="bottle.img"
            height="200px"
            cover
          ></v-img>

          <v-card-title class="white--text">
            {{ bottle.name }}
          </v-card-title>

          <v-card-subtitle class="white--text">
            {{ bottle.type }} • {{ bottle.points }} Points
          </v-card-subtitle>

          <v-card-text class="white--text">
            {{ bottle.desc }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click.stop="recycleBottle(bottle.id)">
              Recycle
            </v-btn>
            <v-btn text color="white" @click="openDetails(bottle.id)">
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="pa-4" elevation="6">
          Your Points: {{ userPoints }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.hover-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 8px 20px rgba(0,0,0,0.3);
}
</style>
