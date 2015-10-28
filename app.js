var Orientation;
(function (Orientation) {
    Orientation[Orientation["Up"] = 0] = "Up";
    Orientation[Orientation["Right"] = 1] = "Right";
    Orientation[Orientation["Down"] = 2] = "Down";
    Orientation[Orientation["Left"] = 3] = "Left";
})(Orientation || (Orientation = {}));
var Figure;
(function (Figure) {
    Figure[Figure["El"] = 0] = "El";
    Figure[Figure["BackEl"] = 1] = "BackEl";
    Figure[Figure["Cube"] = 2] = "Cube";
    Figure[Figure["Stick"] = 3] = "Stick";
    Figure[Figure["Gee"] = 4] = "Gee";
    Figure[Figure["BackGee"] = 5] = "BackGee";
    Figure[Figure["Piramide"] = 6] = "Piramide";
})(Figure || (Figure = {}));
var Figures = (function () {
    function Figures() {
    }
    return Figures;
})();
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
            if (canMove(activeFigure, [activePosition[0], activePosition[1] + 1])) {
                var newFigure = getFigure(activeShape, getNextOrientation(activeOrientation));
                if (!canMove(newFigure, activePosition))
                    return;
                activeFigure = newFigure;
                activeOrientation = getNextOrientation(activeOrientation);
            }
            break;
        default:
            console.log(activePosition[1]);
    }
    console.log(activePosition[1]);
    drawCanvas();
};
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
        if (position[0] + item[0] >= width || position[0] + item[0] < 0 || position[1] + item[1] < 0)
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
function getNextOrientation(orientation) {
    switch (orientation) {
        case 2 /* Down */: return 3 /* Left */;
        case 3 /* Left */: return 0 /* Up */;
        case 0 /* Up */: return 1 /* Right */;
        case 1 /* Right */: return 2 /* Down */;
    }
}
function getFigure(figure, orientation) {
    switch (figure) {
        case 1 /* BackEl */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[0, 2], [0, 3], [1, 2], [2, 2]];
                case 1 /* Right */:
                    return [[1, 1], [1, 2], [1, 3], [2, 3]];
                case 2 /* Down */:
                    return [[0, 2], [1, 2], [2, 2], [2, 1]];
                case 3 /* Left */:
                    return [[0, 1], [1, 1], [1, 2], [1, 3]];
            }
            break;
        case 5 /* BackGee */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[1, 1], [1, 2], [2, 2], [2, 3]];
                case 1 /* Right */:
                    return [[1, 2], [2, 1], [2, 2], [3, 1]];
                case 2 /* Down */:
                    return [[1, 1], [1, 2], [2, 2], [2, 3]];
                case 3 /* Left */:
                    return [[1, 2], [2, 1], [2, 2], [3, 1]];
            }
            break;
        case 2 /* Cube */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];
                case 1 /* Right */:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];
                case 2 /* Down */:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];
                case 3 /* Left */:
                    return [[1, 1], [1, 2], [2, 1], [2, 2]];
            }
            break;
        case 0 /* El */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[0, 2], [1, 2], [2, 2], [2, 3]];
                case 1 /* Right */:
                    return [[1, 1], [1, 2], [1, 3], [2, 1]];
                case 2 /* Down */:
                    return [[0, 2], [0, 3], [1, 3], [2, 3]];
                case 3 /* Left */:
                    return [[1, 3], [2, 3], [2, 2], [2, 1]];
            }
            break;
        case 4 /* Gee */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[1, 3], [1, 2], [2, 2], [2, 1]];
                case 1 /* Right */:
                    return [[0, 1], [1, 1], [1, 2], [2, 2]];
                case 2 /* Down */:
                    return [[1, 3], [1, 2], [2, 2], [2, 1]];
                case 3 /* Left */:
                    return [[0, 1], [1, 1], [1, 2], [2, 2]];
            }
            break;
        case 6 /* Piramide */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[1, 1], [2, 1], [2, 2], [3, 1]];
                case 1 /* Right */:
                    return [[1, 1], [1, 2], [1, 3], [2, 2]];
                case 2 /* Down */:
                    return [[1, 2], [2, 2], [3, 2], [2, 1]];
                case 3 /* Left */:
                    return [[2, 1], [2, 2], [2, 3], [1, 2]];
            }
            break;
        case 3 /* Stick */:
            switch (orientation) {
                case 0 /* Up */:
                    return [[1, 0], [1, 1], [1, 2], [1, 3]];
                case 1 /* Right */:
                    return [[0, 1], [1, 1], [2, 1], [3, 1]];
                case 2 /* Down */:
                    return [[1, 0], [1, 1], [1, 2], [1, 3]];
                case 3 /* Left */:
                    return [[0, 1], [1, 1], [2, 1], [3, 1]];
            }
            break;
    }
    return [[0, 1], [1, 1], [1, 1], [3, 1]];
}
document.write("<canvas id='mainCanvas' width='400px' height='800px '  style='border:1px solid #000000;'></canvas>");
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var cellSize = 40;
var width = 10;
var heigth = 20;
var tick = 1000;
var droppedCells = [];
var activeFigure = null;
var nextFigure = null;
var nextShape;
var activeShape;
var activeOrientation;
var activePosition = [5, 10];
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function getFigureOnTheField(figure, position) {
    return figure.map(function (item) {
        return [item[0] + position[0], item[1] + position[1]];
    });
}
newFigure();
function newFigure() {
    activePosition = [4, 18];
    if (nextFigure == null) {
        nextShape = getRandomArbitrary(0, 6);
        nextFigure = getFigure(nextShape, 0 /* Up */);
    }
    activeFigure = nextFigure;
    activeShape = nextShape;
    activeOrientation = 0 /* Up */;
    nextShape = getRandomArbitrary(0, 6);
    nextFigure = getFigure(nextShape, 0 /* Up */);
}
setInterval(function () {
    var positionLower = [activePosition[0], activePosition[1] - 1];
    if (!canMove(activeFigure, positionLower)) {
        droppedCells = droppedCells.concat(getFigureOnTheField(activeFigure, activePosition));
        newFigure();
    }
    else {
        activePosition = [activePosition[0], activePosition[1] - 1];
    }
    if (!canMove(activeFigure, activePosition))
        droppedCells = [];
    drawCanvas();
}, tick);
//# sourceMappingURL=app.js.map