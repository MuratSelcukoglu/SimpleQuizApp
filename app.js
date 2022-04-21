function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Question prototype

Question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

// Quiz constructer
function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

// Quiz prototype
Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};

// Quiz isFinish

Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};

// Quiz guess
Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();
  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

var q1 = new Question(
  "What's the best programing",
  ["C#", "javascript", "pyhton", "asp.net"],
  "javascript"
);

var q2 = new Question(
  "What's the most popular language ?",
  ["C#", "visual basic", "nodejs", "javascript"],
  "javascript"
);

var q3 = new Question(
  "What's the best modern programing language?",
  ["C#", "javascript", "pyhton", "asp.net"],
  "javascript"
);

var questions = [q1, q2, q3];

// console.log(q1.checkAnswer("C#")); // c# seçerse false gelir
// console.log(q1.checkAnswer("javascript")); // javascript secerse true gelir

// console.log(q2.checkAnswer("visual basic"));
// console.log(q2.checkAnswer("javascript"));

// Start Quiz

// var quiz = new Quiz(questions);

// console.log(quiz.isFinish());

// quiz.getQuestion();
// //1.soru
// console.log(quiz.getQuestion());
// quiz.guess("javascript");
// // 2.soru
// console.log(quiz.getQuestion());
// quiz.guess("javascript");
// //3.soru
// console.log(quiz.getQuestion());
// quiz.guess("javascript");

// console.log(quiz.score);

// console.log(quiz.isFinish());

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var question = quiz.getQuestion();
    var choices = question.choices;

    document.querySelector("#question").textContent = question.text;

    for (let i = 0; i < choices.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.innerHTML = choices[i];

      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function guess(id, guess) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(guess);
    loadQuestion();
  };
}

function showScore() {
  var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
  document.querySelector(".card-body").innerHTML = html;
}

function showProgress() {
  var totalQuestion = quiz.questions.length;
  var questionsNumber = quiz.questionIndex + 1;
  document.querySelector("#progress").innerHTML =
    "Question " + questionsNumber + " of " + totalQuestion;
}
