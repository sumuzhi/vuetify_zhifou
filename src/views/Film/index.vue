<template>
  <div>
    <!-- 轮播图容器 -->
    <v-container style="position: relative" class="px-0 pt-0" fluid>
      <v-carousel
        v-model="currentIndex"
        show-arrows-on-hover
        interval="3000"
        cycle
        hide-delimiters
        hide-delimiter-background
      >
        <v-carousel-item
          :value="item.id"
          v-for="item in swiperData"
          :key="item.id"
          :src="item.picture"
        >
        </v-carousel-item>
      </v-carousel>
      <!-- 跑马灯 -->
      <v-slide-group style="position: absolute; right: 20px; bottom: 30px" v-model="currentIndex">
        <v-slide-item
          :value="item.id"
          v-for="item in swiperData"
          :key="item.id"
          v-slot="{ active, toggle }"
        >
          <v-card :class="!active ? 'mask ma-1' : 'ma-1'" height="60" width="120" @click="toggle">
            <v-img height="60" :src="item.picture" />
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
    <!-- 搜索 -->
    <v-container fluid class="d-flex justify-center">
      <v-card width="940" flat>
        <v-container style="width: 470px">
          <v-menu offset-y allow-overflow>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                rounded
                v-bind="attrs"
                v-on="on"
                dense
                outlined
                clearable
                v-model="searchWord"
                placeholder="请输入要搜索的内容"
              >
                <template #append-outer>
                  <v-btn small fab color="blue" class="mt-n2">
                    <v-icon color="#ffffff">mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </template>

            <v-card>
              <v-subheader>热门搜索</v-subheader>
              <v-list dense class="pt-0">
                <v-list-item v-for="item in hotMenus" :key="item.id" @click="chooseHotWord(item)">
                  <v-icon class="pr-2" color="red">mdi-numeric-{{ item.id }}-box</v-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-container>
        <!-- 分类 -->
        <v-container fluid class="elevation-8 rounded">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <th width="60px">分类</th>
                  <td>
                    <v-chip-group active-class="info" v-model="filmCategory.index">
                      <v-chip
                        small
                        color="transparent"
                        :value="item.id"
                        @click="handleDetailCategory(item.id)"
                        v-for="item in filmCategory.value"
                        :key="item.id"
                      >
                        {{ item.name }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>

                <tr>
                  <th>类型</th>
                  <td>
                    <v-chip-group column active-class="info" v-model="filmDetailCategory.index">
                      <v-chip small color="transparent" :value="0">全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        :value="item.id"
                        v-for="item in filmDetailCategory.value"
                        :key="item.id"
                      >
                        {{ item.name }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>

                <tr>
                  <th>地区</th>
                  <td>
                    <v-chip-group column active-class="info" v-model="filmDetailCategoryArea.index">
                      <v-chip small color="transparent" :value="0">全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        :value="item.id"
                        v-for="item in filmDetailCategoryArea.value"
                        :key="item.id"
                      >
                        {{ item.name }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>

                <tr>
                  <th>时间</th>
                  <td>
                    <v-chip-group column active-class="info" v-model="filmDetailCategoryTime.index">
                      <v-chip small color="transparent" :value="0">全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        :value="item.id"
                        v-for="item in filmDetailCategoryTime.value"
                        :key="item.id"
                      >
                        {{ item.name }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>

        <!-- 列表 -->
        <v-container fluid>
          <h3 class="pa-3">影音列表</h3>
          <v-container fluid class="d-flex flex-wrap ma-0 pa-0">
            <div v-for="item in filmList" :key="item.id">
              <v-hover v-slot="{ hover }">
                <FilmCard
                  :filmItem="item"
                  class="mr-2 mb-5 pa-2 rounded-lg"
                  :class="hover ? 'elevation-6' : ''"
                >
                  <template #topLabel="{ topLabel }">
                    <v-chip :color="labelColor()" small class="rounded-r-0">{{ topLabel }}</v-chip>
                  </template>

                  <template #bottomSlot="{ bottomLabel }">
                    <v-chip
                      v-if="bottomLabel"
                      color="rgba(0,0,0,0.4)"
                      small
                      class="rounded white--text"
                    >
                      {{ bottomLabel }}
                    </v-chip>
                  </template>
                </FilmCard>
              </v-hover>
            </div>
          </v-container>
        </v-container>

        <!-- 分页器 -->
        <v-pagination v-model="CurrentPage" :length="16" total-visible="7"></v-pagination>
      </v-card>

      <!-- 右侧like -->
      <v-card width="230" flat class="ml-10">
        <v-container class="d-flex align-center py-2">
          <v-divider></v-divider>
          <span class="grey--text">追剧中</span>
          <v-divider></v-divider>
        </v-container>
        <v-container fluid>
          <div v-for="item in likeList" :key="item.id" class="mr-3 mb-3">
            <v-hover v-slot="{ hover }">
              <FilmCard
                class="pa-2 rounded-lg"
                height="120"
                :filmItem="item"
                :class="hover ? 'elevation-2' : ''"
              >
                <template #topLabel="{ topLabel }">
                  <v-chip v-if="topLabel" :color="labelColor(topLabel)" small class="rounded-r-0">{{
                    topLabel
                  }}</v-chip>
                </template>
                <template #bottomSlot="{ bottomLabel }">
                  <v-chip
                    v-if="bottomLabel"
                    color="rgba(0,0,0,0.4)"
                    small
                    class="rounded white--text"
                  >
                    {{ bottomLabel }}
                  </v-chip>
                </template></FilmCard
              >
            </v-hover>
          </div>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { generatorFilmCategory } from '@/config/filmCategory.js'
import { generatorFilmCategoryArea } from '@/config/filmCategoryArea.js'
import FilmCard from '@/components/film/FilmCard.vue'
import { formatNumber } from '@/mixin/mixin.js'
export default {
  mixins: [formatNumber],
  name: 'FilmView',
  components: { FilmCard },
  data() {
    return {
      CurrentPage: 1,
      swiperData: [],
      currentIndex: 1,
      hotMenus: [],
      searchWord: null,
      filmCategory: {
        value: [],
        index: 1,
      },
      filmDetailCategory: {
        value: [],
        index: 0,
      },
      filmDetailCategoryArea: {
        value: [],
        index: 0,
      },
      filmDetailCategoryTime: {
        value: [],
        index: 0,
      },
      filmList: [],
      likeList: [],
    }
  },
  methods: {
    getLikeList() {
      this.likeList = [
        {
          id: 1,

          title: '继承者们',

          subtitle: '高富帅遇灰姑娘擦爱火',

          topLabel: '首播',

          bottomLabel: '播放到第 24 集',

          pic: 'https://m.ykimg.com/05830000629425FF2037DD08EFD0E016?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },

        {
          id: 2,

          title: '寒武纪',

          topLabel: 'VIP',

          bottomLabel: '播放到第 2 集',

          subtitle: '侯明昊贺军翔倾情出演',

          pic: 'https://m.ykimg.com/0583000058F5D08AADBA1FA0880E133D?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },

        {
          id: 3,

          title: '水怪2：黑木林',

          topLabel: '',

          bottomLabel: '播放到 28:55',

          subtitle: '民间传说水猴子惊悚来袭',

          pic: 'https://liangcang-material.alicdn.com/prod/upload/8eb79232bfa248f0b12f4402c3d1a180.jpg?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
      ]
    },

    getFilmList() {
      this.filmList = [
        {
          id: 1,
          title: '长津湖',
          subtitle: '抗美援朝经典之战',
          topLabel: '9.6',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/0584000061A868231FD852098F9700D0?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 2,
          title: '门锁',
          subtitle: '白百何诠释独居女',
          topLabel: '8.6',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/0584000061C567B913F7FF09582A36A3?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 3,
          title: '铁道英雄',
          subtitle: '铁道英雄热血抗战',
          topLabel: '7.6',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/0584000061D00101202742096F393ABB?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 4,
          title: '再战江湖',
          subtitle: '陈小春肉搏黑帮',
          topLabel: '8.9',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/0527000061BC409520274208DAE3909E?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 5,
          title: '扫毒2天地对决',
          subtitle: '华仔古仔双雄争锋',
          topLabel: '9.2',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/058400005F1EBF374265930D3F704B41?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 6,
          title: '二龙湖往事：惊魂夜',
          subtitle: '东北农村离奇诡事',
          topLabel: '8.4',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/0527000061B0646D13F7FF0951E5C6AD?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 7,
          title: '1950他们正年轻',
          subtitle: '致敬抗美援朝英雄',
          topLabel: '7.7',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/0584000061C564C313EB660A46DB5B33?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 8,
          title: '反贪风暴4',
          subtitle: '古仔闯牢狠打虎',
          topLabel: '5.6',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/058400006047253913EA350855339545?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 9,
          title: '请叫我总监',
          subtitle: '职场邂逅欢乐甜怼',
          topLabel: '7.9',
          bottomLabel: '32 集全',
          pic: 'https://m.ykimg.com/05840000616FACD013F7FF098083A771?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 10,
          title: '良辰好景知几何',
          subtitle: '将军爱上清冷才女',
          topLabel: '8.9',
          bottomLabel: '',
          pic: 'https://m.ykimg.com/05840000626514521FD85209207E984E?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 11,
          title: '怦然心动20岁 第二季',
          subtitle: '毕业之旅甜蜜回归',
          topLabel: '9.6',
          bottomLabel: '更新至06-05期',
          pic: 'https://m.ykimg.com/0584000062980D9713EB660937D7BF75?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
        {
          id: 12,
          title: '了不起！舞社',
          subtitle: '毕业之旅甜蜜回归',
          topLabel: '9.0',
          bottomLabel: '更新至06-12期',
          pic: 'https://m.ykimg.com/058400006258C3D913EB66114B215112?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80',
        },
      ]
    },

    handleDetailCategory(id = 1) {
      this.filmDetailCategory.value = generatorFilmCategory(id)
      this.filmDetailCategoryArea.value = generatorFilmCategoryArea(id)
    },

    getFilmCategory() {
      this.filmCategory.value = [
        { id: 1, name: '电视剧' },
        { id: 2, name: '电影' },
        { id: 3, name: '综艺' },
        { id: 4, name: '动漫' },
        { id: 5, name: '纪录片' },
      ]
      this.filmDetailCategoryTime.value = [
        { id: 1, name: '2022' },
        { id: 2, name: '2021' },
        { id: 3, name: '2020' },
        { id: 4, name: '2019' },
        { id: 5, name: '2018' },
        { id: 6, name: '2017' },
        { id: 7, name: '2016' },
        { id: 8, name: '2015' },
        { id: 9, name: '2014' },
        { id: 10, name: '2013' },
        { id: 11, name: '2012' },
        { id: 12, name: '2011' },
        { id: 13, name: '2010' },
        { id: 14, name: '00年代' },
        { id: 15, name: '90年代' },
        { id: 16, name: '80年代' },
        { id: 17, name: '70年代' },
      ]
    },
    chooseHotWord(item) {
      this.searchWord = item.title
    },
    getHotMenus() {
      this.hotMenus = [
        { id: 1, title: '法医秦明' },
        { id: 2, title: '长津湖' },
        { id: 3, title: '门锁' },
        { id: 4, title: '流浪地球' },
        { id: 5, title: '阿凡达' },
        { id: 6, title: '速度与激情' },
        { id: 7, title: '反贪风暴' },
        { id: 8, title: '乘风破浪的姐姐' },
        { id: 9, title: '知否知否应是绿肥红瘦' },
        { id: 10, title: '扫毒' },
      ]
    },

    getSwiperData() {
      this.swiperData = [
        {
          id: 1,

          picture:
            'https://liangcang-material.alicdn.com/prod/upload/c32d6f8e20fb4270a120efa8b074f189.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: '',
        },

        {
          id: 2,

          picture:
            'https://liangcang-material.alicdn.com/prod/upload/810308e3087342f0a1c89700b842399a.webp.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: '',
        },

        {
          id: 3,

          picture:
            'https://liangcang-material.alicdn.com/prod/upload/9045dd09b30a4d4e8eded62a01658c11.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: '',
        },

        {
          id: 4,

          picture:
            'https://liangcang-material.alicdn.com/prod/upload/d270a00903c34ae29c07910884b9f048.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: '',
        },
      ]
    },
  },
  mounted() {
    this.getSwiperData()
    this.getHotMenus()
    this.getFilmCategory()
    this.handleDetailCategory()
    this.getFilmList()
    this.getLikeList()
  },
}
</script>

<style scoped>
.mask:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000088;
}
</style>
