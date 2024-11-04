<template>
  <div class="power-factor">
    <div class="check-box">
      <div class="input">
        <el-input v-model="inputValue" placeholder="请输入搜索内容" prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="tree">
        <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[0]"
          :render-content="renderContent" @check="getCheckChange">
        </el-tree>
      </div>

    </div>
    <div class="power-data">
      <echartsPower class="echart-content" :echartsData="echartsData"></echartsPower>
      <tableList class="table" :tableDataAll="tableDataAll" ref="tableList"></tableList>
    </div>
  </div>
</template>

<script>
import { TREEDATA, TABLELIST } from './mock.js'
import echartsPower from './echartsPower.vue'
import tableList from './tableList.vue'

export default {
  name: 'powerFactor',
  data() {
    return {
      inputValue: '',
      treeData: TREEDATA,
      echartsData: {},
      tableList: TABLELIST,
      tableDataAll: []

    }
  },
  components: {
    echartsPower: echartsPower,
    tableList: tableList
  },
  props: {
    msg: String
  },
  methods: {
    renderContent(h, { node, data }) {
      return data.$treeNodeId === 1 ? (
        <span style="color: #00d8c3">
          <i class="el-icon-location-outline right-content"></i>
          {node.label}
        </span>
      ) : (
        <span>
          <i class="el-icon-price-tag right-content"></i>
          {node.label}
        </span>
      )
    },
    getRandomIntIn(min, max) {
      // 获取随机数
      return (Math.random() * (max - min + 1) + min).toFixed(2);
    },
    fetchEchartData() {
      // 模拟网络请求 图表
      const powerRequest = new Promise((resolve, reject) => {
        const lineData = new Array(6).fill(null).map(() => Number((Math.random() * 2.5).toFixed(2)))
        const barData = new Array(6).fill(null).map(() => Number((Math.random() * 1).toFixed(2)))
        if (lineData.length && barData.length) {
          resolve({
            lineData: lineData,
            barData: barData
          });
        } else {
          reject('Error fetching data.');
        }
      });

      powerRequest.then(response => {
        this.echartsData = response
      })
        .catch(error => {
          console.error(error);
        });
    },
    fetchTabletData() {
      // 查看分页功能，修改getTreeDat入参 
      let netWorkData = this.getTreeData(1)
      const powerTableRequest = new Promise((resolve, reject) => {
        netWorkData.forEach(item => {
          this.changeTreeData(item)
          item.children.forEach(itemChildren => {
            this.changeTreeData(itemChildren)
          })
        });

        if (netWorkData) {
          resolve(netWorkData);
        } else {
          reject('Error fetching data.');
        }
      });

      powerTableRequest.then(response => {
        this.tableDataAll = response
      })
        .catch(error => {
          console.error(error);
        });
    },
    getCheckChange() {
      // 只改变值，不考虑传值问题， 可获取到所有的选中值
      this.fetchEchartData()
      this.$refs.tableList.upData()
      this.fetchTabletData(1)
    },
    getTreeData(length) {
      let table
      let childrenTable
      let data = []
      for (let i = 1; i <= length; i++) {
        // 父节点添加数据
        table = JSON.parse(JSON.stringify(this.tableList))
        table.id = i
        data.push(table)
        data[i - 1].children = []
        // 父元素下面8个
        for (let j = 1; j <= 8; j++) {
          childrenTable = JSON.parse(JSON.stringify(this.tableList))
          childrenTable.id = Number(`${i}${j}`)
          childrenTable.node = `${j}#配电房`
          data[i - 1].children.push(childrenTable)
        }
      }
      return data
    },
    changeTreeData(item) {
      // 表格的所有内容设置的随机数
      item.powerAll = this.getRandomIntIn(30, 100)
      item.powerNone = this.getRandomIntIn(30, 100)
      item.average = this.getRandomIntIn(0, 0.9)
      item.assessment = this.getRandomIntIn(0, 0.9)
      item.basic = this.getRandomIntIn(30, 100)
      item.hour = this.getRandomIntIn(30, 100)
      item.coefficient = this.getRandomIntIn(0, 0.9)
      item.power = this.getRandomIntIn(100, 100)
    }
  },
  mounted() {
    this.fetchEchartData()
    this.fetchTabletData()
  }
}
</script>


<style scoped lang="less">
.power-factor {
  width: 100%;
  height: calc(100% - 50px - 40px);
  display: flex;

  .check-box {
    width: 240px;
    border-radius: 0 10px 0 0;
    background-color: #fff;

    .input {
      width: 90%;
      margin: 20px auto;

      /deep/ .el-input--prefix .el-input__inner {
        padding-left: 6px;

      }

      /deep/ .el-input__prefix {
        right: 5px;
        left: unset;
      }

    }

    .tree {

      /deep/ .el-tree-node__expand-icon.expanded,
      /deep/ .el-tree-node__content>.el-tree-node__expand-icon {
        position: absolute;
        right: 5%;
        color: #00081a;
      }

      /deep/ .el-tree-node__content>label.el-checkbox {
        position: absolute;
        right: 14%;
      }

      /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
      /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #00d8c3;
        border-color: #00d8c3;
      }


      /deep/ .right-content {
        display: inline-block;
        margin: 0 8px 0 24px;
      }

    }
  }

  .power-data {
    width: calc(100% - 240px - 40px);
    padding: 0 20px;
    height: 100%;
    position: relative;
    overflow: hidden;

    .echart-content {
      width: 100%;
      height: 240px;
      background-color: #fff;
      border-radius: 4px;

    }

    .table {
      width: 100%;
      margin-top: 10px;
      border-radius: 4px;
      height: calc(100% - 240px - 20px);
      padding: 20px 10px;
      box-sizing: border-box;
    }
  }

}
</style>
