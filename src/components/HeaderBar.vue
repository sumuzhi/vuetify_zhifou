<template>
  <v-app-bar app color="#ffffff">
    <v-container fluid>
      <v-tabs centered slider-size="3" :value="tabValue">
        <v-tab :to="item.href" v-for="item in tabMenus" :key="item.id">{{ item.name }}</v-tab>
      </v-tabs>
      <v-btn text absolute right top class="mr-10" @click="showLoginWindow">登录</v-btn>
      <!-- 登录注册 -->
      <LoginRegister />
    </v-container>
  </v-app-bar>
</template>

<script>
import LoginRegister from '@/components/loginRegister'
export default {
  name: 'HeaderBar',
  components: { LoginRegister },
  data() {
    return {
      tabMenus: [],
      tabValue: null,
    }
  },
  created() {
    this.getTabMenus()
    this.$bus.$on('changeTabs', value => {
      this.tabValue = value
    })
  },

  methods: {
    showLoginWindow() {
      this.$bus.$emit('showLoginWindow', true)
    },

    getTabMenus() {
      this.tabMenus = [
        { id: 1, name: '首页', href: '/' },
        { id: 2, name: '博客', href: '/blog' },
        { id: 3, name: '学堂', href: '/school' },
        { id: 4, name: '影音', href: '/film' },
        { id: 5, name: '考证', href: '/exam' },
      ]
    },
  },
}
</script>

<style></style>
