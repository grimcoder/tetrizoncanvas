enum Orientation {
    Up,
    Right,
    Down,
    Left
}

enum Figure{
    El,
    BackEl,
    Cube,
    Stick,
    Gee,
    BackGee,
    Piramide
}

class BoardFigure {
    figure:Figure;
    orientation:Orientation
}

document.onkeydown = (evt)=> {
    var evt = evt || window.event;

    switch (evt.keyCode) {

        case 37:
            if (canMove(activeBoardFigure, [activePosition[0] - 1, activePosition[1]]))
                activePosition[0]--;
            break;

        case 40:
            if (canMove(activeBoardFigure, [activePosition[0], activePosition[1] - 1]))
                --activePosition[1];
            break;

        case 39:
            if (canMove(activeBoardFigure, [activePosition[0] + 1, activePosition[1]]))
                activePosition[0]++;
            break;

        case 38: //Rotate
            if (canMove(activeBoardFigure, [activePosition[0], activePosition[1] + 1])) {
                var newFigure = new BoardFigure();
                newFigure.figure = activeBoardFigure.figure;
                newFigure.orientation = getNextOrientation(activeBoardFigure.orientation);

                if (!canMove(newFigure, activePosition)) return;
                activeBoardFigure = newFigure

            }
            break;


        default:
            console.log(activePosition[1])
    }
    console.log(activePosition[1]);
    drawCanvas()
};

function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);

    for (var tuple in droppedCells) {
        context.fillRect(droppedCells[tuple][0] * cellSize, droppedCells[tuple][1] * cellSize, cellSize, cellSize)
    }

    for (var tuple in getFigure(activeBoardFigure)) {
        context.fillRect((activePosition[0] + getFigure(activeBoardFigure)[tuple][0]) * cellSize, (activePosition[1] + getFigure(activeBoardFigure)[tuple][1]) * cellSize, cellSize, cellSize)
    }

    context.restore()
}

function canMove(figure:BoardFigure, position:[number, number]):boolean {


    if (getFigure(figure).filter((item, index) => {

            if (position[0] + item[0] >= width ||
                position[0] + item[0] < 0 ||
                    //position[1] + item[1] >= heigth ||
                position[1] + item[1] < 0) return true;
            return false
        }).length > 0) return false;

    if (getFigure(figure).filter((item, index) => {
            if (droppedCells.filter((cell, index) => {
                    if (cell[0] == position[0] + item[0] && cell[1] == position[1] + item[1]) return true;
                    else return false
                }).length > 0) return true;
            else return false
        }).length > 0) return false;
    return true
}

function getNextOrientation(orientation:Orientation) {

    switch (orientation) {
        case Orientation.Down:
            return Orientation.Left;
        case Orientation.Left:
            return Orientation.Up;
        case  Orientation.Up:
            return Orientation.Right;
        case Orientation.Right:
            return Orientation.Down;
    }
}

function getFigure(figure:BoardFigure):Array<[number, number]> {

    switch (figure.figure) {
        case Figure.BackEl:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[0, 2], [0, 3], [1, 2], [2, 2]];
                case Orientation.Right:
                    return [[1, 1], [1, 2], [1, 3], [2, 3]];

                case Orientation.Down:
                    return [[0, 2], [1, 2], [2, 2], [2, 1]];
                case Orientation.Left:
                    return [[0, 1], [1, 1], [1, 2], [1, 3]];
            }
            break;
        case Figure.BackGee:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[1, 1], [1, 2], [2, 2], [2, 3]];
                case Orientation.Right:
                    return [[1, 2], [2, 1], [2, 2], [3, 1]];
                case Orientation.Down:
                    return [[1, 1], [1, 2], [2, 2], [2, 3]];
                case Orientation.Left:
                    return [[1, 2], [2, 1], [2, 2], [3, 1]];
            }
            break;
        case Figure.Cube:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];
                case Orientation.Right:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];

                case Orientation.Down:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];

                case Orientation.Left:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];

            }
            break;
        case Figure.El:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[0, 2], [1, 2], [2, 2], [2, 3]];

                case Orientation.Right:
                    return [[1, 1], [1, 2], [1, 3], [2, 1]];

                case Orientation.Down:
                    return [[0, 2], [0, 3], [1, 3], [2, 3]];

                case Orientation.Left:
                    return [[1, 3], [2, 3], [2, 2], [2, 1]];

            }
            break;

        case Figure.Gee:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[1, 3], [1, 2], [2, 2], [2, 1]];

                case Orientation.Right:
                    return [[0, 1], [1, 1], [1, 2], [2, 2]];

                case Orientation.Down:
                    return [[1, 3], [1, 2], [2, 2], [2, 1]];

                case Orientation.Left:
                    return [[0, 1], [1, 1], [1, 2], [2, 2]];

            }
            break;


        case Figure.Piramide:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[1, 1], [2, 1], [2, 2], [3, 1]];

                case Orientation.Right:
                    return [[1, 1], [1, 2], [1, 3], [2, 2]];

                case Orientation.Down:
                    return [[1, 2], [2, 2], [3, 2], [2, 1]];

                case Orientation.Left:
                    return [[2, 1], [2, 2], [2, 3], [1, 2]];

            }
            break;

        case Figure.Stick:
            switch (figure.orientation) {

                case Orientation.Up:
                    return [[1, 0], [1, 1], [1, 2], [1, 3]];

                case Orientation.Right:
                    return [[0, 1], [1, 1], [2, 1], [3, 1]];

                case Orientation.Down:
                    return [[1, 0], [1, 1], [1, 2], [1, 3]];

                case Orientation.Left:
                    return [[0, 1], [1, 1], [2, 1], [3, 1]];

            }
            break;

    }

    return [[0, 1], [1, 1], [1, 1], [3, 1]];

}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getFigureOnTheField(figure:Array<[number, number]>, position:[number, number]):Array<[number, number]> {
    return figure.map((item)=> {
        return <[number, number]>[item[0] + position[0], item[1] + position[1]]
    });
}

