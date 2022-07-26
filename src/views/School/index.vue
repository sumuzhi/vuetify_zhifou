<template>
  <div>
    <v-container fluid class="d-flex justify-center">
      <!-- 课程菜单 -->
      <v-card elevation="8" height="min-content">
        <v-toolbar dense dark color="blue">
          <v-spacer></v-spacer>
          热门课程
          <v-spacer> </v-spacer>
        </v-toolbar>
        <v-card-text class="pa-2">
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in courseMenus" :key="i" :value="item.id">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
      <!-- 课程阶段 -->
      <v-card flat width="900" class="ml-8">
        <v-card elevation="8" class="mb-4" v-for="(item, index) in subStage" :key="item.id">
          <v-card-title>
            <v-chip label color="info">
              <v-icon class="mr-2">mdi-numeric-{{ index + 1 }}-box</v-icon>
              {{ item.label }}
            </v-chip>
          </v-card-title>
          <v-card-text>{{ item.describe }}</v-card-text>
          <v-card-text class="pt-0">
            <v-chip-group v-model="chipData" column active-class="warning">
              <v-chip :value="item2.id" label v-for="item2 in item.targetList" :key="item2.id">{{
                item2.name
              }}</v-chip>
            </v-chip-group>
          </v-card-text>

          <!-- 视频卡片 -->
          <v-card-text class="pt-0" v-show="showVideoArea(item.targetList)">
            <SchoolVideoCard :videoCard="videoCard" />
          </v-card-text>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { videoCardData } from '@/config/videoCardData.js'
