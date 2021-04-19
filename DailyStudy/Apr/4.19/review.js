// console.log(typeof null)  

// console.log(Object.prototype.toString.call({}))


// let target = {}
// let source = {a:{b:1}}
// // Object.assign(target,source)
// // console.log(target)

// let target  = {...source}
// console.log(target)


// //浅拷贝数组
// let arr = [1,2,3]
// // let newArr = arr.concat()
// let newArr = arr.slice()
// console.log(newArr)


const shallowClone = (target)=>{
    if(typeof target === 'object' && target !== null){
        const cloneTarget = Array.isArray(target)?[]:{}
        for(let prop in target){
            if(target.hasOwnProperty(prop)){
                cloneTarget[prop] = target[prop]
            }
        }
        return cloneTarget
    }else{
        return target
    }
}







 export default 
 {  mode: 'universal',  
 /* 
  ** Headers of the page 
   */  head: {    title: "网页标题名", 
   // 修改title  
     meta: [      { charset: 'utf-8' },      { name: 'viewport', content: 'width=device-width, initial-scale=1' },      { hid: 'description', name: 'description', content: pkg.description }    ],    link: [      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },     
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'} 
     // 新增全局字体样式   
     ]  },   
     /*  ** Customize the progress-bar color  */ 
      loading: { color: '#fff' },   
      /*  ** Global CSS  */ 
       css: [    'element-ui/lib/theme-chalk/index.css',    'assets/main.css' // 新增自定义的页面过渡样式（文件来自3.4.1） 
     ], 
         /*  ** Plugins to load before mounting the App  */ 
          plugins: [    '@/plugins/element-ui'  ],  
           /*  ** Nuxt.js modules  */ 
            modules: [   
                 // https://axios.nuxtjs.org/setup    
                 '@nuxtjs/axios'  ],   
            
        /*  ** Axios module configuration  */  
        axios: {    
            // See https://github.com/nuxt-community/axios-module#options   
             // baseURL: "http://157.122.54.189:9095" 
             // 新增备用地址    baseURL: "http://127.0.0.1:1337"
              // 新增axios默认请求路径 		   
             },   
            /*  ** Build configuration  */ 
             build: {    transpile: [/^element-ui/],   
                  /*    ** You can extend webpack config here    */  
                    extend(config, ctx) {    }  },
                }





