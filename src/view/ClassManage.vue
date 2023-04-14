<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增部门</el-button>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="table-content">
      <el-table 
        :data="tableData" 
        stripe 
        :default-sort="{prop:'classId', order:'descending'}"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="classId" label="ID"></el-table-column>
        <el-table-column prop="className" label="部门名称" ></el-table-column>
        <el-table-column prop="level" label="部门级别" >
          <template #default="scope">
            {{ scope.row.level === '1' ? '一级' : '二级'}}
          </template>
        </el-table-column>
        <el-table-column prop="employeesCount" label="人员数量">
          <template slot-scope="scope">
            <el-link :underline="false"> 
              {{ scope.row.employeesCount }} 
            </el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="authority" label="拥有权限" width="180"></el-table-column> -->
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete({ classId: scope.row.classId})">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出层 -->
    <el-dialog :title="modalType ? '修改部门':'新增部门'" :visible.sync="isVisible" :before-close="handleClose"  center width="30%"  :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
        <el-form-item label="部门名称"  prop="className">
          <el-input v-model="form.className" autocomplete="off" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门级别" prop="level">
          <el-select v-model="form.level" placeholder="请选择部门级别"  style="width: 100%;">
            <el-option label="一级" value="1"/>
            <el-option label="二级" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="人员数量"  prop="employeesCount">
          <el-input v-model.number="form.employeesCount" autocomplete="off" placeholder="请输入人员数量"></el-input>
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
import { getClassList, deleteClass, createClass, updateClass } from '../api'
import { mixins } from "../mixin";
import rules from '@/utils/rules';
export default {
  name: 'ClassManage',
  mixins:[mixins],
  data() {
    return {
      rules,
      tableData: [],
      count: null, // 总条数
      isVisible: false,
      modalType: 0,
      // 分页参数
      queryParam: {
        page: 1,
        limit: 10
      },
      form:{
        classId:'',
        className:'',
        employeesCount: '',
        level: ''
      },
      initForm: null
    };
  },
  methods: {
    getDataApi() {
      return getClassList(this.queryParam)
    },
    deleteApi (id) {
      return deleteClass(id)
    },
    createApi (data) {
      return createClass(data)
    },
    updateApi (data) {
      return updateClass(data)
    }
  }
}
</script>
 
<style scoped lang="scss"></style>
 