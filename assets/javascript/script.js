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
// setTimeout every 60 seconds display a new question,
// setInterval every 3 seconds in between each question
// display each question by looping through each question, displaying all
// options to the screen, then beginning the timer
// once a button is clicked the 60 second timer stops and the 3 second timer begins
// each button is an option document.addEventListener() to all buttons
// display info based correct/incorrect/unanswered
// create a callback function to handle button clicks
// if option correct display "Correct!" and an image of the answer
// else if unanswered display "You ran out of time!The correct answer is: _____ "
// and an image of the answer
// else  option is incorrect display "Incorrect! The correct answer is: _____ "
// and an image of the answer
// keep track of the correct/incorrect/unanswered

//Variables
let currentQuestionNumber = 0;
let correctScore = 0;
let incorrectScore = 0;
let unansweredScore = 0;
let timer = 60;
//DOM Variables
const images = document.querySelector("#options");
const questionDiv = document.querySelector("#question");
const timerDiv = document.querySelector("#timer");
const allButtons = document.querySelectorAll("button");
const optionAdiv = document.querySelector("#optionA");
const optionBdiv = document.querySelector("#optionB");
const optionCdiv = document.querySelector("#optionC");
const optionDdiv = document.querySelector("#optionD");
// Functions

// Display questions
// turn this hardcorde in to something increments per question answered
function currentQuestion() {
  triviaQuestions.forEach((value, i, questions) => {
    // Active Question
    const activeQuestion = questions[currentQuestionNumber].question;
    questionDiv.textContent = activeQuestion;
    const activeOptions = questions[currentQuestionNumber].options;
    activeOptions.forEach((value, i, options) => {
      optionAdiv.textContent = options[0].a;
      optionBdiv.textContent = options[1].b;
      optionCdiv.textContent = options[2].c;
      optionDdiv.textContent = options[3].d;
    });
  });
  currentQuestionNumber++;
  timer = 60;
}
currentQuestion();
// promises, async await
// set timer for 60 seconds, on 60 seconds show
// image to show options to hide then switch after 3 seconds
function outOfTime() {
  questionDiv.textContent = "Oops! You ran out of time :(";
  images.innerHTML = `<img src="/assets/images/Dinosaur_Land.png">`;
}
let intervalID;
function startCountDown() {
  // check if already an interval has been set up
  if (!intervalID) {
    intervalID = setInterval(countDown, 1000);
  }
}
function countDown() {
  timer--;
  timerDiv.textContent = timer;
}
function stopCountDown() {
  clearInterval(intervalID);
  // release our intervalID from the variable
  intervalID = null;
}

function resolveAfter60Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      stopCountDown();
      resolve(outOfTime());
    }, 1000 * 60);
  });
}

async function asyncCall() {
  startCountDown();
  console.log("calling");
  await resolveAfter60Seconds();
  // expected output: "resolved"
}

asyncCall();
