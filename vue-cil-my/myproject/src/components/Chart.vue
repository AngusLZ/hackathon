<template>
  <div id="app">
    <div id="echartContainer" style="width:300px; height:300px"></div>
    <button @click="add">{{this.$store.state.id}}</button>
  </div>
</template>

<script>
import {optionZhuzhuang} from '../echarts/zhuzhuang'
var echarts = require('echarts')
export default {
  name: 'Chart',
  data () {
    return {

    }
  },
  methods : {
    add () {
      this.$store.commit('addId',5)
    }
  }
  ,
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echartContainer'));
    // console.log(myChart)
    // 绘制基本图表
    myChart.setOption(optionZhuzhuang)
    // //获取数据
    // this.$http.get('src/data/asyncBarChart.json').then(res => {
    //   myChart.hideLoading();
    //   myChart.setOption({
    //     series: [{
    //       data: res.data.product  //将异步请求获取到的数据进行装载
    //     }]
    //   })
    // })


  }
}
</script>

<style scoped>

</style>
