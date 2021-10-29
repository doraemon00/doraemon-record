const oldArr = [1,2,[3,4]]
const newArr = oldArr.reduce((prev,curr)=>{
    prev.concat(curr)
},[])

console.log(newArr)