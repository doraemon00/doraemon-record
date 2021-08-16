// function pow(x,n){
//     let result = 1
//     for(let i = 0;i<n;i++){
//         // debugger
//         result *= x
//     }
//     return result

// }

// function pow(x,n){
//     // debugger
//     if(n==1){
//         return x
//     }else{
//         return x * pow(x,n-1)
//     }
// }

// 三元表达式
// function pow(x,n){
//     return (n==1) ? x : (x*pow(x,n-1))
// }
// console.log(pow(2,3))

let company = {
  // 是同一个对象，简洁起见被压缩了
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep);
    }
    return sum;
  }
}
console.log(sumSalaries(company));
