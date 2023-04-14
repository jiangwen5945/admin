<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="toCreatePage">+新增</el-button>
      </div>
      <div class="right">
        <el-input placeholder="请输入查询内容" v-model="queryParam.name"></el-input>
        <el-button type="primary" size="medium" @click="handleQuery" style="margin-left: 10px;">查询</el-button>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="table-content">
      <el-table :data="tableData" stripe :default-sort="{ prop: 'id', order: 'descending' }">
        <el-table-column type="selection" width="55" />
        <!-- 文章ID -->
        <el-table-column prop="id" label="文章编号"></el-table-column>

        <!-- 文章标题 -->
        <el-table-column prop="title" label="文章标题"></el-table-column>

        <!-- 作者 -->
        <el-table-column prop="author" label="作者"></el-table-column>
       
        <!-- 日期 -->
        <el-table-column prop="createTime" label="日期"></el-table-column>
        <!-- 评分 -->
        <el-table-column prop="score" label="评分">
          <template slot-scope="scope">
           <i class="el-icon-star-on" v-for="item in Number(scope.row.score)" :key="item"></i>
          </template>
        </el-table-column>

        <!-- 状态 -->
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.available"></el-switch>
          </template>
        </el-table-column>
      
        <!-- 操作 -->
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination layout="prev, pager, next" :total="count" class="pagination" @current-change="handleCurrentChange"
      :hide-on-single-page="true">
    </el-pagination>

    <!-- 弹出层 -->
    <el-dialog :title="modalType ? '修改文章':'新增文章'" :visible.sync="isVisible" :before-close="handleClose" center width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- 文章名称 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>

        <!-- 作者 -->
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入文章作者"></el-input>
        </el-form-item>

        <!-- 评分 -->
        <el-form-item label="评分" prop="score">
          <el-select v-model="form.score" placeholder="请选择文章评分"  style="width: 100%;">
            <el-option label="★" value="1"></el-option>
            <el-option label="★★" value="2"></el-option>
            <el-option label="★★★" value="3"></el-option>
            <el-option label="★★★★" value="4"></el-option>
            <el-option label="★★★★★" value="5"></el-option>
          </el-select>
        </el-form-item>


        <!-- 状态 -->
        <el-form-item label="是否上架" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { getArticleList, deleteArticle, createArticle, updateArticle } from '../../api'
import { mixins } from "@/mixin";
import rules from '@/utils/rules';
export default {
  name: 'ArticleList',
  mixins: [mixins],
  data() {
    return {
      rules,
      form: {
        id: '',
        fileList: [], // 上传完成文件地址数组（编辑回显时需要）
        category: [],
        title: '',
        price: '',
        label: [],
        sort: '',
        sku: '',
        stock: '',
        sales: '',
        verify: '',
        available: ''
      },
      // 查询参数
      queryParam: {
        page: 1,
        limit: 10,
        title: ''
      }
    };
  },
  methods: {
    // 基础增删改查
    getDataApi() {
      console.log('基础增删改查');
      return getArticleList(this.queryParam)
    },
    deleteApi(id) {
      return deleteArticle(id)
    },
    createApi(data) {
      return createArticle(data)
    },
    updateApi(data) {
      return updateArticle(data)
    },

    // 分页操作
    async handleCurrentChange(currentPageNum) {
      this.queryParam.page = currentPageNum // 设置请求列表的页数为当前页面数
      this.getData()
    },

    // 查询
    handleQuery() {
      this.getData() //请求列表数据
    },
    toCreatePage(){
      this.$router.push({ path: 'CreateArticle'})
      this.$store.commit('updateNavList', {
        path: '/CreateArticle',
        name: 'CreateArticle',
        label: '创建文章',
        icon: 'edit-outline',
        url: 'article/CreateArticle.vue'
      })
    }
  }
}
</script>
 
<style scoped lang="scss"></style>
 