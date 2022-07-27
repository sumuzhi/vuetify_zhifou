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
          <v-card :class="!active ? 'mask ma-1' : 'ma-1'" height="60" width="120" @mouseenter="toggle">
            <v-img height="60" :src="item.picture" />
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'FilmView',
  data() {
    return {
      swiperData: [],
      currentIndex: 1,
    }
  },
  methods: {
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
