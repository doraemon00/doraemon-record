function xxx(){
    with(this){
        console.log(name)
        console.log(age)
    }
}

let data = {name:'chu',age:18}
xxx.call(data) 

