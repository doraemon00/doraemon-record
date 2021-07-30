/**
 * for in  用来迭代对象的所有可枚举属性，包括继承的。 
 * 可用于数组字符串或普通对象，不能用于Map 或 Set对象
 * 
 */

for(let prop in ["a","b","c"]){
    console.log(prop)
}

for(let prop in 'str'){
    console.log(prop)
}


/**
 * for of 用于迭代可迭代对象，迭代它们的值而不是属性。
 * 用于数组，字符串，Map或Set对象,但不能用于普通对象
 * 
 */


for(let val of ["a","b","c"]){
    console.log(val) //a b c 
}










