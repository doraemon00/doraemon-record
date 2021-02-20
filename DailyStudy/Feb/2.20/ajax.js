var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            console.log(xhr.responseText)
        }
    }
}

xhr.open('GET',url,false)
xhr.send(null)
