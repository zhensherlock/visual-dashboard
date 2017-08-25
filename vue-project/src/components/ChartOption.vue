<template>
  <el-tabs type="type" v-model="tabActiveName">
    <template>
      <el-tab-pane label="数据管理" name="dataManage" v-if="currentObjectData.type != 'canvas'">

        <HotTable ref="chartDataHot" :root="root" :settings="hotSettings"></HotTable>

      </el-tab-pane>
      <el-tab-pane label="样式管理" name="styleManage" v-if="currentObjectData.type != 'canvas'">
        <div id="chart-title">
          <el-checkbox v-model="currentObjectData.chartOptions.chartTitle.visible" @change="resetChartOptions">显示标题</el-checkbox>
          <el-input v-model="currentObjectData.chartOptions.chartTitle.text" placeholder="请输入标题" @change="resetChartOptions"></el-input>
          <el-radio-group v-model="currentObjectData.chartOptions.chartTitle.textAlign" @change="resetChartOptions">
            <el-radio-button label="left"></el-radio-button>
            <el-radio-button label="center"></el-radio-button>
            <el-radio-button label="right"></el-radio-button>
          </el-radio-group>
        </div>

        <div id="chart-option">
          <ul>
            <li @click="chooseChartType('bar')">bar</li>
            <li @click="chooseChartType('line')">line</li>
            <li @click="chooseChartType('pie')">pie</li>
          </ul>
        </div>

      </el-tab-pane>

      <el-tab-pane label="画布管理" name="canvasManage" v-if="currentObjectData.type == 'canvas'">

        画布管理

      </el-tab-pane>

    </template>
  </el-tabs>
</template>

<script>
  import HotTable from 'vue-handsontable-official'
  import { mapMutations } from 'vuex'

  export default {
    name: 'chartOption',
    components: {
      HotTable
    },
    data () {
      let vm = this
      return {
        tabActiveName: 'canvasManage',
        root: 'chart-data-hot',
        hotSettings: {
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

    computed: {
      currentObjectData () {
        let objectData = this.$store.state.currentObjectData
        if (objectData.type === 'chart') {
          this.tabActiveName = 'dataManage'
          this.$nextTick(() => {
            this.$refs.chartDataHot.table.loadData(objectData.rawData.data)
          })
        }
        return objectData
      }
    },

    mounted () {
    },

    methods: {
      ...mapMutations([
        'setChartType',
        'setCurrentChartRawData',
        'setCurrentChartOptions',
        'updateChartData'
      ]),
      chooseChartType (chartType) {
        this.setChartType({
          objectData: this.currentObjectData,
          chartType
        })
        this.setCurrentChartOptions({
          chartOptions: this._.clone(this.currentObjectData.chartOptions)
        })
      },

      resetChartOptions () {
        this.setCurrentChartOptions({
          chartOptions: this._.clone(this.currentObjectData.chartOptions)
        })
      },

      updateData (params) {
        let changes = params.changes
        this.updateChartData({
          changes
        })
        this.setCurrentChartRawData({
          rawData: this._.clone(this.currentObjectData.rawData)
        })
//        this.currentObjectData.rawData.data[changes[0][0]][changes[0][1]] = changes[0][3]
//        this.currentObjectData.rawData = this._.clone(this.currentObjectData.rawData)
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
