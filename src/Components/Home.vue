<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const goToRecycle = () => {
      router.push('/recycle')
    }
    return { goToRecycle }
  }
}
</script>

<template>
  <div class="hero-card">
    <div class="content">
      <h1 class="page-title">Welcome to Waste Wise</h1>
      <h2>
        Waste Wise is dedicated to building cleaner, greener communities by empowering people
        with the knowledge and tools to manage waste responsibly. Whether it’s recycling,
        reducing daily waste, or learning smarter disposal practices, we make it easy for
        everyone to play a part in protecting the environment. Join us as we work together
        toward a sustainable future—one small step at a time.
      </h2>

      <v-btn
        color="teal"
        class="cta-button"
        large
        @click="goToRecycle"
      >
        ♻ Start Recycling
      </v-btn>
    </div>
  </div>
</template>

<style>
.hero-card {
  position: relative;
  background-image: url('images/ivan-bandura-hqnUYXsN5oY-unsplash.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  color: white;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* overlay for readability */
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s forwards;
}

h2 {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s 0.3s forwards;
}

.cta-button {
  margin-top: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s 0.6s forwards;
}

/* Animation Keyframes */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  h2 {
    font-size: 1rem;
  }
}
</style>
