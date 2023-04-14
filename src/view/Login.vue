<template>
  <div class="login-container">
    <el-card class="box-card">
      <h3>后台管理登录</h3>
      <el-form :model="form" status-icon :rules="rules" ref="formRef">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="passWord" style="margin-bottom: 10px;">
          <el-input type="password" v-model="form.passWord" prefix-icon="el-icon-key"></el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 10px;">
          <div class="save-wrap">
            <el-checkbox v-model="rememberCheck">记住密码</el-checkbox>
            <el-link :underline="false">忘记密码</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin()" style="width: 100%;" :disabled="!isSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import rules from '@/utils/rules';
import { userPermission } from '../api'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        userName: "",
        passWord: ""
      },
      rememberCheck: true,
      rules
    }
  },
  mounted() {
    console.log(this.$refs);
    this.keyUpSubmit()
  },
  computed: {
    isSubmit() {
      return !!this.form.userName && !!this.form.passWord
    }
  },
  methods: {
    ...mapMutations(['setMenuArray', 'addMenuToRouter', 'setUserInfo']),
    handleLogin() {
      userPermission(this.form).then(data => {
        Cookie.set('token', data.token)  // 在cookie中缓存token
        this.setMenuArray(data.menu)     // 获取菜单的数据，存入store中
        this.setUserInfo(data.userInfo)     // 获取登录用户的数据，存入store中
        this.addMenuToRouter(this.$router)    // 设置动态添加路由
        this.$message.success('登录成功!');    //状态提示
        this.$router.push('./home')
      })
    },
    // 回车登录
    keyUpSubmit() {
      document.onkeydown = () => {
        let key = window.event.keyCode;
        if (key === 13) {
          this.handleLogin();
        }
      };
    },
  }
}
</script>
<style lang="scss" scoped>
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