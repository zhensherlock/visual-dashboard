<template>
  <div class='dashboard'>
    <!--{{rawData}}-->

    <div id='chart'></div>

    <!--<el-input-->
    <!--type='textarea'-->
    <!--:rows='2'-->
    <!--placeholder='请输入内容'-->
    <!--v-model='rawData'>-->
    <!--</el-input>-->

    <!--<template>-->
    <!--<el-table-->
    <!--:data='rawData.data'-->
    <!--style='width: 100%'>-->
    <!--<el-table-column-->
    <!--prop='date'-->
    <!--label='日期'-->
    <!--width='180'>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop='name'-->
    <!--label='姓名'-->
    <!--width='180'>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop='address'-->
    <!--label='地址'>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</template>-->
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts-gl'

//  let airDatas = [['Goroka', 'Goroka', 'Papua New Guinea', 145.391881, -6.081689]]

  export default {
    name: 'dashboard',

    data () {
      return {
        test: 'test - value',
        rawData: {}
      }
    },

    created () {
      let vm = this
      this.$http.get('/static/execute.json').then(response => {
        vm.rawData = response.data
      })
    },

    mounted () {
      var myChart = echarts.init(document.getElementById('chart'))

      myChart.setOption({
        tooltip: {
          show: true
        },
        backgroundColor: '#000',
        globe: {

          environment: '/static/images/data-1491837999815-H1_44Qtal.jpg',

          heightTexture: '/static/images/data-1491837512042-rJlLfXYax.jpg',

          displacementScale: 0.1,
          displacementQuality: 'high',

          baseColor: '#000',

          shading: 'realistic',
          realisticMaterial: {
            roughness: 0.2,
            metalness: 0
          },

          postEffect: {
            enable: true,
            depthOfField: {
              enable: false,
              focalDistance: 150
            }
          },
          temporalSuperSampling: {
            enable: true
          },
          light: {
            ambient: {
              intensity: 0
            },
            main: {
              intensity: 0.1,
              shadow: false
            },
            ambientCubemap: {
              texture: '/static/images/data-1491837984109-r1u7NmY6e.hdr',
              exposure: 1,
              diffuseIntensity: 0.5,
              specularIntensity: 2
            }
          },
          viewControl: {
            autoRotate: false
          },
          silent: true
        },
        series: [{
          type: 'lines3D',
          name: 'Air China',

          effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.15,
            trailOpacity: 1,
            trailColor: 'rgb(30, 30, 60)'
          },

          lineStyle: {
            width: 2,
            color: 'rgb(50, 50, 150)',
            // color: 'rgb(118, 233, 241)',
            opacity: 1
          },
          blendMode: 'lighter',

          data: [
            [
              [104.9587, 25.0882],
              [87.474244, 43.907106]
            ],
            [
              [104.9587, 25.0882],
              [113.298786, 23.392436]
            ]
          ]
        }, {
          type: 'scatter3D',
          coordinateSystem: 'globe',
          blendMode: 'lighter',
          symbolSize: 20,
          itemStyle: {
            color: 'rgb(50, 50, 150)',
            opacity: 0.2
          },
          label: {
            position: 'bottom',
            formatter: function () {
              return ''
            }
          },
          data: [
            {
              name: '地点',
              symbolSize: 30,
              value: [104.9587, 25.0882]
            }
          ]
        }

        ]
      })
    }

  }
</script>

<style scoped>
  #chart{
    width: 1000px;
    height: 1000px;
  }
</style>
