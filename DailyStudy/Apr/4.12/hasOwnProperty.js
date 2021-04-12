var buz = {
    foo:'stack'
}

//遍历一个对象的所有属性时忽略掉继承属性
for(var name in buz){
    if(buz.hasOwnProperty(name)){
        console.log('this is fog (' +
      name + ') for sure. Value: ' + buz[name]);
    }else{
        console.log(name)
    }
}

