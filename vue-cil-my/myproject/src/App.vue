<template>
  <div id="app">
    <el-container>
        <el-main >
          <el-row class="tac">
            <el-col :span="2">
              <span id="logo" style="margin-left: 10px;color: #4da1ff;">福大成绩通</span>
            </el-col>
            <el-col :span="19"><div class="div-alive"></div></el-col>
            <el-col :span="3">
              <span style="color: #9587F1">{{this.$store.state.id}}</span>
              <i class="el-icon-aliziyuan1" style="margin-left: 10px"></i>
              <span v-if="this.$store.state.isLogin == 'true'">
                  <i class="el-icon-alituichu3" @click="exit" style="margin-left: 10px;cursor: pointer"></i>
              </span>
            </el-col>
          </el-row>
        </el-main>
        <el-footer style="padding: 0;height: 1px">  <div style="width:100%;border-top: 1px solid  #CCCCCC;transform: scaleY(0.6);"></div></el-footer>
    </el-container>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose" style="height: 1000px">
          <router-link to="/2" tag="span">
          <el-menu-item index="1">
            <i class="el-icon-aliziyuan1"></i>
           <span>个人成绩</span>
          </el-menu-item>
          </router-link>
          <el-submenu index="2" v-show="this.$store.state.isMonitor == 1">
            <template slot="title">
              <i class="el-icon-alibanjiguanli1"></i>
              <span>班级成绩</span>
            </template>
            <el-menu-item-group>
              <router-link to="/3" ><el-menu-item index="2-1"> 成绩概览 </el-menu-item></router-link>
              <router-link to="/4" ><el-menu-item index="2-2"> 成绩汇总 </el-menu-item></router-link>
            </el-menu-item-group>

          </el-submenu>
          <el-menu-item index="3" v-show="false">
            <i class="el-icon-setting"></i>
            <span slot="title">不知书何</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>

</template>
<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },

  methods: {

    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    exit(){
        // id : localStorage.getItem('id')?localStorage.getItem('id'):'',
        // class : localStorage.getItem('class')?localStorage.getItem('class'):'',
        // isMonitor:localStorage.getItem('isMonitor')?localStorage.getItem('isMonitor'):'false',
        // isLogin:localStorage.getItem('isLogin')?localStorage.getItem('isLogin'):'false',
        // count:localStorage.getItem('count')?localStorage.getItem('count'):'false',
      localStorage.removeItem('id')
      localStorage.removeItem('class')
      localStorage.removeItem('isMonitor')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('count')
      this.$store.state.isLogin = false
      // window.location.reload()
      this.$router.push('/')
    }
  }
}
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
    margin: 0px;
    min-width: 1200px;
  }
  .div-alive{
    height: 1px;
    width: 1px;
    border: 1px solid transparent;
  }
</style>
