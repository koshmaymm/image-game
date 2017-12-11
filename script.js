window.onload = function(){

    /*var x = new XMLHttpRequest();
    x.open("GET", "/http://kde.link/test/get_field_size.php", true);
    x.onload = function (){
        alert( x.responseText);
    }
    x.send(null); */

    console.log("HI");
    
    const imgArr = [  "https://kde.link/test/0.png", "https://kde.link/test/1.png", "https://kde.link/test/2.png",
                    "https://kde.link/test/3.png", "https://kde.link/test/4.png", "https://kde.link/test/5.png",
                    "https://kde.link/test/6.png", "https://kde.link/test/7.png", "https://kde.link/test/8.png",
                    "https://kde.link/test/9.png"];
    const fieldParams = {
                        "width":8,
                        "height":8
    };

    let count = 0;
    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    function createImg (){
        return document.createElement("img"); 
    }
      
    imgArr.sort(compareRandom);


    let field = document.getElementById("fieldForGame");

    for (var i=0; i<fieldParams.width; i++){
        for(var j=0; j<fieldParams.height; j++){
            var test = document.createElement("img");
            test.src = imgArr[j];
            field.appendChild(test);
            count++
        }
             
    }

    console.log(count);   
    
}

