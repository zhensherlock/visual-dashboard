<template>
  <div @click="selectObject">
    {{chartData}}
    <div ref="chart" class="chart"></div>
  </div>
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
      if (this.chartData.type === 'chart') {
        this.chartInstance = drawChart({
          chartDom: this.$refs.chart,
          remoteData: this.chartData.rawData,
          chartOptions: this.chartData.chartOptions
        })
      }
    },

    watch: {
      'chartData.chartOptions.chartType': 'chartPaint',
      'chartData.chartOptions.chartTitle.visible': 'chartPaint',
      'chartData.chartOptions.chartTitle.text': 'chartPaint',
      'chartData.chartOptions.chartTitle.textAlign': 'chartPaint',
      'chartData.rawData': 'chartPaint'
    },

    methods: {
      chartPaint () {
        this.repaint({
          rawData: this.chartData.rawData,
          chartOptions: this.chartData.chartOptions
        })
      },
      repaint (params) {
        let rawData = params.rawData
        let chartOptions = params.chartOptions
        drawChart({
          chartInstance: this.chartInstance,
          remoteData: rawData,
          chartOptions: chartOptions
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