import SchoolVideoCard from '@/components/school/SchoolVideoCard.vue'
export default {
  name: 'SchoolView',
  components: { SchoolVideoCard },
  data() {
    return {
      courseMenus: [],
      selectedItem: null,
      subStage: [],
      chipData: null,
      videoCard: [],
    }
  },
  watch: {
    selectedItem(newData) {
      this.getSubjectStage(newData)
    },
    chipData(newData) {
      this.getVideoCardData(newData)
    },
  },
  methods: {
    getVideoCardData(id) {
      const videoData = videoCardData(id)
      this.videoCard = videoData
    },
    showVideoArea(targetList) {
      let aa = targetList.filter(item => item.id === this.chipData)
      if (aa[0]) return true
      else return false
    },
    getCourseMenus() {
      this.courseMenus = [
        { id: 1, name: 'JavaEE' },
        { id: 2, name: 'HTML&JS+前端' },
        { id: 3, name: 'Python+大数据开发' },
        { id: 4, name: '人工智能开发' },
        { id: 5, name: 'UI/UE设计' },
        { id: 6, name: '软件测试' },
      ]
      this.selectedItem = this.courseMenus[0].id
    },
    getSubjectStage(sub_id) {
      switch (sub_id) {
        case 1:
          this.subStage = [
            {
              id: 1,
              label: 'JavaSE 基础',
              describe:
                '打好Java基础才能真正成为Java开发的高手，学习Java企业级技术和项目才能游刃有余。',
              targetList: [{ id: 1, name: 'Java 基础快速入门' }],
            },
            {
              id: 2,
              label: 'JavaWeb',
              describe:
                'JavaWeb是整个Web开发的基础课程，本阶段JavaWeb教程旨在用最短的时间掌握最全的JavaWeb核心技术——数据库、前端、web核心，为后期的分布式、微服务打下坚实的基础。',
              targetList: [{ id: 2, name: 'JavaWeb 核心编程' }],
            },
            {
              id: 3,
              label: 'JavaEE 开发框架',
              describe:
                '本阶段为企业级服务端开发必备技能，可以优化之前web阶段学习内容，使开发网站和企业管理系统更加快捷，更加方便维护。',
              targetList: [
                { id: 3, name: 'Maven' },
                { id: 4, name: 'Git' },
                { id: 5, name: 'SSM' },
                { id: 6, name: 'MyBatisPlus' },
                { id: 7, name: 'SpringBoot' },
                { id: 8, name: '【医疗行业】传智健康' },
              ],
            },
            {
              id: 4,
              label: '中间件&服务框架',
              describe:
                '本阶段汇集了当下热门的微服务框架，学完后可增加中级程序员的知识储备，为面试或将来技术的深入奠定良好的基础。',
              targetList: [
                { id: 9, name: '微服务框架SpringCloud' },
                { id: 10, name: 'Dubbo' },
                { id: 11, name: 'Zookeeper' },
                { id: 12, name: 'RabbitMQ' },
                { id: 13, name: 'RocketMQ' },
                { id: 14, name: '容器化Docker' },
                { id: 15, name: 'Redis' },
                { id: 16, name: 'MongoDB' },
                { id: 17, name: '搜索技术' },
              ],
            },
            {
              id: 5,
              label: '企业级项目实战',
              describe:
                '“项目经验”是企业了解人才能力的关键因素，为了更快更好地进入企业，就要选择真实、可靠、紧跟企业需要的项目课，沉浸不同阶段和规模的项目实战。在项目中，类似权限管理、短信这类功能，其整体实现思路基本一致，如果有一套通用的解决方案可以复用，就能有效减少资源的重复，缩短开发周期，减少出错率。',
              targetList: [
                { id: 18, name: '企业服务 SaaSiHRM' },
                { id: 19, name: '生活服务 好客租房' },
                { id: 20, name: '金融行业 万信金融' },
                { id: 21, name: '支付工具 聚合支付' },
                { id: 22, name: '【通用领域】权限管理一体化解决方案' },
                { id: 23, name: '【通用领域】短信网关平台' },
              ],
            },
            {
              id: 6,
              label: '面试专题课',
              describe: '以100+企业大厂真实高频Java面试真题为主干，轻松应对大厂面试',
              targetList: [{ id: 24, name: 'Java大厂面试专题' }],
            },
          ]
          break
        case 2:
          this.subStage = [
            {
              id: 7,
              label: '基础入门',
              describe:
                '为零基础学员量身定制，教你搭建PC端和移动端静态页面，让你从小白升级成网页“化妆师”，轻松掌握 HTML5 和 CSS3 相关知识。',
              targetList: [
                { id: 25, name: 'HTML+CSS' },
                { id: 26, name: '移动web布局' },
              ],
            },
            {
              id: 8,
              label: '技术进阶',
              describe:
                '让网页“动”起来，带你学会前端工程师核心语言——JavaScript，实现网页数据交互与动画效果，并实现与后端数据的联通。',
              targetList: [
                { id: 27, name: 'JavaScript' },
                { id: 28, name: 'Web APIs' },
                { id: 29, name: '数据交互&异步编程' },
              ],
            },
            {
              id: 9,
              label: 'Vue 开发',
              describe:
                '掌握多行业解决方案，项目开发拿来即用，帮你搞定前端工程师必备热门框架Vue.js。',
              targetList: [
                { id: 30, name: 'Node.js' },
                { id: 31, name: 'Vue2+Vue3' },
              ],
            },
            {
              id: 10,
              label: 'React&小程序开发',
              describe: 'React帮你解锁中高级前端工程师能力地图，多端项目让你满足90%+企业需求。',
              targetList: [
                { id: 32, name: 'React核心技术' },
                { id: 33, name: 'TypeScript开发' },
                { id: 34, name: '小程序' },
              ],
            },
          ]
          break
        case 3:
          this.subStage = [
            {
              id: 11,
              label: '大数据开发入门',
              describe:
                '从传统关系型数据库入手，掌握数据迁移工具、BI数据可视化工具、SQL，对后续学习打下坚实基础。',
              targetList: [{ id: 35, name: 'MySQL' }],
            },
            {
              id: 12,
              label: '大数据核心基础',
              describe:
                '学习Linux、Hadoop、Hive，掌握大数据基础技术，满足大数据开发行业的初级需求，可以从事ETL及Hive数仓工程师。',
              targetList: [{ id: 36, name: 'Hadoop' }],
            },

            {
              id: 13,
              label: '千亿级数仓技术',
              describe:
                '本阶段课程以真实项目为驱动，学习离线数仓技术，学员可轻松应对高级数仓工程师、中级大数据工程师的岗位。',
              targetList: [{ id: 37, name: 'Hive数仓项目' }],
            },
            {
              id: 14,
              label: 'PB级内存计算',
              describe:
                'Spark官方已经在自己首页中将Python作为第一语言，在3.2版本的更新中，高亮提示内置捆绑Pandas；课程完全顺应技术社区和招聘岗位需求的趋势，全网首家加入Python on Spark的内容；你将胜任Spark开发工程师、中级大数据工程师。',
              targetList: [
                { id: 38, name: 'Python' },
                { id: 39, name: 'Spark' },
              ],
            },
          ]
          break
        case 4:
          this.subStage = [
            {
              id: 15,
              label: '人工智能开发入门',
              describe: '从人工智能Python语言入手，掌握Python基础语法，对后续学习打下坚实基础。',
              targetList: [{ id: 40, name: 'Python' }],
            },
            {
              id: 16,
              label: '机器学习核心技术',
              describe:
                '掌握核心机器学习算法原理，掌握分类、回归、聚类使用场景，满足人工智能数据挖掘类岗位，薪资可达到15K-20K。',
              targetList: [{ id: 41, name: 'Python机器学习' }],
            },
            {
              id: 17,
              label: 'NLP自然语言处理技术',
              describe:
                '本阶段课程将掌握突破市场最热超高年薪的NLP技术，学生可应对市场上NLP工程师，根据市场反馈薪资突破30K。',
              targetList: [{ id: 42, name: 'NLP' }],
            },
            {
              id: 18,
              label: 'CV计算机视觉技术',
              describe:
                '掌握计算机视觉基础算法原理，掌握目标检测、分类、跟踪等各类CV任务，学生可应对市场上CV工程师岗位，薪资可达20K以上。',
              targetList: [
                { id: 43, name: 'AI-OpenCV' },
                { id: 44, name: 'Python深度学习' },
                { id: 45, name: 'CV深度学习' },
              ],
            },
          ]
          break
        case 5:
          this.subStage = [
            {
              id: 19,
              label: '小白设计入门',
              describe:
                '万事开头难，但学习设计并不难，本套【小白设计入门基础课程】，对于从事平面设计/电商设计/UI设计有指导意义，帮助学员打开进入设计行业的大门。',
              targetList: [
                { id: 46, name: 'Photoshop' },
                { id: 47, name: 'Adobe illustrator' },
              ],
            },
            {
              id: 20,
              label: '品牌视觉设计',
              describe:
                '平面设计是沟通传播、风格化和通过文字和图像解决问题的艺术。本阶段课程包括标识（商标和品牌）、出版物（杂志，报纸和书籍）、平面广告，海报，广告牌，网站图形元素、标志和产品包装等。帮助学员提高视觉设计的能力，加强平面类设计工作流程及各种规范的了解，以及掌握分析项目及独立设计能力的培养。',
              targetList: [{ id: 48, name: '平面设计' }],
            },
            {
              id: 21,
              label: '视觉运营设计',
              describe:
                '本课程将全面地学习电商设计师需具备的电商设计基础理论与实战技巧，让想要学习电商设计的学员能够通过本课程得到系统的学习与提升。 熟练掌握和学习后，可直接进入企业及外包公司从事电商设计师/视觉设计师/运营设计师等岗位。',
              targetList: [{ id: 49, name: 'C4D' }],
            },
            {
              id: 22,
              label: 'UI/UE设计',
              describe:
                '本阶段课程理论与实战相结合，项目涵盖图标设计、APP设计、H5营销页设计、网页设计、数据可视化设计。为你全面讲解设计规范、技巧、流程，非常实用！让你从完全不懂UI设计到清楚如何进行UI设计，帮你扫频UI设计的障碍。',
              targetList: [{ id: 50, name: 'Figma' }],
            },
          ]
          break
        case 6:
          this.subStage = [
            {
              id: 23,
              label: '功能测试',
              describe:
                '学习本阶段内容，可全流程功能测试解决方案、Web自动化测试解决方案、数据分离解决方案、自动化测试报告解决方案、日志收集解决方案',
              targetList: [
                { id: 51, name: '软件测试入门' },
                { id: 52, name: 'Linux系统' },
                { id: 53, name: 'MySQL数据库+项目实战' },
              ],
            },
            {
              id: 24,
              label: 'Python编程',
              describe:
                '学习本阶段内容，可掌握Python语法, 具备编程能力； 能建立编程思维以及面向对象程序设计思想； 能掌握UnitTest框架管理测试用例。',
              targetList: [{ id: 54, name: 'Python软件测试' }],
            },
            {
              id: 25,
              label: 'UI自动化',
              describe:
                'ui自动化大体分为web自动化和app自动化，在自动化测试领域中占比很大，经常使用。',
              targetList: [
                { id: 55, name: 'web自动化测试' },
                { id: 56, name: 'Appium自动化测试' },
                { id: 57, name: 'Appium自动化测试IOS' },
              ],
            },
            {
              id: 26,
              label: '接口自动化',
              describe: '接口测试是所有自动化测试中应用频率最高部分',
              targetList: [{ id: 58, name: '接口测试' }],
            },
            {
              id: 27,
              label: '性能测试',
              describe:
                '性能测试属于高级测试范畴，对于薪资的提升帮助很大，本阶段视频讲解性能测试环境搭建，JMeter工具的使用，性能测试监控、分析和调优方法',
              targetList: [{ id: 59, name: '性能测试快速入门' }],
            },
            {
              id: 28,
              label: '综合项目强化',
              describe:
                '通过微信小程序、金融项目两个实战项目综合强化功能测试、接口测试、性能测试。',
              targetList: [{ id: 60, name: '项目测试' }],
            },
          ]
          break
      }
    },
  },
  mounted() {
    this.getCourseMenus()
    this.getSubjectStage(1)
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
