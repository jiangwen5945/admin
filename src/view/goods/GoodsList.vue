<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增</el-button>
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
        <!-- 商品ID -->
        <el-table-column prop="id" label="商品编号"></el-table-column>
        <!-- 商品名称 -->
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <!-- 商品图片 -->
        <el-table-column prop="fileList" label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.fileList[0] && scope.row.fileList[0].url" style="width:60px">
          </template>
        </el-table-column>
        <!-- 价格 -->
        <el-table-column prop="price" label="价格"></el-table-column>
        <!-- 商品分类 -->
        <el-table-column prop="category" label="商品分类">
          <template slot-scope="scope">
            <div v-for="item in scope.row.category" :key="item.id">
              <el-button type="text" size="mini">
                {{ getCategoryName(item) }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <!-- 标签 -->
        <el-table-column prop="label" label="标签">
          <template slot-scope="scope">
            <div v-for="item in scope.row.label" :key="item.index">
              <el-button type="text" size="mini">
                {{ item }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <!-- 排序 -->
        <el-table-column prop="sort" label="排序"></el-table-column>
        <!-- 库存 -->
        <el-table-column prop="stock" label="库存"></el-table-column>
        <!-- 销量 -->
        <el-table-column prop="sales" label="销量"></el-table-column>
        <!-- 是否上架 -->
        <el-table-column prop="available" label="是否上架">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.available"></el-switch>
          </template>
        </el-table-column>
        <!-- 审核状态 -->
        <el-table-column prop="verify" label="审核状态">
          <template slot-scope="scope">
            <p>{{ scope.row.verify === 1 ? '审核通过' : '未审核' }}</p>
            <el-link type="primary">审核详情</el-link>
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
    <el-dialog title="新增商品" :visible.sync="isVisible" :before-close="handleClose" center width="40%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <!-- 商品价格 -->
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>

        <!-- 商品分类 -->
        <el-form-item label="商品分类" prop="category">
          <el-cascader v-model="form.category" style="width: 100%;" :props="props" clearable>
          </el-cascader>
        </el-form-item>

        <!-- 商品排序 -->
        <el-form-item label="商品排序" prop="sort">
          <el-input type="num" v-model="form.sort" placeholder="请输入排序大小"></el-input>
        </el-form-item>

        <!-- 商品SKU -->
        <el-form-item label="商品sku" prop="sku">
          <el-input type="num" v-model="form.sku" placeholder="请输入商品SKU"></el-input>
        </el-form-item>

        <!-- 商品标签 -->
        <el-form-item label="商品标签" prop="label">
          <el-checkbox-group v-model="form.label" size="small">
            <el-checkbox label="新品" border></el-checkbox>
            <el-checkbox label="推荐" border></el-checkbox>
            <el-checkbox label="热销" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 商品库存 -->
        <el-form-item label="商品库存" prop="stock">
          <el-input v-model="form.stock" placeholder="请输入商品库存"></el-input>
        </el-form-item>

        <!-- 商品销量 -->
        <el-form-item label="商品销量" prop="sales">
          <el-input type="num" v-model="form.sales" placeholder="请输入商品销量"></el-input>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片" prop="fileList">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
            :file-list="form.fileList" :on-remove="handleRemove" :on-success="handleUploadSuccess"
            :before-upload="handleBeforUpload" ref="uploadRef">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 是否上架 -->
        <el-form-item label="是否上架">
          <el-switch v-model="form.available" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit" :disabled="!isComplete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { getGoodsList, deleteGoods, createGoods, updateGoods, getGoodsCategory } from '../../api'
import { mixins } from "@/mixin";
import rules from '../../utils/rules'
export default {
  name: 'GoodsList',
  mixins: [mixins],
  data() {
    return {
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          setTimeout(() => {
            // 第一级
            if (node.level == 0) {
              getGoodsCategory({ level: '1' }).then(({ list }) => {
                const nodes = list.map(item => ({
                  value: item.id,
                  label: item.name,
                  leaf: level >= 1
                }))
                resolve(nodes);
              })
            }
            // 第二級
            if (node.level == 1) {
              getGoodsCategory({ level: '2' }).then(({ list }) => {
                const nodes = list.map(item => ({
                  value: item.id,
                  label: item.name,
                  leaf: level >= 1
                }))
                resolve(nodes);
              })
            }
          }, 100)
        }
      },
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
        name: ''
      },
      rules: rules,
      categoryList: [],
      isComplete: true // 文件上传是否完成
    };
  },
  mounted() {
    getGoodsCategory().then(res => this.categoryList = res.list) // 获取商品分类列表数据
  },
  methods: {
    // 基础增删改查
    getDataApi() {
      return getGoodsList(this.queryParam)
    },
    deleteApi(id) {
      return deleteGoods(id)
    },
    createApi(data) {
      return createGoods(data)
    },
    updateApi(data) {
      return updateGoods(data)
    },

    // 获取分类名称
    getCategoryName(id) {
      const res = this.categoryList.find(e => e.id === id)
      return res && res.name
    },

    // 上传文件之前
    handleBeforUpload(file) {
      console.log('上传文件之前', file);
      this.isComplete = false
    },

    // 文件上传成功时
    handleUploadSuccess(res, file, fileList) {
      this.isComplete = true
      // this.form.fileList.push(file) // 添加到上传的文件列表
      this.form.fileList = JSON.parse(JSON.stringify(fileList))
      this.$refs.uploadRef.clearFiles() // 清空已上传的文件列表
    },

    // 文件列表移除文件时
    handleRemove(file, fileList) {
      console.log('文件列表移除文件时', file, fileList);
      this.form.fileList = JSON.parse(JSON.stringify(fileList))
    },

    // 分页操作
    async handleCurrentChange(currentPageNum) {
      this.queryParam.page = currentPageNum // 设置请求列表的页数为当前页面数
      this.getData()
    },

    // 查询
    handleQuery() {
      this.getData() //请求列表数据
    }
  }
}
</script>
 
<style scoped lang="scss"></style>
 