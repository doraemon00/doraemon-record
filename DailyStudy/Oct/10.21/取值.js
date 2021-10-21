const obj = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:null,
}


// const {a,b,c,d,e} = obj
// const f = a+ d
// console.log(f)


// const {a:a1} = obj
// console.log(a1)

const {a,b,c,d,e} = obj || {};


