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
