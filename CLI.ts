class View{

    public static appendEchoParagraph(CLI:CLI):void{
        CLI.getCLITextOutputDiv!.innerHTML += 
        `
            <p class="m-0 output-text align-top"> 
            <span>User</span>
            <span>@</span>
            <span>MacBook % ${CLI.getCLITextInput}
            </span>
            </p>
        `
        if (CLI.getCLITextInput !== "" && CLI.getCLITextInput !== null) CLI.getHistories.push(CLI.getCLITextInput)
    }

    public static appendResultParagraph(CLI:CLI,message:string):void{
        CLI.getCLITextOutputDiv!.innerHTML +=
        `
        <p class="m-0 output-text">
        <span>User</span> % ${message}
        </p>
        `
    }

    public static resetCLITextInput(CLI:CLI):void{
        CLI.setCLITextInput = ""
        CLI.setCLITextInputDiv = ""
        CLI.getVueCLI!.scrollTo(0, CLI.getVueCLI!.scrollHeight)
    }

    public static cursorUpToGetHistories(CLI:CLI):void{
        CLI.setCLITextInputDiv = CLI.getHistories[CLI.getHistoriesCnt]
        CLI.setHistoriesCnt = CLI.getHistoriesCnt - 1
        if (0 > CLI.getHistoriesCnt) CLI.setHistoriesCnt = CLI.getHistories.length - 1
        
    }

    public static cursorDownToGetHistories(CLI:CLI):void{
        CLI.setCLITextInputDiv = CLI.getHistories[CLI.getHistoriesCnt]
        CLI.setHistoriesCnt = CLI.getHistoriesCnt + 1
        if (CLI.getHistories.length <= CLI.getHistoriesCnt) CLI.setHistoriesCnt = 0
    }
}
class CLI{
    private CLITextInput:string;
    private histories:[string];
    private historiesCnt:number;
    private User:FileSystems;
    private Answer:FileSystems;
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
        this.Answer = new FileSystems();
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
    
    public commandLineParser():string[]{
        let parsedStringInputArray = this.CLITextInputDiv.value.trim().split(" ");
        this.setCLITextInput = this.CLITextInputDiv.value;
        console.log(parsedStringInputArray)
        console.log(this.setCLITextInput)
        return parsedStringInputArray;
    }

    public grading():boolean{
        return this.Answer.getCurrentDir!.getName === this.User.getCurrentDir!.getName;    
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
}

class Nodes{
    private next:Nodes|null;
    private list:LinkedList|null;

    constructor(private name:string, private attribute:string, private parent:Nodes|null, private content = "No data"){
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = content;
        this.next = null;
        this.list = new LinkedList();
    }

    public get getName():string{
        return this.name;
    }

    public set setName(name:string){
        this.name = name;
    }

    public get getAttribute():string{
        return this.attribute;
    }

    public set setAttribute(attribute:string){
        this.attribute = attribute;
    }

    public get getParent():Nodes|null{
        return this.parent;
    }

    public set setParent(parent:Nodes|null){
        this.parent = parent;
    }

    public get getContent():string{
        return this.content;
    }

    public set setContent(content:string){
        this.content = content;
    }  

    public get getNext():Nodes|null{
        return this.next;
    }

    public set setNext(next:Nodes|null){
        this.next = next;
    }  

    public get getList():LinkedList | null{
        return this.list;
    }

    public set setList(list:LinkedList | null){
        this.list = list;
    }
}

class FileSystems{
    private root:Nodes|null
    private currentDir:Nodes|null
    constructor(){
        this.root = new Nodes("root", "", null,"");
        this.currentDir = this.root;
    }

    public get getRoot():Nodes|null{
        return this.root;
    }

    public set setRoot(root:Nodes|null){
        this.root = root;
    }

    public get getCurrentDir():Nodes|null{
        return this.currentDir;
    }

    public set setCurrentDir(currentDir:Nodes|null){
        this.currentDir = currentDir;
    }

    public touch(name:string, parent = this.currentDir):string{
        if (this.currentDir!.getList!.search(name) === null){
            this.currentDir!.getList!.append(name, "File", parent);

            return `created ${name} file.`
        }

        return `${name} file has already exists.`
    }

