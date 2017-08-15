<template>
  <el-row :gutter="5">
    <el-col :span="18">
      <div class='chart'></div>
    </el-col>
    <el-col :span="6">
      <el-tabs type="type">
        <el-tab-pane label="数据管理">

          <div style="height: 800px">
          <HotTable :root="root" :settings="hotSettings"></HotTable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="样式管理">

          <div id="chart-title">
            <el-checkbox v-model="chartOptions.chartTitle.visible" @change="repaint">显示标题</el-checkbox>
            <el-input v-model="chartOptions.chartTitle.text" placeholder="请输入标题" @change="repaint"></el-input>
            <el-radio-group v-model="chartOptions.chartTitle.textAlign" @change="repaint">
              <el-radio-button label="left"></el-radio-button>
              <el-radio-button label="center"></el-radio-button>
              <el-radio-button label="right"></el-radio-button>
            </el-radio-group>
          </div>

          <div id="chart-option">
            <ul>
              <li v-on:click="setChartType('bar')">bar</li>
              <li v-on:click="setChartType('line')">line</li>
              <li v-on:click="setChartType('pie')">pie</li>
            </ul>
          </div>

        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import HotTable from 'vue-handsontable-official'
  import DataHandle from '@/services/dataHandle/dataHandle.js'
  import 'echarts-gl'

  function drawChart (params) {
    let chartDom = params.chartDom
    let chartInstance = params.chartInstance
    let remoteData = params.remoteData
    let chartOptions = params.chartOptions
    let dataHandle = new DataHandle(remoteData)
    let data = dataHandle.dataTrans()
    if (!chartInstance) {
      chartInstance = echarts.init(chartDom)
    }
    chartInstance.setOption({
      title: {
        text: chartOptions.chartTitle.text,
        x: chartOptions.chartTitle.textAlign,
        show: chartOptions.chartTitle.visible
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
//        legend: {
//          data: ['2011年', '2012年']
//        },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '40',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      xAxis: {
        type: 'category',
        data: data.dimensionData
      },
      series: [
        {
//            name: '2011年',
          type: chartOptions.chartType,
          data: data.measureData
        }
      ]
    })
    return chartInstance
  }

  function updateData (params) {
    let chartInstance = params.chartInstance
    let changes = params.changes
    let chartRawData = params.chartRawData
    let chartOptions = params.chartOptions
    chartRawData.data[changes[0][0]][changes[0][1]] = changes[0][3]
    drawChart({
      chartInstance: chartInstance,
      remoteData: chartRawData,
      chartOptions: chartOptions
    })
  }

  export default {
    name: 'chart',
    components: {
      HotTable
    },
    data () {
      return {
        test: 'test - value',
        rawData: {},
        root: 'test-hot',
        chartInstance: null,
        chartOptions: {
          chartType: 'bar',
          chartTitle: {
            visible: true,
            text: '图标名称',
            textAlign: 'center'
          }
        },
        hotSettings: {
          data: [],
          colHeaders: true,
          contextMenu: true,
          beforeChange: (changes, source) => {
            if (changes[0][2] !== changes[0][3]) {
              updateData({
                chartInstance: this.chartInstance,
                changes: changes,
                chartRawData: this.rawData,
                chartOptions: this.chartOptions
              })
            }
            console.log(changes, source)
          }
        }
      }
    },

    created () {
//      this.$http.get('/static/execute.json').then(response => {
//        vm.rawData = response.data
//        vm.hotSettings.data = response.data.data
//      })
    },

    mounted () {
      let vm = this
      vm.$http.get('/static/execute.json').then((response) => {
        vm.rawData = response.data
        vm.hotSettings.data = response.data.data
        return response.data
      }).then((data) => {
        vm.chartInstance = drawChart({
          remoteData: data,
          chartDom: vm.$el.querySelector('.chart'),
          chartOptions: this.chartOptions
        })
      })
    },

    methods: {
      setChartType (chartType) {
        this.chartOptions.chartType = chartType
        drawChart({
          chartInstance: this.chartInstance,
          remoteData: this.rawData,
          chartOptions: this.chartOptions
        })
      },

      repaint () {
        drawChart({
          chartInstance: this.chartInstance,
          remoteData: this.rawData,
          chartOptions: this.chartOptions
        })
      }
    }

  }
</script>

<style>
  .chart{
    width: 100%;
    height: 700px;
  }
</style>
