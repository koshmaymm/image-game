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

window.onload = function() {

    let app = { //app.CLASSES.CHOSEN

        CLASSES: {
            CELLS: 'cells',
            SHADOW: 'shadow',
            CHOSEN: 'chosen',
            SHOT: 'shot'
        },

        fieldParams: {
            width: 0,
            height: 0
        },

        imgArr: ["https://kde.link/test/0.png",
            "https://kde.link/test/1.png",
            "https://kde.link/test/2.png",
            "https://kde.link/test/3.png",
            "https://kde.link/test/4.png",
            "https://kde.link/test/5.png",
            "https://kde.link/test/6.png",
            "https://kde.link/test/7.png",
            "https://kde.link/test/8.png",
            "https://kde.link/test/9.png",
        ],


        matrix: [],
        stack: [],
        cells: "",
        countOpenPictures: 0,
        firstOpenImageSRC: null,
        secondOpenImageSRC: null,



        field: document.getElementById("fieldForGame"),

        getNumber: function(max, min) {
            let rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        },
        randomArrValue: function(a, b) {
            return Math.random() - 0.5;
        },

        doubleImages: function(arr) {
            for (let i = 0, l = arr.length; i < l; i++) {
                arr[l + i] = arr[i];
            }
        },

        makeMaxBord: function(arr) { // get required number of images
            app.doubleImages(arr); //get double of each image
            app.imgArr = arr.concat(arr).concat(arr).concat(arr);
        },

        setFieldParams: function() {
            app.fieldParams.width = app.getNumber(8, 2);
            app.fieldParams.height = app.getNumber(8, 2);
            //get random height and width values
            if (app.fieldParams.width < app.fieldParams.height) {
                let num = app.fieldParams.width;
                app.fieldParams.width = app.fieldParams.height;
                app.fieldParams.height = num;
            }
            // if height > width swap them
            if ((app.fieldParams.width * app.fieldParams.height) % 2 !== 0) {
                app.fieldParams.height++;
            }
        },
        generateField: function(num) {
            //required amount duplicate images
            app.imgArr = app.imgArr.splice(0, num);
            //random sort images
            app.imgArr = app.imgArr.sort(function(a, b) { return 0.5 - Math.random() });
            app.imgArr = app.imgArr.sort(function(a, b) { return 0.5 - Math.random() });

        },

        generateBoard: function() {
            let full = false;
            let total = app.fieldParams.width * app.fieldParams.height;

            app.generateField(total);

            for (let i = 0; i < app.imgArr.length; i++) {
                let imgURL = app.imgArr[i];
                app.stack.push(imgURL);
            }
        },

        startPlay: function() {
            start.addEventListener("click", app.setField, false);

        },

        setField: function() {
            app.setGrid();
            //console.log(app.matrix);
            app.pushCells();
            app.pushImgs();
            app.addEvents();
        },

        createImg: function() {
            return document.createElement("img");
        },
        createRow: function() {
            let row = document.createElement("div");
            row.classList.add("rows");
            return row;
        },
        createCell: function(x, y) {
            let cell = document.createElement("div");
            cell.classList.add(app.CLASSES.CELLS);
            cell.dataset.x = x;
            cell.dataset.y = y;
            return cell;
        },

        setGrid: function() {
            for (let i = 0; i < app.fieldParams.height; i++) {
                let row = app.createRow();
                app.matrix[i] = [];

                for (let j = 0; j < app.fieldParams.width; j++) {
                    let cell = app.createCell(i, j);
                    row.appendChild(cell);
                    app.matrix[i][j] = {
                        src: app.stack.pop(),
                        isVisible: true,
                        isChosen: false,
                        isDeleted: false
                    };
                }
                app.field.appendChild(row);
            }
        },

        pushCells: function() {
            app.cells = document.querySelectorAll("." + app.CLASSES.CELLS);
        },

        pushImgs: function() {
            for (let i = 0; i < app.cells.length; i++) {
                app.cells[i].classList.add(app.CLASSES.SHADOW);
            }
        },

        addEvents: function() {
            app.field.addEventListener("click", app.checkPicture, false);
        },

        checkPicture: function(e) {
            let element = e.target;
            //console.log(e.target.querySelector(".cell"))
            if (!element.classList.contains(app.CLASSES.CELLS)) { return false }

            if (app.countOpenPictures === 0) {
                app.firstOpenImageSRC = app.matrix[e.target.dataset.x][e.target.dataset.y].src;
            }
            if (app.countOpenPictures === 1) {
                app.secondOpenImageSRC = app.matrix[e.target.dataset.x][e.target.dataset.y].src;
            }
            //console.log(e.target.dataset.x, e.target.dataset.y)
            if (app.countOpenPictures > 1) {
                app.hideAllImages(e);
            }


            if (element.classList.contains(app.CLASSES.SHADOW)) {
                app.countOpenPictures++;
                //console.log(app.countOpenPictures);

                element.classList.remove(app.CLASSES.SHADOW);
                element.classList.add(app.CLASSES.CHOSEN);
                //console.log(app.matrix[e.target.dataset.x][e.target.dataset.y].src);
                element.style.backgroundImage = "url(" + app.matrix[e.target.dataset.x][e.target.dataset.y].src + ")";
            } else {
                element.classList.remove(app.CLASSES.CHOSEN);
                element.classList.add(app.CLASSES.SHADOW);
                app.countOpenPictures--;
                //console.log(app.countOpenPictures);

                //console.log(app.matrix[e.target.dataset.x][e.target.dataset.y].src);
                element.style.backgroundImage = "";
            }

        },
        getRandomImgURL: function() {
            return app.imgArr[app.getNumber(app.imgArr.length - 1, 0)]
        },
        handlehidenElement: function(element) {
            element.style.backgroundImage = "";
            element.classList.remove(app.CLASSES.CHOSEN);
            element.classList.add(app.CLASSES.SHADOW);
        },
        hideAllImages: function(e) {
            let pictures = document.querySelectorAll("." + app.CLASSES.CHOSEN);
            app.handlehidenElement(pictures[0]);
            app.handlehidenElement(pictures[1]);
            app.countOpenPictures = 0;

            app.checkPicture(e);
        }

    }
    app.makeMaxBord(app.imgArr);
    app.setFieldParams();
    app.generateBoard();
    app.startPlay();

}