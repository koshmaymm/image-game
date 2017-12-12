let app = {

    fieldParams : {
        width : this.getWH,
        height : this.getWH
    },
    imgArr : [  "https://kde.link/test/0.png", "https://kde.link/test/1.png", "https://kde.link/test/2.png",
    "https://kde.link/test/3.png", "https://kde.link/test/4.png", "https://kde.link/test/5.png",
    "https://kde.link/test/6.png", "https://kde.link/test/7.png", "https://kde.link/test/8.png",
    "https://kde.link/test/9.png"],
    count : 0,

    randomNumber : function(a, b) {
        return Math.random() - 0.5;
    },
    createImg : function() {
        return document.createElement("img"); 
    },
    createRow : function() {
        let row = document.createElement("div");
            row.classList.add("rows");
        return row; 
    },
    createCell: function(){
        let cell = document.createElement("div");
            cell.classList.add("cells");
        return cell; 
    },
    setShadow : function(){
        let cells = document.querySelectorAll(".cells");
        console.log(cells);
    },
    field : document.getElementById("fieldForGame"),
    start : document.getElementById("start"),

    init : function(){
        /* 
         let x = new XMLHttpRequest();
         x.open("GET", "http://kde.link/test/get_field_size.php", true);
         x.onload = function (){
             console.log(x.responseText);
         }
         x.setRequestHeader('Access-Control-Allow-Origin', '*')
         x.setRequestHeader("Content-Type", "text/html");
         x.send(null);
        */
 
        this.fieldParams.width = this.getWH();
        this.fieldParams.height = this.getWH();
        this.imgArr = this.imgArr.sort(this.randomNumber);

        
        this.startField();
    },
    getWH : function (){
        let rand = 2 - 0.5 + Math.random() * (8 - 2 + 1)
        rand = Math.round(rand);
        return rand;         
    },
    setField : function(){ 
             
        app.field.style.width = app.fieldParams.width * 100 + "px";
        app.field.style.height = app.fieldParams.height * 100 + "px";
        
        app.setGrid();
    },
    startField : function(){
        start.addEventListener("click", this.setField, false);  
    },

    setGrid : function(){
        console.log("HI");
        for (let i=0; i<app.fieldParams.height; i++){
            let row = app.createRow(); 
                for(let j=0; j<app.fieldParams.width; j++){
                    let cell = app.createCell();
                    row.appendChild(cell);
                } 
            app.field.appendChild(row);
        }
        app.setShadow();
    }
    
    
}
