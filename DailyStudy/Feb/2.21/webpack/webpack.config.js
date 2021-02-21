var path = require("path")
module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),//默认配置 
        filename:'bundle.js'
    }
}