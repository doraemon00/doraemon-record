// const deps = {
//     '采购部':[1,2,3],
//     '人事部':[5,8,12],
//     '行政部':[5,14,79],
//     '运输部':[3,64,105],
// }

// let member = []
// for(let item in deps){
//     const value = deps[item]
//     if(Array.isArray(value)){
//         member = [...member,...value]
//     }
// }

// member = [...new Set(member)]

// console.log(member)


const deps = {
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105],
}
let member = Object.values(deps).flat(Infinity)

console.log(member)

