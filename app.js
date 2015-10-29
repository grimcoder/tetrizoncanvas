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
var BoardFigure = (function () {
    function BoardFigure() {
    }
    return BoardFigure;
})();
document.onkeydown = function (evt) {
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
        case 38:
            if (canMove(activeBoardFigure, [activePosition[0], activePosition[1] + 1])) {
                var newFigure = new BoardFigure();
                newFigure.figure = activeBoardFigure.figure;
                newFigure.orientation = getNextOrientation(activeBoardFigure.orientation);
                if (!canMove(newFigure, activePosition))
                    return;
                activeBoardFigure = newFigure;
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
    for (var tuple in getFigure(activeBoardFigure)) {
        context.fillRect((activePosition[0] + getFigure(activeBoardFigure)[tuple][0]) * cellSize, (activePosition[1] + getFigure(activeBoardFigure)[tuple][1]) * cellSize, cellSize, cellSize);
    }
    context.restore();
}
function canMove(figure, position) {
    if (getFigure(figure).filter(function (item, index) {
        if (position[0] + item[0] >= width || position[0] + item[0] < 0 || position[1] + item[1] < 0)
            return true;
        return false;
    }).length > 0)
        return false;
    if (getFigure(figure).filter(function (item, index) {
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
        case 2 /* Down */:
            return 3 /* Left */;
        case 3 /* Left */:
            return 0 /* Up */;
        case 0 /* Up */:
            return 1 /* Right */;
        case 1 /* Right */:
            return 2 /* Down */;
    }
}
function getFigure(figure) {
    switch (figure.figure) {
        case 1 /* BackEl */:
            switch (figure.orientation) {
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
            switch (figure.orientation) {
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
            switch (figure.orientation) {
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
            switch (figure.orientation) {
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
            switch (figure.orientation) {
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
            switch (figure.orientation) {
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
            switch (figure.orientation) {
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
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function getFigureOnTheField(figure, position) {
    return figure.map(function (item) {
        return [item[0] + position[0], item[1] + position[1]];
    });
}
function newFigure() {
    activePosition = [4, 18];
    if (nextBoardFigure == null) {
        nextBoardFigure = new BoardFigure();
        nextBoardFigure.figure = getRandomArbitrary(0, 6);
        nextBoardFigure.orientation = 0 /* Up */;
    }
    activeBoardFigure = nextBoardFigure;
    nextBoardFigure = new BoardFigure();
    nextBoardFigure.figure = getRandomArbitrary(0, 6);
    nextBoardFigure.orientation = 0 /* Up */;
}
function removeFullLines() {
    for (var i = 0; i < heigth; i++) {
        if (droppedCells.filter(function (item, index) {
            return item[1] == i;
        }).length == width) {
            droppedCells = droppedCells.filter(function (item, index) {
                return item[1] != i;
            });
            droppedCells.map(function (item) {
                if (item[1] > i)
                    item[1]--;
            });
            i--;
        }
    }
}
document.write("<canvas id='mainCanvas' width='400px' height='800px '  style='border:1px solid #000000;'></canvas>");
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var cellSize = 40;
var width = 10;
var heigth = 20;
var tick = 1000;
var droppedCells = [];
var nextBoardFigure = null;
var activeBoardFigure = null;
var activePosition = [5, 10];
newFigure();
setInterval(function () {
    var positionLower = [activePosition[0], activePosition[1] - 1];
    if (!canMove(activeBoardFigure, positionLower)) {
        droppedCells = droppedCells.concat(getFigureOnTheField(getFigure(activeBoardFigure), activePosition));
        removeFullLines();
        newFigure();
    }
    else {
        activePosition = [activePosition[0], activePosition[1] - 1];
    }
    if (!canMove(activeBoardFigure, activePosition))
        droppedCells = [];
    drawCanvas();
}, tick);
//# sourceMappingURL=app.js.map