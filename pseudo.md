on page load start button is shown

start button will invoke startGame function

startGame function will:

- remove start button, .remove()
- create a new question object, new Question()
- start 30 second timer for question, startTimer()
- display question to DOM, renderQuestion()

each answer is a button with values of true or false
evalAnswer is called

each question has an evalAnswer function which will:

- look to see if the button clicked on has a value of true or false
- if true then incrementCorrectScore, display correctAnswerEl
- if false then incrementIncorrectScore, display incorrectAnswerEl
- nextQuestion()

nextQuestion is a function that will:

- have a setTimeout() for 3 seconds
- when setTimeout will create a new Question()
- startTimer()
- renderQuestion()

at the end of the game, stats are displayed to user using a displayStats() method
quit button with function that will :

- clear DOM and bring back home screen with start button
- resetStats()

Question Object

Question props:

- correctScore
- incorrectScore
- time
- question
- answerA
- answerB
- answerC
- answerD

Question Methods:

- startGame()
- startTimer()
- renderQuestion()
- evalAnswer()
- renderAnswer()
- nextQuestion()
