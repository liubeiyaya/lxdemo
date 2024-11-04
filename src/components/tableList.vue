<template>
  <div class="table-list">
    <p class="data-report">
      <span class="report-text">数据报表</span>
      <span class="download">
        <span>功率因素调整电费=(基本电费+电度电费)*力调系数</span>
        <span class="el-icon-printer"></span>
        <span class="el-icon-download"></span>
      </span>
    </p>
    <el-table :data="currentTableData" border height="280" :summary-method="getSummaries" show-summary ref="table"
      default-expand-all style="width: 100%; margin-top: 10px" :header-cell-style="{ background: '#F5F7FA' }"
      row-key="id">
      <el-table-column prop="node" label="节点名称">
      </el-table-column>
      <el-table-column prop="powerAll" label="总有电工量">
      </el-table-column>
      <el-table-column prop="powerNone" label="总无功电量">
      </el-table-column>
      <el-table-column prop="average" label="平均功率因素">
      </el-table-column>
      <el-table-column prop="assessment" label="功率因素考核标准" width="180px">
      </el-table-column>
      <el-table-column prop="basic" label="(基本电费 +">
      </el-table-column>
      <el-table-column prop="hour" label="电度电费) *">
      </el-table-column>
      <el-table-column prop="coefficient" label="力调系数 =">
        <template scope="scope">
          {{ `${scope.row.coefficient}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="power" label="力调电费">
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>

  </div>
</template>

<script>

export default {
  name: 'tableList',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      currentTableData: []
    }
  },
  props: ['tableDataAll'],
  watch: {
    tableDataAll(newVal) {
      this.tableData = JSON.parse(JSON.stringify(newVal))
      this.getTableData()
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item =>
          Number(item[column.property])
        );

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2)
          if (column.property === 'coefficient') {
            sums[index] += '%'
          }
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    getTableData() {
      this.currentTableData = []
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.currentTableData = this.tableData.slice(startIndex, endIndex);
    },
    handleSizeChange(val) {
      // 前端做分页处理
      this.pageSize = val
      this.getTableData(this.tableData)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData(this.tableData)
    },
    upData() {
      this.pageSize = 10
      this.currentPage = 1
    }
  },
  mounted() {

  }


}
</script>


<style scoped lang="less">
.table-list {
  width: 100%;
  height: 100%;
  background-color: #fff;


  .data-report {
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    .report-text {
      font-size: 14px;
      font-weight: 600;
    }

    .download {
      font-size: 12px;

      span {
        border: 1px solid #ddd;
        padding: 4px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;

        &:nth-of-type(1) {
          font-size: 12px;
          border: 0;
          color: #9e9e9e;
          cursor: default;
        }
      }
    }

  }

  /deep/ .el-table .el-table__cell {
    padding: 6px 0;
    border-right: none
  }

  /deep/ .el-table th.el-table__cell>.cell {
    font-weight: 500;
    color: #000;
  }

  /deep/ .el-pagination {
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }

  /deep/ .el-pagination__jump {
    margin-left: auto;
  }

  /deep/ .el-pagination__sizes {
    margin-right: auto;
  }

  /deep/ .el-pager li.active,
  /deep/ .el-pager li:hover {
    background-color: #00d8c3;
    color: #fff;
    border-radius: 4px;
  }

}
</style>
