<template>
  <v-app>
    <Main />
  </v-app>
</template>

<script>
import Main from '@/views/Main.vue'
export default {
  components: { Main },
  name: 'App',
}
</script>
<style>
/* 重写code标签的属性 */
.theme--light.v-application code {
  background-color: #282c34;
  color: #abb2bf;
}
</style>
