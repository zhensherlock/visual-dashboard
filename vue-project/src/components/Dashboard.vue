<template>
  <div class='dashboard'>
    <el-row>
      <el-col :span="1">
        <el-button type="primary" v-on:click="addChart">添加图表</el-button>
        <!--<el-button type="primary" v-on:click="test">test</el-button>-->
      </el-col>
      <el-col :span="19">
        <div class="dashboard-container">
          <template v-for="object in objectList">
            <Chart :chartData="object" v-on:selectObj="selectObj(object)"></Chart>
          </template>
        </div>
      </el-col>
      <el-col :span="4">
        <ChartOption :option="currentObject"></ChartOption>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Chart from '@/components/Chart'
  import ChartOption from '@/components/ChartOption'

  export default {
    name: 'dashboard',
    components: {
      Chart,
      ChartOption
    },
    data () {
      return {
        objectList: [],
        currentObject: {
          type: 'canvas'
        }
      }
    },

    mounted () {
    },

    methods: {
      addChart () {
        let vm = this
        let newChartData = {
          type: 'chart',
          rawData: [],
          chartOptions: {
            chartType: 'bar',
            chartTitle: {
              visible: true,
              text: '图标名称',
              textAlign: 'center'
            }
          }
        }

        vm.$http.get('/static/execute.json').then((response) => {
          newChartData.rawData = response.data
          vm.objectList.push(newChartData)
          vm.currentObject = newChartData
        })
      },
//      test () {
//        this.currentObject.rawData = {
//          data: [[1, 2, 3, 4], [5, 6, 7, 8]],
//          head: {}
//        }
//      },
      selectObj (obj) {
        this.currentObject = obj
      }
    }

  }
</script>

<style>
  .dashboard {
    height: 100%;
  }
</style>
