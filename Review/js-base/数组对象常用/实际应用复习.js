// let message = [
//     {
//         name:'chu',
//         age:18
//     },
//     {
//         name:'zhang',
//         age:19
//     }
// ]

// 重命名固定的名称对象
// var newArr = message.map(item=>{
//     return {name:item.name}
// })
// console.log(newArr)


/* 
    对象的键值形式 
    取其中的某个值作为键，某个值作为值这种形式
*/

// let obj = {}
// for(var item in message){
//     // console.log(item) //0 1
//     obj[item] = message[item].age
// }
// console.log(obj)

// let obj = {}
// var newArr = message.map(e=>{
//     obj[e.name] = e.age   //键值 
// })
// console.log(obj)




// var message = [{
//     name: "个人待办",
//     value: "personal_standby",
//     order:1
// },
// {
//     name: "流程跟踪",
//     value: "process_tracking",
//     order:2
// },
// {
//     name: "应用推荐",
//     value: "application_recommendation",
//     order:4
// },
// {
//     name: "最新应用",
//     value: "latest_application",
//     order:3
// },
// {
//     name: "周期性应用",
//     value: "period_application",
//     order:5
// },
// {
//     name: "专题推荐",
//     value: "sbject_rommendation",
//     order:7
// },
// {
//     name: "收藏服务",
//     value: "collect_service",
//     order:6
// }
// ]


/* 
    根据某一项值进行排序 
 */
// function compare(p){
//     return function(a,b){
//         var value1 = a[p]
//         var value2 = b[p]
//         return value1 - value2
//     }
// }

// var res = message.sort(compare('order'))
// console.log(res)


/* 
    往数组中添加属性
*/
// var arr = message.map((item,index)=>{
//     item.id = index 
//     return item //一定要return出去 
// })
// console.log(arr)


/* 
    对数组中重复的值进行去重
*/

// var arr2 = [{
//     name: "name1",
//     num: "1"
// },
// {
//     name: "name2",
//     num: "11"
// },
// {
//     name: "name3",
//     num: "12"
// },
// {
//     name: "name4",
//     num: "13"
// },
// {
//     name: "name2",
//     num: "1"
// },
// {
//     name: "name6",
//     num: "12"
// }
// ]

// function arrayUnique2(arr,name){
//     var hash = {}
//     return arr.reduce(function(item,next){
//         // console.log(next,"?")
//         // next 取的是下一位的值 ， item 是累加的值 
//         hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
//         return item
//     },[])
// }
// console.log(arrayUnique2(arr2,"name"))


// let res = [...new Set(arr2.map(item=>item.num))]
// console.log(res)


/* 
    判断对象数组中是否存在某个对象
*/

var arr = [
    {
        name: "常用"
    },
    {
        name: "5"
    }
]

var obj = {
    name: "5"
}

// some是其中一个包含即可 。 every 是每个
var res = arr.some(item => {
    return obj.name === item.name
})

console.log(res)





