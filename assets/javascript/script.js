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
let time = 60;
//DOM Variables
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
      console.log(i);
    });
  });
  currentQuestionNumber++;
}
currentQuestion();

function answerQuestion(params) {}
allButtons.forEach((button) => {
  button.addEventListener("click", answerQuestion);
});
