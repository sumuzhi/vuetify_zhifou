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
      <!-- 右侧登录框 -->
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card tile width="500" height="580">
            <v-card tile width="500" height="580" class="pa-16 d-flex flex-column">
              <!-- 标题 -->
              <v-container class="d-flex align-center">
                <h2>登录</h2>
                <span class="text-caption ml-auto"
                  >没有账号?
                  <a href="#" @click="step = 2" class="text-decoration-none">点击注册</a>
                </span>
              </v-container>
              <!-- 登录区域 -->
              <v-container>
                <v-form ref="loginForm" lazy-validation v-model="login.value">
                  <v-text-field
                    label="账号/邮箱/手机号"
                    clearable
                    placeholder="账号/邮箱/手机号"
                    dense
                    :rules="login.account.rule"
                    outlined
                    v-model="login.account.value"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="passwordStyle.icon"
                    @click:append="handleInputShow"
                    label="密码"
                    clearable
                    placeholder="密码"
                    dense
                    outlined
                    :rules="login.password.rule"
                    :type="passwordStyle.type"
                    v-model="login.password.value"
                  ></v-text-field>
                  <v-checkbox
                    class="mt-0 mb-1"
                    v-model="login.checkbox.value"
                    :rules="login.checkbox.rule"
                    dense
                  >
                    <template #label>
                      同意无理的<a @click.stop class="text-decoration-none" href="#">协议</a>
                    </template>
                  </v-checkbox>
                  <v-btn
                    @click="toLogin"
                    :disabled="!login.value"
                    class="white--text"
                    color="#e0c7cb"
                    block
                  >
                    登录
                  </v-btn>
                </v-form>

                <v-container class="text-center">
                  <a href="#" class="text-caption grey--text text-decoration-none">忘记密码</a>
                </v-container>
              </v-container>

              <!-- 其他登录方式 -->
              <v-container class="mt-auto">
                <v-container class="d-flex align-center py-0">
                  <v-divider></v-divider>
                  <v-subheader class="text-caption">其他登录方式</v-subheader>
                  <v-divider> </v-divider>
                </v-container>
                <v-container class="text-center py-0">
                  <v-btn
                    :class="index !== 0 ? 'ml-8' : ''"
                    small
                    fab
                    :color="item.color"
                    v-for="(item, index) in otherLogin"
                    :key="item.id"
                    ><v-icon>{{ item.icon }}</v-icon></v-btn
                  >
                </v-container>
              </v-container>
            </v-card>
          </v-card>
        </v-window-item>

        <!-- 注册 -->
        <v-window-item :value="2">
          <v-card tile width="500" height="580" class="px-16 d-flex align-center">
            <v-container>
              <v-container class="d-flex align-center">
                <h2>注册</h2>
                <span class="text-caption ml-auto"
                  >已有账号?
                  <a href="#" @click="step = 1" class="text-decoration-none">点击登录</a>
                </span>
              </v-container>
              <v-container>
                <v-form ref="registerForm" lazy-validation v-model="register.value">
                  <v-text-field
                    label="账号/邮箱/手机号"
                    clearable
                    placeholder="账号/邮箱/手机号"
                    dense
                    :rules="register.email.rule"
                    outlined
                    v-model="register.email.value"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="验证码"
                        placeholder="验证码"
                        dense
                        outlined
                        v-model="register.verifyCode.value"
                        :rules="register.verifyCode.rule"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        @click="btnCountDown"
                        :disabled="register.btnCount.disabled"
                        class="white--text"
                        color="#e0c7cb"
                        block
                        >{{ register.btnCount.text }}</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-checkbox
                    class="mt-0 mb-1"
                    v-model="register.checkbox.value"
                    :rules="register.checkbox.rule"
                    dense
                  >
                    <template #label>
                      同意无理的<a @click.stop class="text-decoration-none" href="#">协议</a>
                    </template>
                  </v-checkbox>
                  <v-btn
                    @click="toRegister"
                    :disabled="!login.value"
                    class="white--text"
                    color="#e0c7cb"
                    block
                  >
                    注册
                  </v-btn>
                </v-form>
              </v-container>
            </v-container>
          </v-card>
        </v-window-item>

        <v-window-item :value="3">
          <v-card tile width="500" height="580" class="d-flex align-center">
            <v-container class="text-center">
              <v-icon color="success" size="150">mdi-check-circle</v-icon>
              <h3>欢迎入坑</h3>
              <p class="text-caption grey--text">
                请前往注册的邮箱激活账号
                <a @click.stop="step = 1" class="text-decoration-none">点击此处前往登录</a>
              </p>
            </v-container>
          </v-card>
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
      otherLogin: [],
      flag: false,
      step: 1,
      brandInfo: {},
      footerInfo: {},
      passwordStyle: {
        type: 'password',
        icon: 'mdi-eye-off',
      },
      login: {
        value: null,
        checkbox: {
          value: false,
          rule: [v => !!v || '请勾选条款'],
        },
        account: {
          value: '',
          rule: [v => !!v || '输入用户名', v => v?.length <= 10 || '长度不能超过10'],
        },
        password: {
          value: '',
          rule: [v => !!v || '输入密码', v => v?.length <= 10 || '长度不能超过10'],
        },
      },
      register: {
        value: null,
        btnCount: {
          text: '获取验证码',
          time: 10,
          disabled: false,
        },
        checkbox: {
          value: false,
          rule: [v => !!v || '请勾选条款!!!'],
        },
        email: {
          value: '',
          rule: [v => !!v || '请输入邮箱'],
        },
        verifyCode: {
          value: '',
          rule: [v => !!v || '请输入验证码'],
        },
      },
    }
  },
  methods: {
    btnCountDown() {
      const timer = window.setInterval(() => {
        if (this.register.btnCount.time - 1 === 0) {
          clearInterval(timer)
          this.register.btnCount.disabled = false
          this.register.btnCount.time = 10
          this.register.btnCount.text = '获取验证码'
        } else {
          this.register.btnCount.disabled = true
          this.register.btnCount.time -= 1
          this.register.btnCount.text = this.register.btnCount.time + '秒获取'
        }
      }, 1000)
    },

    getOtherLogin() {
      this.otherLogin = [
        { id: 1, name: 'QQ', icon: 'mdi-qqchat', color: 'info', to: '' },
        { id: 2, name: '微信', icon: 'mdi-wechat', color: 'success', to: '' },
        { id: 3, name: '微博', icon: 'mdi-sina-weibo', color: 'error', to: '' },
      ]
    },
    toLogin() {
      let isSuccess = this.$refs.loginForm.validate()
      if (!isSuccess) return
      console.log(this.login)
    },
    toRegister() {
      let isSuccess = this.$refs.registerForm.validate()
      if (!isSuccess) return
      console.log(this.register)
    },
    handleInputShow() {
      if (this.passwordStyle.type === 'text') {
        this.passwordStyle.type = 'password'
        this.passwordStyle.icon = 'mdi-eye-off'
      } else {
        this.passwordStyle.type = 'text'
        this.passwordStyle.icon = 'mdi-eye'
      }
    },

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
    this.getOtherLogin()
  },
  watch: {
    step(newData, oldData) {
      if (oldData === 1) {
        this.$refs.loginForm.reset()
      }
      if (oldData === 2) {
        this.$refs.registerForm.reset()
      }
    },
  },
}
</script>

<style scoped lang="less">
.dialog_back {
  background-image: linear-gradient(to bottom, #d9c9cd, #e8c5c9);
}
</style>
