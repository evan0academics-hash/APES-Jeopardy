
console.log("SCRIPT LOADED");

let score1 = 0;
let score2 = 0;

let currentValue = 0;
let currentTile = null;
let answered = false;

/* =========================
   ELEMENTS
========================= */
const board = document.getElementById("board");
const startScreen = document.getElementById("startScreen");
const unitButtons = document.getElementById("unitButtons");
const modal = document.getElementById("modal");

const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

/* =========================
   MENU
========================= */
function buildMenu() {
  unitButtons.innerHTML = "";

  const data = window.gameData;

  if (!data || Object.keys(data).length === 0) {
    unitButtons.innerHTML = "<p style='color:red'>Loading units...</p>";
    return;
  }

  Object.keys(data).forEach(unit => {
    const btn = document.createElement("button");
    btn.className = "unit-btn";
    btn.textContent = unit;

    btn.onclick = () => startGame(unit);

    unitButtons.appendChild(btn);
  });
}

/* =========================
   SAFE LOAD (fixes missing units)
========================= */
function waitForGameData(){
  if (window.gameData && Object.keys(window.gameData).length > 0) {
    buildMenu();
  } else {
    setTimeout(waitForGameData, 50);
  }
}

waitForGameData();

/* =========================
   START GAME
========================= */
function startGame(unit){
  startScreen.classList.add("hidden");
  board.classList.remove("hidden");

  buildBoard(unit);
}

/* =========================
   FIXED BOARD (NO MORE SHIFTING)
========================= */
function buildBoard(unit){

  const data = window.gameData?.[unit];
  if (!data) return;

  board.innerHTML = "";

  const categories = Object.keys(data);

  const grid = document.createElement("div");
grid.className = "jeopardy-grid";
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${categories.length}, 1fr)`;
  grid.style.gap = "10px";

  /* =========================
     CATEGORY HEADER ROW
  ========================= */
  categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "category";
    header.textContent = cat;
    grid.appendChild(header);
  });

  /* =========================
     QUESTION ROWS (100–500)
  ========================= */
  for (let row = 0; row < 5; row++) {
    categories.forEach(cat => {

      const q = data[cat]?.[row];

      const tile = document.createElement("div");
      tile.className = "tile";

      tile.textContent = q ? q.value : "";

      tile.onclick = () => {
        if (!q || tile.classList.contains("used")) return;
        openQuestion(q, tile);
      };

      grid.appendChild(tile);
    });
  }

  board.appendChild(grid);
}

/* =========================
   OPEN QUESTION
========================= */
function openQuestion(q, tile){
  currentValue = q.value;
  currentTile = tile;
  answered = false;

  document.getElementById("questionValue").textContent = q.value;
  document.getElementById("questionText").textContent = q.question;
  document.getElementById("answerText").textContent = q.answer;

  document.getElementById("answerText").classList.add("hidden");
  document.getElementById("scoreButtons").classList.add("hidden");

  modal.classList.remove("hidden");
}

/* =========================
   REVEAL ANSWER
========================= */
function revealAnswer(){
  answered = true;

  document.getElementById("answerText").classList.remove("hidden");
  document.getElementById("scoreButtons").classList.remove("hidden");
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal(){

  modal.classList.add("hidden");

  if (answered && currentTile) {
    currentTile.classList.add("used");
    currentTile.style.pointerEvents = "none";
    currentTile.textContent = "";
  }

  currentTile = null;
  currentValue = 0;
  answered = false;
}

/* =========================
   SCORE (AUTO CLOSE)
========================= */
function adjustScore(team, val){

  if (team === 1) {
    score1 += val;
    score1El.textContent = score1;
  } else {
    score2 += val;
    score2El.textContent = score2;
  }

  closeModal();
}

/* =========================
   RESET
========================= */
function resetGame(){
  location.reload();
}
