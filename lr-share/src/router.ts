import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import * as firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.matched)
  let requiresAuth = to.matched.some(record => {
    return ['/'].includes(record.path)
  })
  const currentUser = firebase.auth().currentUser
  console.log('tes', requiresAuth, currentUser)
  next()
  // // リダイレクト処理
  // if (requiresAuth) {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       next()
  //     } else {
  //       next({
  //         path: '/signin',
  //         query: { redirect: to.fullPath }
  //       })
  //     }
  //   })
  // } else {
  //   next()
  // }
})

export default router
