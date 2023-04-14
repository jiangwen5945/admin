<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增分类</el-button>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="table-content">
      <el-table :data="tableData" stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="分类名称">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleSub(scope.row)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="分类等级"></el-table-column>
        <el-table-column prop="parentId" label="父级分类">
          <template slot-scope="scope">
           {{ scope.row.parentId ? getCategoryName(scope.row.parentId)  : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="productCount" label="商品数量"></el-table-column>
        <el-table-column prop="productUnit" label="商品单位"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="label" label="导航栏">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.navStatus" 
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作"  width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出层 -->
    <el-dialog :title="modalType ? '修改商品分类':'新增商品分类'" :visible.sync="isVisible" :before-close="handleClose" center width="40%" :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
        <!-- 分类名称 -->
        <el-form-item label="分类名称"  prop="name">
          <el-input v-model="form.name"  placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <!-- 分类等级 -->
        <el-form-item label="分类等级"  prop="level">
          <el-select v-model="form.level" placeholder="请选择分类等级"  style="width: 100%;" :disabled='modalType===1'>
            <el-option label="一级分类" value="1"></el-option>
            <el-option label="二级分类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 父级分类 -->
        <el-form-item label="父级分类"  prop="parentId" v-if="form.level !== '1'">
          <el-select 
            v-model="form.parentId" 
            placeholder="请选择父级分类"
            style="width: 100%;" 
            clearable 
            filterable 
            allow-create 
          >
            <el-option :label="item.name" :value="item.id" v-for="item in topCategoryList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品数量 -->
        <el-form-item label="商品数量"  prop="productCount">
          <el-input type="num" v-model.number="form.productCount"  placeholder="请输入分类等级"></el-input>
        </el-form-item>
        <!-- 商品单位 -->
        <el-form-item label="商品单位"  prop="productUnit">
          <el-input type="num" v-model.number="form.productUnit"  placeholder="请输入分类等级"></el-input>
        </el-form-item>
        <!-- 排序权重 -->
        <el-form-item label="排序权重"  prop="sort">
          <el-input type="num" v-model.number="form.sort"  placeholder="请输入分类等级"></el-input>
        </el-form-item>
        <!-- 导航栏显示 -->
        <el-form-item label="导航栏显示"  prop="navStatus">
          <el-switch
            v-model="form.navStatus"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 操作 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { getGoodsCategory, deleteGoodsCategory, createGoodsCategory, updateGoodsCategory } from '../../api'
import { mixins } from "@/mixin";
import rules from '@/utils/rules'
export default {
  name: 'GoodsCategory',
  mixins: [mixins],
  computed:{
    topCategoryList(){
      return this.tableData.filter(e=> e.level == 1 )
    }
  },
  data() {
    return {
      // 表单验证规则
      rules,
      // 分页参数
      queryParam: {
        page: 1,
        limit: 10,
        name: '',
        level: '',
        id:''
      },
      form:{
        id: null,
        parentId: null,
        name: null,
        level: null,
        productCount: null,
        productUnit: null,
        navStatus: null,
        showStatus: null,
        sort: null,
        icon: null,
        keywords: null,
        description: null
      }
    };
  },
  methods: {
    // 基础增删改查
    getDataApi() {
      return getGoodsCategory(this.queryParam)
    },
    deleteApi(id) {
      return deleteGoodsCategory(id)
    },
    createApi(data) {
      return createGoodsCategory(data)
    },
    updateApi(data) {
      return updateGoodsCategory(data)
    },

     // 获取分类名称
    getCategoryName(id){
      const res = this.tableData.find(e=> e.id === id )
      return res && res.name
    },

    // 分类标题点击
    handleSub(row) {
      if(row.level.toString() === '1') {
        this.queryParam.id = row.id
        this.queryParam.level = '2'
        this.getData()
      }else{
        this.$router.push('/GoodsList')
      }
    }
  }
}
</script>
 
<style scoped lang="scss"></style>
 