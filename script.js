let toggle = false;
let gridLinesToggle = true;
let ink = "#000000";
let grab = false;

function toggleGrid() {
  if (!gridLinesToggle) {
    const gridLines = document.querySelector(".board");
    gridLines.style.gap = "0.5px";
    gridLinesToggle = true;
  } else if (gridLinesToggle) {
    const gridLines = document.querySelector(".board");
    gridLines.style.gap = "0px";
    gridLinesToggle = false;
  }
}

const colorPicker = document.querySelector("#color-select");
colorPicker.addEventListener("input", (e) => {
  ink = e.target.value;
  if (grab) {
    grab = false;
    dropper.classList.remove("btn-on");
  }
});

function populateBoard(size) {
  let board = document.querySelector(".board");
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => div.remove());
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement("div");
    square.addEventListener("mouseover", colorSquare);
    square.style.backgroundColor = "white";
    board.insertAdjacentElement("beforeend", square);
  }
}

function colorSquare() {
  if (toggle) {
    if (ink === "random") {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      this.style.backgroundColor = ink;
    }
  }
}

function changeColor(choice) {
  ink = choice;
}

populateBoard(16);

function changeSize(input) {
  if (input >= 2 && input <= 100) {
    document.querySelector(".error").style.display = "none";
    populateBoard(input);
  } else {
    document.querySelector(".error").style.display = "flex";
  }
}

function resetBoard() {
  let board = document.querySelector(".board");
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = "white"));
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "a") {
    toggle = !toggle;
    if (toggle) {
      document.querySelector(".mode").textContent = "Mode: Coloring";
    } else {
      document.querySelector(".mode").textContent = "Mode: Not Coloring";
    }
  } else if (e.key.toLowerCase() === "r") {
    resetBoard();
  } else if (e.key.toLowerCase() === "t") {
    toggleGrid();
  }
});
