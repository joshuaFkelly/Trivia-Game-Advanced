// Trivia Array
const triviaQuestions = [
  {
    question: "Where does Super Mario World take place?",
    options: [
      { a: "The Light Forest", correct: false },
      { b: "Dinosaur Land", correct: true },
      { c: "Grandmaster Galaxy", correct: false },
      { d: "New York", correct: false },
    ],
  },
  {
    question: "Who kidnaps Princess Daisy?",
    options: [
      { a: "Tatanga", correct: true },
      { b: "Bowser", correct: false },
      { c: "Wario", correct: false },
      { d: "Yoshi", correct: false },
    ],
  },
  {
    question: "Who kidnaps Princess Peach?",
    options: [
      { a: "Tatanga", correct: false },
      { b: "Bowser Jr", correct: false },
      { c: "Waluigi", correct: false },
      { d: "Bowser", correct: true },
    ],
  },
  {
    question: "Who is on the castle roof in Super Mario 64?",
    options: [
      { a: "Donkey Kong", correct: false },
      { b: "Princess Peach", correct: false },
      { c: "Yoshi", correct: true },
      { d: "Mario", correct: false },
    ],
  },
  {
    question: "Who guards the Fortress in Super Mario 64?",
    options: [
      { a: "Boom Boom", correct: true },
      { b: "Chain Chomp", correct: false },
      { c: "Lava Queen", correct: false },
      { d: "2 Toads", correct: false },
    ],
  },
];
const Images = [
  "Dinosaur_Land.png",
  "Tatanga.png",
  "Bowser.png",
  "Yoshi.png",
  "Boom_Boom.png",
];
//Variables
let gameStarted = false;
let intervalID;
let currentQuestionNumber = 0;
let correctScore = 0;
let incorrectScore = 0;
let unansweredScore = 0;
let roundTime = 10;
//DOM Variables
const messageDiv = document.querySelector("#message");
const imageDiv = document.querySelector("#image");
const startBtnDiv = document.querySelector("#startBtn");
const currentRoundDiv = document.querySelector("#currentRound");
const answerDiv = document.querySelector("#answer");
const gameOverDiv = document.querySelector("#gameOver");
const questionDiv = document.querySelector("#question");
const timerDiv = document.querySelector("#timer");
const allButtons = document.querySelectorAll("button");
const optionAdiv = document.querySelector("#optionA");
const optionBdiv = document.querySelector("#optionB");
const optionCdiv = document.querySelector("#optionC");
const optionDdiv = document.querySelector("#optionD");
const startBtn = document.querySelector("#startBtn");
const gameOverMsg = document.querySelector("#gameOverMessage");
const statsDiv = document.querySelector("#stats");
// Display questions
function currentQuestion() {
  currentRoundDiv.style.display = "block";
  triviaQuestions.forEach((value, i, questions) => {
    // Active Question
    const activeQuestion = questions[currentQuestionNumber].question;
    questionDiv.textContent = activeQuestion;
    // Active Options
    const activeOptions = questions[currentQuestionNumber].options;
    activeOptions.forEach((value, i, options) => {
      optionAdiv.textContent = options[0].a;
      optionBdiv.textContent = options[1].b;
      optionCdiv.textContent = options[2].c;
      optionDdiv.textContent = options[3].d;
    });
  });
  currentQuestionNumber++;
  timerDiv.textContent = roundTime = 10;
}

// image to show options to hide then switch after 3 seconds
function outOfTime() {
  currentRoundDiv.style.display = "none";
  answerDiv.style.display = "block";
  messageDiv.textContent = "Oops! You ran out of time :(";
  imageDiv.innerHTML = `<img src="/assets/images/Dinosaur_Land.png">`;
  unansweredScore++;
}
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
function gameOver() {
  if (currentQuestionNumber === triviaQuestions.length) {
    gameStarted = false;
    startBtnDiv.style.display = "inline-block";
    currentRoundDiv.style.display = "none";
    gameOverDiv.style.display = "block";
    gameOverMsg.textContent = "Game Over!";
    statsDiv.innerHTML = `
    Correct: ${correctScore} </br> 
    Incorrect: ${incorrectScore} </br> 
    Unanswered: ${unansweredScore}`;
  }
}
function nextRound() {
  if (currentQuestionNumber <= triviaQuestions.length) {
    currentRoundDiv.style.display = "block";
    answerDiv.style.display = "none";
    startRound();
  }
}
function startGame(params) {
  currentQuestionNumber = 0;
  correctScore = 0;
  incorrectScore = 0;
  unansweredScore = 0;
  currentQuestionNumber = 0;
  gameStarted = true;
  startBtnDiv.style.display = "none";
  gameOverDiv.style.display = "none";
  startRound();
}
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
    currentQuestion();
    startTimer();

    await time(1000 * 10);
    stopTimer();
    outOfTime();

    await time(3000);
    nextRound();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
    gameOver();
  }
}

startBtn.addEventListener("click", startGame);
