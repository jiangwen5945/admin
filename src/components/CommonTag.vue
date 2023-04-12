<template>
    <div class="tag-container">
        <el-tag 
            size="small" 
            v-for="(item, index) in tags" 
            :key="item.label" 
            :type="item.type"
            :effect="$route.name === item.name ? 'dark' : 'plain'" 
            :closable="item.name !== 'home'"
            @close="handleClose(item, index)" 
            @click="changeMenu(item)"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return { }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.navList
        })
    },
    methods: {
        ...mapMutations(['closeTag']),
        // 点击tag跳转的功能
        changeMenu(item) {
            // console.log(item)
            this.$router.push({ name: item.name })
        },
        // 点击tag删除的功能
        handleClose(item, index) {
            // 触发store删除标签方法
            this.closeTag(item)
            // 如果标签不是当前页面，直接关闭；
            if (this.$route.name != item.name) return
            // 如果标签是当前页面,且在最后一个时跳转上一个路由，否则跳转下一个路由
            if (this.tags.length === index) {
                console.log('表示的是删除的最后一项')
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    },
    mounted() {
        // console.log(this.$route)
    }
}
</script>
<style lang="scss" scoped>
.tag-container {
    margin-top: -10px;
    margin-bottom: 10px;
    .el-tag {
        margin-right: 14px;
        cursor: pointer;
    }
}
</style>