<template>
  <transition name="fade">
    <div class="form">
      <p class="form-title">{{ type == 'register' ? '注册' : '请登录' }}</p>
      <div class="input-container email">
        <input type="email" placeholder="请输入邮箱" v-model="form.email">
        <span>
        </span>
        <div v-show="['emailLogin', 'register'].includes(type)" class="arrow-btn" @click="verify">{{ !verifyDisabled ?
          `重新发送(${time}s)` : '验证' }}</div>
      </div>
      <div class="input-container">
        <input type="password" placeholder="请输入密码" v-show="['psdLogin', 'register'].includes(type)"
          v-model="form.password">
        <input type="password" placeholder="再次确认密码" v-show="type == 'register'" v-model="form.rePassword">
        <input type="text" placeholder="请输入邮箱验证码" v-show="['emailLogin', 'register'].includes(type)"
          :style="verifyDisabled ? 'background:#f2f2f2' : ''" v-model="form.verify">
      </div>
      <button class="submit" @click="confirmSubmit()">{{ type == 'register' ? '注册' : '登录' }}</button>
      <div style="display: flex; justify-content: space-between;">
        <p class="signup-link" v-show="type !== 'register'">
          没有账号?<a style="cursor: pointer;color: #8ec5fc;" @click="changeRegister">去注册</a>
        </p>
        <p v-show="type == 'register'"></p>
        <p class="signup-link"><a style="cursor: pointer;color: #e0c3fc;" @click="changeOtherLogin">{{ type == 'psdLogin'
          ?
          '邮箱验证登录' : '账号密码登录' }}</a></p>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { LoginType, LoginForm } from './interface'
import patternUnit from '@/utils/pattern'
import { useUserStore } from '@/store/modules/user'
import { login, verfiy, register, getToken, testToken } from '@/request/modules/user'
import { ResLogin, ResToken } from './interface'

const userStore = useUserStore()
const type = ref<LoginType>("psdLogin") // 类型： 账号密码登录 | 邮箱验证登录 | 注册
const verifyDisabled = ref<boolean>(true)
const form = ref<LoginForm>(new LoginForm())

// 切换登录
const changeOtherLogin = () => {
  type.value == "register" && (form.value = new LoginForm())
  if (type.value != "psdLogin") {
    type.value = "psdLogin"
    initCountdown()
  } else {
    type.value = "emailLogin"
  }
}
// 切换注册
const changeRegister = () => {
  initCountdown()
  type.value = "register"
  form.value = new LoginForm()
}
// 验证邮箱
const verify = () => {
  if (verifyDisabled.value === true) {

    verfiy({ email: form.value.email }).then(res => {
      console.log(res, "Res");

    }).catch(err => {

    })
    countdown()
    verifyDisabled.value = false
  }
}
// 规则
const rules = {
  email: [{ require: true, message: '请输入邮箱' }, { pattern: patternUnit.emailReg, message: '请输入正确的邮箱' }],
  psd: [{ require: true, message: '请输入密码' }, { pattern: patternUnit.psdReg, message: '必须要数字+英文 6-12位' }],
}

const time = ref<number>(60)
let timer: any = null
// 倒计时60s
const countdown = () => {
  timer = setInterval(() => {
    time.value--




  }, 1000)
}

// 初始化倒计时
const initCountdown = () => {
  clearInterval(timer)
  verifyDisabled.value = true
  time.value = 60
}

// 提交数据
const confirmSubmit = () => {
  switch (type.value) {
    case "emailLogin": confirmEmilLogin()
      break;
    case "psdLogin": confirmPsdLogin()
      break;
    case "register": confirmRegister()
      break;
  }
}
// 注册
const confirmRegister = () => {
  register({
    code: form.value.verify,
    userName: form.value.email,
    email: form.value.email,
    passWord: form.value.password,

  }).then(res => {

  }).catch(err => {

  })
}

const confirmPsdLogin = () => {
  const postData = {
    userName: form.value.email,
    passWord: form.value.password
  }
  login<ResLogin>(postData).then(async (res) => {
    if (res.code === 200) {
      await userStore.setUserInfo(res.data)
      const tokenRes = await getToken<ResToken>({ _id: res.data._id })
      if (tokenRes.code === 200) {
        let { token } = tokenRes.data
        token = token.toLocaleLowerCase()
        userStore.setToken(token)
      }
      await testToken()
    }
  }).catch(e => {
    console.log(e, "catch__");
  })
}
// 邮箱验证登录
const confirmEmilLogin = () => {

}

watch(time, (newVal: number) => {
  newVal <= 0 && initCountdown()
})

</script>

<style lang="scss" scoped>
.form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 280px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
  cursor: pointer;
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
}

.signup-link {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}

.email {
  position: relative;

  .arrow-btn {
    position: absolute;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    top: 20px;
    right: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>