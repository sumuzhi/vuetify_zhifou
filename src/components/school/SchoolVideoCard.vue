<template>
  <v-list>
    <v-list-item class="px-0" v-for="item in videoCard" :key="item.id">
      <v-list-item-avatar class="rounded-lg" width="200" height="120" tile>
        <v-img :src="item.cover"></v-img>
      </v-list-item-avatar>
      <v-list-item-content class="align-self-start">
        <v-list-item-title class="font-weight-black">{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle class="mt-2">
          <v-chip
            v-if="item.is_new"
            color="success"
            small
            label
            class="font-weight-black font-italic mr-2"
            >NEW</v-chip
          >
          <v-chip
            v-if="item.is_hot"
            color="warning"
            small
            label
            class="font-weight-black font-italic mr-2"
            >HOT</v-chip
          >
          <span>更新于：{{ item.time }}</span>
        </v-list-item-subtitle>
        <!-- 课程详细介绍 -->
        <div
          class="hiddenText mt-2 text-caption grey--text text--lighten-1"
          v-html="item.introduce"
        ></div>
      </v-list-item-content>
      <!-- 课程卡片后面的按钮和文字 -->
      <v-list-item-action>
        <div class="text-center">
          <span class="text-caption grey--text text--lighten-1"
            >{{ formatterNumber(item.read) }}人已学</span
          >
          <br />
          <v-btn block color="info" small class="rounded-pill">开始学习</v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'SchoolVideoCard',
  props: ['videoCard'],
  computed: {
    formatterNumber() {
      return function (number) {
        if (number >= 100000000) {
          return (number / 100000000).toFixed(2) + '亿'
        } else if (number >= 10000) {
          return (number / 10000).toFixed(2) + '万'
        } else {
          return number
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.hiddenText {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
