<template>
  <div class="page">
    <!-- 头部 -->
    <div class="table-header">
      <div class="left">
        <el-button type="primary" size="medium" @click="handleAdd">+新增订单</el-button>
      </div>
      <div class="right">
        <el-input placeholder="请输入订单编号" v-model="queryParam.id"></el-input>
        <el-button type="primary" size="medium" @click="handleQuery" style="margin-left: 10px;">查询</el-button>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="table-content">
      <el-table :data="tableData" stripe>
        <!-- 勾选 -->
        <el-table-column type="selection" width="55" />

        <!-- 订单编号 -->
        <el-table-column prop="id" label="订单编号" fixed width="170"></el-table-column>

        <!-- 创建时间 -->
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>

        <!-- 订单状态 -->
        <el-table-column prop="orderState" label="订单状态">
          <template #default="scope">
            <el-button type="text" @click="handleOrderState(scope.row)">
              {{ scope.row.orderState === 0 ? '待付款' : '' }}
              {{ scope.row.orderState === 1 ? '待发货' : '' }}
              {{ scope.row.orderState === 2 ? '待签收' : '' }}
              {{ scope.row.orderState === 3 ? '待评价' : '' }}
              {{ scope.row.orderState === 4 ? '已完成' : '' }}
            </el-button>
          </template>
        </el-table-column>
        <!-- 支付信息 -->
        <el-table-column label="支付信息" align="center">
          <el-table-column prop="payMoney" label="支付金额"></el-table-column>
          <el-table-column prop="payType" label="支付类型">
            <template #default="scope">
              {{ scope.row.payType === 1 ? '支付宝' : '' }}
              {{ scope.row.payType === 2 ? '微信' : '' }}
              {{ scope.row.payType === 3 ? '银联' : '' }}
              {{ scope.row.payType === 4 ? '货到付款' : '' }}
            </template>
          </el-table-column>
        </el-table-column>

        <!-- 配送信息 -->
        <el-table-column label="配送信息" align="center">
          <el-table-column prop="receiverContact" label="收件人姓名"></el-table-column>
          <el-table-column prop="receiverMobile" label="收件人电话"></el-table-column>
          <el-table-column prop="receiverAddress" label="收件人地址"></el-table-column>
        </el-table-column>

        <!-- <el-table-column prop="skus" label="订单商品" ></el-table-column> -->





        <!-- <el-table-column prop="authority" label="拥有权限" width="180"></el-table-column> -->
        <!-- 操作 -->
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete({ classId: scope.row.classId })">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 表单弹出层 -->
    <el-dialog title="新增部门" :visible.sync="isVisible" :before-close="handleClose" center width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门名称" prop="className">
          <el-input v-model="form.className" autocomplete="off" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门级别" prop="level">
          <el-select v-model="formatLevel" placeholder="请选择部门级别" style="width: 100%;">
            <el-option label="一级" value="1" />
            <el-option label="二级" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="人员数量" prop="employeesCount">
          <el-input v-model.number="form.employeesCount" autocomplete="off" placeholder="请输入人员数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 订单状态弹出层 -->
    <el-dialog title="订单状态" :visible="isVisible2" :before-close="handleClose2" center>
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :type="activity.type"
          :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
 
<script>
import { getOrderList, deleteOrder, createOrder, updateOrder } from '../api'
import { mixins } from "../mixin";
export default {
  name: 'OrderManage',
  mixins: [mixins],
  computed: {
    formatLevel: {
      get() {
        if (!this.form.level) return ''
        return this.form.level === 1 ? '一级' : '二级'
      },
      set(newValue) {
        this.form.level = newValue === '1' ? 1 : 2
      }
    }
  },
  mounted() {
    this.initActivities = JSON.parse(JSON.stringify(this.activities))
  },
  data() {
    return {
      isVisible2: false, // 订单状态弹出层
      // 分页参数
      queryParam: {
        page: 1,
        limit: 10,
        id: ''
      },
      form: {
        id: '',
        orderState: '',
        postFee:'',
        payMoney:'',
        receiverContact:'',
        receiverMobile:'',
        receiverAddress:'',
        skus:'',
      },
      activities: [
        { content: '待付款' },
        { content: '待发货' },
        { content: '待签收' },
        { content: '待评价' },
        { content: '待完成' }
      ],
      initActivities: null
    };
  },
  methods: {
    getDataApi() {
      return getOrderList(this.queryParam)
    },
    deleteApi(id) {
      return deleteOrder(id)
    },
    createApi(data) {
      return createOrder(data)
    },
    updateApi(data) {
      return updateOrder(data)
    },
    // 查看订单状态详情
    handleOrderState(row) {
      const { orderState, createTime, payTime, consignTime, evaluationTime, endTime } = row
      const contentArr = ['已付款', '已发货', '已签收', '已评价', '订单完成']
      const timesArr = [createTime, payTime, consignTime, evaluationTime, endTime]
      for (let i = 0; i < orderState + 1; i++) {
        this.activities.splice(i, 1, {
          content: contentArr[i],
          timestamp: timesArr[i],
          type: 'success'
        })
      }
      this.isVisible2 = true
    },
    handleClose2() {
      this.activities = [...this.initActivities]
      this.isVisible2 = false
    },
    handleQuery(){
      this.getData() //请求列表数据
    }
  }
}
</script>
 
<style scoped lang="scss"></style>
 