function newFigure():void {

    activePosition = [4, 18];

    if (nextBoardFigure == null) {
        nextBoardFigure = new BoardFigure();
        nextBoardFigure.figure = <Figure> getRandomArbitrary(0, 6);
        nextBoardFigure.orientation = Orientation.Up
    }

    activeBoardFigure = nextBoardFigure;
    nextBoardFigure = new BoardFigure();
    nextBoardFigure.figure = <Figure> getRandomArbitrary(0, 6);
    nextBoardFigure.orientation = Orientation.Up
}

function removeFullLines(){
    for(var i : number = 0; i<heigth; i++){

        if (droppedCells.filter((item, index)=>{
                return item[1] == i
            }).length == width){

            droppedCells = droppedCells.filter((item, index)=>{
                return item[1] != i
            });

            droppedCells.map((item)=>{
                if (item[1] > i) item[1]--
            });
            i--
        }
    }
}

var canvas = <HTMLCanvasElement> document.getElementById("mainCanvas");

var context = canvas.getContext("2d");

var cellSize:number = 40;

var width:number = 10;

var heigth:number = 20;

var tick:number = 1000;

var droppedCells:Array< [number, number]> = [];

var nextBoardFigure:BoardFigure = null;

var activeBoardFigure:BoardFigure = null;

var activePosition:[number, number] = [5, 10];


//particles
(()=>{
        var canvas2 = <HTMLCanvasElement> document.getElementById('mainCanvas2')
        var ctx = canvas2.getContext('2d'),
        particles = [],
        patriclesNum = 500,
        w = 400,
        h = 800,
        colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];
    ctx.globalAlpha = 0.1



    function Factory(){
        this.x =  Math.round( Math.random() * w);
        this.y =  Math.round( Math.random() * h);
        this.rad = Math.round( Math.random() * 1) + 1;
        this.rgba = colors[ Math.round( Math.random() * 3) ];
        this.vx = Math.round( Math.random() * 3) - 1.5;
        this.vy = Math.round( Math.random() * 3) - 1.5;
    }

    function draw(){
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for(var i = 0;i < patriclesNum; i++){
            var temp = particles[i];
            var factor = 1;

            for(var j = 0; j<patriclesNum; j++){

                var temp2 = particles[j];
                ctx.linewidth = 0.5;

                if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<50){
                    ctx.strokeStyle = temp.rgba;
                    ctx.beginPath();
                    ctx.moveTo(temp.x, temp.y);
                    ctx.lineTo(temp2.x, temp2.y);
                    ctx.stroke();
                    factor++;
                }
            }


            ctx.fillStyle = temp.rgba;
            ctx.strokeStyle = temp.rgba;

            ctx.beginPath();
            ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
            ctx.stroke();
            ctx.closePath();


            temp.x += temp.vx;
            temp.y += temp.vy;

            if(temp.x > w)temp.x = 0;
            if(temp.x < 0)temp.x = w;
            if(temp.y > h)temp.y = 0;
            if(temp.y < 0)temp.y = h;
        }
    }

    function findDistance(p1,p2){
        return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
    }

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    (function init(){
        for(var i = 0; i < patriclesNum; i++){
            particles.push(new Factory);
        }
    })();

    (function loop(){
        draw();
        requestAnimFrame(loop);
    })();



})()


newFigure();

setInterval(()=> {

    var positionLower = <[number, number]>[activePosition[0], activePosition[1] - 1];
    if (!canMove(activeBoardFigure, positionLower)) {
        droppedCells = droppedCells.concat(getFigureOnTheField(getFigure(activeBoardFigure), activePosition));
        removeFullLines();
        newFigure()
    }
    else {
        activePosition = [activePosition[0], activePosition[1] - 1]
    }
    if (!canMove(activeBoardFigure, activePosition)) droppedCells = [];
    drawCanvas()
}, tick);

