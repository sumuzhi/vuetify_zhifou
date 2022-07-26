<template>
  <div>
    <HeaderBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Main',
  components: { HeaderBar, Footer },
  data: () => ({}),
}
</script>
