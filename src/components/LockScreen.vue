<template>
  <div class="lock-screen" v-if="isLockScreen">
    <div class="content-box">
      <img
        class="avatar"
        :src="require('@/assets/' + userInfo.avatar)"
        alt=""
      />
      <span class="info"> {{ userInfo.role }}: {{ userInfo.username }} </span>

      <el-input
        v-model="form.passWord"
        type="password"
        placeholder="请输入当前用户密码"
        show-password
        prefix-icon="el-icon-key"
        size="large"
        style="width: 70%"
      >
        <template #append>
          <el-button type="primary" @click="handleUnlock()">解锁</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import { userPermission } from '../api'
import { mapState } from 'vuex';
export default {
  data() {
    return {
        form: {
            userName: '',
            passWord: ''
        },
        leaveTime: ''
    };
  },
  computed: {
    ...mapState({
      isLockScreen: state => state.setting.isLockScreen,
    }),
    userInfo() {
      return this.$store.state.tab.userInfo || JSON.parse(Cookie.get('userInfo'))
    }
  },
  mounted(){
    document.addEventListener('visibilitychange', this.handleVisiable)
    document.addEventListener('keydown', this.keyUpSubmit)
  },
  methods: {
    // 处理当前页面可见状态
    handleVisiable(e){
      switch (e.target.visibilityState) {
        case 'prerender':
          console.log('prerender');
          break;
        case 'hidden':
          // 记录不住当前页面的开始时间点
          this.leaveTime = new Date().getTime()
          break;
        case 'visible':
          // 离开页面3分钟后自动开启屏幕内容保护
          if(new Date().getTime() - this.leaveTime > 1000 * 60 * 3) {
            this.$store.dispatch('setting/setLockScreen', true)
          }
          break;
      }
    },
    // 解除屏幕锁定
    handleUnlock() {
      if(this.form.passWord === '') return
      this.form.userName = this.userInfo.username
      userPermission(this.form).then(data => {
        this.$store.dispatch('setting/setLockScreen', false)
        //状态提示  
        this.$notify({ 
          title: 'Title',
          message: '欢迎回来！',
          type: 'success',
          duration: 1200
        })
      })
    },
      // 回车登录
    keyUpSubmit() {
        let key = window.event.keyCode;
        if (key === 13) {
          this.handleUnlock();
        }
    },
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange',this.handleVisiable)
    document.removeEventListener('keydown',this.keyUpSubmit)
  }
};
</script>
<style lang="scss" scoped>
.lock-screen {
  width: 100%;
  height: 100%;
  background: #00000087;
  backdrop-filter: blur(6px);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-box {
    width: 30%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: o auto;
    align-items: center;
    transform: translateY(-120px);
    border-radius: 10px;
    padding-bottom: 34px;

    .avatar{
      border-radius: 50%;
      width: 100px;
      transform: translateY(-26px);
    }
    .info {
      font-size: 16px;
      color: #4d4d4d;
      margin-bottom: 20px;
    }
    


  }
}
</style>