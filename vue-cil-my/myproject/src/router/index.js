import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PerGrades from '@/components/PerGrades'
import ClassGrades from '@/components/ClassGrades'
import GradesList from '@/components/GradesList'
import Chart from '@/components/Chart'
import Login from '@/components/Login'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/store1',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/2',
      name: 'PerGrades',
      component: PerGrades
    },
    {
      path: '/3',
      name: 'ClassGrades',
      component: ClassGrades
    },
    {
      path: '/4',
      name: 'GradesList',
      component: GradesList
    },
    {
      path: '/6',
      name: 'Chart',
      component: Chart
    },{
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {


  if (to.path === '/') {
    let token = localStorage.getItem('isLogin');
    if(token == 'true'){
      next('/2');
    }
    next();
  } else {
    let token = localStorage.getItem('isLogin');
    if (token == null || token == '') {
           next('/');
    } else {
      if (to.path === '/3' ||to.path === '/4'){
        if(localStorage.getItem('isMonitor') == 1){
          next()
        }else{
          alert("你没有访问权限")
        }

      }
      else{
        next();
      }

    }
  }


});

export default router;
