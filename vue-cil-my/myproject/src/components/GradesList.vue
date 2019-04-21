<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="3">
            <span style="color: #4da1ff;line-height: 38px">成绩汇总</span>
          </el-col>
          <el-col :span="16"> <div class="div-alive"></div></el-col>
          <el-col :span="5">
            <span style="color: #4da1ff">学期：</span>
            <el-select v-model="value" @change="change" placeholder="请选择" style="color: #4da1ff;">
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
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="margin: 0 auto;height: 2000px">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="2"> <span style="margin-top: 15px;display: inline-block">成绩单</span></el-col>
                <el-col :span="16"><div class="div-alive"></div></el-col>
                <el-col :span="6">
                  <span style="display: inline-block;color: #46b8da">排名方式：</span>
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
            </div>
            <div class="text item">
             <table class="table table-bordered table-hover">
               <tr style="height: 50px;background: #f5f7fa">
                 <td width="70px">排名</td>
                 <td width="150px">学号</td>
                 <td width ="70px">姓名</td>
                 <!--<td v-for="item in dataList">{{item.sub_name}}</td>-->
                 <td v-for="item in className">{{item.sub_name}}</td>
                 <td width="70px">总分</td>
               </tr>
               <tr v-for="item in dataList" :key="item.studentNum">
                 <td>{{item.classRank}}</td>
                 <td>{{item.studentNum}}</td>
                 <td>{{item.studentName}}</td>
                 <td :class="{noPass:item2.score<60}" v-for="item2 in item.allScore.AllScore">{{item2.score}}</td>
                 <td>{{item.score}}</td>
               </tr>
             </table>
            </div>
          </el-card>

        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
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
        label: '大二下'
      }],
      value: '1',
      dataList:'',
      className:'',
      value1: '',
      options1:[]
    }
  },
  methods:{
    change(){
      if (this.value == 1) {
        this.value1 = '999'
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
        },{
          value1:'999',
          label:'总分'
        }]
      }
      else if (this.value == 2) {
        this.value1 = '999'
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
          },{
            value1:'999',
            label:'总分'
          }
        ]
      } else if (this.value == 3) {
        this.value1 = '999'
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
          },{
            value1:'999',
            label:'总分'
          }
        ]
      } else if (this.value == 4) {
        this.value1 = '999'
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
          },{
            value1:'999',
            label:'总分'
          }
        ]
      }

      axios({
        methods: 'get',
        url:'http://localhost/wapi/rank/all',
        params:{
          class_num:this.$store.state.class,
          info_id:this.value
        }
      })
        .then(response => {
       //   console.log(response.data);
          this.dataList = response.data.data
        //  console.log("dataList",response.data.data)
          this.className = response.data.sub_name
        //  console.log("className",response.data.sub_name)
        })
    },
    change2() {
      if(this.value1 == '999'){
        this.change()
      }else{
        axios({
          methods: 'get',
          url:'http://localhost/wapi/rank/single',
          params:{
            class_num:this.$store.state.class,
            sub_id:this.value1
          }
        })
          .then(response => {
           // console.log(response.data);
            this.dataList = response.data.data
            //console.log("dataList123123",response.data.data)
            this.className = response.data.sub_name
           // console.log("className",response.data.sub_name)
          })
      }
    },


  },
  mounted (){

    this.change()
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
  width: 1200px;
  height: 800px;
}
.div-alive{
  height: 1px;
  width: 1px;
  border: 1px solid transparent;
}
.noPass{
  color: #d9534f;
}
</style>
