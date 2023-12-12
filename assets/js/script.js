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
        question: "This is a question?",
        answers: [
            {text: "Yes", correct: true},
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "No", correct: false}
        ]
    },
    {
        question: "This is a another question?",
        answers: [
            {text: "No", correct: false},
            {text: "Yes", correct: true},
            {text: "No", correct: false},
            {text: "No", correct: false}
        ]
    },
    {
        question: "This is a third question?",
        answers: [
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "Yes", correct: true}
        ]
    },
    {
        question: "This is a third question?",
        answers: [
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "Yes", correct: true}
        ]
    },
    {
        question: "This is a third question?",
        answers: [
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "No", correct: false},
            {text: "Yes", correct: true}
        ]
    }
];    

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

startBtn.addEventListener('click', showQuestions)

function startQuiz(){
    currentQuestionIndex = 0;
    userScore = 0;
    nextBtn.innerHTML = "Next";

}

function showQuestions() {
    startContainer.classList.add("hide");
    countdown();
    resetState();
   
    startQuizEl.classList.remove("hide");
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestion + 1;
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

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }

}

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

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

function endQuiz() {
 if (currentQuestionIndex = questions.length || timeLeft === 0){
    highScoresScreen.classList.add("hide");
    quizDone.classList.remove("hide");
    
 }
}
highBtn.addEventListener('click', ()=> {
    startContainer.classList.add("hide");
    highScoresScreen.classList.remove('hide');
    quizDone.classList.add('hide');
})

var userInputEl = document.querySelector("#initals-input");

initalsList.textContent = localStorage.getItem("scores");

var submitBtn = document.querySelector("#initals-submit");

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var initals = userInputEl.value;
    var highscore = {initals, userScore}
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(highscore);
    localStorage.setItem('scores', JSON.stringify(scores));
});

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("initals-list").innerHTML = "";
});

startQuiz();