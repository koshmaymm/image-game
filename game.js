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

    let app = {

        fieldParams: {
            width: 0,
            height: 0
        },
        imgArr: ["https://kde.link/test/0.png", "https://kde.link/test/1.png", "https://kde.link/test/2.png",
            "https://kde.link/test/3.png", "https://kde.link/test/4.png", "https://kde.link/test/5.png",
            "https://kde.link/test/6.png", "https://kde.link/test/7.png", "https://kde.link/test/8.png",
            "https://kde.link/test/9.png"
        ],
        matrix: [],
        stack: [],
        cells: "",
        countOpenPictures: 0,
        field: document.getElementById("fieldForGame"),

        getNumber: function(max, min) {
            let rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        },
        setFieldParams: function() {
            app.fieldParams.width = app.getNumber(8, 2);
            app.fieldParams.height = app.getNumber(8, 2);
            //
            if (app.fieldParams.width < app.fieldParams.height) {
                let num = app.fieldParams.width;
                app.fieldParams.width = app.fieldParams.height;
                app.fieldParams.height = num;
            }
            //
            if ((app.fieldParams.width * app.fieldParams.height) % 2 !== 0) {
                app.fieldParams.height++;
            }


        },
        generateBoard: function() {
            let full = false;
            let total = app.fieldParams.width * app.fieldParams.height;

            while (!full) {
                let imgURL = app.getRandomImgURL();
                let countImageURL = app.countSameImages(imgURL);

                console.log(imgURL, countImageURL)

                app.stack.push(imgURL);
                if (app.stack.length >= (total)) {
                    full = true;
                }
            }

        },
        countSameImages: function(url) {
            let count = 0;
            app.stack.forEach(function(a) {
                if (url === a) {
                    count++;
                }
            })
            return count;
        },
        startPlay: function() {
            start.addEventListener("click", app.setField, false);

        },
        setField: function() {
            app.setGrid();
            console.log(app.matrix);
            app.pushCells();
            app.pushImgs();
            app.testFunc();
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
            cell.classList.add("cells");
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
                        isChoosen: false,
                        isDeleted: false
                    };
                }
                app.field.appendChild(row);
            }
        },

        pushCells: function() {
            app.cells = document.querySelectorAll(".cells");
        },

        pushImgs: function() {
            //console.log(app.cells);
            for (let i = 0; i < app.cells.length; i++) {
                app.cells[i].classList.add("shadow");
            }

        },
        testFunc: function() {
            for (let i = 0; i < app.cells.length; i++) {
                app.cells[i].addEventListener("click", app.checkPicture, false);
            }

        },
        checkPicture: function(e) {
            app.countOpenPictures++;
            console.log(e.target.dataset.x, e.target.dataset.y)
            if (e.target.classList.contains("shadow")) {
                e.target.classList.remove("shadow");
            } else {
                e.target.classList.add("shadow");
                app.countOpenPictures--;
            }
        },
        getRandomImgURL: function() {
            return app.imgArr[app.getNumber(app.imgArr.length - 1, 0)]
        }

    }

    app.setFieldParams();
    app.generateBoard();
    app.startPlay();

}