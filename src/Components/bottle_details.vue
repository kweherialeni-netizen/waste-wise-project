<template>
  <v-container>
    <!-- Back button -->
    <v-btn color="grey" class="mb-4" @click="router.back()">← Back</v-btn>

    <!-- Loading state -->
    <v-card v-if="loading" class="pa-4" elevation="8">
      <v-card-text>Loading bottle details...</v-card-text>
    </v-card>

    <!-- Bottle details -->
    <v-card v-else-if="bottle" class="pa-4" elevation="8">
      <v-img :src="bottle.img" height="350px" cover></v-img>

      <v-card-title class="text-h5 mt-4">
        {{ bottle.name }}
      </v-card-title>

      <v-card-text class="text-body-1">
        {{ bottle.desc }}
      </v-card-text>

      <v-card-text v-if="bottle.type">
        Type: {{ bottle.type }}
      </v-card-text>

      <v-card-text v-if="bottle.points">
        Points: {{ bottle.points }}
      </v-card-text>

      <v-btn
        color="teal-darken-1"
        large
        block
        class="mt-3"
        @click="recycleBottle"
      >
        Recycle & Earn Points
      </v-btn>
    </v-card>

    <!-- Not found -->
    <div v-else class="text-center text-h6">
      Bottle not found.
    </div>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const auth = useAuthStore()

    const bottle = ref(null)
    const loading = ref(true)

    const localBottles = [
      { id: 1, name: "Sprite Energy Drink", type: "Plastic Bottle", points: 5, desc: "Bottle available for recycling", img: "/images/bottles/derrick-payton-s6xYsISI9Zk-unsplash.jpg" },
      { id: 2, name: "Coca-Cola", type: "Plastic Bottle", points: 5, desc: "Bottle available for recycling", img: "/images/bottles/easylife-designs-IJlyaf4q0_s-unsplash.jpg" },
      { id: 3, name: "Mountain Dew", type: "Glass Bottle", points: 8, desc: "Bottle available for recycling", img: "/images/bottles/erik-mclean-5JdKoyIKWW4-unsplash.jpg" },
      { id: 4, name: "Wisers Beer", type: "Glass Bottle", points: 10, desc: "Bottle available for recycling", img: "/images/bottles/shen-liu-J-UKLgHEotw-unsplash.jpg" },
      { id: 5, name: "Pepsi", type: "Plastic Bottle", points: 5, desc: "Bottle available for recycling", img: "/images/nikhil-82LJQZGwW5o-unsplash.jpg" },
      { id: 6, name: "Coca cola", type: "Plastic Bottle", points: 5, desc: "Bottle available for recycling", img: "/images/bottles/easylife-designs-IJlyaf4q0_s-unsplash.jpg" }
    ]

    const fetchBottle = async () => {
      loading.value = true
      const { id } = route.params
      try {
        const response = await axios.get(`http://localhost:8000/api/items/${id}`)
        bottle.value = {
          id: response.data.data?.id || id,
          name: response.data.data?.name,
          type: response.data.data?.type || "Plastic Bottle",
          points: response.data.data?.points || 5,
          desc: response.data.data?.desc || response.data.data?.description,
          img: response.data.data?.img
        }
      } catch (err) {
        console.warn('API failed, using local data.', err)
        bottle.value = localBottles.find(b => b.id === Number(route.params.id)) || null
      } finally {
        loading.value = false
      }
    }

    const recycleBottle = async () => {
  if (!bottle.value) return
  try {
    const response = await axios.post(
      `http://localhost:8000/api/items/${bottle.value.id}/recycle`,
      {},
      {
        headers: { Authorization: `Bearer ${auth.token}` }
      }
    )

    // Update auth store and localStorage for instant profile update
    if (auth.user) {
      auth.user.points = response.data.user_points  // <-- changed here
      localStorage.setItem('user', JSON.stringify(auth.user))
    }

    alert(response.data.message)
  } catch (err) {
    console.error(err)
    alert('Failed to recycle bottle. Please try again.')
  }
}


    onMounted(fetchBottle)

    return { bottle, loading, recycleBottle, router }
  }
}
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
