import {QuizSystem} from "../../fileSystem.js";

// マウント
const CLIQuiz = QuizSystem.mount('#app');
// Quizの初期化
// let Quiz = new QuizSystem();
// 模範解答の作成
CLIQuiz.Quiz.mkdir("python");
CLIQuiz.Quiz.cd("python");

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){
    console.log(CLIQuiz.User);
    CLIQuiz.submit(CLIQuiz.User, CLIQuiz.Quiz);
});

