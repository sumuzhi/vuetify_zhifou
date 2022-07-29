<template>
  <!-- 举报对话框 -->
  <v-dialog width="500" persistent v-model="report.value">
    <v-card>
      <!-- 举报标题 -->
      <v-card-title class="font-weight-black"> 博客举报 </v-card-title>
      <v-divider></v-divider>
      <v-container class="px-5">
        <v-row no-gutters align="center">
          <v-col cols="2" class="align-self-start pt-2">举报理由</v-col>
          <v-col cols="10">
            <!-- 理由下拉框 -->
            <v-select
              solo
              dense
              label="请选择举报理由"
              :items="report.reason.list"
              item-value="id"
              item-text="name"
              v-model="report.reason.value"
            >
            </v-select>
          </v-col>

          <!-- 举报标签 -->
          <v-col cols="2" class="align-self-start pt-3">举报标签</v-col>
          <v-col cols="10">
            <v-chip-group column active-class="info" multiple>
              <v-chip label disabled outlined v-show="!report.reason.value"> 先选择举报理由</v-chip>
              <v-chip label outlined v-for="item in report.label.list" :key="item.id">{{
                item.name
              }}</v-chip>
            </v-chip-group>
          </v-col>

          <!-- 举报详情 -->
          <v-col cols="12" class="mt-5">
            <span>举报详情</span>
            <v-textarea
              class="mt-3"
              v-model="report.content"
              rows="3"
              counter="100"
              clearable
              no-resize
              outlined
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <!-- 底部按钮 -->
      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn
          @click="report.value = false"
          small
          class="white--text"
          width="100"
          color="grey"
          rounded
          >取消</v-btn
        >
        <v-btn small width="100" class="white--text" color="#82b1ff" rounded>确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getReasonLabel } from '@/config/reasonLabel'

export default {
  name: 'ReportDialog',
  data() {
    return {
      report: {
        value: false,
        reason: {
          list: [],
          value: null,
        },
        label: {
          value: [],
          list: [],
        },
        content: '',
      },
    }
  },
  watch: {
    'report.reason.value'(newData) {
      console.log(newData)
      this.getLabelByReason(newData)
    },
    'report.value': {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.getReasonList()
        }
      },
    },
  },
  methods: {
    getLabelByReason(id) {
      let list = getReasonLabel(id)
      this.report.label.list = list
    },

    getReasonList() {
      let responseReason = [
        {
          id: 1,
          name: '内容违规',
          reason: [
            { id: 1, name: '色情低俗' },
            { id: 2, name: '政治敏感' },
            { id: 3, name: '造谣传谣' },
            { id: 4, name: '涉嫌欺诈' },
            { id: 5, name: '违法犯罪' },
            { id: 6, name: '诱导互动、体验差等' },
            { id: 7, name: '违规卖货、假冒商品' },
            { id: 8, name: '疑似/教唆自残自杀' },
            { id: 9, name: '网暴他人，其他' },
          ],
        },
        {
          id: 2,
          name: '侵权权益',
          reason: [{ id: 10, name: '侵犯肖像、隐私、名誉、商标、专利、著作权' }],
        },
        {
          id: 3,
          name: '未成年',
          reason: [
            { id: 11, name: '未成年人不当行为' },
            { id: 12, name: '内容不适合未成年观看' },
          ],
        },
      ]

      let reason_index = 0
      responseReason.forEach((item, index) => {
        this.report.reason.list[reason_index++] = { header: item.name }
        item.reason.forEach(_ => {
          this.report.reason.list[reason_index++] = _
        })
        index + 1 === responseReason.length
          ? ''
          : (this.report.reason.list[reason_index++] = { divider: true })
      })
    },
  },
  created() {
    this.$bus.$on('openDialog', () => {
      this.report.value = true
    })
  },
}
</script>

<style></style>
