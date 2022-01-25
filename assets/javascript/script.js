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
let roundTime = 60;
//DOM Variables
const messageDiv = document.querySelector("#message");
const imageDiv = document.querySelector("#image");
const startBtnDiv = document.querySelector("#startBtn");
const currentRoundDiv = document.querySelector("#currentRound");
const answerDiv = document.querySelector("#answer");
const optionsDiv = document.querySelector("#options");
const questionDiv = document.querySelector("#question");
const timerDiv = document.querySelector("#timer");
const allButtons = document.querySelectorAll("button");
const optionAdiv = document.querySelector("#optionA");
const optionBdiv = document.querySelector("#optionB");
const optionCdiv = document.querySelector("#optionC");
const optionDdiv = document.querySelector("#optionD");
const startBtn = document.querySelector("#startBtn");
// Display questions
function currentQuestion() {
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
  roundTime = 60;
}
//function to switch between answerDiv and question div
function switchDisplay() {
  if (answerDiv.style.display === "none") {
    currentRoundDiv.style.display = "none";
    answerDiv.style.display = "block";
  } else {
    currentRoundDiv.style.display = "block";
    answerDiv.style.display = "none";
  }
}

// image to show options to hide then switch after 3 seconds
function getImage() {
  currentImage = Images.findIndex(currentQuestionNumber);
  return Images[currentImage];
}

function outOfTime() {
  switchDisplay();
  messageDiv.textContent = "Oops! You ran out of time :(";
  imageDiv.innerHTML = `<img src="/assets/images/${getImage}>`;
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
  messageDiv.textContent = "Game Over!";
  imageDiv.innerHTML = `
  <h3> Correct: ${correctScore} </h3> 
  <h3> Incorrect: ${incorrectScore} </h3> 
  <h3> Unanswered: ${unansweredScore}</h3>`;
}
function nextRound() {
  if (currentQuestionNumber <= triviaQuestions.length) {
    startRound();
  }
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
    currentQuestion();

    await time(0250);
    switchDisplay();

    await time(0500);
    startTimer();

    await time(1000 * 60);
    stopTimer();
    outOfTime();

    await time(1000 * 63);
    nextRound();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
    gameOver();
    console.log("Game over! Stats displayed below.");
  }
}

function startGame() {
  currentRoundDiv.style.display = "block";
  startBtn.style.display = "none";
  startRound();
}

startBtn.addEventListener("click", startGame);
