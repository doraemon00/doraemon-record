// let uid = 0
// class Dep{
//     static target = null
//     constructor(){
//         this.id = uid++
//         this.subs  =[]
//     }
//     addSub(sub){
//         this.subs.push(sub)
//     }
//     removeSub(sub){
//         this.subs.$remove(sub)
//     }
//     depend(){
//         Dep.target.addDep(this)   
//     }
//     notify(){
//         const subs = this.subs.slice()
//         for(let i = 0;i<subs.length;i++){
//             subs[i].update()
//         }
//     }
// }

