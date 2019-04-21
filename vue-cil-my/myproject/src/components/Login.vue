<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card" style="margin: 0 auto;margin-top: 180px">
        <div slot="header" style="text-align: center">
          <span style="margin: 0 auto;display: inline-block;font-size: 20px;color: #4da1ff">登录</span>
        </div>
        <div class="text item" style="margin-top: 20px">
          <div style="height: 70px;width: 300px;margin: 0 auto">
            <span style="display: inline-block;margin-bottom: 10px">学号</span>
            <el-input
              placeholder="请输入学号"
              v-model="id"
              clearable>
            </el-input>
          </div>
        </div>
        <div class="text item" style="margin-top: 10px">
          <div style="height: 70px;width: 300px;margin: 0 auto">
            <span style="display: inline-block;margin-bottom: 10px">密码</span>
            <el-input
              @keyup.enter.native = "login"
              placeholder="请输入密码"
              v-model="password"
              show-password>
            </el-input>
          </div>
        </div>
        <div class="text item" style="text-align: center;margin-top: 30px">
          <router-link to="/2" tag="span"><el-button type="primary" round  @click="login">登录 →</el-button></router-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  import axios from 'axios'
  export default {
    name: "Login",
    data (){
      return {
        id:"",
        password:"",
        userdata:""
      }
    },
    methods : {
      login(){
        if(this.id == ""||this.password == ""){
          alert("账号或密码不能为空");
          return
        }
        axios({
          method: 'post',
          url: 'http://localhost:8081/api/login',
          data: {
            id: this.id,
            passwd:this.password
          }
        })
          .then((response) => {
            console.log(response.data)
            if(response.data.code == 200){
              console.log(response.data)
              this.$store.commit("addId",this.id)
              this.$store.commit("Login",true)
              this.$store.commit("addClass",response.data.classNum)
              this.$store.commit("addMonitor",response.data.isLeader)
              this.$store.commit("addCount",response.data.count)
              window.location.reload()
              this.$router.push('/2')
              alert(response.data.message)
            }else {
              alert(response.data.message)
            }

          })
      }
    }

  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
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
    height: 400px;
  }
</style>
