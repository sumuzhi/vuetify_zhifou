<template>
  <div>
    <v-list>
      <div v-for="(item, index) in blogCardData.blogList" :key="index">
        <v-hover v-slot="{ hover }">
          <v-list-item
            :to="'/content/' + item.id"
            :class="hover ? 'elevation-12 mb-3' : 'elevation-2 mb-3'"
            three-line
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.introduction }}</v-list-item-subtitle>
              <v-list-item-subtitle class="text-caption">
                <!-- 作者头像 -->
                <v-avatar size="30" class="mr-3">
                  <v-img :src="item.author.headPic"></v-img>
                </v-avatar>
                <span class="mr-6">{{ item.author.nickname }}</span>
                <span class="mr-6">{{ item.time }}</span>
                <div class="d-inline-block mr-3">
                  <v-icon size="20">mdi-eye</v-icon>
                  {{ formatterNumber(item.eye) }}
                </div>
                <div class="d-inline-block mr-3">
                  <v-icon class="mr-1" color="red" size="18">mdi-thumb-up</v-icon>
                  {{ formatterNumber(item.like) }}
                </div>
                <div class="d-inline-block mr-3">
                  <v-icon size="18" color="blue">mdi-message-text</v-icon>
                  {{ formatterNumber(item.comment) }}
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
            <!-- 封面 -->
            <v-list-item-avatar tile height="100" width="160">
              <v-img class="rounded-lg" :src="item.cover"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-hover>
      </div>
    </v-list>
    <div class="text-center">
      <v-pagination
        circle
        v-model="blogCardData.page"
        :length="blogCardData.total"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '@/mixin/mixin.js'
export default {
  name: 'BlogCard',
  mixins: [formatNumber],
  data() {
    return {
      blogCardData: {},
    }
  },
  methods: {
    getBolgCardData() {
      this.blogCardData = {
        page: 1,
        total: 25,
        blogList: [
          {
            id: 1,
            title: '小白学前端，希望大佬别嫌弃我这问题太简单不给我说',
            introduction:
              ' 刚开始接触前端没有几天，好多地方都不知道什么意思，希望大佬们如果知道的话，在下面评论给我说一下谢谢在uni中这个两个花括号是什么意思 this.$dw.api.getQxglData当中$后面这个值是什么意思呀',
            cover: 'https://cdn.vuetifyjs.com/images/john.jpg',
            time: '2021-11-23',
            eye: 16352,
            comment: 4563,
            like: 9875,
            author: {
              nickname: '自古风流',
              headPic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            },
            to: '',
          },
          {
            id: 2,
            title: 'jdbc增删改查操作，封装工具类，实现泛型接口无限套娃',
            introduction:
              '好家伙、转眼就要过年了，这段时间又有师妹通过我实验室师妹要到我的联系方式、让我帮忙给指导大四的项目、要搞一个买卖二手闲置品的商城、既想要 PC web端、又想要小程序，还想要 xx',
            cover: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            time: '2021-11-23',
            eye: 17889,
            comment: 24323,
            like: 43249,
            author: {
              nickname: 'java李杨勇',
              headPic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            },
            to: '',
          },
          {
            id: 3,
            title: 'Java实现Excel导入和导出，看这一篇就够了(珍藏版)',
            introduction:
              '最近抽了两天时间，把Java实现表格的相关操作进行了封装，本次封装是基于 POI 的二次开发，最终使用只需要调用一个工具类中的方法，就能满足业务中绝大部门的导入和导出需求。',
            cover:
              'https://img2.baidu.com/it/u=2474219441,3739941751&fm=253&fmt=auto&app=138&f=PNG?w=500&h=257',
            time: '2021-12-23',
            eye: 187800,
            comment: 13243,
            like: 64548,
            author: {
              nickname: 'zyqok',
              headPic: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            },
            to: '',
          },
          {
            id: 4,
            title: '英特尔 Linux Vulkan 驱动程序的首席开发人员离职；JDK 18 功能集被冻结',
            introduction: '英特尔 Linux Vulkan 驱动程序的首席开发人员离职；JDK 18 功能集被冻结',
            cover: 'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF',
            time: '2021-1-23',
            eye: 52332,
            comment: 26313,
            like: 4554,
            author: {
              nickname: '开源头条',
              headPic: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            },
            to: '',
          },
          {
            id: 5,
            title: '计算机为何可以运行Java代码？',
            introduction: '计算机为何可以运行Java代码？',
            cover: 'https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF',
            time: '2020-1-23',
            eye: 45353,
            comment: 23789,
            like: 12324,
            author: {
              nickname: 'JavaEdge',
              headPic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
            to: '',
          },
        ],
      }
    },
  },
  mounted() {
    this.getBolgCardData()
  },
}
</script>

<style></style>
