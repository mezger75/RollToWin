"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const btnMode = document.querySelector(".btn--dark-mode");
const body = document.querySelector("body");
const current = document.querySelectorAll(".current");
const score = document.querySelectorAll(".score");
const currentLabel = document.querySelectorAll(".current-label");
const btns = document.querySelectorAll(".btn");
const winner = document.querySelector(".player");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;

let playing = true;

const switchingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchingPlayers();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add("hidden");
    } else {
      switchingPlayers();
    }
  }
});

btnNew.addEventListener("click", function () {
  playing = true;
  diceEl.classList.add("hidden");

  currentScore = 0;

  score0El.textContent = currentScore;
  score1El.textContent = currentScore;

  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);

  activePlayer = 0;

  document.querySelector(`.player--0`).classList.add(`player--active`);
  document.querySelector(`.player--1`).classList.remove(`player--active`);

  scores = [0, 0];
});

btnMode.addEventListener("click", function () {
  if (btnMode.textContent === "🌚") {
    btnMode.textContent = "🌞";
    body.classList.add("body--dark");
    diceEl.classList.add("dice--dark");
    document.querySelector(".player--active").classList.add("player--dark");
    for (let i = 0; i < current.length; i++) {
      current[i].classList.add("current--dark");
      score[i].classList.add("score--dark");
      currentLabel[i].classList.add("current-label--dark");
    }
    for (let j = 0; j < btns.length; j++) {
      btns[j].classList.add("btn--dark");
    }
  } else {
    btnMode.textContent = "🌚";
    body.classList.remove("body--dark");
    diceEl.classList.remove("dice--dark");
    for (let i = 0; i < current.length; i++) {
      current[i].classList.remove("current--dark");
      score[i].classList.remove("score--dark");
      currentLabel[i].classList.remove("current-label--dark");
    }
    for (let j = 0; j < btns.length; j++) {
      btns[j].classList.remove("btn--dark");
    }
  }
});

let web3;
async function Connect() {
  await window.web3.currentProvider.enable();
  web3 = new web3(window.web3.currentProvider);
}
