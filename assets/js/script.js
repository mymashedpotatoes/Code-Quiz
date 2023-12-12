//Welcome Page Elements
var startBtn = document.getElementById('start-btn')
var startContainer = document.getElementById("start-container");
var startQuizEl = document.getElementById('quiz');

//Quiz Page Elements
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

//Input Score Page Elements
var quizDone = document.getElementById('quiz-done');
var submitBtn = document.getElementById("initals-submit");
var scores= document.getElementById("scores");
var initalsInput = document.querySelector("#initals-input").value;
var inputs = [];

//View Highscores Page Elements
var highScoresScreen = document.getElementById('highscores-screen');
var highScores = document.getElementById('high');
var clearBtn = document.getElementById('clear-initals-btn');
var initalsList = document.getElementById("initals-list");
var initialsForm = document.getElementById("initals-form");
var scoresList = document.querySelector("#scores-list");

//Universal for page
var countdownEl = document.getElementById('countdown');
var timeLeft = 75;
var currentQuestionIndex = 0;
var userScore = 0;
var initials = [];
var highBtn = document.getElementById('high-btn');

//questions for quiz
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false}
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        answers: [
            {text: "quotes", correct: false},
            {text: "curley brackets", correct: true},
            {text: "parentheses", correct: false},
            {text: "square brackets", correct: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true}
        ]
    },
    {
        question: "Sting values must be enclosed within _____ when being assigned to variables.",
        answers: [
            {text: "commas", correct: false},
            {text: "curley brackets", correct: false},
            {text: "quotes", correct: true},
            {text: "parentheses", correct: false}
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing conent to the debugger is:",
        answers: [
            {text: "javascript", correct: false},
            {text: "terminal / bash", correct: false},
            {text: "for loops", correct: false},
            {text: "console.log", correct: true}
        ]
    }
];    

//function to start countdown timer
function countdown() {
  var timeInterval = setInterval(function () {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if(timeLeft === 0 || currentQuestionIndex === questions.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
    
  }, 1000);
};

//event listener to start showing questions
startBtn.addEventListener('click', showQuestions)

//function to init quiz
function startQuiz(){
    currentQuestionIndex = 0;
    userScore = 0;
    nextBtn.innerHTML = "Next";

}

//function to show quiz questions
function showQuestions() {
    startContainer.classList.add("hide");
    countdown();
    resetState();
   
    startQuizEl.classList.remove("hide");
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//function to reset quiz state
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }

}

//function to handle users answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        userScore++;
    } else {
        selectedBtn.classList.add("incorrect");
        timeLeft -= 10;
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

//function to show users score
function showScore() {
    resetState();
    quizDone.classList.remove("hide");
    countdownEl.classList.add("hide");
    highScoresScreen.classList.remove("hide");
    startQuizEl.classList.add("hide");
    scores.innerHTML = userScore;
    nextBtn.innerHTML = "submit";
    nextBtn.style.display = "block";
}

//function to handle next button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

//event listener for next button
nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

//function to handle end of quiz
function endQuiz() {
 if (currentQuestionIndex === questions.length || timeLeft === 0){
    highScoresScreen.classList.add("hide");
    quizDone.classList.remove("hide");
    
 }
}

//event listener for the highscores button
highBtn.addEventListener('click', ()=> {
    startContainer.classList.add("hide");
    highScoresScreen.classList.remove('hide');
    quizDone.classList.add('hide');
})

//displaying highscores from local storage
function displayHighscores() {
    initalsList.textContent = localStorage.getItem("scores");
}

//querying the input element for user initials
var userInputEl = document.querySelector("#initals-input");

//event listener for submitting scores
var submitBtn = document.querySelector("#initals-submit");
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = userInputEl.value;
    var highscore = { initials, userScore };
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(highscore);
    localStorage.setItem('scores', JSON.stringify(scores));
    displayHighscores(); // Update the highscores list after submission
});

//event listener for clearing highscores
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("initals-list").innerHTML = "";
});

//init the quiz
startQuiz();