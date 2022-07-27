<template>
  <v-container>
    <v-container class="d-flex justify-center" fluid>
      <!-- 博客的分类 排序 -->
      <v-card flat width="700">
        <v-container fluid>
          <v-chip-group center-active show-arrows active-class="info" v-model="optionMenus.value">
            <v-chip
              small
              @click="optionMenus.fullOptionsMenus.value = null"
              @mouseenter="showFullOptionMenus(index, $event)"
              label
              color="#eeeeee"
              :value="item.id"
              v-for="(item, index) in optionMenus.options"
              :key="item.id"
            >
              {{ item.name }}
            </v-chip>
          </v-chip-group>
        </v-container>
        <v-divider> </v-divider>
        <!-- 排序 -->
        <v-container class="py-0" fluid>
          <v-chip-group active-class="info" multiple v-model="bolgSort">
            <v-chip outlined label small value="new">最新发布</v-chip>
            <v-chip outlined label small value="like">点赞最多</v-chip>
            <v-chip outlined label small value="eye">浏览最多</v-chip>
          </v-chip-group>
        </v-container>

        <!-- 博客卡片 -->
        <v-container class="pt-0" fluid>
          <BlogCard></BlogCard>
        </v-container>
      </v-card>

      <!-- 热门博客 搜索 -->
      <v-card flat width="280" class="ml-8">
        <v-container fluid>
          <v-text-field
            @click:append="search"
            append-icon="mdi-magnify"
            dense
            outlined
            placeholder="搜索博客"
            hide-details
          ></v-text-field>
        </v-container>

        <v-container fluid>
          <div class="d-flex justify-space-between">
            <span class="text-body-1">热门排行榜</span>
            <!-- <v-btn disabled small icon> -->
            <v-icon small>mdi-dots-horizontal</v-icon>
            <!-- </v-btn> -->
          </div>
          <v-divider></v-divider>
          <v-list>
            <v-list-item-group>
              <v-list-item dense class="px-1" v-for="item in hotBlog" :key="item.id">
                <v-list-item-icon class="mr-2">
                  <v-icon color="red">mdi-numeric-{{ item.id }}-box</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-caption">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{
                    formatterNumber(item.read)
                  }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>

        <!-- 推荐博主 -->
        <v-container fluid>
          <div class="d-flex justify-space-between">
            <span class="text-body-1">推荐博主</span>
            <!-- <v-btn disabled small icon> -->
            <v-icon small>mdi-dots-horizontal</v-icon>
            <!-- </v-btn> -->
          </div>
          <v-divider></v-divider>
          <v-list>
            <v-list-item-group>
              <v-list-item dense class="px-1 my-2" v-for="item in recommendUp" :key="item.id">
                <v-list-item-avatar>
                  <v-img :src="item.headPic"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.nickname }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.signature }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn
                  color="success"
                  fab
                  width="20"
                  height="20"
                  absolute
                  style="left: 30px; bottom: 4px"
                >
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
      </v-card>
    </v-container>

    <!-- 分类的详细菜单 -->
    <v-menu
      :close-on-content-click="false"
      open-on-hover
      :position-x="optionMenus.fullOptionsMenus.x"
      :position-y="optionMenus.fullOptionsMenus.y"
      max-width="500"
      v-model="optionMenus.fullOptionsMenus.show"
    >
      <v-card class="px-4">
        <v-chip-group
          column
          active-class="info"
          v-model="optionMenus.fullOptionsMenus.value"
          v-for="(item, index) in optionMenus.options"
          v-show="optionMenus.fullOptionsMenus.index === index"
          :key="item.id"
        >
          <v-chip
            :value="item2.id"
            small
            label
            color="#eeeeee"
            v-for="item2 in item.options"
            :key="item2.id"
            >{{ item2.name }}</v-chip
          >
        </v-chip-group>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
