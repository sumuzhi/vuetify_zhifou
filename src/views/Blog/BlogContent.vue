<template>
  <v-container fluid class="d-flex justify-center">
    <v-sheet width="300">
      <v-card>
        <v-container>
          <v-list-item class="px-0">
            <v-list-item-avatar>
              <v-img :src="authorInfo.headPic"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ authorInfo.nickname }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">{{
                authorInfo.signature
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-container>

        <v-container class="text-center text-caption">
          <v-row>
            <v-col>
              <div>{{ authorInfo.fansCount }}</div>
              <div>粉丝</div>
            </v-col>
            <v-col>
              <div>{{ authorInfo.likeCount }}</div>
              <div>获赞</div>
            </v-col>
            <v-col>
              <div>{{ authorInfo.integralCount }}</div>
              <div>积分</div>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="text-center text-caption">
          <v-row>
            <v-col>
              <v-btn block outlined rounded small color="info">
                <v-icon size="20"> mdi-plus </v-icon>
                关注
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block outlined rounded small color="warning">
                <v-icon size="20"> mdi-chat-outline </v-icon>
                私信
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-sheet>
    <v-sheet width="800" class="mr-5">2</v-sheet>
    <v-sheet></v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'BlogContent',
  props: ['id'],
  data() {
    return {
      authorInfo: {},
    }
  },
  methods: {
    getAuthorInfo() {
      this.authorInfo = {
        id: 1,
        nickname: '云中漫步ZDC',
        headPic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        signature: '人生自古谁无死，留取丹心照汗青',
        fansCount: 776,
        likeCount: 4543,
        integralCount: 24343,
      }
    },
  },
  mounted() {
    this.getAuthorInfo()
  },
}
</script>

<style></style>
