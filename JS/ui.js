
var boxes = document.getElementsByTagName("td");
var boxIds = [];
var boxIdsStatic = [];
for (i = 0; i < boxes.length; i++) {
  boxIds.push(boxes[i].id);
  boxIdsStatic.push(boxes[i].id);
}

//rows
var rowA = [];
for (i = 0; i < 3; i++) {
  rowA.push(boxes[i].id);
}

var rowB = [];
for (i = 3; i < 6; i++) {
  rowB.push(boxes[i].id);
}

var rowC = [];
for (i = 6; i < 9; i++) {
  rowC.push(boxes[i].id);
}

//columns
var colA = [];
for (i = 0; i < 9; i++) {
  if (i === 0 || i === 3 || i === 6) {
    colA.push(boxes[i].id);
  }
}

var colB = [];
for (i = 0; i < 9; i++) {
  if (i === 1 || i === 4 || i === 7) {
    colB.push(boxes[i].id);
  }
}

var colC = [];
for (i = 0; i < 9; i++) {
  if (i === 2 || i === 5 || i === 8) {
    colC.push(boxes[i].id);
  }
}

//buttons
var btnReset = document.getElementById("reset");
var btnStart = document.getElementById("start");
var btnX = document.getElementById("btnX");
var btnO = document.getElementById("btnO");

//other
var pickScreen = document.getElementById("pickScreen");
var playerSymbol = "";
var info = document.getElementById("info");
var infoText = document.getElementById("info-text");
var gamesWonText = document.getElementById("games-won");
var gamesLostText = document.getElementById("games-lost");
var gamesTiedText = document.getElementById("games-tied");
var gameIsOver = false;

/*=== Event Handlers ===*/

//reset button
btnReset.addEventListener("click", function() {
  resetGame();
});

//start button
btnStart.addEventListener("click", function() {
  //If the game has been reset
  if (boxIds.length === 9) {
    console.log("Starting game...");
    pickScreen.style.display = "flex"; 
  } else {
    displayAlert("You have to reset the game.");
  }
});

//X choice button
btnX.addEventListener("click", function() {
  pickScreen.style.display = "none";
  playerSymbol = "X";
  computerSymbol = "O";
});

//O choice button
btnO.addEventListener("click", function() {
  pickScreen.style.display = "none";
  playerSymbol = "O";
  computerSymbol = "X";
});

/*=== Functions ===*/

//boxes
for (i = 0; i < boxes.length; i++) {
  var box = boxes[i];
  box.addEventListener("click", function() {
    console.log("Box " + this.id + " clicked...");
    if (gameIsOver === true) {
      displayAlert("The game has ended.");
    } else if (playerSymbol === "") {
      displayAlert("You have to start a game first, silly.");
    } else if (this.innerHTML === "") {
      playerMove(this.id);
    } else if (this.innerHTML.length > 0) {
      displayAlert("Someone already played there!");
    }
  });
}

//reset game
function resetGame() {
  console.log("Resetting Game...");
  gameIsOver = false;
  playerSymbol = "";
  btnReset.style.animation = "none";
  for (i = 0; i < boxes.length; i++) {
    boxIds[i] = boxIdsStatic[i];
    boxes[i].innerHTML = "";
  }
  console.log("Box ID array", boxIds);
}

//player move
function playerMove(boxId) {
  console.log("Player Move...");
  var box = document.getElementById(boxId);
  box.innerHTML = playerSymbol;
  var index = boxIds.indexOf(boxId);
  boxIds.splice(index, 1); //erase this as a choice
  console.log("Box ID array", boxIds); //check the array
  var currentRowAMoves = [];
  var currentRowBMoves = [];
  var currentRowCMoves = [];
  var currentColAMoves = [];
  var currentColBMoves = [];
  var currentColCMoves = [];
  var currentDiagnoalTopLeftToBottomRightMoves = [document.getElementById(rowA[0]).innerHTML, document.getElementById(rowB[1]).innerHTML, document.getElementById(rowC[2]).innerHTML];
  var currentDiagnoalTopRightToBottomLeftMoves = [document.getElementById(rowA[2]).innerHTML, document.getElementById(rowB[1]).innerHTML, document.getElementById(rowC[0]).innerHTML];
  for (i = 0; i < 3; i++) {
    currentRowAMoves.push(document.getElementById(rowA[i]).innerHTML);
    currentRowBMoves.push(document.getElementById(rowB[i]).innerHTML);
    currentRowCMoves.push(document.getElementById(rowC[i]).innerHTML);
    currentColAMoves.push(document.getElementById(colA[i]).innerHTML);
    currentColBMoves.push(document.getElementById(colB[i]).innerHTML);
    currentColCMoves.push(document.getElementById(colC[i]).innerHTML);
  }
  
  if (box.innerHTML !== "") {
    checkWinner("player", playerSymbol, currentRowAMoves, currentRowBMoves, currentRowCMoves, currentColAMoves, currentColBMoves, currentColCMoves, currentDiagnoalTopLeftToBottomRightMoves, currentDiagnoalTopRightToBottomLeftMoves);
    }
}