    public mkdir(name:string, parent = this.currentDir){
        if (this.currentDir!.getList!.search(name) === null){
            this.currentDir!.getList!.append(name, "Directory", parent);

            return `created ${name} directory.`
        }
        return `${name} directory is already exists.`
    }

    public ls():string{
        return this.currentDir!.getList!.printList();
    }

    public cd(directoryName:string):string{
        if (directoryName == ".." && this.currentDir!.getParent == null) return "no parent directory. now you are on root directory."
        else if (directoryName == ".." &&  this.currentDir!.getParent != null) {
            this.currentDir = this.currentDir!.getParent;
            return  `changed current directory. you are on ${this.currentDir.getName} directory.`;
        }
        else if (this.currentDir!.getList!.search(directoryName) === null) return `no such ${directoryName} directory.`;
        else this.currentDir = this.currentDir!.getList!.search(directoryName);
        return  `changed current directory. you are on ${directoryName} directory.`;
    }

    public pwd():string{
        let iterator = this.currentDir;
        let ans = "";
        while (iterator != this.root){
            ans = iterator!.getName + '/' + ans;
            iterator = iterator!.getParent;
        }
        return `/${this.root!.getName}/${ans}`;
    }

    public print(name:string){
        if (this.currentDir!.getList!.search(name) === null) return "no such file or directory.";

        return `${name}'s data is ` + this.currentDir!.getList!.search(name)!.getContent;
    }

    public setContent(name:string, content:string):string{
        if (this.currentDir!.getList!.search(name) === null) return "no such file or directory.";
        this.currentDir!.getList!.search(name)!.setContent = content;
        return "added " + this.currentDir!.getList!.search(name)!.getContent + " on " + `${name}`;
    }

    public rm(fileName:string):string{
        if (this.currentDir!.getList!.search(fileName) === null || this.currentDir!.getList!.getHead!.getAttribute == "Directory") return "no such file under current directory.";
        else if (this.currentDir!.getList!.getHead!.getName === fileName){
            this.currentDir!.getList!.popFront();
            return `deleted ${fileName} file.`
        }
        else {
            this.currentDir!.getList!.remove(fileName)
            return `deleted ${fileName} file.`;
        }
    }

    public mv(object1:string, object2:string):string{
        let currentName:string, newName:string, content:string;
        if (this.currentDir!.getList!.search(object1) === null) return "no such file or directory.";

        //名称変更の処理
        if (this.currentDir!.getList!.search(object2) === null) {
            currentName = this.currentDir!.getList!.search(object1)!.getName;
            newName = object2;
            this.currentDir!.getList!.search(object1)!.setName = object2;
            return `changed name ${currentName} to ${newName}`;
        }
        //移動の処理 
        else {
            if (this.currentDir!.getList!.search(object1)!.getAttribute === "File" && this.currentDir!.getList!.search(object2)!.getAttribute === "Directory") {
                //contentのコピー
                content = this.currentDir!.getList!.search(object1)!.getContent;
                //移動時のノードの削除の処理
                if (this.currentDir!.getList!.getHead!.getName === object1) this.currentDir!.getList!.popFront();
                else this.currentDir!.getList!.remove(object1)

                this.currentDir = this.currentDir!.getList!.search(object2);
                this.currentDir!.getList!.append(object1, "File", this.currentDir);

                this.currentDir = this.currentDir!.getParent;
            return `moved ${object1} file to under ${object2} directory.`;
            }
        }
        return "mv cmd error"
    }

    public cp(object1:string, object2:string){
        if (this.currentDir!.getList!.search(object1) === null) return "no such file or directory.";
        //ディレクトリ直下へのコピー
        if (this.currentDir!.getList!.search(object1)!.getAttribute === "Directory" && this.currentDir!.getList!.search(object2)!.getAttribute === "Directory") {
        
            let target:LinkedList|null = this.currentDir!.getList!.search(object1)!.getList;
            this.currentDir = this.currentDir!.getList!.search(object2);
            this.currentDir!.setList = target;

            this.currentDir = this.currentDir!.getParent;
            return `${object1} is copied under ${object2}.`;
        }

        //ファイルへのコピー
        if (this.currentDir!.getList!.search(object1)!.getAttribute === "File" && this.currentDir!.getList!.search(object2) === null) {
            //contentのコピー
            let content:string;
            content = this.currentDir!.getList!.search(object1)!.getContent;
            this.currentDir!.getList!.append(object2, "File", this.currentDir!);
            return `${object1} is copied as ${object2}.`;
        }
        return "error"
    }

