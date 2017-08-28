<template>
  <div class='dashboard'>
    <el-row class="dashboard-row">
      <el-col :span="1">
        <el-button type="primary" @click="addChart" title="添加图表" icon="plus"></el-button>
      </el-col>
      <el-col :span="19">
        <div class="dashboard-container">
          <template v-for="(objectData, index) in objectDataList">
            <Chart v-bind:class="{ active: currentObjectData == objectData }"
                   :chartData="objectData" :key="index" v-if="objectData.type=='chart'"
                   @selectObject="selectObject({ objectData, index})"></Chart>
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
      currentObjectData () {
        return this.$store.state.currentObjectData
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
  .dashboard-row {
    height: 100%;
    display: flex;
  }
  .dashboard-container {
    height: 100%;
    overflow-y: auto;
  }
  .dashboard-container > * {
    border: 1px solid transparent;
    margin-bottom: 10px;
  }
  .dashboard-container > *:hover {
    border: 1px dashed #4f80ff;
  }
  .dashboard-container > .active {
    /*outline: #4f80ff solid 1px;*/
    border: 1px solid #4f80ff;
  }
</style>
