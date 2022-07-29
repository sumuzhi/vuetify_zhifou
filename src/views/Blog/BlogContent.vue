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
              <v-list-item-title>
                {{ authorInfo.nickname }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ authorInfo.signature }}
              </v-list-item-subtitle>
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

      <!-- 博主文章 -->
      <v-card class="mt-5 pa-3 pt-4">
        <div class="d-flex justify-space-between">
          <span class="text-body-1">博主文章</span>
          <v-icon small>mdi-dots-horizontal</v-icon>
        </div>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group>
            <v-list-item class="px-1" v-for="item in authorBlog" :key="item.id">
              <v-list-item-content>
                <v-list-item-title class="text-caption">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>{{ formatterNumber(item.read) }}</v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <!-- 评分卡片 -->
      <v-card class="mt-5" style="position: sticky; top: 70px">
        <v-container>
          <v-subheader>觉得这篇博客怎么样呢?</v-subheader>
          <v-rating color="orange" large half-increments class="pl-2"></v-rating>
        </v-container>
      </v-card>
    </v-sheet>
    <v-sheet width="800" height="min-content" class="ml-5">
      <v-card>
        <v-card-title class="font-weight-black text-h6">{{ detailBlog.title }}</v-card-title>
        <v-card-subtitle>
          <v-container class="grey lighten-4">
            <v-chip class="mr-5" label small color="error">{{ detailBlog.type }}</v-chip>
            <span class="mr-5">发布时间：{{ detailBlog.time }}</span>
            <span class="d-inline-block">
              <v-icon
                class="d-inline-block mr-2"
                style="vertical-align: text-bottom"
                size="18"
                color="grey lighten-1"
                >mdi-eye</v-icon
              >
              {{ formatterNumber(detailBlog.eye) }}
            </span>
            <span class="ml-4">
              文章标签：
              <v-chip
                label
                small
                color="#e0e0e0"
                class="mr-1"
                v-for="item in detailBlog.label"
                :key="item.id"
                >{{ item.name }}</v-chip
              >
            </span>
          </v-container>
        </v-card-subtitle>

        <!-- 文章内容 -->
        <v-container key="" class="px-4">
          <div v-html="detailBlog.content"></div>
        </v-container>
      </v-card>
      <!-- 评论组件 -->
      <v-card class="mt-8" id="blogComment"></v-card>
    </v-sheet>
    <!-- 悬浮按钮 -->
    <v-sheet class="text-center text-caption" style="position: fixed; right: 60px; bottom: 80px">
      <div class="my-2">
        <v-btn fab outlined small color="grey">
          <v-icon>mdi-alert-circle-outline</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">举报</div>
      </div>
      <div class="my-2">
        <v-btn fab outlined small color="orange">
          <v-icon>mdi-reply</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">{{ detailBlog.share }}</div>
      </div>
      <div class="my-2">
        <v-btn fab outlined small color="red">
          <v-icon>mdi-star</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">{{ detailBlog.collect }}</div>
      </div>
      <div class="my-2">
        <v-btn fab outlined small color="blue" @click="$vuetify.goTo('#blogComment')">
          <v-icon>mdi-message-text</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">{{ formatterNumber(detailBlog.comment) }}</div>
      </div>
      <div class="my-2">
        <v-btn fab color="blue" @click="$vuetify.goTo(0)">
          <v-icon color="#ffffff">mdi-navigation</v-icon>
        </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import { formatNumber } from '../../mixin/mixin'
import blogDetail from '@/config/blogDetail'

import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
window.hljs = require('highlight.js')
require('@/plugins/highlightjs-line-numbers')
export default {
  mixins: [formatNumber],
  name: 'BlogContent',
  props: ['id'],
  data() {
    return {
      authorInfo: {},
      authorBlog: [],
      detailBlog: {},
    }
  },
  methods: {
    getDetailBlog() {
      this.detailBlog = blogDetail
    },
    getAuthorBlog() {
      this.authorBlog = [
        { id: 1, title: '考前50分-四六级必考词汇预测', read: 483200 },
        { id: 2, title: '魔导国东征记－世界守护突破（622～624）三更！•OVERLORD', read: 154641 },
        {
          id: 3,
          title: 'FGO国服《妖精圆桌领域 阿瓦隆･勒･菲 星辰诞生之刻》2.6前篇主线概况攻略',
          read: 120005,
        },
        { id: 4, title: '1999元的miniLED HDR1000显示器HKC PG271Q简评', read: 100058 },
        { id: 5, title: '22年四六级翻译预测--共青团', read: 75645 },
      ]
    },
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
  created() {
    this.getDetailBlog()
    this.getAuthorInfo()
    this.getAuthorBlog()
  },
  mounted() {
    hljs.highlightAll()
    hljs.initLineNumbersOnLoad() //通过require()已经将hljs挂载到了window对象上
  },
}
</script>

<style>
code {
  font-family: Consolas;
  font-size: 14px;
}
td.hljs-ln-line.hljs-ln-numbers {
  text-align: right;
  padding-right: 12px;
  border-right: 1px solid #ccc;
}
td.hljs-ln-line.hljs-ln-code {
  padding-left: 10px;
}
</style>
