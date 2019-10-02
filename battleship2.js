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
  // TODO
}

function countHits(board, hitType) {
  // TODO
}

// transform matrix in one column
function getColumn(col, board) {
  // TODO
}

// transform matrix in one row
function getRow(row, board) {
  // TODO
}

function colShipCellHits(shipType, shipsCol, gameCol) {
  // TODO
}

function rowShipCellHits(shipType, shipsRow, gameRow) {
 // TODO
}

function getShipSize(shipType, array) {
  // TODO
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

        // get a copy of gameBoard row and col

        // get a row of hits of same ship

        // get a row of hits of same ship


        // count of ship in same row

        // count of ship in same col


        // count of hit of ship in same row

        // count of hit of ship in same col

        // get the size of a ship

        // alert when ship is almost sunk
        // alert when ship is sunk
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
