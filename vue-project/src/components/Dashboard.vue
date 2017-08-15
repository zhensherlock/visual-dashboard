<template>
  <div class='dashboard'>
    <el-row>
      <el-col :span="1">
        <el-button type="primary" v-on:click="addChart">添加图表</el-button>
      </el-col>
      <el-col :span="23">
        <div class="dashboard-container">
          <Chart></Chart>
        </div>
      </el-col>
      <!--<el-col :span="3">-->
        <!--<ChartOption></ChartOption>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import Chart from '@/components/Chart'
  import ChartOption from '@/components/ChartOption'
  import Vue from 'vue'

  export default {
    name: 'dashboard',
    components: {
      Chart,
      ChartOption
    },
    data () {
      return {}
    },

    mounted () {
    },

    methods: {
      addChart () {
        var MyComponent = Vue.extend({
          template: '<Chart></Chart>',
          components: {
            Chart
          }
        })
        var component = new MyComponent().$mount()
        this.$el.querySelector('.dashboard-container').appendChild(component.$el)
      }
    }

  }
</script>

<style>
  .dashboard {
    height: 100%;
  }
</style>