//computer move
function computerMove() {
  console.log("Computer Move...");
  if (boxIds.length > 0) {
    var boxId = boxIds[Math.floor(Math.random() * boxIds.length)];
    var box = document.getElementById(boxId);
    var index = boxIds.indexOf(boxId);
    box.innerHTML = computerSymbol;
    boxIds.splice(index, 1); //erase this as a choice
    console.log("Box ID array", boxIds); //check ids 
    var currentRowAMoves = [];
    var currentRowBMoves = [];
    var currentRowCMoves = [];
    var currentColAMoves = [];
    var currentColBMoves = [];
    var currentColCMoves = [];
    var currentDiagnoalTopLeftToBottomRightMoves = [
      document.getElementById(rowA[0]).innerHTML, 
      document.getElementById(rowB[1]).innerHTML, 
      document.getElementById(rowC[2]).innerHTML
    ];
    var currentDiagnoalTopRightToBottomLeftMoves = [
      document.getElementById(rowA[2]).innerHTML, 
      document.getElementById(rowB[1]).innerHTML, 
      document.getElementById(rowC[0]).innerHTML
    ];
    for (i = 0; i < 3; i++) {
      currentRowAMoves.push(document.getElementById(rowA[i]).innerHTML);
      currentRowBMoves.push(document.getElementById(rowB[i]).innerHTML);
      currentRowCMoves.push(document.getElementById(rowC[i]).innerHTML);
      currentColAMoves.push(document.getElementById(colA[i]).innerHTML);
      currentColBMoves.push(document.getElementById(colB[i]).innerHTML);
      currentColCMoves.push(document.getElementById(colC[i]).innerHTML);
    }
    if (box.innerHTML !== "") {
      checkWinner("computer", computerSymbol, currentRowAMoves, currentRowBMoves, currentRowCMoves, currentColAMoves, currentColBMoves, currentColCMoves, currentDiagnoalTopLeftToBottomRightMoves, currentDiagnoalTopRightToBottomLeftMoves);
    }
  }
}

//display alert
function displayAlert(text) {
  console.log("Displaying Alert...");
  infoText.innerHTML = text;
  info.style.display = "block";
  setTimeout(function() {
    info.style.display = "none";
  }, 2000);
}

//game over
function gameOver(winner) {
  console.log("Game Over...");
  gameIsOver = true;
  if (winner === "player") {
    displayAlert("You have won the game!!!");
    gamesWonText.innerHTML = parseInt(gamesWonText.innerHTML) + 1;
    setTimeout(function() {
      btnReset.style.animation = "bounce 1s infinite";
    }, 2000);
  } else {
      displayAlert("The computer has won!");
    gamesLostText.innerHTML = parseInt(gamesLostText.innerHTML) + 1;
      setTimeout(function() {
      btnReset.style.animation = "bounce 1s infinite";
    }, 2000);
  }
}

//check winner
function checkWinner(currentPlayer, symbol, rowA, rowB, rowC, colA, colB, colC, currentDiagnoalTopLeftToBottomRightMoves, currentDiagnoalTopRightToBottomLeftMoves) {
  console.log("Checking if " + currentPlayer + " is the winner...");
  console.log("currentDiagnoalTopLeftToBottomRightMoves", currentDiagnoalTopLeftToBottomRightMoves);
  console.log("currentDiagnoalTopRightToBottomLeftMoves", currentDiagnoalTopRightToBottomLeftMoves);
  console.log("attempting to match " + symbol + symbol + symbol);
  if (rowA.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (rowB.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (rowC.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (colA.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (colB.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (colC.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (currentDiagnoalTopLeftToBottomRightMoves.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (currentDiagnoalTopRightToBottomLeftMoves.join("") === symbol + symbol + symbol) {
    gameOver(currentPlayer);
  } else if (boxIds.length === 0) {
    displayAlert("It's a tie :/");
    gamesTiedText.innerHTML = parseInt(gamesTiedText.innerHTML) + 1;
    setTimeout(function() {
      btnReset.style.animation = "bounce 1s infinite";
    }, 2000);
  } else {
    console.log("No Winner Yet...");
    if (currentPlayer === "player") {
      console.log("Computers Move next...");
      setTimeout(computerMove, 1000);
    }
  }
}
