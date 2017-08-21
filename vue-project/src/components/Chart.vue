<template>
  <div class='chart' v-on:click="selectObj">{{chartData}}</div>
</template>

<script>
  import echarts from 'echarts'
  import DataHandle from '@/services/dataHandle/dataHandle.js'
  import objectMixins from '@/mixins/objectMixins.js'
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

  export default {
    name: 'chart',
    components: {
    },
    mixins: [objectMixins],
    props: ['chartData'],
    data () {
      return {
        chartInstance: null
      }
    },

    mounted () {
      drawChart({
        chartDom: this.$el,
        remoteData: this.chartData.rawData,
        chartOptions: this.chartData.chartOptions
      })
    },

    methods: {
      repaint (params) {
        let rawData = params.rawData
        let chartOption = params.chartOption
        drawChart({
          chartInstance: this.chartInstance,
          remoteData: rawData,
          chartOptions: chartOption
        })
      }
    }

  }
</script>

<style>
  .chart{
    width: 100%;
    height: 400px;
  }
</style>
