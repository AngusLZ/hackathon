<template>
  <div style="height: 1200px">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="3">
            <span style="color: #4da1ff;line-height: 38px">成绩概览</span>
          </el-col>
          <el-col :span="9"> <div class="div-alive"></div></el-col>
          <el-col :span="6">
          <span style="color: #4da1ff">学期：</span>
          <el-select @change="change" v-model="value" placeholder="请选择" style="color: #4da1ff;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
          <el-col :span="6">
            <span style="color: #4da1ff">科目：</span>
            <el-select @change="change2" v-model="value1" placeholder="请选择" style="color: #4da1ff;">
              <el-option
                v-for="item in options1"
                :key="item.value1"
                :label="item.label"
                :value="item.value1">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="padding: 0;height: 1px">
        <div style="width:100%;border-top: 1px solid  #CCCCCC;transform: scaleY(0.6);"></div>
      </el-footer>
    </el-container>
    <el-row :gutter="10" style="height: 400px;margin-top: 30px;" >
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 350px;margin: 0 auto">
            <div slot="header" class="clearfix">
              <span>分析</span>
            </div>
            <div class="text item" style="text-align: center;padding: 0px">
               <el-row>
                  <el-col :span="12">
                    <span style="font-size: 40px;color: lightskyblue;margin-top: 45px;display: block">优秀率：{{grateRate}}%</span>
                    <br><br>
                    <span style="font-size: 40px;color: cornflowerblue">及格率：{{passRate}}%</span>
                  </el-col>
                  <el-col :span="12" style="padding-top: 45px">
                    <el-progress type="circle" :percentage="grateRate"></el-progress>
                    <span style="display: block; margin-top: 10px;font-size: 20px;color: #46b8da">优秀率</span>
                  </el-col>
               </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-card class="box-card" style="height: 350px;margin: 0 auto">
          <div slot="header" class="clearfix">
            <span>成绩分段统计</span>
          </div>
          <div class="text item">
           <el-row>
             <el-col :span="12">
               <span style="display: block;margin-bottom: 20px ;font-size: 40px;color: #6495ED">优秀：{{great}}</span>
               <span style="display: block;margin-bottom: 20px;font-size: 40px;color: #87CEFA">良好：{{well}}</span>
               <span style="display: block;margin-bottom: 20px;font-size: 40px ;color: lightgreen">及格：{{pass}}</span>
               <span style="display: block;margin-bottom: 20px;font-size: 40px;color: #d9534f ">不及格：{{noPass}}</span>
             </el-col>
              <el-col :span="12">
                <div id="peopleNum" style="width:250px; height:250px;display: block"></div>
              </el-col>
           </el-row>



          </div>
        </el-card>
      </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" style="height: 500px;margin: 0 auto;width: 650px;">
          <div slot="header" class="clearfix">
            <span>分数统计（平均分-最高分-最低分）</span>
          </div>
          <div class="text item" style="text-align: center;padding: 0px">
            <el-row>
              <el-col :span="12">
                <span style="font-size: 40px;color: cornflowerblue;margin-top: 100px;display: block">最高分：{{max}}</span>
                <span style="font-size: 40px;color:lightskyblue ;margin-top: 35px;display: block">平均分：{{avg}}</span>
                <span style="font-size: 40px;color: firebrick;margin-top: 35px;display: block">最低分：{{min}}</span>
              </el-col>
              <el-col :span="12" style="text-align: center">
                <div style="text-align: center;padding-top: 63px">
                  <div id="MinMaxAvg" style="width:250px; height:250px;display: block;"></div>
                </div>

              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0 auto;width: 600px;height: 500px">
          <div slot="header" class="clearfix">
            <span>优劣势学科分析</span>
          </div>
          <div class="text" style="text-align: center">
            <div style="padding-bottom: 50px">
              <div id="subType" style="width:460px; height:460px;display: block;margin:0 auto;top:-25px"></div>
            </div>

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import {optionZhuzhuang} from '../echarts/zhuzhuang';
import {optionBingZhuang} from "../echarts/bingzhuang";
import {optionLeida} from "../echarts/leida";
import {subName1} from "../file/file";
import {subName2} from "../file/file";
import {subName3} from "../file/file";
import {subName4} from "../file/file";
var echarts = require('echarts')
import axios from 'axios'
export default {
  name: 'ClassGrades',
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
        label: '大一下'
      }],
      value: '1',
      value1: '',
      options1:[],
      avg:'',
      max:'',
      min:'',
      passRate:0,
      grateRate:0,
      great:0,
      well:0,
      pass:0,
      noPass:0
    }
  },
  mounted () {
    // var myChart = echarts.init(document.getElementById('MinMaxAvg'));
    // // console.log(myChart)
    // // 绘制基本图表
    // myChart.setOption(optionZhuzhuang)
    this.change()
  },
  methods :{
    change () {
      if (this.value == 1) {
        this.value1 = '7'
        this.options1 = [{
          value1: '7',
          label: '计算机学科导论'
        }, {
          value1: '8',
          label: '认知实习'
        }, {
          value1: '9',
          label: '高等数学B（上）'
        }, {
          value1: '10',
          label: '高级语言程序设计'
        }, {
          value1: '11',
          label: '高级语言程序设计实践'
        }, {
          value1: '12',
          label: '线性代数'
        }]
      }
      else if (this.value == 2) {
        this.value1 = '13'
        this.options1 = [
          {
            value1: '13',
            label: '大学物理A(上)'
          }, {
            value1: '14',
            label: '大学物理实验A（上）'
          }, {
            value1: '15',
            label: '高等数学B（下）'
          }, {
            value1: '16',
            label: '基础电路与电子学'
          }, {
            value1: '17',
            label: '电子线路综合实验'
          }, {
            value1: '18',
            label: '面向对象程序设计'
          }
        ]
      } else if (this.value == 3) {
        this.value1 = '1'
        this.options1 = [
          {
            value1: '1',
            label: '大学物理A(下)'
          }, {
            value1: '2',
            label: '大学物理实验A（下）'
          }, {
            value1: '3',
            label: '离散数学'
          }, {
            value1: '4',
            label: '数字电路与逻辑设计'
          }, {
            value1: '5',
            label: '数字逻辑电路设计实验'
          }, {
            value1: '6',
            label: '算法与数据结构'
          }
        ]
      } else if (this.value == 4) {
        this.value1 = '19'
        this.options1 = [
          {
            value1: '19',
            label: '计算机组成原理A'
          }, {
            value1: '20',
            label: '计算机组成原理实践'
          }, {
            value1: '21',
            label: '计算机网络'
          }, {
            value1: '22',
            label: '概率论与数理统计'
          }, {
            value1: '23',
            label: '汇编语言程序设计'
          }, {
            value1: '24',
            label: '马克思主义基本原理'
          }
        ]
      }
      this.change2()
    },
    change2(){
        axios({
          method: 'get',
          url: 'http://localhost/wapi/getLeader',
          params: {
            class_num:this.$store.state.class
          }
        })
          .then((response) => {
            this.avg = response.data.data.avg_score[this.value1-1].AVG;
            console.log(response.data.data);
            this.max = response.data.data.max[this.value1-1].max_score;
          //  console.log(response.data.data.max[this.value1-1].max_score);
            this.min = response.data.data.min[this.value1-1].min_score;
            this.passRate = Math.floor(response.data.data.pass_rate[this.value1-1].pass_rate*100);
            this.grateRate = Math.floor(response.data.data.grate_rate[this.value1-1].grate_rate*100);
            // 绘制基本图表
            var myChart = echarts.init(document.getElementById('MinMaxAvg'));
            myChart.setOption(optionZhuzhuang)
            myChart.setOption({
              series : {
                data:[this.min,this.avg,this.max]
              }
            })
          })
      axios({
        method: 'get',
        url: 'http://localhost/wapi/getClassAvg',
        params: {
          info_id:this.value,
          class_num:this.$store.state.class
        }
      })
        .then((response)=>{
          let temp = []
          if(this.value == 1) temp = subName1
          if(this.value == 2) temp = subName2
          if(this.value == 3) temp = subName3
          if(this.value == 4) temp = subName4
          console.log(response.data)
          let myChart3 = echarts.init(document.getElementById('subType'));
          myChart3.setOption(optionLeida)
          myChart3.setOption({
            radar: {
              indicator:temp
            },
            series: [{
              data : [{
                value : [
                  response.data.data[0].avg_score,
                  response.data.data[1].avg_score,
                  response.data.data[2].avg_score,
                  response.data.data[3].avg_score,
                  response.data.data[4].avg_score,
                  response.data.data[5].avg_score],
              }]
            }]
          })
        })

      axios({
        method: 'get',
        url: 'http://localhost/wapi/score/classify',
        params: {
          sub_id:this.value1,
          class_num:this.$store.state.class
        }
      })
        .then((response) =>{
          console.log(response.data.data)
          this.great = response.data.data[0].value
          this.well = response.data.data[1].value
          this.pass = response.data.data[2].value
          this.noPass = response.data.data[3].value
          let myChart2 = echarts.init(document.getElementById('peopleNum'));
          myChart2.setOption(optionBingZhuang)
          myChart2.setOption({
            series: [{
              data : response.data.data

            }]

          })


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
  width: 600px;
}
.div-alive{
  height: 1px;
  width: 1px;
  border: 1px solid transparent;
}
</style>
