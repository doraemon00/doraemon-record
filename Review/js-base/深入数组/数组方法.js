/* 改变自身的方法
    pop push shift unshift 
    reverse sort splice 
    copyWithin fill 
*/

// var array = ["cat", "dog", "cow", "chicken", "mouse"];
// var item = array.pop()
// console.log(item)  //mouse 被删除的元素

// var item = array.push('add') 
// console.log(item)  //6返回数组长度 

// var item = array.shift()
// console.log(item)  //cat 被删除的元素 从前面删除

// var item = array.unshift('add')
// console.log(item)   // 6返回数组长度


// var res = array.reverse()
// console.log(res) //返回新数组


// var res = array.splice(1,1)
// console.log(res)  //dog

// var res  = array.sort()
// console.log(res) 


// var res = array.copyWithin(0,3)
// console.log(res)   //[ 'chicken', 'mouse', 'cow', 'chicken', 'mouse' ]

//  可见数组区间[0,3]的元素全部替换为10
// var res = array.fill(10,0,3)
// console.log(res)    //[ 10, 10, 10, 'chicken', 'mouse' ]


// console.log(array.splice(3))  //从第三项开始截取后面的


/* 
    不改变自身的方法
    concat join slice 
    toString toLocalString 
    indexOf lastIndexOf 
    toSource includes 

*/
var array = [1,2,3]
// var array2 = array.concat(5,6)
// var array2 = array.join(",") //数组转字符串
// var array2 = array.slice()  //浅拷贝

// var array2 = array.toString()

// var array2 = array.indexOf(2) //1 返回元素在其中的位置

// var array2 = array.includes(0)  //false


console.log(array2)