import BlogCard from '@/components/blog/BlogCard.vue'
import { formatNumber } from '@/mixin/mixin.js'
export default {
  name: 'BlogView',
  components: { BlogCard },
  mixins: [formatNumber],
  watch: {
    'optionMenus.fullOptionsMenus.value'(newData) {
      this.setFirstBySecond(newData)
    },
  },
  data() {
    return {
      optionMenus: {
        options: [],
        value: null,
        fullOptionsMenus: {
          index: null,
          value: null,
          show: false,
          x: 0,
          y: 0,
        },
      },
      bolgSort: [],
      hotBlog: [],
      recommendUp: [],
    }
  },
  methods: {
    getRecommendUp() {
      this.recommendUp = [
        {
          id: 1,
          nickname: '世界充满爱',
          headPic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          signature: '唤醒財富的21种方法',
        },

        {
          id: 2,
          nickname: '木西Liz',
          headPic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          signature: '一个有趣的动漫游戏全职主播',
        },
        {
          id: 3,
          nickname: '小梦学姐呀',
          headPic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          signature:
            '名士才情，英雄肝胆，圣贤学问，仙佛心肠，写经世致用之文，夺造化之功，修身、齐家、治国、平天下。',
        },
        {
          id: 4,
          nickname: '性感悍匪小鸡仔',
          headPic: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          signature: '…眼泪，明明在成为吸血鬼之后再也没有流过的……',
        },
        {
          id: 5,
          nickname: '会特效的特同学',
          headPic: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          signature: '圆梦厦大',
        },
      ]
    },
    search() {
      console.log('点击了搜索')
    },
    getHotBlog() {
      this.hotBlog = [
        { id: 1, text: '考前50分-四六级必考词汇预测', read: 483200 },
        { id: 2, text: '魔导国东征记－世界守护突破（622～624）三更！•OVERLORD', read: 154641 },
        {
          id: 3,
          text: 'FGO国服《妖精圆桌领域 阿瓦隆･勒･菲 星辰诞生之刻》2.6前篇主线概况攻略',
          read: 120005,
        },
        { id: 4, text: '1999元的miniLED HDR1000显示器HKC PG271Q简评', read: 100058 },
        { id: 5, text: '22年四六级翻译预测--共青团', read: 75645 },
        { id: 6, text: '四六级翻译预测--冬奥会', read: 66545 },
        { id: 7, text: '【兵装榜2】全面推荐泛用兵装，斩击实战检验后', read: 56546 },
        { id: 8, text: '为了实现游戏里的二段跳，人类到底能多拼命？', read: 46546 },
        { id: 9, text: '2022上半年四级真题--提案，给学校图书馆，学校医院，学生会', read: 25646 },
        { id: 10, text: '关于2022年高考数学试题的一点点想法', read: 14656 },
      ]
    },
    setFirstBySecond(value) {
      this.optionMenus.options.some(item => {
        return item.options.some(item2 => {
          if (item2.id === value) {
            this.optionMenus.value = item.id
          }
        })
      })
    },
    showFullOptionMenus(index, e) {
      console.log()
      let options = this.optionMenus.options[index].options //获取详细菜单
      if (options?.length === 0) {
        this.optionMenus.fullOptionsMenus.show = false
      } else {
        let data = e.target.getBoundingClientRect()
        this.optionMenus.fullOptionsMenus.x = data.left
        this.optionMenus.fullOptionsMenus.index = index
        this.optionMenus.fullOptionsMenus.y = data.bottom
        this.optionMenus.fullOptionsMenus.show = true
      }
    },
    getBlogCategory() {
      this.optionMenus.options = [
        {
          id: 1,
          name: '推荐',
          options: [],
        },
        {
          id: 2,
          name: '教学',
          options: [
            { id: 100, name: '数学' },
            { id: 101, name: '英语' },
            { id: 102, name: '语文' },
            { id: 103, name: '历史' },
            { id: 104, name: '化学' },
            { id: 105, name: '政治' },
            { id: 106, name: '生物' },
            { id: 107, name: '体育' },
            { id: 108, name: '音乐' },
          ],
        },
        {
          id: 3,
          name: 'IT',
          options: [
            { id: 109, name: 'Java' },
            { id: 110, name: 'PHP' },
            { id: 111, name: 'C++' },
            { id: 112, name: 'Python' },
            { id: 113, name: 'Hadoop' },
            { id: 114, name: 'Android' },
            { id: 115, name: 'HarmonyOS' },
            { id: 116, name: 'Vue' },
            { id: 117, name: 'HTML' },
            { id: 118, name: 'CSS' },
          ],
        },
        {
          id: 4,
          name: '游戏',
          options: [
            { id: 125, name: 'LOL' },
            { id: 126, name: '王者荣耀' },
            { id: 127, name: '和平精英' },
            { id: 128, name: 'DNF' },
            { id: 129, name: '穿越火线' },
            { id: 130, name: '元神' },
          ],
        },
        {
          id: 5,
          name: '旅游',
          options: [
            { id: 131, name: '骑行' },
            { id: 132, name: '潜水' },
            { id: 133, name: '徒步' },
            { id: 134, name: '登山' },
            { id: 135, name: '国内游' },
            { id: 136, name: '国外游' },
            { id: 137, name: '自驾游' },
          ],
        },
        {
          id: 6,
          name: '时尚',
          options: [
            { id: 138, name: '美妆' },
            { id: 139, name: '护肤' },
            { id: 140, name: '穿搭' },
          ],
        },
        {
          id: 7,
          name: '汽车',
          options: [
            { id: 141, name: '赛车' },
            { id: 142, name: '改装车' },
            { id: 143, name: '新能源车' },
            { id: 144, name: '房车' },
            { id: 145, name: '机车' },
            { id: 146, name: '购车攻略' },
          ],
        },
        {
          id: 8,
          name: '运动',
          options: [
            { id: 147, name: '篮球' },
            { id: 148, name: '足球' },
            { id: 149, name: '网球' },
            { id: 150, name: '健身' },
            { id: 151, name: '滑雪' },
            { id: 152, name: '马拉松' },
          ],
        },
        {
          id: 9,
          name: '舞蹈',
          options: [
            { id: 153, name: '街舞' },
            { id: 154, name: '芭蕾舞' },
            { id: 155, name: '民族舞' },
          ],
        },
        {
          id: 10,
          name: '动物',
          options: [
            { id: 156, name: '犬科动物' },
            { id: 157, name: '猫科动物' },
            { id: 158, name: '爬行动物' },
            { id: 159, name: '两栖动物' },
          ],
        },
        {
          id: 11,
          name: '美食',
          options: [
            { id: 160, name: '热菜' },
            { id: 161, name: '凉菜' },
            { id: 162, name: '汤羹' },
            { id: 163, name: '主食' },
            { id: 164, name: '小吃' },
            { id: 165, name: '西餐' },
            { id: 166, name: '烘焙' },
            { id: 167, name: '饮品' },
            { id: 168, name: '跑酱腌菜' },
          ],
        },
      ]
    },
  },
  mounted() {
    this.getBlogCategory()
    this.getHotBlog()
    this.getRecommendUp()
  },
}
</script>

<style></style>
