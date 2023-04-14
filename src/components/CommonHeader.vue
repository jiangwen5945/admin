<template>
  <div class="header-container">
    <div class="l-container">
      <el-button icon="el-icon-menu" size="mini" @click="handleBtn" style="margin-right: 20px;"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: item.path }" v-for="item in crumbsList" :key="item.path">
          <span class="nav-text">{{ item.label }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-container">
      <div class="theme-icon">
        <i class="el-icon-search" @click="handleSearch"/>
        <i :class="[isFullScreen ? 'el-icon-crop' : 'el-icon-full-screen']" @click="switchFull"/> 
        <i :class="[theme === 'dark' ? 'el-icon-sunny' : 'el-icon-moon']" @click="changeTheme(theme)" />
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
    }
  },
  methods: {
    // 处理下拉菜单选项中的事件
    handleCommand(command) {
      if (command === 'logout') {
        Cookie.remove('token')  // 退出清除token
        Cookie.remove('menuArray')  // 退出清除菜单列表数据
        Cookie.remove('userInfo')  // 退出清除菜单列表数据
        this.$message.success('退出成功!');
        this.$router.push('/login')
      }
    },
    // 折叠侧边菜单栏
    handleBtn() {
      this.$store.commit('handleCollapseMenu')
    },
    // 切换主题
    changeTheme(currentTheme) {
      const  reverseTheme = currentTheme === 'dark' ? 'light' : 'dark'
      this.$store.commit('setting/changeTheme', reverseTheme)
    },
    // 切换全屏
    switchFull() {
      this.$store.commit('setting/setFullScreen')
    },
    // 处理查询
    handleSearch(){}
  },
  computed: {
    ...mapState({
      navList: state => state.tab.navList,
      crumbsList: state => state.tab.crumbsList,
      theme: state => state.setting.theme,
      isFullScreen: state => state.setting.isFullScreen
    }),
    userInfo() {
      return this.$store.state.tab.userInfo || JSON.parse(Cookie.get('userInfo'))
    }
  },
  watch:{
    '$route.path'(newVal, oldVal) {
      if(newVal !== oldVal){
        // 根据当前路由地址更新面包屑
        this.$store.commit('updateCrumbs', newVal)
      }
    },
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