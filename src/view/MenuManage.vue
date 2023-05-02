<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增</el-button>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="table-content">
      <el-table :data="tableData" stripe>
        <!-- 复选框 -->
        <el-table-column type="selection" width="55" />
        <!-- ID -->
        <el-table-column prop="id" label="ID"></el-table-column>
        <!-- 名称 -->
        <el-table-column prop="name" label="名称"></el-table-column>
        <!-- 图标 -->
        <el-table-column prop="icon" label="图标">
          <template #default="scope">
            <i :class="'el-icon-' + scope.row.icon" />
          </template>
        </el-table-column>
        <!-- 菜单类型 -->
        <el-table-column prop="level" label="类型">
          <template #default="scope">
            <el-button :type="scope.row.level === 1 ? 'primary' : 'success'" round size="mini">
              {{ scope.row.level === 1 ? "菜单" : "目录" }}</el-button>
          </template>
        </el-table-column>
        <!-- 权限角色 -->
        <el-table-column prop="roles" label="权限角色">
          <template #default="scope">
            <el-button type="text" size="mini" v-for="item in scope.row.roles" :key="item.index">
              {{ item }}
            </el-button>
          </template>
        </el-table-column>
        <!-- 是否开启 -->
        <el-table-column prop="available" label="是否开启">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.available" :active-value="1" :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete({ id: scope.row.id })">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出层 -->
    <el-dialog :title="modalType ? '修改菜单' : '新增菜单'" :visible.sync="isVisible" :before-close="handleClose" center
      width="30%" :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="level">
          <el-select v-model="formatLevel" placeholder="请选择菜单级别" style="width: 100%">
            <el-option label="目录" :value="0" />
            <el-option label="菜单" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model.number="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="form.icon" placeholder="请选择或输入图标名称" clearable filterable allow-create style="width: 100%">
            <el-option v-for="item in iconList" :key="item" :label="item" :value="item">
              <i :class="'el-icon-' + item" /> {{ item }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限角色" prop="roles">
          <el-checkbox-group v-model="form.roles" size="mini">
            <el-checkbox v-for="item in roleList" :label="item.roleName" :key="item.roleId" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.available" :active-value="1" :inactive-value="0">
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
import {
  getMenuList,
  deleteMenu,
  createMenu,
  updateMenu,
  getRolesList,
} from "../api";
import { mixins } from "../mixin";
import rules from "@/utils/rules";
export default {
  name: "MenuManage",
  mixins: [mixins],
  computed: {
    formatLevel: {
      get() {
        if (!this.form.level && this.form.level !== 0) return "";
        return this.form.level === 1 ? "菜单" : "目录";
      },
      set(newValue) {
        this.form.level = newValue === "1" ? 1 : 0;
      },
    },
  },
  data() {
    return {
      iconList: ['user', 'turn-off', 's-check', 's-marketing', 'box', 's-order', 's-grid', 's-claim', 'document', 'document-copy', 'edit-outline', 'files'],
      roleList: [],
      queryParam: {
        page: 1,
        limit: 10,
        name: "",
      },
      form: {
        name: "",
        roles: [],
        icon: "",
        level: "",
        available: false,
      },
      rules: rules,
    };
  },
  mounted() {
    getRolesList().then((res) => (this.roleList = res.list)); // 获取角色列表数据
  },
  methods: {
    getDataApi() {
      return getMenuList(this.queryParam);
    },
    deleteApi(id) {
      return deleteMenu(id);
    },
    createApi(data) {
      return createMenu(data);
    },
    updateApi(data) {
      return updateMenu(data);
    },
  },
};
</script>
 
<style scoped lang="scss"></style>
 