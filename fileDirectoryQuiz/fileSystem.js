class Node{
    constructor(name, attribute, parent, content = "No data"){
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = content;
        this.next = null;
        this.list = new LinkedList();
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }
    
    popFront(){
        if (this.head == null) return;
        this.head = this.head.next;
        let iterator = this.head;
        while (iterator != null){
            iterator = iterator.next;
        }
    }

    popLast(){
        if (this.head == null) return;
        let iterator = this.head;
        while (iterator.next.next != null) {
            iterator = iterator.next;
        }
    }

    append(name, attribute, parent, content){
        let newNode = new Node(name, attribute, parent, content);
        if (this.head == null) {
            this.head = newNode;
            return this.head;
        }
        let iterator = this.head;
        while (iterator.next != null) {
            iterator = iterator.next;
        }
        
        iterator.next = newNode;
        iterator = iterator.next;
    }

    preappend(name, attribute, parent, content){
        let newNode = new Node(name, attribute, parent, content);
        if (this.head == null) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    printList(){
        let iterator = this.head;
        let ans = "";

        while (iterator != null) {
            ans += " " + iterator.name;
            iterator = iterator.next;
        }

        return ans.substring(1);
    }

    search(name){
        let iterator = this.head;

        while (iterator != null){
            if (iterator.name === name) break;
            
            iterator = iterator.next;
        }
        return iterator;
    }

    remove(name){
        let iterator = this.head;
        while(iterator.next != null){
            if (iterator.next.name === name) break;
            iterator = iterator.next;
        }

        iterator.next = iterator.next.next;
    }
}

class FileSystem{
    constructor(){
        this.root = new Node("root", "", "root", null);
        this.currentDir = this.root;
    }

    touch(name, parent = this.currentDir){
        if (this.currentDir.list.search(name) === null){
            this.currentDir.list.append(name, "File", parent);

            return `created ${name} file.`
        }

        return `${name} file has already exists.`
    }

    mkdir(name, parent = this.currentDir){
        if (this.currentDir.list.search(name) === null){
            this.currentDir.list.append(name, "Directory", parent);

            return `created ${name} directory.`
        }
        return `${name} directory is already exists.`
    }

    ls(){
        return this.currentDir.list.printList();
    }

    cd(directoryName){
        if (directoryName == ".." && this.currentDir.parent == null) return "no parent directory. now you are on root directory."
        else if (directoryName == ".." &&  this.currentDir.parent != null) {
            this.currentDir = this.currentDir.parent;
            return  `changed current directory. you are on ${this.currentDir.name} directory.`;
        }
        else if (this.currentDir.list.search(directoryName) === null) return `no such ${directoryName} directory.`;
        else this.currentDir = this.currentDir.list.search(directoryName);
        return  `changed current directory. you are on ${directoryName} directory.`;
    }

    pwd(){
        let iterator = this.currentDir;
        let ans = "";
        while (iterator != this.root){
            ans = iterator.name + '/' + ans;
            iterator = iterator.parent;
        }
        return `/${this.root.name}/${ans}`;
    }

    print(name){
        if (this.currentDir.list.search(name) === null) return "no such file or directory.";

        return `${name}'s data is ` + this.currentDir.list.search(name).content;
    }

    setContent(name, content){
        if (this.currentDir.list.search(name) === null) return "no such file or directory.";
        this.currentDir.list.search(name).content = content;
        return "added " + this.currentDir.list.search(name).content + " on " + `${name}`;
    }

    rm(fileName){
        if (this.currentDir.list.search(fileName) === null || this.currentDir.list.head.attribute == "Directory") return "no such file under current directory.";
        else if (this.currentDir.list.head.name === fileName){
            this.currentDir.list.popFront();
            return `deleted ${fileName} file.`
        }
        else {
            this.currentDir.list.remove(fileName)
            return `deleted ${fileName} file.`;
        }
    }

    mv(object1, object2){
        let currentName, newName, content;
        if (this.currentDir.list.search(object1) === null) return "no such file or directory.";

        //名称変更の処理
        if (this.currentDir.list.search(object2) === null) {
            currentName = this.currentDir.list.search(object1).name;
            newName = object2;
            this.currentDir.list.search(object1).name = object2;
            return `changed name ${currentName} to ${newName}`;
        }
        //移動の処理 
        else if (this.currentDir.list.search(object1).attribute === "File" && this.currentDir.list.search(object2).attribute === "Directory") {
            //contentのコピー
            content = this.currentDir.list.search(object1).content;
            //移動時のノードの削除の処理
            if (this.currentDir.list.head.name === object1) this.currentDir.list.popFront();
            else this.currentDir.list.remove(object1)
            
            this.currentDir = this.currentDir.list.search(object2);
            this.currentDir.list.append(object1, "File", this.currentDir.name, content);
            
            this.currentDir = this.currentDir.parent;
            return `moved ${object1} file to under ${object2} directory.`;
        }
    }

    cp(object1, object2){
        let content;
        if (this.currentDir.list.search(object1) === null) return "no such file or directory.";
        //引数の数が複雑なため一旦凍結
        //ディレクトリ直下へのコピー
        if (this.currentDir.list.search(object1).attribute === "Directory" && this.currentDir.list.search(object2).attribute === "Directory") {
        
            let target = this.currentDir.list.search(object1).list;
            this.currentDir = this.currentDir.list.search(object2);
            this.currentDir.list = target;

            this.currentDir = this.currentDir.parent;
            return `${object1} is copied under ${object2}.`;
        }

        //ファイルへのコピー
        if (this.currentDir.list.search(object1).attribute === "File" && this.currentDir.list.search(object2) === null) {
            //contentのコピー
            content = this.currentDir.list.search(object1).content;
            this.currentDir.list.append(object2, "File", this.currentDir.name, content);
            return `${object1} is copied as ${object2}.`;
        }
    }

    tree(iterator){
        let space = " "
        //iterator = iterator.list.head
        while (iterator != null){
            //ans += "/" + iterator.name
            console.log(iterator.name)
            while (iterator.list.head != null){
                //ans += "/" + iterator.list.head.name
                console.log(iterator.list.head.name)
                if (iterator.list.head.list.head != null) this.tree(iterator.list.head.list.head)
                iterator.list.head = iterator.list.head.next
            }
            iterator = iterator.next
        }
    }
}

class QuizSystem{
    constructor(questionID){
        this.questionID = questionID;
    }

    //NOTE:模範解答と照合
    answerCases(userAnswer){
        //NOTE:swich文で書ける
        if (this.questionID === "FileDirectoryQuiz_1"){
            return quizItemsList[this.questionID].answer.currentDir.name === userAnswer.currentDir.name && quizItemsList[this.questionID].answer.currentDir.list.printList() === userAnswer.currentDir.list.printList();
        }
        else if (this.questionID === "test"){
            return quizItemsList[this.questionID].answer.currentDir.name === userAnswer.currentDir.name && quizItemsList[this.questionID].answer.currentDir.list.printList() === userAnswer.currentDir.list.printList();
        }
        else if (this.questionID === "FileDirectoryQuiz_2"){
            return quizItemsList[this.questionID].answer.currentDir.name === userAnswer.currentDir.name && quizItemsList[this.questionID].answer.currentDir.list.printList() === userAnswer.currentDir.list.printList();
        }
    }
    
    //NOTE:仮提出用の関数
    submit(){
        let submit = document.getElementById("submit");

        submit.addEventListener("click", function(){
            console.log(Quiz.answerCases(File));
            if (Quiz.answerCases(File)) Controller.appendResultParagraph(CLITextOutputDiv, "正解！！")
            else Controller.appendResultParagraph(CLITextOutputDiv, "不正解！！")

            let scoring = document.getElementById("scoring");
            let resultAnimation = document.getElementById("resultAnimation");
            if (Quiz.answerCases(File)) {
                let result = 
                `
                <img src="../img/targeting.png" class="img-size p-2">
                <h2 class="text-info pt-4 pb-4">おめでとうございます！</h2>
                `
                scoring.innerHTML = result;
                resultAnimation.classList.remove("rains");
                resultAnimation.classList.add("confetti");
            } else {
                let result = 
                `
                <img src="../img/bug-fix.png" class="img-size p-2">
                <h2 class="text-danger pt-2 pb-4">不正解</h2>
                `
                scoring.innerHTML = result;
                resultAnimation.classList.remove("confetti");
                resultAnimation.classList.add("rains");
            }
        })
    }
}

class QuizItem{
    constructor(type, title, number, content, hint){
        this.type = type;
        this.title = title;
        this.number = number;
        this.content = content;
        this.hint = hint;
        this.answer = new FileSystem();
    }
}

let quizItemsList = {
    "test" : new QuizItem("test","ディレクトリとファイル", "test", "pythonディレクトリ直下にtest.pyとtest2.pyを作成してください", ""),

    "FileDirectoryQuiz_1" : new QuizItem("FileDirectoryQuiz","問題１ディレクトリの作成", 1, "pythonディレクトリとJavaディレクトリを作成してください。", "mkdir ディレクトリ名　でディレクトリを作成できます。"),

    "FileDirectoryQuiz_2" : new QuizItem("FileDirectoryQuiz","問題２カレントディレクトリの移動", 2, "pythonディレクトリを作成し、pyhtonディレクトリをカレントディレクトリにしてください。", "cd ディレクトリ名　でカレントディレクトリを設定できます。")
}

let File = new FileSystem();

//let Quiz = new QuizSystem("FileDirectoryQuiz_1");
let Quiz = new QuizSystem("FileDirectoryQuiz_2");
//let Quiz = new QuizSystem("test");

//NOTE:クイズの解答を生成
quizItemsList["test"].answer.mkdir("python");
quizItemsList["test"].answer.cd("python");
quizItemsList["test"].answer.touch("test.py");
quizItemsList["test"].answer.touch("test2.py");

quizItemsList["FileDirectoryQuiz_1"].answer.mkdir("python");
quizItemsList["FileDirectoryQuiz_1"].answer.mkdir("Java");

quizItemsList["FileDirectoryQuiz_2"].answer.mkdir("python");
quizItemsList["FileDirectoryQuiz_2"].answer.cd("python");


//NOTE:仮にファイルディレクトリクイズの第１問を取得する場合、HTMLのvalueを FileDirectoryQuiz_1 にする
function questionIdParser(){
    let questionButton = document.getElementById("questionButton");
    console.log(questionButton.value)

    let questionID;
    questionButton.addEventListener("click", function(){
        questionID = questionButton.value;
    })

    Quiz = new QuizSystem(questionID);
}
//questionIdParser()
let CLITextInput = document.getElementById("CLITextInput");
let CLITextOutputDiv = document.getElementById("CLIOutputDiv");

CLITextInput.addEventListener("keyup", (event) => submitSerch(event));

//NOTE:コントローラーをクラスにする必要あるのか
class Controller{

    static commandLineParser(CLITextInputString){
        let parsedStringInputArray = CLITextInputString.trim().split(" ");

        return parsedStringInputArray;
    }

    static appendEchoParagraph(parentDiv){
        parentDiv.innerHTML +=
            `
            <p class="m-0 output-text"> 
            <span>User</span>
            <span>@</span>
            <span>UsernoMacBook-Pro</span> % ${CLITextInput.value} 
            </p>
            `;
        return;
    }

    static appendResultParagraph(parentDiv, message){
        //User部分はCookieでユーザー名登録？
        parentDiv.innerHTML +=
            `
            <p class="m-0 output-text">
                <span>User</span> % ${message}
            </p>
            `;    
        return;    
    }
    static evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray){
        let result = "";
        console.log(parsedStringInputArray);
        let argA = parsedStringInputArray[1];
        let argB = parsedStringInputArray[2];
        let commandName = parsedStringInputArray[0];
        
        //NOTE:swich文で書こう
        if (commandName == "mkdir") result = File.mkdir(argA);
        else if (commandName == "cd") result = File.cd(argA);
        else if (commandName == "touch") result = File.touch(argA);
        else if (commandName == "ls") result = File.ls();
        else if (commandName == "pwd") result = File.pwd();
        else if (commandName == "print") result = File.print(argA);
        else if (commandName == "setContent") result = File.setContent(argA, argB);
        else if (commandName == "rm") result = File.rm(argA);
        else if (commandName == "mv") result = File.mv(argA, argB);
        else if (commandName == "cp") result = File.cp(argA, argB);

        else result = "No such command"
        // console.log("FileSystem.evaluatedResultsStringFromParsedStringInputArray:: invalid command name")

        return result;
    }
}

function submitSerch(event){
    let parsedStringInputArray = Controller.commandLineParser(CLITextInput.value);
    if (event.key == "Enter"){
        Controller.appendEchoParagraph(CLITextOutputDiv);
        CLITextInput.value = '';
        Controller.appendResultParagraph(CLITextOutputDiv, Controller.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray));

        CLITextOutputDiv.scrollTop = CLITextOutputDiv.scrollHeight;
    }
}

// 提出画面
function submitViewBlock() {
    let submitView = document.getElementById("submitView");

    submitView.classList.remove("d-none");
    submitView.classList.add("d-block");
}

function submitViewNone() {
    let submitView = document.getElementById("submitView");

    submitView.classList.remove("d-block");
    submitView.classList.add("d-none");
}

// 採点画面
function scoringViewBlock() {
    let scoringView = document.getElementById("scoringView");

    submitViewNone();
    scoringView.classList.remove("d-none");
    scoringView.classList.add("d-block");
}

function scoringViewNone() {
    let scoringView = document.getElementById("scoringView");

    submitViewNone();
    scoringView.classList.remove("d-block");
    scoringView.classList.add("d-none");
}

Quiz.submit();