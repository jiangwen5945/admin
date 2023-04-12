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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: 'MainView',
  props: {
    msg: String
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-header {
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-bottom: 1px solid rgba(0,21,41,.08);
}

.el-main {
  background: #f7f7f7;
  height:calc(100vh - 84px)
}
</style>
