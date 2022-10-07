import {FileSystem} from "../fileSystem.js";

// UserとQuizの初期化
let User = new FileSystem();

let content = document.getElementById("content")
let CLITextOutputDiv = document.getElementById("CLIOutputDiv");

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
                    <span>UsernoMacBook-Pro % ${this.CLITextInput}
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