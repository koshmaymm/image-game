let app;
(function() {

    app = {

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

        variables: {
            field: document.getElementById("fieldForGame"),
            matrix: [],
            stack: [],
            cells: "",
            newImgArr: [],
            firstOpenImage: null,
            secondOpenImage: null,
            times: 999,
            totalScore: 0,
            totalCells: 0,
            countTime: null
        },

        getNumber: function(max, min) {
            let rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        },

        randomArrValue: function(a, b) {
            return Math.random() - 0.5;
        },


        makeMaxBord: function() { // get required number of images
            app.variables.newImgArr = app.imgArr;
            app.variables.newImgArr = app.variables.newImgArr.concat(app.variables.newImgArr).concat(app.variables.newImgArr).concat(app.variables.newImgArr);
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
            app.variables.newImgArr = app.variables.newImgArr.splice(0, num);
            //random sort images
            app.variables.newImgArr = app.variables.newImgArr.sort(function(a, b) { return 0.5 - Math.random() });
            app.variables.newImgArr = app.variables.newImgArr.sort(function(a, b) { return 0.5 - Math.random() });
        },

        generateBoard: function() {
            let total = app.fieldParams.width * app.fieldParams.height;
            app.generateField(total);
            for (let i = 0; i < app.variables.newImgArr.length; i++) {
                let imgURL = app.variables.newImgArr[i];
                app.variables.stack.push(imgURL);
            }
        },

        startPlay: function() {
            start.addEventListener("click", app.setField, false);

        },
        removeStart: function() {
            start.removeEventListener("click", app.setField, false);
        },

        setField: function() {
            app.variables.field.innerHTML = "";
            total.innerHTML = "0";
            app.setGrid();
            app.pushCells();
            app.pushImgs();
            app.addEvents();
            app.removeStart();
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
                app.variables.matrix[i] = [];

                for (let j = 0; j < app.fieldParams.width; j++) {
                    let cell = app.createCell(i, j);
                    row.appendChild(cell);
                    app.variables.matrix[i][j] = {
                        src: app.variables.stack.pop()
                    };
                }
                app.variables.field.appendChild(row);
            }
        },

        pushCells: function() {
            app.variables.cells = app.variables.field.querySelectorAll("." + app.CLASSES.CELLS);
        },

        pushImgs: function() {
            for (let i = 0; i < app.variables.cells.length; i++) {
                app.variables.cells[i].classList.add(app.CLASSES.SHADOW);
            }
        },

        addEvents: function() {
            app.variables.field.addEventListener("click", app.checkPicture, false);
            app.variables.countTime = null;
            app.totalCount();
        },

        tryShot: function() {
            let p1 = app.variables.firstOpenImage,
                p2 = app.variables.secondOpenImage;

            if ((p1 !== null) && (p2 !== null) && (p1.style.backgroundImage == p2.style.backgroundImage)) {
                let box = app.variables.field.querySelectorAll("." + app.CLASSES.CHOSEN);
                box[0].classList.add(app.CLASSES.SHOT);
                box[1].classList.add(app.CLASSES.SHOT);
                box[0].classList.remove(app.CLASSES.SHADOW);
                box[1].classList.remove(app.CLASSES.SHADOW);
                app.scoreCount();
                app.showResult();
            }
        },

        checkPicture: function(e) {

            let element = e.target;
            let propsClass = element.classList;
            let img1 = app.variables.firstOpenImage;
            let img2 = app.variables.secondOpenImage;

            if (!propsClass.contains(app.CLASSES.CELLS)) { return false }

            if (!img1) {
                app.variables.firstOpenImage = element;
                app.showImage(e);
                app.tryShot();
            } else
            if ((img1) && ((element.dataset.x === img1.dataset.x) && (element.dataset.y === img1.dataset.y))) {
                app.verifyBox(e);
            } else
            if ((img1) && (!img2)) {
                app.variables.secondOpenImage = element;
                app.showImage(e);
                app.tryShot();
            } else
            if ((img2) && ((element.dataset.x === img2.dataset.x) && (element.dataset.y === img2.dataset.y))) {
                app.verifyBox(e);
            } else if ((img1) && (!img2)) {
                img2 = element;
            } else if ((img1) && (img2)) {
                app.hideAllImages();
                app.checkPicture(e);
            }
        },

        verifyBox: function(e) {
            if ((app.variables.firstOpenImage.dataset.x === e.target.dataset.x) && (app.variables.firstOpenImage.dataset.y === e.target.dataset.y)) {
                app.variables.firstOpenImage = null;
                app.handleHiddenElement(e.target);
            } else if ((app.variables.secondOpenImage) && (app.variables.secondOpenImage.dataset.x === e.target.dataset.x) && (app.variables.secondOpenImage.dataset.y === e.target.dataset.y)) {
                app.variables.secondOpenImage = null;
                app.handleHiddenElement(e.target);
            }
        },

        showImage: function(e) {
            e.target.classList.remove(app.CLASSES.SHADOW);
            e.target.classList.add(app.CLASSES.CHOSEN);
            e.target.style.backgroundImage = "url(" + app.variables.matrix[e.target.dataset.x][e.target.dataset.y].src + ")";
        },

        getRandomImgURL: function() {
            return app.variables.newImgArr[app.getNumber(app.variables.newImgArr.length - 1, 0)]
        },

        handleHiddenElement: function(e) {
            e.classList.remove(app.CLASSES.CHOSEN);
            e.classList.add(app.CLASSES.SHADOW);
            e.style.backgroundImage = null;
        },

        hideAllImages: function(e) {
            let images = app.variables.field.querySelectorAll("." + app.CLASSES.CHOSEN);
            app.variables.firstOpenImage = null;
            app.variables.secondOpenImage = null;
            app.handleHiddenElement(images[0]);
            app.handleHiddenElement(images[1]);
        },

        totalCount: function() {
            app.variables.countTime = setInterval(function() {
                time.innerHTML = app.variables.times--;
                if (app.variables.times <= 0) {
                    clearInterval(app.variables.countTime)
                    time.innerHTML = "You loose !";
                }
            }, 1000);
        },

        scoreCount: function() {
            app.variables.totalScore += Math.floor(app.variables.times / 100);
            total.innerHTML = app.variables.totalScore;
        },

        clearImgParams: function() {
            app.variables.firstOpenImage = null;
            app.variables.secondOpenImage = null;
            app.variables.times = 999;
            app.variables.totalScore = 0;
        },

        showResult: function() {
            let balance = app.variables.field.querySelectorAll("." + app.CLASSES.SHOT);
            if (balance.length >= (app.fieldParams.width * app.fieldParams.height)) {
                clearInterval(app.variables.countTime)
                app.variables.field.innerHTML = "<p> You total result is </p> " + app.variables.totalScore + "<p>Points</p>";
                app.clearImgParams();
                this.init();
            }
        },

        init: function() {
            app.makeMaxBord();
            app.setFieldParams();
            app.generateBoard();
            app.startPlay();
        }
    }

})();