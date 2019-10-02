// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;

// get the container element
var gameBoardContainer = document.getElementById("gameboard");
var helpCheckbox = document.getElementById("help");


// make the grid columns and rows
for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {

    // create a new div HTML element for each grid square and make it the right size
    var square = document.createElement("div");
    gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
    square.id = 's' + j + i;

    // set each grid square's coordinates: multiples of the current row or column number
    var topPosition = j * squareSize;
    var leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    square.style.top = topPosition + 'px';
    square.style.left = leftPosition + 'px';
  }
}

// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", fireTorpedo, false);
helpCheckbox.addEventListener("click", changeHelp, false);

/*
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)

   0 = empty, 1 = a sunken part of a ship, 2 = a missed shot
*/
var HIT = 1;
var FAIL = 2;

var gameBoard = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

var shipsBoard =  [
  [0,0,0,4,4,4,4,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,3,0,0,0],
  [5,0,0,0,0,0,3,1,1,1],
  [5,0,0,0,0,0,0,0,0,0],
  [5,0,0,2,0,0,0,0,0,0],
  [5,0,0,2,0,0,0,0,0,0],
  [5,0,0,0,0,0,0,0,0,0]
];
var help = false;

function changeHelp(e) {
  help = e.target.checked;
}

function countShipCells(board) {
  const reducer = (accumulator, currentValue) => currentValue > 0 ? accumulator + 1 : accumulator;
  return board.flat().reduce(reducer)
}

function countHits(board, hitType) {
  const reducer = (accumulator, currentValue) => currentValue === hitType ? accumulator + 1 : accumulator;
  const plainArray = board.flat();
  return plainArray.reduce(reducer);
}

// transform matrix in one column
function getColumn(col, board) {
  return board.map((current) => current[col]);
}

// transform matrix in one row
function getRow(row, board) {
  return board[row];
}

function colShipCellHits(shipType, shipsCol, gameCol) {
  const col = [];
  shipsCol.forEach((current, index) => {
    col.push(0);
    if (current === shipType) {
      if (gameCol[index] > 0 && gameCol[index] < 2) {
        col[index] = 1;
      }
    }
  });
  return col;
}

function rowShipCellHits(shipType, shipsRow, gameRow) {
  const row = [];
  shipsRow.forEach((current, index) => {
    row.push(0);
    if (current === shipType) {
      if (gameRow[index] > 0 && gameRow[index] < 2) {
        row[index] = 1;
      }
    }
  });
  return row;
}

function getShipSize(shipType, array) {
  return array.reduce((acc, current) => current === shipType ? acc + 1 : acc, 0)
}

function fireTorpedo(e) {
  if (e.target !== e.currentTarget) {
    var row = e.target.id.substring(1,2);
    var col = e.target.id.substring(2,3);

    if (gameBoard[row][col] < 1 && shipsBoard[row][col] === 0) {
      e.target.style.background = '#bbb';
      // set this square's value to 2 to indicate that they fired and missed
      gameBoard[row][col] = FAIL;

      // if player clicks a square with a ship, change the color and change square's value
    } else if (gameBoard[row][col] < 1 && shipsBoard[row][col] > 0) {
      e.target.style.background = 'red';
      // set this square's value to 1 to indicate the ship has been hit
      gameBoard[row][col] = HIT;

      if (help) {
        const shipType = shipsBoard[row][col];

        // get a copy of shipsBoard row and col
        const shipsBoardRow = getRow(row, shipsBoard);
        const shipsBoardCol = getColumn(col, shipsBoard);

        // get a copy of gameBoard row and col
        const gameBoardRow = getRow(row, gameBoard);
        const gameBoardCol = getColumn(col, gameBoard);

        // get a row of hits of same ship
        const rowHitsArray = rowShipCellHits(shipType, shipsBoardRow, gameBoardRow);
        // get a row of hits of same ship
        const colHitsArray = colShipCellHits(shipType, shipsBoardCol, gameBoardCol);

        // count of ship in same row
        const countShipsInRow = shipsBoardRow.reduce((acc, cur) => cur === shipType ? acc + 1 : acc, 0);
        // count of ship in same col
        const countShipsInCol = shipsBoardCol.reduce((acc, cur) => cur === shipType ? acc + 1 : acc, 0);

        // count of hit of ship in same row
        const countHitsInRow = rowHitsArray.reduce((acc, cur) => cur === 1 ? acc + 1 : acc, 0);
        // count of hit of ship in same col
        const countHitsInCol = colHitsArray.reduce((acc, cur) => cur === 1 ? acc + 1 : acc, 0);

        // get the size of a ship
        const sizeRow = getShipSize(shipType, shipsBoardRow)
        const sizeCol = getShipSize(shipType, shipsBoardCol)
        let shipSize = 0;
        if (sizeRow >= sizeCol) {
          shipSize = sizeRow;
        } else if (sizeRow < sizeCol) {
          shipSize = sizeCol
        }
        // alert when ship is almost sunk
        // alert when ship is sunk
        alert(`Battleship type ${shipType} with size ${shipSize} is hit`);
        if (countShipsInRow < countShipsInCol) {
          if (countShipsInCol === countHitsInCol + 1) {
            alert(`Battleship type ${shipType} is almost sunk`);
          } else if (countShipsInCol === countHitsInCol) {
            alert(`Battleship type ${shipType} is almost sunk`);
          }
        } else if (countShipsInRow > countShipsInCol) {
          if (countShipsInRow === countHitsInRow + 1) {
            alert(`Battleship type ${shipType} is almost sunk`);
          } else if (countShipsInRow === countHitsInRow) {
            alert(`Battleship type ${shipType} is sunk`);
          }
        }
      }
      // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
      if (countHits(gameBoard, HIT) === countShipCells(shipsBoard)) {
        alert("All enemy battleships have been defeated! You win!");
      }

      // if player clicks a square that's been previously hit, let them know
    } else if (gameBoard[row][col] > 0) {
      alert("Stop wasting your torpedos! You already fired at this location.");
    }
  }
  e.stopPropagation();
}
