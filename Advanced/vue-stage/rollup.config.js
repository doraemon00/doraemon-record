import babel from 'rollup-plugin-babel'

export default {
    input:"./src/index.js" , //打包的入口
    output:{
        file:'dist/vue.js',  //打包的出口
        format:'umd', //常见的格式 IIFE ESM CJS UMD
        name:'Vue', //umd 模块需要配置name,会将导出的模块放到window上
        sourcemap:true, //可以进行源代码调试
    },
    plugins:[
        babel({
            exclude:'node_modules/**'  //glob写法， 去掉node_modules 下的所有文件夹下的文件
        })
    ]
}