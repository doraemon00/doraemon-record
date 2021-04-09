import router from './router'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to,from,next)=>{
    console.log("路由导航守卫")
    next()
})


