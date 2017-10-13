let isXTurn = true;
let boardState = Array(9).fill(null);

function handleClick(e) {
    if (boardState[e.target.dataset.position] || calculateWinner()) 
        return; 
        
    boardState[e.target.dataset.position] = isXTurn ? "X" : "O";
    isXTurn = !isXTurn;
    reloadViews();
}

function getGameStatus() {
    
    let winner = calculateWinner(); 
    
    if (winner) {
        return "Player " + winner + " won!"; 
    } else if (!hasAvailableMove()) {
        return "Cats Game"; 
    } else {
        return  "Next player to move: " + (isXTurn ? "X" : "O"); 
    }
}


function hasAvailableMove() {
  for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) 
        return true; 
  }
  return false; 
}

function calculateWinner() {
        
     const lines = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]; 
     
     let squareValues = document.getElementsByClassName("square"); 
     
     for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0]; 
        var b = lines[i][1];
        var c = lines[i][2]; 
        
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a]; 
        }
     }
     
     return null; 
          
}
    
function addViewsToDOM() {
    var rootDiv = document.getElementById("root");
    rootDiv.appendChild(renderGameView()); 
    assignClickHandlers();
}

function reloadViews() {
    removeViewsFromDOM(); 
    addViewsToDOM();
}   

function removeViewsFromDOM() {
    var rootDiv = document.getElementById("root");
    
    while (rootDiv.childElementCount > 0) {
        rootDiv.removeChild(rootDiv.firstChild);
    }
     
}

function renderGameView() {
    let gameDiv = document.createElement('div');
    gameDiv.className = 'game';
    
    let boardDiv = document.createElement('div');
    boardDiv.className = 'game-board'; 
    boardDiv.append(renderBoardView()); 
    gameDiv.appendChild(boardDiv); 
    
    
    let historyDiv = document.createElement('div');
    historyDiv.className = 'game-info'; 
    gameDiv.appendChild(historyDiv); 
    
    return gameDiv; 
}

function renderBoardView() {
    var containerDiv = document.createElement('div'); 
        
    var gameStatusDiv = document.createElement('div');
    gameStatusDiv.className = 'status';
    gameStatusDiv.innerHTML = this.getGameStatus();
    containerDiv.appendChild(gameStatusDiv); 
    
    // add 3 rows with 3 buttons each to make the board
    
    for (let i = 0; i < 3; i++) {
        let boardRowDiv = document.createElement('div');
        boardRowDiv.className = 'board-row';
        containerDiv.appendChild(boardRowDiv);
        
        for (let j = 0; j < 3; j++) {
            let squareButton = renderSquareView(j*3 + i); 
            boardRowDiv.appendChild(squareButton);
        }
    }
    
    return containerDiv; 
}

function renderSquareView(position) {
    var squareButton = document.createElement('button');
    squareButton.className = 'square';
    squareButton.dataset.position = position;
    squareButton.innerHTML = boardState[position];
    return squareButton; 
}

function assignClickHandlers() {
    let squares = document.getElementsByClassName("square"); 
    
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", handleClick )
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    addViewsToDOM();  
});  