var Orientation;
(function (Orientation) {
    Orientation[Orientation["Up"] = 0] = "Up";
    Orientation[Orientation["Right"] = 1] = "Right";
    Orientation[Orientation["Down"] = 2] = "Down";
    Orientation[Orientation["Left"] = 3] = "Left";
})(Orientation || (Orientation = {}));
var Figures = (function () {
    function Figures() {
    }
    return Figures;
})();
document.write("<canvas id='mainCanvas' width='400px' height='800px '  style='border:1px solid #000000;'></canvas>");
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var cellSize = 40;
var width = 10;
var heigth = 20;
var tick = 1000;
var droppedCells = [];
var activeFigure = [
    [0, 1],
    [1, 1],
    [1, 2],
    [1, 3]
];
var activePosition = [5, 10];
document.onkeydown = function (evt) {
    var evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            if (canMove(activeFigure, [activePosition[0] - 1, activePosition[1]]))
                activePosition[0]--;
            break;
        case 40:
            if (canMove(activeFigure, [activePosition[0], activePosition[1] - 1]))
                --activePosition[1];
            break;
        case 39:
            if (canMove(activeFigure, [activePosition[0] + 1, activePosition[1]]))
                activePosition[0]++;
            break;
        case 38:
            if (canMove(activeFigure, [activePosition[0], activePosition[1] + 1]))
                ++activePosition[1];
            break;
        default:
            console.log(activePosition[1]);
    }
    console.log(activePosition[1]);
    drawCanvas();
};
droppedCells.push([0, 0]);
droppedCells.push([1, 0]);
droppedCells.push([2, 0]);
droppedCells.push([3, 0]);
droppedCells.push([4, 0]);
droppedCells.push([5, 0]);
droppedCells.push([6, 0]);
droppedCells.push([7, 0]);
droppedCells.push([7, 1]);
droppedCells.push([9, 0]);
droppedCells.push([9, 1]);
droppedCells.push([9, 2]);
function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);
    for (var tuple in droppedCells) {
        context.fillRect(droppedCells[tuple][0] * cellSize, droppedCells[tuple][1] * cellSize, cellSize, cellSize);
    }
    for (var tuple in activeFigure) {
        context.fillRect((activePosition[0] + activeFigure[tuple][0]) * cellSize, (activePosition[1] + activeFigure[tuple][1]) * cellSize, cellSize, cellSize);
    }
    context.restore();
}
function canMove(figure, position) {
    if (figure.filter(function (item, index) {
        if (position[0] + item[0] >= width || position[0] + item[0] < 0 || position[1] + item[1] >= heigth || position[1] + item[1] < 0)
            return true;
        return false;
    }).length > 0)
        return false;
    if (figure.filter(function (item, index) {
        if (droppedCells.filter(function (cell, index) {
            if (cell[0] == position[0] + item[0] && cell[1] == position[1] + item[1])
                return true;
            else
                return false;
        }).length > 0)
            return true;
        else
            return false;
    }).length > 0)
        return false;
    return true;
}
function rotateCW(figure, orientation) {
    return figure;
}
function rotateCCW(figure, orientation) {
    return figure;
}
setInterval(function () {
    drawCanvas();
}, tick);
//# sourceMappingURL=app.js.map