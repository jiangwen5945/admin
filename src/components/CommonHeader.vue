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
          <div class="theme-icon" @click="$store.commit('changeTheme')">
            <i  :class="[theme, theme==='dark'?'el-icon-sunny':'el-icon-moon']"></i>
          </div>
          <div class="test">
            jiangwen
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
    },
    computed: {
        ...mapState({
            navList: state => state.tab.navList,
            theme: state => state.theme
        }),
        userInfo() {
            return this.$store.state.tab.userInfo || JSON.parse(Cookie.get('userInfo'))
        }
    },
    mounted() {
        // console.log('navList', this.navList)
    }
}
</script>
<style lang="less" scoped>
.header-container {
    height: 60px;
    background: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

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
                    color: #fff;

                }
            }
        }
    }

    .r-container {
        display: flex;
        align-items: center;

        .avatar-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
           
        }
        .username{
            color: #fff;
            font-size: 12px;
            margin-left: 8px;
        }

        .theme-icon{
          font-size: 24px;
          margin-right: 20px;
          .light{
            color: #000;

          }
          .dark{
            color: #fff;
          }
        }
    }
}
</style>