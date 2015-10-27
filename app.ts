document.write("<canvas id='mainCanvas' width='400px' height='800px '  style='border:1px solid #000000;'></canvas>");

var canvas   = <HTMLCanvasElement> document.getElementById("mainCanvas")

var context = canvas.getContext("2d")
var cellSize: number = 40
var tick: number = 1000
var droppedCells:  Array< [number, number]> = []

var activeFigure:  Array< [number, number]> = [
    [0,1],
    [1,1],
    [1,2],
    [1,3]
]

var activePosition : [number, number] = [5,5]


document.onkeydown = (evt)=> {
    var evt = evt || window.event

    switch (evt.keyCode) {
        case 37:
            console.log("left")
            break;
        case 38:
            console.log("rotate")
            break;
        case 39:
            console.log("right")
            break;
        case 40:
            console.log("down")
            break;
        default:
            console.log(evt.keyCode)
    }
};

droppedCells.push([0,0])
droppedCells.push([1,0])
droppedCells.push([2,0])
droppedCells.push([3,0])
droppedCells.push([4,0])
droppedCells.push([5,0])
droppedCells.push([6,0])
droppedCells.push([7,0])
droppedCells.push([7,1])
droppedCells.push([9,0])
droppedCells.push([9,1])
droppedCells.push([9,2])

function drawCanvas(){
    context.save()
    context.translate(0, canvas.height)
    context.scale(1, -1);

    for (var tuple in droppedCells){
        context.fillRect(droppedCells[tuple][0] * cellSize, droppedCells[tuple][1]*cellSize, cellSize, cellSize)
    }

    for (var tuple in activeFigure){
        context.fillRect((activePosition[0] +  activeFigure[tuple][0]) * cellSize, (activePosition[1] + activeFigure[tuple][1])*cellSize, cellSize, cellSize)
    }

    context.restore()
}

setInterval(()=>{

        drawCanvas()

    }
    ,tick);