    public treeHelper(node:Nodes|null, indent:string):string{
        let iterator:Nodes|null = node!.getList!.getHead;
        let ans:string = ``
        while(iterator != null){
            
            ans += `<br>` + indent + `└ ${iterator.getName}`;
            if(iterator.getNext == null){
                ans += this.treeHelper(iterator, indent + `&emsp;`)
            }else{
                ans += this.treeHelper(iterator, indent + `│&emsp;`);
            }
            iterator = iterator.getNext;
        }
        return ans
    }

    public tree(directoryName=""):string{
        let iterator = this.root;
        if(directoryName != "") iterator = this.getRoot!.getList!.search(directoryName);
 
        let ans = `<br>${iterator!.getName}`;
        ans += this.treeHelper(iterator, ``);

        return ans
    }
}

class LinkedList{
    private head:Nodes|null

    constructor(){
        this.head = null
    }

    public get getHead():Nodes | null{
        return this.head
    }

    public set setHead(head:Nodes | null){
        this.head = head
    }

    public popFront():void{
        if (this.head === null) return;
        this.head = this.head.getNext;
        let iterator = this.head;
        while (iterator != null){
            iterator = iterator.getNext;
        }
    }

    public popLast():void{
        if (this.head === null) return;
        let iterator:Nodes|null = this.head;
        while (iterator!.getNext!.getNext != null) iterator = iterator!.getNext;
        
    }

    public append(name:string, attribute:string, parent:Nodes|null):Nodes|void{
        let newNode:Nodes = new Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
            return this.head;
        }
        let iterator:Nodes|null = this.head;
        while (iterator.getNext != null) iterator = iterator.getNext;  
        
        iterator.setNext = newNode;
        iterator = iterator.getNext;
    }

    public preappend(name:string, attribute:string, parent:Nodes|null):void{
        let newNode:Nodes = new Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
        } else {
            newNode.setNext = this.head;
            this.head = newNode;
        }
    }

    public printList():string{
        let iterator:Nodes|null = this.head;
        let ans:string = "";

        while (iterator !== null) {
            ans += " " + iterator.getName;
            iterator = iterator.getNext;
        }
        return ans.substring(1);
    }

    public search(name:string):Nodes|null{
        let iterator = this.head;
        while (iterator !== null){
            if (iterator.getName === name) break;
            
            iterator = iterator.getNext;
        }
        return iterator;
    }

    public remove(name:string):void{
        let iterator:Nodes|null = this.head;
        while(iterator!.getNext !== null){
            if (iterator!.getNext.getName === name) break;
            iterator = iterator!.getNext;
        }

        iterator!.setNext = iterator!.getNext!.getNext;
    }
}

class Controller{

    public static callHistoriesByKeyDown(CLI:CLI):void{
        document.addEventListener("keydown", function(event) {
            if (event.key == "ArrowUp"){
                console.log(true)
                View.cursorUpToGetHistories(CLI);
            } else if (event.key == "ArrowDown"){
                View.cursorDownToGetHistories(CLI);
            }
        });
    }

    public static executeCLI(CLI:CLI):void{
        document.addEventListener("keydown", function(event) {
            if (event.key === "Enter"){
                let parsedStringInputArray:string[] = CLI.commandLineParser()
                View.appendEchoParagraph(CLI)
                View.appendResultParagraph(CLI,CLI.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray))
                View.resetCLITextInput(CLI)        
            }
        });
    }

    public static callSubmit(CLI:CLI):void{
        let submitBtn:HTMLButtonElement = document.getElementById("submit")  as HTMLButtonElement;
        submitBtn.addEventListener("click", function(){
            View.appendResultParagraph(CLI,CLI.submit())
            View.resetCLITextInput(CLI)
        })
    }

    public static activateCLI(CLI:CLI):void{
        this.callSubmit(CLI);
        this.callHistoriesByKeyDown(CLI);
        this.executeCLI(CLI);
    }
}
let cli:CLI = new CLI()
Controller.activateCLI(cli)