<template>
  <div class="echarts-power">
    <p class="chang-text">
      <span class="power-text">力调电费</span>
      <span class="download">
        <span>功率因数调整电费表</span>
        <span class="el-icon-download"></span>
      </span>

    </p>
    <div>

      <div id="doubleEcharts" ref="doubleEcharts"
        style="width: 960px; height: 260px; position: absolute; top: 20px; right: -26px">
      </div>
    </div>

  </div>
</template>

<script>
import { ECHARTSCOLOR, ECHARTSBARCOLOR, ECHARTSBARWIDTH } from './mock.js'
export default {
  name: 'echartsPower',
  data() {
    return {
      doubleEcharts: null,
      doubleOpation: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['无功罚款', '平均功率因素'],
          padding: [32, 0, 0, 0],
        },
        xAxis: [
          {
            type: 'category',
            data: ['1#配电房', '2#配电房', '3#配电房', '4#配电房', '5#配电房', '6#配电房'],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#ddd',
                width: 1
              }
            },
            axisLabel: {
              textStyle: {
                color: '#535353',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd',
                width: 1
              },

            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '无功罚款',
            min: 0,
            max: 2.5,
            interval: 0.5,
            axisLabel: {
              formatter: '{value} 万',
              textStyle: {
                color: '#535353',
              },
            },
            nameTextStyle: {
              color: '#535353',

            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#ddd',
                width: 1
              }
            }
          },
          {
            type: 'value',
            name: '平均功率因素',
            min: 0,
            max: 1,
            inverse: true,
            nameLocation: 'start',
            nameTextStyle: {
              color: '#535353',

            },
            axisLabel: {
              textStyle: {
                color: '#535353',
              },
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#ddd',
                width: 1
              }
            },
          }
        ],
        series: [
          {
            z: 1,
            name: '无功罚款',
            type: "bar",
            barWidth: ECHARTSBARWIDTH,
            barGap: "40%",
            data: [],
            itemStyle: {
              normal: {
                color: ECHARTSCOLOR
              },
            },
          },
          {
            z: 2,
            name: '无功罚款',
            type: "pictorialBar",
            data: [],
            symbol: "diamond",
            symbolOffset: ["0%", "50%"],
            symbolSize: [ECHARTSBARWIDTH, 10],
            itemStyle: {
              normal: {
                color: ECHARTSCOLOR
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            z: 3,
            name: '无功罚款',
            type: "pictorialBar",
            symbolPosition: "end",
            data: [],
            symbol: "diamond",
            symbolOffset: ["0%", "-50%"],
            symbolSize: [ECHARTSBARWIDTH, 10],
            itemStyle: {
              normal: {
                borderWidth: 2,
                color: ECHARTSBARCOLOR[2]
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            name: '平均功率因素',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },
            itemStyle: {
              normal: {
                color: '#8cd5c2',
                lineStyle: {
                  color: '#19dbc9'
                }
              }
            },
            data: []
          }
        ]
      }

    }
  },
  props: ['echartsData'],
  watch: {
    echartsData() {
      this.changeEcharts()
    }
  },
  methods: {
    getPressure() {
      this.doubleEcharts = this.$echarts.init(document.getElementById('doubleEcharts'));
      this.doubleEcharts.setOption(this.doubleOpation);
    },
    changeEcharts() {
      this.doubleOpation = this.doubleEcharts.getOption();
      this.doubleOpation.series[0].data = this.echartsData.barData;
      this.doubleOpation.series[1].data = this.echartsData.barData;
      this.doubleOpation.series[2].data = this.echartsData.barData;
      this.doubleOpation.series[3].data = this.echartsData.lineData;
      this.doubleEcharts.setOption(this.doubleOpation);
    }

  },
  mounted() {
    this.getPressure()
  }

}
</script>


<style scoped lang="less">
.echarts-power {
  width: 100%;
  height: 100%;
  display: flex;


  .chang-text {
    width: calc(100% - 40px);
    padding: 0 10px;
    position: absolute;
    top: 20px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    .power-text {
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

        &:nth-of-type(1) {
          font-size: 12px;
          border: 0;
          color: #00d8c3;
        }

        &:nth-of-type(2) {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
