<template>
  <div class="header-container">
    <div class="l-container">
      <el-button icon="el-icon-menu" size="mini" @click="handleBtn" style="margin-right: 20px;"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: item.path }" v-for="item in navList" :key="item.path">
          <span class="nav-text">{{ item.label }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-container">
      <div class="theme-icon">
        <i class="el-icon-search" @click="handleSearch"/>
        <i :class="[isFull ? 'el-icon-crop' : 'el-icon-full-screen']" @click="switchFull"/> 
        <i :class="[theme, theme === 'dark' ? 'el-icon-sunny' : 'el-icon-moon']" @click="changeTheme(theme)" />
      </div>
      <el-dropdown @command="handleCommand">
        <div class="el-dropdown-link avatar-box">
          <el-avatar :src="require('@/assets/' + userInfo.avatar)"></el-avatar>
          <span class="username">{{ userInfo.username }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isFull: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        Cookie.remove('token')  // 退出清除token
        Cookie.remove('menuArray')  // 退出清除菜单列表数据
        Cookie.remove('userInfo')  // 退出清除菜单列表数据
        this.$message.success('退出成功!');
        this.$router.push('/login')
      }
    },
    handleBtn() {
      this.$store.commit('handleCollapseMenu')
    },
    changeTheme(currentTheme) {
      const  reverseTheme = currentTheme === 'dark' ? 'light' : 'dark'
      this.$store.commit('setting/changeTheme', reverseTheme)
    },
    // 切换全屏
    switchFull() {
      if (this.isFull) {
        document.exitFullScreen && document.exitFullscreen();
        //兼容火狐
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
        //兼容谷歌等
        if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        //兼容IE
        if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (document.documentElement.RequestFullScreen) {
          document.documentElement.RequestFullScreen();
        }
        //兼容火狐
        if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        }
        //兼容IE,只能写msRequestFullscreen
        if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      }
      this.isFull = !this.isFull
    },
    handleSearch(){}
  },
  computed: {
    ...mapState({
      navList: state => state.tab.navList,
      theme: state => state.setting.theme
    }),
    userInfo() {
      return this.$store.state.tab.userInfo || JSON.parse(Cookie.get('userInfo'))
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-container {
    display: flex;
    align-items: center;

    .el-breadcrumb__item {
      .nav-text {
        color: #666;
        font-size: 14px;
      }

      &:last-child {
        .nav-text {
          color: #545c64;
        }
      }
    }
  }

  .r-container {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .username {
      color: #545c64;
      font-size: 12px;
      margin-left: 8px;
    }

    .theme-icon {
      font-size: 20px;
      margin-right: 16px;

      i {
        margin-left: 12px;
      }
    }
  }
}
</style>