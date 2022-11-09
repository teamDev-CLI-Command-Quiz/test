import { FileSystems } from "./FileSystem";

export class CLI{
    private CLITextInput:string;
    private histories:[string];
    private historiesCnt:number;
    private User:FileSystems;
    private Answer:Array<string>;
    private QuestionNumber:string;
    private CLITextInputDiv:HTMLInputElement
    private CLITextOutputDiv:HTMLElement;
    private vueCLI:HTMLElement|null;

    constructor(){
        this.CLITextInput = ""
        this.histories = [
            "",
        ];
        this.historiesCnt = 0;
        this.User = new FileSystems();
        this.Answer = [];
        this.QuestionNumber = "";
        this.CLITextInputDiv = document.getElementById("CLIInputDiv") as HTMLInputElement;
        this.CLITextOutputDiv = document.getElementById("CLIOutputDiv") as HTMLElement;
        this.vueCLI = document.getElementById("content");
    }

    public get getCLITextInput():string{
        return this.CLITextInput;
    }

    public set setCLITextInput(input:string){
        this.CLITextInput = input;
    }

    public get getHistories():[string]{
        return this.histories;
    }

    public set setHistories(historiy:string){
        this.histories.push(historiy);
    }

    public get getHistoriesCnt():number{
        return this.historiesCnt;
    }

    public set setHistoriesCnt(cnt:number){
        this.historiesCnt = cnt;
    }

    public get getUserData():FileSystems{
        return this.User;
    }

    public get getCLITextOutputDiv():HTMLElement|null{
        return this.CLITextOutputDiv;
    }

    public get getVueCLI():HTMLElement|null{
        return this.vueCLI;
    }

    public get getCLITextInputDiv():HTMLInputElement{
        return this.CLITextInputDiv;
    }

    public set setCLITextInputDiv(text:string){
        this.CLITextInputDiv.value = text;
    }

    public get getQuestionNumber():string{
        return this.QuestionNumber;
    }

    public set setQuestionNumber(number:string){
        this.QuestionNumber = number;
    }
    
    public commandLineParser():string[]{
        let parsedStringInputArray:string[] = this.CLITextInputDiv.value.trim().split(" ");
        this.setCLITextInput = this.CLITextInputDiv.value;
        return parsedStringInputArray;
    }

    public grading():boolean{
        // return this.Answer.getCurrentDir!.getName === this.User.getCurrentDir!.getName;    
        return true
    }

    public submit():string{
        let result:string;
        if (this.grading()) result = "正解!!";
        else result = "不正解!!";

        return result
    }

    public evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray:string[]):string{
        let result:string = "";
        console.log(parsedStringInputArray);
        let argA:string = parsedStringInputArray[1];
        let argB:string = parsedStringInputArray[2];
        let commandName:string = parsedStringInputArray[0];

        switch (commandName) {
            case "mkdir":
                result = this.User.mkdir(argA);
                break;
            case "cd":
                result = this.User.cd(argA);
                break;
            case "touch":
                result = this.User.touch(argA);
                break;
            case "ls":
                result = this.User.ls();
                break;
            case "pwd":
                result = this.User.pwd();
                break;
            case "print":
                result = this.User.print(argA);
                break;
            case "setContent":
                result = this.User.setContent(argA, argB);
                break;
            case "rm":
                result = this.User.rm(argA);
                break;
            case "mv":
                result = this.User.mv(argA, argB);
                break;
            case "cp":
                result = this.User.cp(argA, argB);
                break;
            case "tree":
                result = this.User.tree(argA)
                break;
            case "help":
                result = "You can use tree, mkdir, cd, touch, ls, pwd, print, setContent, rm, mv, cp, command"
                break;
            default:
                result = "No such command";
        }
        return result;
    }

    public makeAnswerAndFirstStatus(){
        switch(this.QuestionNumber){
            case "問題１":
                this.Answer.push("mkdir python","mkdir Java");
                break;
            case "問題２":
                this.Answer.push("mkdir python","cd python");
                break;
            case "問題３":
                this.User.mkdir("python");
                this.User.cd("python");
                this.User.mkdir("math");
                this.User.mkdir("web");
                this.User.cd("math");
                this.Answer.push("cd ..","cd ..","cd web");
                break;
            case "問題４":
                this.Answer.push("mkdir python","touch test.py")
                break;
            case "問題５":
                this.User.mkdir("python");
                this.User.cd("python");
                this.User.mkdir("math");
                this.User.mkdir("web");
                this.User.cd("math");
                this.Answer.push("pwd")
                break;
            case "問題６":
                this.User.mkdir("python");
                this.User.cd("python");
                this.User.mkdir("math");
                this.User.mkdir("web");
                this.User.cd("math");
                this.User.touch("factorial.py");
                this.User.mkdir("differential");
                this.Answer.push("mkdir python","cd python")
                break;
            case "問題７":
                this.User.mkdir("python");
                this.User.cd("python");
                this.User.mkdir("math");
                this.User.mkdir("web");
                this.User.cd("math");
                this.User.touch("factorial.py");
                this.User.mkdir("differential");

                this.Answer.push("mkdir python","cd python")
                break;               
        }
    }
}