import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Customerinformation from '@/components/Customer/Customerinformation'
import Linkman from '@/components/LinkMan/Linkman'
import UpdatePwd from '@/components/UpdatePwd'
import Insert from '@/components/insert'
import UserInformation from '@/components/UserInformation/UserInformation'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'customerinfor',
          name:'Customerinformation',
          component: Customerinformation
        },
        {
          path: 'linkman',
          name:'Linkman',
          component: Linkman
        },
        {
          path: 'updatePwd',
          name: 'UpdatePwd',
          component: UpdatePwd
        },
        {
          path: 'userInformation',
          name: 'UserInformation',
          component: UserInformation
        },
        
      ]
    },
    {
      path: '/insert',
      name: 'Insert',
      component: Insert
    },

  ]
})
