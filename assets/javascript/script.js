// Trivia Array
const triviaQuestions = [
  {
    question: "Where does Super Mario World take place?",
    answers: [
      { a: "The Light Forest", correct: false },
      { b: "Dinosaur Land", correct: true },
      { c: "Grandmaster Galaxy", correct: false },
      { d: "New York", correct: false },
    ],
  },
  {
    question: "Who kidnaps Princess Daisy?",
    answers: [
      { a: "Tatanga", correct: true },
      { b: "Bowser", correct: false },
      { c: "Wario", correct: false },
      { d: "Yoshi", correct: false },
    ],
  },
  {
    question: "Who kidnaps Princess Peach?",
    answers: [
      { a: "Tatanga", correct: false },
      { b: "Bowser Jr", correct: false },
      { c: "Waluigi", correct: false },
      { d: "Bowser", correct: true },
    ],
  },
  {
    question: "Who is on the castle roof in Super Mario 64?",
    answers: [
      { a: "Donkey Kong", correct: false },
      { b: "Princess Peach", correct: false },
      { c: "Yoshi", correct: true },
      { d: "Mario", correct: false },
    ],
  },
  {
    question: "Who guards the Fortress in Super Mario 64?",
    answers: [
      { a: "Boom Boom", correct: true },
      { b: "Chain Chomp", correct: false },
      { c: "Lava Queen", correct: false },
      { d: "2 Toads", correct: false },
    ],
  },
];

const Images = [
  `/assets/images/Dinosaur_Land.png`,
  "/assets/images/Tatanga.png",
  "/assets/images/Bowser.png",
  "/assets/images/Yoshi.png",
  "/assets/images/Boom_Boom.png",
];
//Variables
let gameStarted = false;
let intervalID;
let roundNumber = 0;
let correctScore = 0;
let incorrectScore = 0;
let unansweredScore = 0;
let roundTime = 60;
//DOM Variables
const startBtn = document.querySelector("#startBtn");
const startBtnDiv = document.querySelector("#startBtn");
const roundContentDiv = document.querySelector("#roundContent");
const mainDiv = document.querySelector("#main");
const questionDiv = document.querySelector("#question");
const timerDiv = document.querySelector("#timer");
const aBtn = document.querySelector("#a");
const bBtn = document.querySelector("#b");
const cBtn = document.querySelector("#c");
const dBtn = document.querySelector("#d");
const allAnswers = document.querySelectorAll(".answer");

// async/ await / promise
function time(ms) {
  return new Promise((resolve, reject) => {
    if (gameStarted) {
      setTimeout(resolve, ms);
    } else {
      reject(console.log("Game has not started."));
    }
  });
}
async function startRound() {
  try {
    await time(0000);
    loadRound();
    startTimer();

    // If time elapsed
    await time(1000 * 60);
    stopTimer();
    outOfTime();

    await time(3000);
    nextRound();
    gameOver();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
    console.log("New Round");
  }
}
// Start Game Button
startBtn.addEventListener("click", startGame);

// Start Game Function
function startGame() {
  const stats = document.querySelector("#gameOver");
  roundNumber = 0;
  correctScore = 0;
  incorrectScore = 0;
  unansweredScore = 0;
  gameStarted = true;
  startBtnDiv.style.display = "none";
  if (stats) {
    stats.remove();
    startRound();
  } else {
    startRound();
  }
}

// Load Round
function loadRound() {
  triviaQuestions.forEach((round, i, rounds) => {
    // Active Question
    const activeQuestion = rounds[roundNumber].question;
    loadQuestion(activeQuestion);
    // Active answers
    const activeAnswers = rounds[roundNumber].answers;
    loadAnswers(activeAnswers);
  });
  roundContentDiv.style.display = "block";
  roundNumber++;
  timerDiv.textContent = roundTime = 60;
}

// Load questions
function loadQuestion(activeQuestion) {
  const createQuestion = document.createElement("h4");
  createQuestion.id = "question";
  const questionDiv = document.querySelector("#question");
  questionDiv.textContent = activeQuestion;
}

// Load answers
function loadAnswers(activeAnswers) {
  // console.log(activeAnswers);
  const A = activeAnswers[0];
  const B = activeAnswers[1];
  const C = activeAnswers[2];
  const D = activeAnswers[3];
  aBtn.textContent = A.a;
  bBtn.textContent = B.b;
  cBtn.textContent = C.c;
  dBtn.textContent = D.d;
}
// Give answers click event
allAnswers.forEach((btn, index, btns) => {
  btn.addEventListener("click", isCorrect);
});
// Timer
function startTimer() {
  // check if already an interval has been set up
  if (!intervalID) {
    intervalID = setInterval(timer, 1000);
  }
}
function timer() {
  roundTime--;
  timerDiv.textContent = roundTime;
}
function stopTimer() {
  clearInterval(intervalID);
  // release our intervalID from the variable
  intervalID = null;
}

// Out of Time
function outOfTime() {
  roundContentDiv.style.display = "none";
  const resultDiv = document.createElement("div");
  resultDiv.id = "result";
  const gameMessage = document.createElement("h3");
  gameMessage.id = "message";
  gameMessage.textContent = "Oops! You ran out of time :(";
  const questionImage = new Image(250, 250);
  let currentImage = roundNumber - 1;
  questionImage.src = Images[currentImage];
  mainDiv.append(resultDiv);
  resultDiv.append(gameMessage, questionImage);
  unansweredScore++;
}

// Next Round
function nextRound() {
  const result = document.querySelector("#result");
  console.log(result);
  result.remove();
  if (roundNumber <= triviaQuestions.length) {
    roundContentDiv.style.display = "block";
    startRound();
  }
}
// Game Over
function gameOver() {
  if (roundNumber === triviaQuestions.length) {
    gameStarted = false;
    const gameOverDiv = document.createElement("div");
    gameOverDiv.id = "gameOver";
    const gameOverMessage = document.createElement("h1");
    gameOverMessage.id = "message";
    gameOverMessage.textContent = "Game Over!";
    const gameStats = document.createElement("h4");
    gameStats.id = "stats";
    gameStats.innerHTML = `
      Correct: ${correctScore} </br>
      Incorrect: ${incorrectScore} </br>
      Unanswered: ${unansweredScore}</br>`;
    roundContentDiv.style.display = "none";
    mainDiv.append(gameOverDiv);
    gameOverDiv.append(gameOverMessage, gameStats);
    startBtnDiv.style.display = "inline-block";
  }
}
// If correct, or if incorrect
function isCorrect() {
  const expr = true;
  switch (expr) {
    case A.correct:
      console.log(`${A.a} is the correct answer!`);
      break;
    case B.correct:
      console.log(`${B.b} is the correct answer!`);
      break;
    case C.correct:
      console.log(`${C.c} is the correct answer!`);
      break;
    case D.correct:
      console.log(`${D.d} is the correct answer!`);
      break;
    default:
      console.log(`That is the incorrect answer!`);
  }
}
