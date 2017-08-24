<template>
  <el-tabs type="type" v-model="tabActiveName">
    <template>

      <el-tab-pane label="数据管理" name="dataManage" v-if="option.type != 'canvas'">

        <HotTable ref="chartDataHot" :root="root" :settings="hotSettings"></HotTable>

      </el-tab-pane>
      <el-tab-pane label="样式管理" name="styleManage" v-if="option.type != 'canvas'">
        <div id="chart-title">
          <el-checkbox v-model="option.chartOptions.chartTitle.visible" @change="repaint">显示标题</el-checkbox>
          <el-input v-model="option.chartOptions.chartTitle.text" placeholder="请输入标题" @change="repaint"></el-input>
          <el-radio-group v-model="option.chartOptions.chartTitle.textAlign" @change="repaint">
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

      <el-tab-pane label="画布管理" name="canvasManage" v-if="option.type == 'canvas'">

        画布管理

      </el-tab-pane>

    </template>
  </el-tabs>
</template>

<script>
  import HotTable from 'vue-handsontable-official'

  export default {
    name: 'chartOption',
    components: {
      HotTable
    },
    props: ['option'],
    data () {
      let vm = this
      return {
        tabActiveName: 'canvasManage',
        root: 'chart-data-hot',
        hotSettings: {
          data: [],
          colHeaders: true,
          contextMenu: true,
          beforeChange: (changes, source) => {
            if (changes[0][2] !== changes[0][3]) {
              vm.updateData({
                changes: changes
              })
            }
          }
        }
      }
    },

    mounted () {
      let vm = this
      this.$watch('option', (newVal, oldVal) => {
        vm.tabActiveName = 'dataManage'
        vm.$nextTick(() => {
          vm.$refs.chartDataHot.table.loadData(newVal.rawData.data)
        })
      })
      if (this.option && this.option.rawData) {
        this.hotSettings.data = this.option.rawData.data
      }
    },

    methods: {
      setChartType (chartType) {
        this.option.chartOptions.chartType = chartType
      },

      repaint () {
      },

      updateData (params) {
        let changes = params.changes
        this.option.rawData.data[changes[0][0]][changes[0][1]] = changes[0][3]
        this.$emit('updateChartOption', this.option)
      }
    }

  }
</script>

<style>
  #chart-data-hot{
    height: 700px;
    width: 100%;
  }
</style>
