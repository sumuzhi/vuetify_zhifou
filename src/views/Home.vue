<template>
  <div class="home-container">
    <!-- 头图片 -->
    <v-parallax height="600" :src="homeBackgroundPic">
      <div class="text-center">
        <div class="text-h2 font-weight-black mb-3">知否</div>
        <p>打造全方位的影音.博客.教学</p>
      </div>
    </v-parallax>
    <!-- 标题介绍 -->
    <v-container>
      <div class="text-center">
        <div class="text-h4 mb-2">共享盛宴</div>
        <p>打造全方位的影音.博客.教学</p>
      </div>
    </v-container>
    <!-- 卡片 -->
    <div style="max-width: 1400px; margin: 0 auto">
      <v-container
        class="d-lg-flex d-md-flex flex-lg-row flex-md-row flex-sm-column justify-lg-center"
        fluid
      >
        <v-card
          v-for="item in Card"
          class="ml-lg-3 ml-md-3 mb-2"
          :to="item.href"
          hover
          :key="item.id"
        >
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.desc }}</v-card-subtitle>
          <v-card-text>
            <v-chip label color="transparent" small v-for="label in item.labels" :key="label">{{
              label
            }}</v-chip>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data: () => ({
    homeBackgroundPic: '',
    Card: [],
  }),
  methods: {
    getBackPic() {
      this.homeBackgroundPic = 'https://pic3.zhimg.com/v2-fbb002ec83393f1b87a55cfb69c864db_r.jpg'
    },
    getCardData() {
      this.Card = [
        {
          id: 1,
          name: '博客',
          desc: '百万博主分享经验',
          href: '/blog',
          labels: [
            'Java',
            'Python',
            'Hadoop',
            'Liunx',
            'C++',
            'Unity',
            'UI 设计',
            'Android',
            'IOS',
            'HarmonyOs',
          ],
        },
        {
          id: 2,
          name: '学堂',
          desc: '百万教学视频畅游知识海洋',
          href: '/school',
          labels: [
            'VueJs',
            '前端',
            '后台',
            '大数据',
            '影视后期',
            '游戏开发',
            '人工智能',
            '物联网',
            '游戏建模',
            '应用开发',
          ],
        },
        {
          id: 3,
          name: '视频',
          desc: '百万影视视频畅享盛会',
          href: '/film',
          labels: [
            '电视剧',
            '电影',
            '纪录片',
            '少儿',
            '动漫',
            '短视频',
            '综艺',
            '港剧',
            '台剧',
            '韩剧',
            '恐怖片',
            '好莱坞',
          ],
        },
        {
          id: 4,
          name: '考证',
          desc: '千款认证考试线上测试',
          href: '/exam',
          labels: [
            '模拟考',
            '刷题',
            '期末考',
            '课堂考',
            '甲骨文认证',
            '华为认证',
            '三星认证',
            'TCL认证',
            '微软认证',
          ],
        },
      ]
    },
  },
  mounted() {
    this.getBackPic()
    this.getCardData()
  },
}
</script>
