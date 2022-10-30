import {App} from "../../fileSystem.js";

// マウント
const app = App.mount('#app');
// Quizの初期化
// let Quiz = new QuizSystem();
// 模範解答の作成
app.Quiz.answer.mkdir("python");
app.Quiz.answer.cd("python");

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){
    console.log(app.User);
    app.submit(app.User);
});

