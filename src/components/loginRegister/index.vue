<template>
  <v-dialog width="1000" persistent v-model="flag">
    <div class="d-flex">
      <!-- 网站信息 -->
      <v-card tile width="500" height="580" dark class="dialog_back pa-16 d-flex flex-column">
        <!-- 头部icon -->
        <v-btn @click="flag = false" light small style="top: 10px; left: 10px" fab absolute>
          <v-icon color="#dec7cb" size="30">mdi-window-close</v-icon>
        </v-btn>

        <v-container class="mb-auto">
          <h1>ZHIFOU</h1>
          <p>红尘往事付流水，忘尽俗缘始得真，一饮而尽，再醉千年</p>
        </v-container>
        <!-- 推荐的博主 -->
        <v-container class="mb-auto">
          <v-avatar>
            <v-img :src="brandInfo.head_pic" />
          </v-avatar>
          <span class="ml-2">{{ brandInfo.nickname }}</span>
          <div class="mt-2" v-html="brandInfo.canvases"></div>
        </v-container>
        <!-- 条款 -->
        <v-container>
          <v-chip label small color="transparent" v-for="item in footerInfo" :key="item.id">{{
            item.name
          }}</v-chip>
        </v-container>
      </v-card>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card tile width="500" height="580">登录</v-card>
        </v-window-item>
        <v-window-item :value="2">
          <v-card tile width="500" height="580">注册</v-card>
        </v-window-item>
        <v-window-item :value="3">
          <v-card tile width="500" height="580">注册成功</v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoginRegister',
  data() {
    return {
      flag: true,
      step: 1,
      brandInfo: {},
      footerInfo: {},
    }
  },
  methods: {
    getbrandInfo() {
      this.brandInfo = {
        head_pic: 'https://img2.woyaogexing.com/2022/07/25/a69c9cd43a8e07bf!400x400.jpg', // 头像
        nickname: '落叶归根', // 昵称
        canvases:
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;夜晚倒是安静，连月亮都收紧光亮，只轻轻拂照，就觉得现代科技吵闹，电波传输太虚妄,想教风说话，让它一里一亭地把我的话传到你的边，让所有春风吹过的街道都流传『我喜欢你』的语言。',
      }
      this.footerInfo = [
        { id: 1, name: '知否咨询', to: '' },
        { id: 2, name: '关于我们', to: '' },
        { id: 3, name: '使用条款', to: '' },
        { id: 4, name: '帮助文档', to: '' },
      ]
    },
  },
  mounted() {
    this.getbrandInfo()
    this.$bus.$on('showLoginWindow', isShow => {
      this.flag = isShow
    })
  },
}
</script>

<style scoped lang="less">
.dialog_back {
  background-image: linear-gradient(to bottom, #d9c9cd, #e8c5c9);
}
</style>
