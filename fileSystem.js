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
}

class QuizSystem{
    constructor(questionID, questionNumber){
        this.questionID = questionID;
        this.questionNumber = questionNumber;
        this.answerFile = new FileSystem();
    }

    makeAnswer(){
        if (this.questionID == "FileDirectoryQuiz" && this.questionNumber == "1"){

            this.answerFile.mkdir("python");
            this.answerFile.cd("python");
            this.answerFile.touch("test.py")
            this.answerFile.touch("test2.py");

            //answerList[1]
        }

        return this.answerFile;
    }
    answerCase_fileDirectory_Question1(userAnswer){
        return this.answerFile.currentDir.name === userAnswer.currentDir.name && this.answerFile.currentDir.list.printList() === userAnswer.currentDir.list.printList()
        // return userAnswer.currentDir.list.printList()
    }

    answerCases(userAnswer){
        if (this.questionID == "FileDirectoryQuiz" && this.questionNumber == "1"){
            answerCase_fileDirectory_Question1(userAnswer);
        }
    }

}

let File = new FileSystem();
let Quiz = new QuizSystem("FileDirectoryQuiz", "1");

//let stdAnswer = Quiz.makeAnswer();
//console.log(stdAnswer)
Quiz.makeAnswer()
// console.log(File.mkdir("python"));
// console.log(File.cd("python"));
// console.log(File.touch("test.py"));
// console.log(File.touch("test2.py"));
console.log(Quiz);

//NOTE:仮提出用の関数
function submit(){
    let submit = document.getElementById("submit");

    submit.addEventListener("click", function(){
        console.log(Quiz.answerCase_fileDirectory_Question1(File));
    })
}
submit()

//NOTE:仮にファイルディレクトリクイズの第１問を取得する場合、HTMLのvalueを FileDirectoryQuiz_1 にする
function questionIdParser(){
    let questionButton = document.getElementById("questionButton");
    let questionType, questionNumber, position;
    questionButton.addEventListener("click", function(){
        position = questionButton.value.indexOf("_");
        questionType = questionButton.value.substring(0, position - 1);
        questionNumber = questionButton.value.substring(position);
    })

    Quiz = new QuizSystem(questionType, questionNumber);
}

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

