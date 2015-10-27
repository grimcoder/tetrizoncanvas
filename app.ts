document.write("<canvas id='mainCanvas' width='400px' height='800px '  style='border:1px solid #000000;'></canvas>");

var canvas   = <HTMLCanvasElement> document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var cellSize: number = 40
var droppedCells:  Array< [number, number]> = [];


document.onkeydown = (evt)=> {
    var evt = evt || window.event;

    switch (evt.keyCode) {

        case 37:
            console.log("left");
            break;
        case 38:
            console.log("rotate");
            break;
        case 39:
            console.log("right");
            break;
        case 40:
            console.log("down");
            break;
        default:
            console.log(evt.keyCode)

    }
};

context.translate(0, canvas.height);
context.scale(1, -1);


droppedCells.push([0,0]);
droppedCells.push([1,0]);
droppedCells.push([2,0]);
droppedCells.push([3,0]);
droppedCells.push([4,0]);
droppedCells.push([5,0]);
droppedCells.push([6,0]);
droppedCells.push([7,0]);
droppedCells.push([7,1]);
droppedCells.push([9,0]);
droppedCells.push([9,1]);
droppedCells.push([9,2]);

for (var tuple in droppedCells){
    context.fillRect(droppedCells[tuple][0] * cellSize, droppedCells[tuple][1]*cellSize, cellSize, cellSize);
}


