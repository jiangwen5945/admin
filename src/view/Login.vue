<template>
  <div class="login-container">
    <el-card class="box-card">
      <h3>后台管理登录</h3>
      <el-form :model="loginForm" status-icon :rules="ruleForm" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password" style="margin-bottom: 10px;">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-key"></el-input>
        </el-form-item>
        <el-form-item prop="password" style="margin-bottom: 10px;">
          <div class="save-wrap">
            <el-checkbox v-model="rememberCheck">记住密码</el-checkbox>
            <el-link :underline="false">忘记密码</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin('ruleForm')" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
// import Mock from 'mockjs'
import { userPermission } from '../api'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginView',
  data() {
    return {
      loginForm: {
        username: " ",
        password: ""
      },
      rememberCheck: true,
      ruleForm: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    ...mapMutations(['setMenuArray', 'addMenuToRouter', 'setUserInfo']),
    handleLogin() {
      userPermission(this.loginForm).then(data => {
        Cookie.set('token', data.token)  // 在cookie中缓存token
        this.setMenuArray(data.menu)     // 获取菜单的数据，存入store中
        this.setUserInfo(data.userInfo)     // 获取登录用户的数据，存入store中
        this.addMenuToRouter(this.$router)    // 设置动态添加路由
        this.$message.success('登录成功!');    //状态提示
        this.$router.push('./home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/bg.svg');
  height: 100vh;
}

.box-card {
  width: 400px;
  text-align: center;
  position: absolute;
  padding: 10px 20px;
  border-radius: 8px;

  h3 {
    margin-bottom: 22px;
  }

  .save-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 6px;
  }
}
</style>