<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const bottleId = Number(route.params.id)

    const bottles = [
      {
        id: 1,
        name: "Sprite Energy Drink",
        desc: "Bottle available for recycling and points",
        img: "/images/bottles/derrick-payton-s6xYsISI9Zk-unsplash.jpg"
      },
      {
        id: 2,
        name: "Coca-Cola",
        desc: "Bottle available for recycling",
        img: "/images/bottles/easylife-designs-IJlyaf4q0_s-unsplash.jpg"
      },
      {
        id: 3,
        name: "Mountain Dew",
        desc: "Bottle available for recycling",
        img: "/images/bottles/erik-mclean-5JdKoyIKWW4-unsplash.jpg"
      },
      {
        id: 4,
        name: "Wisers Beer",
        desc: "Bottle available for recycling",
        img: "/images/bottles/shen-liu-J-UKLgHEotw-unsplash.jpg"
      },
      {
        id: 5,
        name: "Pepsi",
        desc: "Bottle available for recycling",
        img: "/images/nikhil-82LJQZGwW5o-unsplash.jpg"
      }
    ]

    const bottle = bottles.find(b => b.id === bottleId)

    function recycleBottle() {
      alert(`You have recycled ${bottle.name}! Points added coming soon.`)
    }

    return { bottle, recycleBottle, router }
  }
}
</script>

<template>
  <v-container>
    <v-btn color="grey" class="mb-4" @click="router.back()">← Back</v-btn>

    <v-card v-if="bottle" class="pa-4" elevation="8">
      <v-img :src="bottle.img" height="350px" cover></v-img>

      <v-card-title class="text-h5 mt-4">
        {{ bottle.name }}
      </v-card-title>

      <v-card-text class="text-body-1">
        {{ bottle.desc }}
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
