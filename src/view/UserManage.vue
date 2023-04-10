<template>
  <div class="page">
    <!-- 表格头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增</el-button>
      </div>
      <div class="right">
        <el-input placeholder="请输入用户名称" v-model="queryParam.name"></el-input>
        <el-button type="primary" size="medium" @click="handleQuery" style="margin-left: 10px;">查询</el-button>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="table-content">
      <!-- 数据表格 -->
      <el-table :data="tableData" stripe>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="roles" label="角色" width="180">
          <template #default="scope">
            <el-button type="text" size="mini" v-for="item in scope.row.roles" :key="item.index">
              {{ item }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
          <template slot-scope="scope">
            <span>
              {{ scope.row.sex == 1 ? "男" : "女" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="180">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" :total="count" class="pagination"
        @current-change="handleCurrentChange" :hide-on-single-page="true">
      </el-pagination>
    </div>

    <!-- 弹出层 -->
    <el-dialog title="新增用户" :visible="isVisible" :before-close="handleClose" center>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="name">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox :label="item.roleName" v-for="item in roleList" :key="item.roleId"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%;">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-DD" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
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
import { getUser, addUser, editUser, delUser, getRolesList } from '../api'
import { mixins } from "../mixin";
export default {
  name: 'UserManage',
  mixins:[mixins],
  data() {
    return {
      roleList:[],
      form: {
        name: '',
        nickName:'',
        age: '',
        sex: '',
        birth: '',
        addr: '',
        roles:[]
      },
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
      },
      // 分页参数
      queryParam: {
        page: 1,
        limit: 10,
        name: ''
      }
    };
  },
  mounted() {
    getRolesList().then(res => this.roleList =  res.list) // 获取角色列表数据
  },
  methods: {
    getDataApi() {
      return getUser(this.queryParam)
    },
    deleteApi (id) {
      return delUser(id)
    },
    createApi (data) {
      return addUser(data)
    },
    updateApi (data) {
      return editUser(data)
    },
    // 分页操作
    handleCurrentChange(currentPageNum) {
      this.queryParam.page = currentPageNum // 设置请求列表的页数为当前页面数
      this.getData() //请求列表数据
    },
    // 查询数据
    handleQuery() {
      this.getData() //请求列表数据
    }
  }
}
</script>
   
<style scoped lang="less"></style>
   