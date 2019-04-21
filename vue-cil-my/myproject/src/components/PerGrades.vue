<template>
  <div style="height: 1500px">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="3">
            <span style="color: #4da1ff;line-height: 38px">个人成绩</span>
          </el-col>
          <el-col :span="15"> <div class="div-alive"></div></el-col>
          <el-col :span="6">
            <span style="color: #4da1ff">学期：</span>
            <el-select  @change="chooseInfo" v-model="value" placeholder="请选择" style="color: #4da1ff;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="padding: 0;height: 1px">
        <div style="width:100%;border-top: 1px solid  #CCCCCC;transform: scaleY(0.6);"></div>
      </el-footer>
    </el-container>

    <el-row :gutter="10" style="height: 350px;margin-top: 30px;" >
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 300px;margin: 0 auto">
            <div slot="header" class="clearfix">
              <span>班级排名</span>
            </div>
            <div class="text item">
              <span style="font-size: 30px;margin-bottom: 10px;display: inline-block;">班级排名：</span>
              <span style="font-size: 30px;color: deepskyblue">{{sumRank}}</span><br>
              <span style="font-size: 30px">班级人数：</span>
              <span style="font-size: 30px">{{this.$store.state.count}}</span><br><br>
              <span style="font-size: 20px;color: #4da1ff;margin-bottom: 25px;display: inline-block">已超越{{overNum}}%的人</span>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="overNum" status="success"></el-progress>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 300px;margin: 0 auto;padding: 0px">
            <div slot="header" class="clearfix">
              <span>排名曲线</span>
            </div>
            <div class="text item" style="text-align: center;padding: 0px">
              <div id="rankLine" style="width:230px; height:230px;margin: 0 auto;margin-left: 60px"></div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 350px;">
      <el-col :span="24">
        <el-card class="box-card" style="height: 300px;margin: 0 auto;width: 1000px">
          <div slot="header" >
            <span>个人成绩</span>
          </div>
          <div class="text item" style="text-align: center;padding: 0px">
            <table class="table table-bordered table-hover" style="margin-top: 40px">
              <tr style="height: 50px">
                <td v-for="item in dataGrades" :key="item.sub_name">{{item.sub_name}}</td>
              </tr>
              <tr style="height: 50px">
                <td v-for="item in dataGrades" :key="item.sub_name" :class="{noPass:item.score<60}">{{item.score}}</td>
              </tr>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="height: 500px;margin: 0 auto;width: 500px">
          <div slot="header" class="clearfix">
            <span>个人优劣</span>
          </div>
          <div class="text item" style="text-align: center;padding: 0px">
            <div id="charactLine" style="width:400px; height:400px;margin: 0 auto"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height: 500px;margin: 0 auto;width: 500px">
          <div slot="header" >
            <span>平均分</span>
          </div>
          <div class="text item" style="text-align: center;">
            <span style="font-size: 150px;color: #4da1ff;display: inline-block;margin-top: 95px">{{avg}}</span><br>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  import axios from 'axios'
  import {optionZhexian} from '../echarts/zhexian'
  import {optionLeida}   from '../echarts/leida'
  import {subName1} from "../file/file";
  import {subName2} from "../file/file";
  import {subName3} from "../file/file";
  import {subName4} from "../file/file";
  var echarts = require('echarts')
  var arrayRank = new Array()
  export default {
    name: 'PerGrades',
    data () {
      return {
        options: [{
          value: '1',
          label: '大一上'
        }, {
          value: '2',
          label: '大一下'
        }, {
          value: '3',
          label: '大二上'
        }, {
          value: '4',
          label: '大二下'
        }],
        value: '1',
        sumRank:'XXX',
        overNum:0,
        avg:'xxx',
        dataGrades:"",
        rank1:0,
        rank2:0,
        rank3:0,
        rank4:0
      }
    },
    mounted () {
      let myChart = echarts.init(document.getElementById('rankLine'));
      //排名曲线 学期数暂未储存
      for(let i = 0;i<4;i++){
        axios({
          method: 'get',
          url: 'http://localhost/wapi/rank/sum',
          params: {
            st_id: this.$store.state.id,
            info_id: i+1,
            class_num:this.$store.state.class
          }
        })
          .then((response) => {
            if(i == 0) this.rank1 = response.data.data.sum_rank;
            if(i == 1) this.rank2 = response.data.data.sum_rank;
            if(i == 2) this.rank3 = response.data.data.sum_rank;
            if(i == 3) this.rank4 = response.data.data.sum_rank;
            if(this.rank1 *this.rank2 *this.rank3 *this.rank4 != 0 ){
              myChart.setOption(optionZhexian)
              myChart.setOption({
                series: [{
                  data:[this.rank1,this.rank2,this.rank3,this.rank4]
                }]
              })
            }
          })
      }
      this.chooseInfo()
      console.log("dataGrades1",this.dataGrades)
    },
    methods :{

      chooseInfo (){
        console.log(localStorage.getItem('class'))
        //排名
        axios({
          method: 'get',
          url: 'http://localhost/wapi/rank/sum',
          params: {
            st_id: this.$store.state.id,
            info_id: this.value,
            class_num:this.$store.state.class
          }
        })
          .then((response) => {
            console.log("rank", this.sumRank = response.data.data.sum_rank,"id",this.$store.state.id)
            this.sumRank = response.data.data.sum_rank,
              this.overNum =  Math.floor ((this.$store.state.count - this.sumRank)/ this.$store.state.count * 100);
          })

        axios({
          method: 'get',
          url: 'http://localhost/wapi/score/self',
          params: {
            st_id: this.$store.state.id,
            info_id: this.value
          }
        })
          .then((response) => {
            //各科成绩
            let temp = []
            if(this.value == 1) temp = subName1
            if(this.value == 2) temp = subName2
            if(this.value == 3) temp = subName3
            if(this.value == 4) temp = subName4
            let myChart2 = echarts.init(document.getElementById('charactLine'));
            myChart2.setOption(optionLeida)
            myChart2.setOption({
              radar: {
                indicator:temp
              },
              series: [{
                data : [{
                  value : [
                    response.data.data.score[0].score,
                    response.data.data.score[1].score,
                    response.data.data.score[2].score,
                    response.data.data.score[3].score,
                    response.data.data.score[4].score,
                    response.data.data.score[5].score],
                }]
              }]
            })
            this.dataGrades = response.data.data.score;
          })
        //平均分
        axios({
          method: 'get',
          url: 'http://localhost/wapi/avg/self',
          params: {
            st_id: this.$store.state.id,
            info_id: this.value
          }
        })
          .then((response) => {
            // console.log(response.data.data)
            this.avg = response.data.data.self_avg
          })


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .grid-content{
    height: 20px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 400px;
  }
  .div-alive{
    height: 1px;
    width: 1px;
    border: 1px solid transparent;
  }
  #rankLine{
    margin-bottom: 20px;
  }
  .noPass{
    color: #d9534f;
  }
</style>
