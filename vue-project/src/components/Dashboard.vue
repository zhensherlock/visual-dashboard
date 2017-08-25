<template>
  <div class='dashboard'>
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="addChart">添加图表</el-button>
      </el-col>
      <el-col :span="19">
        <div class="dashboard-container">
          <template v-for="(objectData, index) in objectDataList">
            <Chart :chartData="objectData" :key="index" @selectObject="selectObject({ objectData, index})"></Chart>
          </template>
        </div>
      </el-col>
      <el-col :span="4">
        <ChartOption></ChartOption>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Chart from '@/components/Chart'
  import ChartOption from '@/components/ChartOption'
  import { mapMutations } from 'vuex'

  export default {
    name: 'dashboard',
    components: {
      Chart,
      ChartOption
    },
    data () {
      return {
      }
    },

    computed: {
      objectDataList () {
        return this.$store.state.objectDataList
      },
      currentObjectIndex () {
        return this.$store.state.currentObjectIndex
      }
    },

    mounted () {
    },

    methods: {
      ...mapMutations([
        'addObjectData',
        'setCurrentObjectData'
      ]),
      addChart () {
        let vm = this
        let objectData = {
          type: 'chart',
          rawData: {},
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
          objectData.rawData = response.data
          // add chart object
          vm.addObjectData({
            objectData
          })
          // set current object data
          vm.setCurrentObjectData({
            objectData
          })
        })
      },
      selectObject ({ objectData, index }) {
        // set current object data
        this.setCurrentObjectData({
          objectData
        })
      }
    }

  }
</script>

<style>
  .dashboard {
    height: 100%;
  }
</style>
