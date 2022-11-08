import { Nodes } from "./Node";
import { LinkedList } from "./LinkedList";

export class FileSystems{
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