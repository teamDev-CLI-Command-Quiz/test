import {QuizSystem, App} from "../../fileSystem.js";

// マウント
const app = App.mount('#app');
// Quizの初期化
let Quiz = new QuizSystem();
// 模範解答の作成
Quiz.answer.mkdir("python");
Quiz.answer.cd("python");
Quiz.answer.mkdir("math");
Quiz.answer.mkdir("web");
Quiz.answer.cd("math");
Quiz.answer.mkdir("differential");

app.User.mkdir("python");
app.User.cd("python");
app.User.mkdir("math");
app.User.mkdir("web");
app.User.cd("math");
app.User.touch("factorial.py");
app.User.mkdir("differential");
// 以下、ボタンの設定
let submit = document.getElementById("submit");
submit.addEventListener("click", function(){
    console.log(app.User);
    Quiz.submit(app.User);
});
let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function(){
	Quiz.submitViewBlock();
});

let submitViewSubmit = document.getElementById("submitViewSubmit");
submitViewSubmit.addEventListener("click", function(){
	Quiz.scoringViewBlock();
});

let submitViewClose = document.getElementById("submitViewClose");
submitViewClose.addEventListener("click", function(){
	Quiz.submitViewNone();
});

let scoringViewClose = document.getElementById("scoringViewClose");
scoringViewClose.addEventListener("click", function(){
	Quiz.scoringViewNone();
});
