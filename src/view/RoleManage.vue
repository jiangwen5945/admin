<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增角色</el-button>
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="table-content">
      <el-table :data="tableData" stripe>
        <!-- 复选框 -->
        <el-table-column type="selection" width="55" />
        <!-- ID -->
        <el-table-column prop="roleId" label="角色ID"></el-table-column>
        <!-- 名称 -->
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <!-- 是否开启 -->
        <el-table-column prop="available" label="是否开启">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.available"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑权限</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出层 -->
    <el-dialog title="新增角色" :visible.sync="isVisible" :before-close="handleClose" center width="30%">
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.number="form.roleName" autocomplete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="authority">
          <el-tree 
            ref="refTree"
            :data="authorityList" 
            show-checkbox
            node-key="roleId"
            :default-checked-keys="this.form.authority"
            :default-expanded-keys="this.form.authority"
            @check-change="handleCheckChange"
            :props="{
              children: 'roleList',
              label: 'name'
            }"
          />
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch
            v-model="form.available"
            :active-value="1"
            :inactive-value="0"
          >
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
import { getRolesList, deleteRole, createRole, updateRole, getAuthorityList } from '../api'
import { mixins } from "../mixin";
import rules from '@/utils/rules';
export default {
  name: 'RoleManage',
  mixins:[mixins],
  data() {
    return {
      rules,
      authorityList:[], // 树形控件权限列表
      form: {
        roleId: null,
        roleName: null,
        authority: null,
        available: false
      },
    };
  },
  mounted() {
    getAuthorityList().then(res => this.authorityList =  res.list) // 获取权限列表数据
  },
  methods: {
    getDataApi() {
      return getRolesList(this.queryParam)
    },
    deleteApi (id) {
      return deleteRole(id)
    },
    createApi (data) {
      return createRole(data)
    },
    updateApi (data) {
      return updateRole(data)
    },

     // 节点选中状态发生变化时的回调
     handleCheckChange() {
      this.form.authority = this.$refs.refTree.getCheckedKeys()
    }
  }
}
</script>
 
<style scoped lang="scss"></style>
 