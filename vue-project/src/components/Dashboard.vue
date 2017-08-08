<template>
  <div class='dashboard'>
    <el-row :gutter="10">
      <el-col :span="4">
        {{hotSettings.data}}
      </el-col>
      <el-col :span="16">
        <div id='chart'></div>
      </el-col>
      <el-col :span="4">
        <HotTable :root="root" :settings="hotSettings"></HotTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import HotTable from 'vue-handsontable-official'
  import 'echarts-gl'

  function* drawChart (vm) {
    let result = yield vm.$http.get('/static/execute.json')

    let chartInstance = echarts.init(result.chartDom)

    chartInstance.setOption({
      title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
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
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      xAxis: {
        type: 'category',
        data: result.dimensionData
      },
      series: [
        {
//            name: '2011年',
          type: 'bar',
          data: result.measureData
        }
      ]
    })
    yield chartInstance
  }

  export default {
    name: 'dashboard',
    components: {
      HotTable
    },
    data () {
      return {
        test: 'test - value',
        rawData: {},
        root: 'test-hot',
        hotSettings: {
          data: [],
          colHeaders: true,
          contextMenu: true,
          beforeChange: (changes, source) => {
            console.log(changes, source)
          }
        }
      }
    },

//    getData () {
//      return this.$http.get('/static/execute.json').then(response => {
//        return response.data
//      })
//    },
//
//    async drawChart () {
//      await getData()
//
//    },

    created () {
//      this.$http.get('/static/execute.json').then(response => {
//        vm.rawData = response.data
//        vm.hotSettings.data = response.data.data
//      })
    },

    mounted () {
      let vm = this
      let draw = drawChart(vm)
      draw.next().value.then((response) => {
        vm.rawData = response.data
        vm.hotSettings.data = response.data.data
        return response.data
      }).then((data) => {
        let dimensionData, measureData
        dimensionData = data.data.map((item) => {
          return item[0]
        })
        measureData = data.data.map((item) => {
          return item[1]
        })
        draw.next({
          dimensionData: dimensionData,
          measureData: measureData,
          chartDom: document.getElementById('chart')
        })
      })
    }

  }
</script>

<style>
  #chart{
    width: 100%;
    height: 700px;
  }
</style>
