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

//Variables
let intervalID;
let currentQuestionNumber = 0;
let correctScore = 0;
let incorrectScore = 0;
let unansweredScore = 0;
let time = 60;
//DOM Variables
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
  time = 60;
}
// image to show options to hide then switch after 3 seconds
function outOfTime() {
  questionDiv.textContent = "Oops! You ran out of time :(";
  optionsDiv.innerHTML = `<img src="/assets/images/Dinosaur_Land.png">`;
}
function startTimer() {
  // check if already an interval has been set up
  if (!intervalID) {
    intervalID = setInterval(timer, 1000);
  }
}

function timer() {
  time--;
  timerDiv.textContent = time;
}

function stopTimer() {
  clearInterval(intervalID);
  // release our intervalID from the variable
  intervalID = null;
}

function endRound() {
  return new Promise((resolve) => {
    setTimeout(() => {
      stopTimer();
      resolve(outOfTime());
    }, 1000 * 60);
  });
}

async function startRound() {
  showOptions();
  currentQuestion();
  startTimer();
  await endRound();
}
function showOptions() {
  optionsDiv.style.display = "block";
  startBtn.style.display = "none";
}
function answer() {
  allButtons.forEach((button, i, buttons) => {
    button.addEventListener("click", () => {
      console.log(`You clicked ${button.id}`);
    });
  });
}
answer();
startBtn.addEventListener("click", startRound);
