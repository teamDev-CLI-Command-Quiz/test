import {FileSystem} from "../../fileSystem.js";

class QuizSystem{
    constructor(){
        this.answer = new FileSystem();

        //模範解答の作成
        this.answer.mkdir("python");
        this.answer.cd("python");
    }

    //NOTE:模範解答と照合、ファイルごとに作成
    grading(userAnswer){
        return this.answer.currentDir.name === userAnswer.currentDir.name;    
    }
    
    //NOTE:仮提出用の関数
    submit(userAnswer){
        let submit = document.getElementById("submit");

        submit.addEventListener("click", function(){

            let scoring = document.getElementById("scoring");
            let resultAnimation = document.getElementById("resultAnimation");
            //NOTE:thisの使い方
            if (Quiz.grading(userAnswer)) {
                let result = 
                    `
                    <img src="../../img/targeting.png" class="img-size p-2">
                    <h2 class="text-info pt-4 pb-4">おめでとうございます！</h2>
                    `
                    //TODO:classListが取得できていない
                    scoring.innerHTML = result;
                    resultAnimation.classList.remove("rains");
                    resultAnimation.classList.add("confetti");
            } else {
                let result = 
                    `
                    <img src="../../img/bug-fix.png" class="img-size p-2">
                    <h2 class="text-danger pt-2 pb-4">不正解</h2>
                    `
                    scoring.innerHTML = result;
                    //TODO:classListが取得できていない
                    resultAnimation.classList.remove("confetti");
                    resultAnimation.classList.add("rains");
                } 
        })
    }

    // 提出画面
	submitViewBlock(){
		let submitView = document.getElementById("submitView");
	
		submitView.classList.remove("d-none");
		submitView.classList.add("d-block");
	}

	submitViewNone(){
		let submitView = document.getElementById("submitView");
	
		submitView.classList.remove("d-block");
		submitView.classList.add("d-none");
	}

	// 採点画面
	scoringViewBlock(){
		let scoringView = document.getElementById("scoringView");
	
		this.submitViewNone();
		scoringView.classList.remove("d-none");
		scoringView.classList.add("d-block");
	}
	
	scoringViewNone(){
		let scoringView = document.getElementById("scoringView");
	
		this.submitViewNone();
		scoringView.classList.remove("d-block");
		scoringView.classList.add("d-none");
	}
}
// UserとQuizの初期化
let User = new FileSystem();
let Quiz = new QuizSystem();
let content = document.getElementById("content")
let CLITextOutputDiv = document.getElementById("CLIOutputDiv");
Quiz.submit(User);

const app = Vue.createApp({
    data: () => ({
        CLITextInput: "",
        histories: [
            "",
        ],
        historiesCnt: 0,
    }),
    methods: {
        commandLineParser:function(){
            let parsedStringInputArray = this.CLITextInput.trim().split(" ");
        
            return parsedStringInputArray;
        },
        appendEchoParagraph:function(){
            CLITextOutputDiv.innerHTML += 
                `
                    <p class="m-0 output-text align-top"> 
                    <span>User</span>
                    <span>@</span>
                    <span>MacBook % ${this.CLITextInput}
                    </span>
                    </p>
                `
            if (this.CLITextInput !== "" && this.CLITextInput !== null) this.histories.push(this.CLITextInput)
        },
        appendResultParagraph:function(message){
            CLITextOutputDiv.innerHTML +=
                `
                <p class="m-0 output-text">
                <span>User</span> % ${message}
                </p>
                `
        },
        resetCLITextInput:function(){
            this.CLITextInput = ""
            content.scrollTo(0, content.scrollHeight)
        },
        evaluatedResultsStringFromParsedStringInputArray:function(parsedStringInputArray){
            let result = "";
            console.log(parsedStringInputArray);
            let argA = parsedStringInputArray[1];
            let argB = parsedStringInputArray[2];
            let commandName = parsedStringInputArray[0];

            switch (commandName) {
                case "mkdir":
                    result = User.mkdir(argA);
                    break;
                case "cd":
                    result = User.cd(argA);
                    break;
                case "touch":
                    result = User.touch(argA);
                    break;
                case "ls":
                    result = User.ls();
                    break;
                case "pwd":
                    result = User.pwd();
                    break;
                case "print":
                    result = User.print(argA);
                    break;
                case "setContent":
                    result = User.setContent(argA, argB);
                    break;
                case "rm":
                    result = User.rm(argA);
                    break;
                case "mv":
                    result = User.mv(argA, argB);
                    break;
                case "cp":
                    result = User.cp(argA, argB);
                    break;
                // case "tree":
                //     result = User.tree(argA)
                //     break
                default:
                    result = "No such command";
            }
            return result;
        },
        cursorUpToGetHistories:function(){
            if (this.histories.length > 0) {
                this.CLITextInput = this.histories[this.historiesCnt]
                --this.historiesCnt 
                if (0 > this.historiesCnt) this.historiesCnt = this.histories.length - 1
            }
        },
        cursorDownToGetHistories:function(){
            if (this.histories.length > 0) {
                this.CLITextInput = this.histories[this.historiesCnt]
                ++this.historiesCnt
                if (this.histories.length <= this.historiesCnt) this.historiesCnt = 0
            }
        },
        executeCLI:function(){
            let parsedStringInputArray = this.commandLineParser()
            this.appendEchoParagraph()
            this.appendResultParagraph(this.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray))
            this.resetCLITextInput()
        }
    }
})
app.mount('#app')

//NOTE:ResultViewクラスはQuizSystemに入れてもいいのではないか？

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