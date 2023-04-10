<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 当前用户信息卡片 -->
        <el-card>
          <div class="user-wrap">
            <div class="user-img">
              <el-image style="width: 150px; height: 150px;border-radius: 50%;"
                :src="require('@/assets/' + userInfo.avatar)"></el-image>
            </div>
            <div class="user-info">
              <p class="name">{{ userInfo.username }}</p>
              <p class="access">{{ userInfo.role }}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间： <span>2022-02-02</span></p>
            <p>上次登录地点： <span>三明</span></p>
          </div>
        </el-card>
        <!-- 数据列表卡片 -->
        <el-card class="data-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="商品"></el-table-column>
            <el-table-column prop="todayBuy" label="今日销量"></el-table-column>
            <el-table-column prop="monthBuy" label="本月销量"></el-table-column>
            <el-table-column prop="totalBuy" label="总销量"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="16">
        <!-- 统计总览 -->
        <div class="count-wrap">
          <div class="card" v-for="item in countData" :key="item.name">
            <i :class="`el-icon-${item.icon}`" :style="{ background: item.color }" class="count-icon"></i>
            <div class="detail">
              <p class="price">{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </div>

        </div>
        <!-- 折线图 -->
        <el-card>
          <div ref="echarts1" style="height:280px"></div>
        </el-card>

        <!-- 柱状图&饼状图 -->
        <div class="graph-wrap">
          <el-card>
            <div ref="echarts2" style="height:260px"></div>
          </el-card>
          <el-card>
            <div ref="echarts3" style="height:260px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import { getData } from '../api'
import * as echarts from 'echarts'
import Cookie from 'js-cookie'
// import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  data() {
    return {
      pieData: [],
      lineData:[],
      barData:[],
      tableData: [],
      countData: []
    }
  },
  mounted() {
    // 获取首页数据
    getData().then(data => {
      const { pieData, lineData, barData, tableData, countData } = data

      this.pieData = pieData
      this.lineData = lineData
      this.barData = barData
      this.tableData = tableData
      this.countData = countData

      /** 折线图 */
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 处理图例的种类
      const legendStyle = Object.keys(lineData.data[0])
      // 处理折线图类别的数据
      const seriesData = []
      legendStyle.forEach(e => {
        seriesData.push({
          name: e,
          data: lineData.data.map(item => item[e]),
          type: 'line'
        })
      })
      echarts1.setOption({
        legend: { data: legendStyle },
        xAxis: {
          data: lineData.date
        },
        yAxis: {},
        tooltip: {
          trigger: 'axis'
        },
        series: seriesData
      });

      /** 柱状图 */
      const echarts2 = echarts.init(this.$refs.echarts2);
      // 处理图例的种类
      echarts2.setOption({
        xAxis: {
          data: barData.map(item => item.date)
        },
        yAxis: {},
        legend: { data: ['新增用户', '活跃用户'] },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            name: '新增用户',
            data: barData.map(item => item.new),
            type: 'bar'
          }, {
            name: '活跃用户',
            data: barData.map(item => item.active),
            type: 'bar'
          }
        ]
      })

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      echarts3.setOption({
        series: [
          {
            type: 'pie',
            data: pieData,
            radius: '60%'
          }
        ]
      })
    });
  },
  computed: {
    userInfo() {
      return this.$store.state.tab.userInfo || JSON.parse(Cookie.get('userInfo'))
    }
  },
  methods: {

  }
}
</script>
  
<style scoped lang="less">
.user-wrap {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 20px;

  .user-img {
    margin-right: 40px;
  }

  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #000;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.data-card {
  margin-top: 20px;
  min-height: 490px;
}

// 统计总览
.count-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card{
    background: #fff;
    display: flex;
    flex: 0 0 32%;
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .count-icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 14px;

    .price {
      font-size: 24px;
      margin-top: 10px;
    }

    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}

.graph-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    width: 49%;
    height: 260px;
  }
}
</style>
  