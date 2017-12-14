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

        imgArr: ["https://kde.link/test/0.png", "https://kde.link/test/0.png",
            "https://kde.link/test/1.png", "https://kde.link/test/1.png",
            "https://kde.link/test/2.png", "https://kde.link/test/2.png",
            "https://kde.link/test/3.png", "https://kde.link/test/3.png",
            "https://kde.link/test/4.png", "https://kde.link/test/4.png",
            "https://kde.link/test/5.png", "https://kde.link/test/5.png",
            "https://kde.link/test/6.png", "https://kde.link/test/6.png",
            "https://kde.link/test/7.png", "https://kde.link/test/7.png",
            "https://kde.link/test/8.png", "https://kde.link/test/8.png",
            "https://kde.link/test/9.png", "https://kde.link/test/9.png",
        ],


        matrix: [],
        stack: [],
        cells: "",

        variables: {
            countOpenPictures: 0,
            firstOpenImageSRC: null,
            secondOpenImageSRC: null,
        },



        field: document.getElementById("fieldForGame"),

        getNumber: function(max, min) {
            let rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        },

        randomArrValue: function(a, b) {
            return Math.random() - 0.5;
        },

        makeMaxBord: function(arr) { // get required number of images
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
            let elemX = element.dataset.x;
            let elemY = element.dataset.y;
            let propsClass = element.classList;

            if (!propsClass.contains(app.CLASSES.CELLS)) { return false }

            if (app.variables.countOpenPictures > 1) {
                if (app.variables.firstOpenImageSRC === app.variables.secondOpenImageSRC) {
                    let box = document.querySelectorAll("." + app.CLASSES.CHOSEN);
                    box[0].classList.add(app.CLASSES.SHOT);
                    box[1].classList.add(app.CLASSES.SHOT);
                }
                app.hideAllImages(e);
                console.log(app.variables.countOpenPictures);


            }

            if (propsClass.contains(app.CLASSES.SHADOW)) {
                if (app.variables.firstOpenImageSRC === null) {
                    app.variables.firstOpenImageSRC = "url(" + app.matrix[elemX][elemY].src + ")";
                } else {
                    app.variables.secondOpenImageSRC = "url(" + app.matrix[elemX][elemY].src + ")";
                }
                app.variables.countOpenPictures++;
                propsClass.remove(app.CLASSES.SHADOW);
                propsClass.add(app.CLASSES.CHOSEN);
                //console.log(app.matrix[elemX][elemY].src);
                element.style.backgroundImage = "url(" + app.matrix[elemX][elemY].src + ")";

            } else

            if (propsClass.contains(app.CLASSES.CHOSEN)) {
                propsClass.remove(app.CLASSES.CHOSEN);
                propsClass.add(app.CLASSES.SHADOW);
                app.variables.countOpenPictures--;
                element.style.backgroundImage = "";
            }






            /*
            if (app.variables.countOpenPictures === 0) {
                app.variables.firstOpenImageSRC = app.matrix[elemX][elemY].src;
            }
            if (app.variables.countOpenPictures === 1) {
                app.variables.secondOpenImageSRC = app.matrix[elemX][elemY].src;
            }
            //console.log(elemX, elemY)

*/
            console.log(app.variables.firstOpenImageSRC);
            console.log(app.variables.secondOpenImageSRC);

            // console.log(app.variables.countOpenPictures)
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
            let images = document.querySelectorAll("." + app.CLASSES.CHOSEN);
            app.handlehidenElement(images[0]);
            app.variables.firstOpenImageSRC = null;
            app.handlehidenElement(images[1]);
            app.variables.secondOpenImageSRC = null;
            app.variables.countOpenPictures = 0;

            //app.checkPicture(e);
        }

    }
    app.makeMaxBord(app.imgArr);
    app.setFieldParams();
    app.generateBoard();
    app.startPlay();

}