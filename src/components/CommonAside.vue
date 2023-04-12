<template lang="">
  <el-menu 
      default-active="1-4-1" 
      class="aside-menu" 
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse"
  > 
      <!-- 菜单标题 -->
      <el-menu-item class='menu-header'>
        <el-image  :src="require('@/assets/logo.png')"  style="width: 30px; height: 30px; margin-right: 6px"></el-image>
        <span v-show="!isCollapse">瞎猫管理系统</span>
      </el-menu-item>
      <!-- 没有二级菜单 -->
      <el-menu-item :index="item.name" v-for="item in noChildren" :key="item.name" @click="handleUrl(item)">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <!-- 有二级菜单 -->
      <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="subItem.name"  @click="handleUrl(subItem)" v-for="subItem in item.children" :key="subItem.name">
                <template slot="title">
                    <i :class="`el-icon-${subItem.icon}`"></i>
                    <span slot="title"> {{subItem.label}}</span>
                </template>
            </el-menu-item>
          </el-menu-item-group>
      </el-submenu>
    
  </el-menu>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async handleUrl(item) {
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
        await this.$router.push({ path: item.path, query: { label: item.label }})
      }
      // 调用面包屑/导航更新
      this.$store.commit('updateNavList', item)
      this.$store.commit('updateCrumbs', this.$route)
    }
  },
  computed: {
    hasChildren() {
      return this.menuArray.filter(item => item.children)
    },
    noChildren() {
      return this.menuArray.filter(item => !item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menuArray() {
      // 缓存中存在则在缓存中读取，否则重新获取
      return JSON.parse(Cookie.get('menuArray')) || this.$store.state.tab.menuArray
    }
  }
}
</script>
<style lang="scss" scoped>
// 处理折叠侧边栏时抖动
.aside-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.aside-menu {
  height: 100vh;
  min-height: 100vh;
  border-right: none;
  background: var(--color-background) !important;

  // 有二级菜单
  .el-submenu__title {
    span {
      color: var(--color-font);
    }
    i {
      color: var(--color-font);
    }
    &:hover{
      span {
        color: var(--color-active);
      }
      i {
        color: var(--color-active);
      }
    }
  }
  .el-menu-item-group {
    background: var(--color-background) !important;
    overflow: hidden; // 避免二级菜单展开过程中白底色闪烁
    .el-menu-item{
      color: var(--color-font);
      i {
        color: var(--color-font);
      }
      &.is-active{
        color:  var(--color-active);
        i {
          color:  var(--color-active);
        }
      }
      
      &:hover{
        color: var(--color-active);
        i {
          color:  var(--color-active);
        }
      }
    }
  }

  // 没有二级菜单
  .el-menu-item {
    color: var(--color-font);
    i {
      color: var(--color-font);
    }
    &.is-active {
      color:  var(--color-active);
    }
    &:hover{
      color:  var(--color-active);
      i {
        color:  var(--color-active);
      }
    }
  }
}
</style>