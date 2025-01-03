const VACANT = "white";
const canvas = document.getElementById("titrizz");
const ctx = canvas.getContext("2d");
const ROWS = 20;
const COLUMNS = (COL = 10);
const sq = 40;
const scoreElement = document.getElementById("score");
let score = 0;
scoreElement.innerHTML = score;
let board = [];
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sq, y * sq, sq, sq);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * sq, y * sq, sq, sq);
}
for (let i = 0; i < ROWS; i++) {
  board[i] = [];
  for (let j = 0; j < COLUMNS; j++) {
    board[i][j] = VACANT;
  }
}
function drawBoard() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      drawSquare(j, i, board[i][j]);
    }
  }
}
drawBoard();
const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"],
];

class Piece {
  constructor(tetrimino, color) {
    this.tetrimino = tetrimino;
    this.tetriminoNo = 0;
    this.activeTit = this.tetrimino[this.tetriminoNo];
    this.color = color;
    this.x = Math.floor(Math.random() * COLUMNS);
    this.y = -2;
    console.log(this.y);
  }

  drawPiece() {
    for (let r = 0; r < this.activeTit.length; r++) {
      for (let c = 0; c < this.activeTit.length; c++) {
        if (this.activeTit[r][c]) {
          drawSquare(this.x + c, this.y + r, this.color);
        }
      }
    }
  }

  undrawPiece() {
    for (let r = 0; r < this.activeTit.length; r++) {
      for (let c = 0; c < this.activeTit.length; c++) {
        if (this.activeTit[r][c]) {
          drawSquare(this.x + c, this.y + r, VACANT);
        }
      }
    }
  }

  moveDown() {
    // if (this.y >= ROWS) {
    //   clearInterval(intervalid);
    //   return;
    // }
    if (this.collision(0, 1, this.activeTit)) {
      this.lock();
      p = randomPIECES();
    } else {
      this.undrawPiece();
      this.y++;
      this.drawPiece();
    }
  }

  moveLeft() {
    if (this.collision(-1, 0, this.activeTit)) {
    } else {
      this.undrawPiece();
      this.x--;
      this.drawPiece();
    }
  }

  moveRight() {
    // if (this.y >= ROWS) {
    //   clearInterval(intervalid);
    //   return;
    // }
    if (this.collision(1, 0, this.activeTit)) {
    } else {
      this.undrawPiece();
      this.x++;
      this.drawPiece();
    }
  }

  rotate() {
    const nextPattern =
      this.tetrimino[(this.tetriminoNo + 1) % this.tetrimino.length];
    let kick = 0;
    if (this.collision(0, 0, nextPattern)) {
      if (this.x > COLUMNS / 2) {
        kick = -1;
      } else kick = 1;
    }
    if (!this.collision(kick, 0, nextPattern)) {
      this.undrawPiece();
      this.tetriminoNo += 1;
      this.x += kick;
      this.tetriminoNo %= this.tetrimino.length;
      // console.log(this.tetrimino);
      // console.log(this.tetriminoNo);
      this.activeTit = this.tetrimino[this.tetriminoNo];
      // console.log(this.activeTit);
      // console.log(board);
      this.drawPiece();
    }
  }

  collision(ind1, ind2, pattern) {
    //ind1 is for horizontal , ind2 for vertical

    for (let i = 0; i < pattern.length; i++) {
      //what if this.activeTit changed to pattern
      for (let j = 0; j < pattern.length; j++) {
        if (!pattern[i][j]) {
          continue;
        }
        let tempX = this.x + ind1 + j;
        let tempY = this.y + ind2 + i;
        if (tempY < 0) {
          continue;
        }
        if (tempX < 0 || tempX >= COLUMNS || tempY >= ROWS) {
          return true;
        }

        if (board[tempY][tempX] != VACANT) {
          return true;
        }
      }
    }
    return false;
  }

  lock() {
    for (let i = 0; i < this.activeTit.length; i++) {
      for (let j = 0; j < this.activeTit.length; j++) {
        if (!this.activeTit[i][j]) continue; //so that jo 3x3 matrix me shape h usme agar vacant jageh h then it doesnt get fixed with the color
        if (this.y + i < 0) {
          console.log("this.y ", this.y, "  i ", i,"  ",j);
          console.log(board);
          for (let i = 0; i < this.activeTit.length; i++) {
            {
              console.log(this.activeTit[i]);
            }
          }
          
          for (let i = 0; i < ROWS; i++) {
            {
              console.log(board[i]);
            }
          }
          alert("game over");
          gameOver = true;
          break;
        }
        board[this.y + i][this.x + j] = this.color;
      }
      if (gameOver) {
        break;
      }
    }

    for (let i = 0; i < ROWS; i++) {
      let isRowFull = true;
      for (let j = 0; j < COLUMNS; j++) {
        isRowFull = isRowFull && board[i][j] != VACANT;
      }
      if (isRowFull) {
        for (let m = i; m > 1; m--) {
          for (let n = 0; n < COLUMNS; n++) {
            board[m][n] = board[m - 1][n];
          }
        }

        for (let k = 0; k < COLUMNS; k++) {
          board[0][k] = VACANT;
        }
        score += 10;
      }
    }
    drawBoard();
    scoreElement.innerHTML = score;
  }
}
let randomPIECES = () => {
  let r = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);
};
let p = randomPIECES();
p.drawPiece();

let gameOver = false;
let dropStart = Date.now();

function drop() {
  let now = Date.now();
  if (now - dropStart > 300) {
    p.moveDown();
    dropStart = Date.now();
  }

  // const intervalid = setInterval(() => p.moveDown(), 1000);
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}
drop();

document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
  const keyActions = {
    ArrowLeft: () => {
      p.moveLeft();
      dropStart = Date.now();
    }, // Left Arrow
    ArrowUp: () => {
      p.rotate();
      dropStart = Date.now();
    }, // Up Arrow
    ArrowRight: () => {
      p.moveRight();
      dropStart = Date.now();
    }, // Right Arrow
    ArrowDown: () => p.moveDown(), // Down Arrow
  };

  const action = keyActions[event.key];
  if (action) action();
}
