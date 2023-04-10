<template lang="">
    <div>
        <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        > 
            <!-- 菜单标题 -->
            <el-menu-item>
                <el-image  :src="require('@/assets/logo.png')"  style="width: 30px; height: 30px"></el-image>
                <span v-show="!isCollapse" style="color:#fff;margin-left: 4px;font-size: 15px;">后台管理系统</span>
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
                <el-menu-item-group  v-for="subItem in item.children" :key="subItem.name">
                    <el-menu-item :index="subItem.name"  @click="handleUrl(subItem)">
                        <template slot="title">
                            <i :class="`el-icon-${subItem.icon}`"></i>
                            <span slot="title"> {{subItem.label}}</span>
                        </template>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
          
        </el-menu>
    </div>
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
        handleUrl(item) {
          console.log(item);
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push(item.path)
            }
            // 调用面包屑更新
            this.$store.commit('updateNavList', item)
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
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    min-height: 100vh;
    border-right: none;

    // .title-wrap {
    //     color: #fff;
    //     text-align: center;
    //     line-height: 48px;
    //     font-size: 16px;
    //     font-weight: 400;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     height: 60px;

    //     img {
    //         margin-right: 10px;
    //     }

    //     span {
    //         margin-left: 4px;
    //     }
    // }
}
</style>