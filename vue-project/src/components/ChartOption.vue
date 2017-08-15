<template>
  <el-tabs type="type">
    <el-tab-pane label="数据管理">

      <HotTable :root="root" :settings="hotSettings"></HotTable>

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
</template>

<script>
  import HotTable from 'vue-handsontable-official'

  function updateData (params) {
    let changes = params.changes
    let chartRawData = params.chartRawData
//    let chartOptions = params.chartOptions
    chartRawData.data[changes[0][0]][changes[0][1]] = changes[0][3]
  }

  export default {
    name: 'chartOption',
    components: {
      HotTable
    },
    data () {
      return {
        test: 'test - value',
        rawData: {},
        root: 'chart-data-hot',
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

    mounted () {
    },

    methods: {
      setChartType (chartType) {
        this.chartOptions.chartType = chartType
      },

      repaint () {
      }
    }

  }
</script>

<style>
</style>
