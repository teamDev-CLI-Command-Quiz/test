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

export class FileSystem{
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

    treeHelper(node, indent){
        console.log(node);
        let iterator = node.list.head;
        let ans = ``
        while(iterator != null){
            
            ans += `<br>` + indent + `└ ${iterator.name}`;
            if(iterator.next == null){
                ans += this.treeHelper(iterator, indent + `&emsp;`)
            }else{
                ans += this.treeHelper(iterator, indent + `│&emsp;`);
            }
            iterator = iterator.next;
        }
        return ans
    }

    tree(directoryName=""){
        let iterator = this.root;
        if(directoryName != "") iterator = this.root.list.search(directoryName);
 
        let ans = `<br>${iterator.name}`;
        ans += this.treeHelper(iterator, ``);

        return ans
    }
}

export const QuizSystem = Vue.createApp({
    data: () => ({
        CLITextInput: "",
        histories: [
            "",
        ],
        historiesCnt: 0,
        User: new FileSystem(),
        Quiz: new FileSystem(),
        CLITextOutputDiv: document.getElementById("CLIOutputDiv"),
        content: document.getElementById("content"),

    }),
    methods: {
        commandLineParser:function(){
            let parsedStringInputArray = this.CLITextInput.trim().split(" ");
        
            return parsedStringInputArray;
        },
        //NOTE:模範解答と照合、ファイルごとに作成　各ファイルで継承を使用する
        grading:function(User, Quiz){
        return Quiz.currentDir.name === User.currentDir.name;    
        },
        submit:function(){
                let result;
                if (this.grading(this.User, this.Quiz)) result = "正解!!";
                else result = "不正解!!";
                this.appendResultParagraph(result)
                this.resetCLITextInput()
        },
        appendEchoParagraph:function(){
            this.CLITextOutputDiv.innerHTML += 
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
            this.CLITextOutputDiv.innerHTML +=
                `
                <p class="m-0 output-text">
                <span>User</span> % ${message}
                </p>
                `
        },
        resetCLITextInput:function(){
            this.CLITextInput = ""
            this.content.scrollTo(0, content.scrollHeight)
        },
        evaluatedResultsStringFromParsedStringInputArray:function(parsedStringInputArray){
            let result = "";
            console.log(parsedStringInputArray);
            let argA = parsedStringInputArray[1];
            let argB = parsedStringInputArray[2];
            let commandName = parsedStringInputArray[0];

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
                    break
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