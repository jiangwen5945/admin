<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <common-tag></common-tag>
          <!-- 这里是会被缓存的视图组件(对name为member的组件不缓存) -->
          <keep-alive exclude="member"> 
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <!-- 这里是不被缓存的视图组件 -->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 屏幕内容保护组件 -->
    <LockScreen />
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
import LockScreen from '@/components/LockScreen.vue'
export default {
  name: 'MainView',
  props: {
    msg: String
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
    LockScreen
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  border-bottom: 1px solid rgba(0, 21, 41, .08);
}

.el-main {
  background: #f7f7f7;
  height: calc(100vh - 84px)
}
</style>
