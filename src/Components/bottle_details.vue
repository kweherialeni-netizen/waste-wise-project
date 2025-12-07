<template>
  <v-container>
    <v-btn color="grey" class="mb-4" @click="router.back()">← Back</v-btn>

    <v-card v-if="loading" class="pa-4" elevation="8">
      <v-card-text>Loading bottle details...</v-card-text>
    </v-card>

    <v-card v-else-if="bottle" class="pa-4" elevation="8">
      <v-img :src="bottle.img" height="350px" cover></v-img>

      <v-card-title class="text-h5 mt-4">
        {{ bottle.name }}
      </v-card-title>

      <v-card-text class="text-body-1">
        {{ bottle.desc }}
      </v-card-text>

      <v-card-text v-if="bottle.price !== undefined">
        Price: {{ bottle.price }}
      </v-card-text>

      <v-card-text v-if="bottle.quantity !== undefined">
        Quantity: {{ bottle.quantity }}
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

    <div v-else class="text-center text-h6">
      Bottle not found.
    </div>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const bottle = ref(null)
    const loading = ref(true)

    const localBottles = [
      { id: 1, name: "Sprite Energy Drink", desc: "Bottle available for recycling and points", img: "/images/bottles/derrick-payton-s6xYsISI9Zk-unsplash.jpg" },
      { id: 2, name: "Coca-Cola", desc: "Bottle available for recycling", img: "/images/bottles/easylife-designs-IJlyaf4q0_s-unsplash.jpg" },
      { id: 3, name: "Mountain Dew", desc: "Bottle available for recycling", img: "/images/bottles/erik-mclean-5JdKoyIKWW4-unsplash.jpg" },
      { id: 4, name: "Wisers Beer", desc: "Bottle available for recycling", img: "/images/bottles/shen-liu-J-UKLgHEotw-unsplash.jpg" },
      { id: 5, name: "Pepsi", desc: "Bottle available for recycling", img: "/images/nikhil-82LJQZGwW5o-unsplash.jpg" }
    ]

    const fetchBottle = async () => {
      loading.value = true
      const { id } = route.params
      try {
        const response = await axios.get(`http://localhost:8000/api/items/${id}`)
        // Map API fields to match local data structure
        bottle.value = {
          id: response.data.id,
          name: response.data.name,
          desc: response.data.desc || response.data.description,
          img: response.data.img
        }
      } catch (err) {
        console.warn('API failed, using local data.', err)
        // Fallback to local bottles
        bottle.value = localBottles.find(b => b.id === Number(id)) || null
      } finally {
        loading.value = false
      }
    }

    const recycleBottle = () => {
      if (!bottle.value) return
      // Here you can call a POST API to recycle the bottle
      alert(`You have recycled ${bottle.value.name}! Points added coming soon.`)
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
