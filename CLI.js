// public submit():void{
//     let result:string;
//     if (this.grading()) result = "正解!!";
//     else result = "不正解!!";
//     View.appendResultParagraph(this,result)
//     View.resetCLITextInput(this)
// }
var View = /** @class */ (function () {
    function View() {
    }
    View.appendEchoParagraph = function (CLI) {
        CLI.getCLITextOutputDiv.innerHTML +=
            "\n            <p class=\"m-0 output-text align-top\"> \n            <span>User</span>\n            <span>@</span>\n            <span>UsernoMacBook-Pro % ".concat(CLI.getCLITextInput, "\n            </span>\n            </p>\n        ");
        if (CLI.getCLITextInput !== "" && CLI.getCLITextInput !== null)
            CLI.getHistories.push(CLI.getCLITextInput);
    };
    View.appendResultParagraph = function (CLI, message) {
        CLI.getCLITextOutputDiv.innerHTML +=
            "\n        <p class=\"m-0 output-text\">\n        <span>User</span> % ".concat(message, "\n        </p>\n        ");
    };
    View.resetCLITextInput = function (CLI) {
        CLI.setCLITextInput = "";
        CLI.setCLITextInputDiv = "";
        CLI.getVueCLI.scrollTo(0, CLI.getVueCLI.scrollHeight);
    };
    View.cursorUpToGetHistories = function (CLI) {
        CLI.setCLITextInputDiv = CLI.getHistories[CLI.getHistoriesCnt];
        CLI.setHistoriesCnt = CLI.getHistoriesCnt - 1;
        if (0 > CLI.getHistoriesCnt)
            CLI.setHistoriesCnt = CLI.getHistories.length - 1;
    };
    View.cursorDownToGetHistories = function (CLI) {
        CLI.setCLITextInputDiv = CLI.getHistories[CLI.getHistoriesCnt];
        CLI.setHistoriesCnt = CLI.getHistoriesCnt + 1;
        if (CLI.getHistories.length <= CLI.getHistoriesCnt)
            CLI.setHistoriesCnt = 0;
    };
    return View;
}());
var CLI = /** @class */ (function () {
    function CLI() {
        this.CLITextInput = "";
        this.histories = [
            "",
        ];
        this.historiesCnt = 0;
        this.User = new FileSystems();
        this.Answer = new FileSystems();
        this.CLITextInputDiv = document.getElementById("CLIInputDiv");
        this.CLITextOutputDiv = document.getElementById("CLIOutputDiv");
        this.vueCLI = document.getElementById("content");
    }
    Object.defineProperty(CLI.prototype, "getCLITextInput", {
        get: function () {
            return this.CLITextInput;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "setCLITextInput", {
        set: function (input) {
            this.CLITextInput = input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "getHistories", {
        get: function () {
            return this.histories;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "setHistories", {
        set: function (historiy) {
            this.histories.push(historiy);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "getHistoriesCnt", {
        get: function () {
            return this.historiesCnt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "setHistoriesCnt", {
        set: function (cnt) {
            this.historiesCnt = cnt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "getUserData", {
        get: function () {
            return this.User;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "getCLITextOutputDiv", {
        get: function () {
            return this.CLITextOutputDiv;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "getVueCLI", {
        get: function () {
            return this.vueCLI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "getCLITextInputDiv", {
        get: function () {
            return this.CLITextInputDiv;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLI.prototype, "setCLITextInputDiv", {
        set: function (text) {
            this.CLITextInputDiv.value = text;
        },
        enumerable: false,
        configurable: true
    });
    CLI.prototype.commandLineParser = function () {
        var parsedStringInputArray = this.CLITextInputDiv.value.trim().split(" ");
        this.setCLITextInput = this.CLITextInputDiv.value;
        console.log(parsedStringInputArray);
        console.log(this.setCLITextInput);
        return parsedStringInputArray;
    };
    CLI.prototype.grading = function () {
        return this.Answer.getCurrentDir.getName === this.User.getCurrentDir.getName;
    };
    CLI.prototype.submit = function () {
        var result;
        if (this.grading())
            result = "正解!!";
        else
            result = "不正解!!";
        return result;
    };
    CLI.prototype.evaluatedResultsStringFromParsedStringInputArray = function (parsedStringInputArray) {
        var result = "";
        console.log(parsedStringInputArray);
        var argA = parsedStringInputArray[1];
        var argB = parsedStringInputArray[2];
        var commandName = parsedStringInputArray[0];
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
                result = this.User.tree(argA);
                break;
            case "help":
                result = "You can use tree, mkdir, cd, touch, ls, pwd, print, setContent, rm, mv, cp, command";
                break;
            default:
                result = "No such command";
        }
        return result;
    };
    return CLI;
}());
var Nodes = /** @class */ (function () {
    function Nodes(name, attribute, parent, content) {
        if (content === void 0) { content = "No data"; }
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = content;
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = content;
        this.next = null;
        this.list = new LinkedList();
    }
    Object.defineProperty(Nodes.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setName", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getAttribute", {
        get: function () {
            return this.attribute;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setAttribute", {
        set: function (attribute) {
            this.attribute = attribute;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getParent", {
        get: function () {
            return this.parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setParent", {
        set: function (parent) {
            this.parent = parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getContent", {
        get: function () {
            return this.content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setContent", {
        set: function (content) {
            this.content = content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getNext", {
        get: function () {
            return this.next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setNext", {
        set: function (next) {
            this.next = next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getList", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setList", {
        set: function (list) {
            this.list = list;
        },
        enumerable: false,
        configurable: true
    });
    return Nodes;
}());
var FileSystems = /** @class */ (function () {
    function FileSystems() {
        this.root = new Nodes("root", "", null, "");
        this.currentDir = this.root;
    }
    Object.defineProperty(FileSystems.prototype, "getRoot", {
        get: function () {
            return this.root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystems.prototype, "setRoot", {
        set: function (root) {
            this.root = root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystems.prototype, "getCurrentDir", {
        get: function () {
            return this.currentDir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystems.prototype, "setCurrentDir", {
        set: function (currentDir) {
            this.currentDir = currentDir;
        },
        enumerable: false,
        configurable: true
    });
    FileSystems.prototype.touch = function (name, parent) {
        if (parent === void 0) { parent = this.currentDir; }
        if (this.currentDir.getList.search(name) === null) {
            this.currentDir.getList.append(name, "File", parent);
            return "created ".concat(name, " file.");
        }
        return "".concat(name, " file has already exists.");
    };
    FileSystems.prototype.mkdir = function (name, parent) {
        if (parent === void 0) { parent = this.currentDir; }
        if (this.currentDir.getList.search(name) === null) {
            this.currentDir.getList.append(name, "Directory", parent);
            return "created ".concat(name, " directory.");
        }
        return "".concat(name, " directory is already exists.");
    };
    FileSystems.prototype.ls = function () {
        return this.currentDir.getList.printList();
    };
    FileSystems.prototype.cd = function (directoryName) {
        if (directoryName == ".." && this.currentDir.getParent == null)
            return "no parent directory. now you are on root directory.";
        else if (directoryName == ".." && this.currentDir.getParent != null) {
            this.currentDir = this.currentDir.getParent;
            return "changed current directory. you are on ".concat(this.currentDir.getName, " directory.");
        }
        else if (this.currentDir.getList.search(directoryName) === null)
            return "no such ".concat(directoryName, " directory.");
        else
            this.currentDir = this.currentDir.getList.search(directoryName);
        return "changed current directory. you are on ".concat(directoryName, " directory.");
    };
    FileSystems.prototype.pwd = function () {
        var iterator = this.currentDir;
        var ans = "";
        while (iterator != this.root) {
            ans = iterator.getName + '/' + ans;
            iterator = iterator.getParent;
        }
        return "/".concat(this.root.getName, "/").concat(ans);
    };
    FileSystems.prototype.print = function (name) {
        if (this.currentDir.getList.search(name) === null)
            return "no such file or directory.";
        return "".concat(name, "'s data is ") + this.currentDir.getList.search(name).getContent;
    };
    FileSystems.prototype.setContent = function (name, content) {
        if (this.currentDir.getList.search(name) === null)
            return "no such file or directory.";
        this.currentDir.getList.search(name).setContent = content;
        return "added " + this.currentDir.getList.search(name).getContent + " on " + "".concat(name);
    };
    FileSystems.prototype.rm = function (fileName) {
        if (this.currentDir.getList.search(fileName) === null || this.currentDir.getList.getHead.getAttribute == "Directory")
            return "no such file under current directory.";
        else if (this.currentDir.getList.getHead.getName === fileName) {
            this.currentDir.getList.popFront();
            return "deleted ".concat(fileName, " file.");
        }
        else {
            this.currentDir.getList.remove(fileName);
            return "deleted ".concat(fileName, " file.");
        }
    };
    FileSystems.prototype.mv = function (object1, object2) {
        var currentName, newName, content;
        if (this.currentDir.getList.search(object1) === null)
            return "no such file or directory.";
        //名称変更の処理
        if (this.currentDir.getList.search(object2) === null) {
            currentName = this.currentDir.getList.search(object1).getName;
            newName = object2;
            this.currentDir.getList.search(object1).setName = object2;
            return "changed name ".concat(currentName, " to ").concat(newName);
        }
        //移動の処理 
        else {
            if (this.currentDir.getList.search(object1).getAttribute === "File" && this.currentDir.getList.search(object2).getAttribute === "Directory") {
                //contentのコピー
                content = this.currentDir.getList.search(object1).getContent;
                //移動時のノードの削除の処理
                if (this.currentDir.getList.getHead.getName === object1)
                    this.currentDir.getList.popFront();
                else
                    this.currentDir.getList.remove(object1);
                this.currentDir = this.currentDir.getList.search(object2);
                this.currentDir.getList.append(object1, "File", this.currentDir);
                this.currentDir = this.currentDir.getParent;
                return "moved ".concat(object1, " file to under ").concat(object2, " directory.");
            }
        }
        return "mv cmd error";
    };
    FileSystems.prototype.cp = function (object1, object2) {
        if (this.currentDir.getList.search(object1) === null)
            return "no such file or directory.";
        //ディレクトリ直下へのコピー
        if (this.currentDir.getList.search(object1).getAttribute === "Directory" && this.currentDir.getList.search(object2).getAttribute === "Directory") {
            var target = this.currentDir.getList.search(object1).getList;
            this.currentDir = this.currentDir.getList.search(object2);
            this.currentDir.setList = target;
            this.currentDir = this.currentDir.getParent;
            return "".concat(object1, " is copied under ").concat(object2, ".");
        }
        //ファイルへのコピー
        if (this.currentDir.getList.search(object1).getAttribute === "File" && this.currentDir.getList.search(object2) === null) {
            //contentのコピー
            var content = void 0;
            content = this.currentDir.getList.search(object1).getContent;
            this.currentDir.getList.append(object2, "File", this.currentDir);
            return "".concat(object1, " is copied as ").concat(object2, ".");
        }
        return "error";
    };
    FileSystems.prototype.treeHelper = function (node, indent) {
        var iterator = node.getList.getHead;
        var ans = "";
        while (iterator != null) {
            ans += "<br>" + indent + "\u2514 ".concat(iterator.getName);
            if (iterator.getNext == null) {
                ans += this.treeHelper(iterator, indent + "&emsp;");
            }
            else {
                ans += this.treeHelper(iterator, indent + "\u2502&emsp;");
            }
            iterator = iterator.getNext;
        }
        return ans;
    };
    FileSystems.prototype.tree = function (directoryName) {
        if (directoryName === void 0) { directoryName = ""; }
        var iterator = this.root;
        if (directoryName != "")
            iterator = this.getRoot.getList.search(directoryName);
        var ans = "<br>".concat(iterator.getName);
        ans += this.treeHelper(iterator, "");
        return ans;
    };
    return FileSystems;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
    }
    Object.defineProperty(LinkedList.prototype, "getHead", {
        get: function () {
            return this.head;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "setHead", {
        set: function (head) {
            this.head = head;
        },
        enumerable: false,
        configurable: true
    });
    LinkedList.prototype.popFront = function () {
        if (this.head === null)
            return;
        this.head = this.head.getNext;
        var iterator = this.head;
        while (iterator != null) {
            iterator = iterator.getNext;
        }
    };
    LinkedList.prototype.popLast = function () {
        if (this.head === null)
            return;
        var iterator = this.head;
        while (iterator.getNext.getNext != null)
            iterator = iterator.getNext;
    };
    LinkedList.prototype.append = function (name, attribute, parent) {
        var newNode = new Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
            return this.head;
        }
        var iterator = this.head;
        while (iterator.getNext != null)
            iterator = iterator.getNext;
        iterator.setNext = newNode;
        iterator = iterator.getNext;
    };
    LinkedList.prototype.preappend = function (name, attribute, parent) {
        var newNode = new Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
        }
        else {
            newNode.setNext = this.head;
            this.head = newNode;
        }
    };
    LinkedList.prototype.printList = function () {
        var iterator = this.head;
        var ans = "";
        while (iterator !== null) {
            ans += " " + iterator.getName;
            iterator = iterator.getNext;
        }
        return ans.substring(1);
    };
    LinkedList.prototype.search = function (name) {
        var iterator = this.head;
        while (iterator !== null) {
            if (iterator.getName === name)
                break;
            iterator = iterator.getNext;
        }
        return iterator;
    };
    LinkedList.prototype.remove = function (name) {
        var iterator = this.head;
        while (iterator.getNext !== null) {
            if (iterator.getNext.getName === name)
                break;
            iterator = iterator.getNext;
        }
        iterator.setNext = iterator.getNext.getNext;
    };
    return LinkedList;
}());
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.callHistoriesByKeyDown = function (CLI) {
        document.addEventListener("keydown", function (event) {
            if (event.key == "ArrowUp") {
                console.log(true);
                View.cursorUpToGetHistories(CLI);
            }
            else if (event.key == "ArrowDown") {
                View.cursorDownToGetHistories(CLI);
            }
        });
    };
    Controller.executeCLI = function (CLI) {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var parsedStringInputArray = CLI.commandLineParser();
                View.appendEchoParagraph(CLI);
                View.appendResultParagraph(CLI, CLI.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray));
                View.resetCLITextInput(CLI);
            }
        });
    };
    Controller.callSubmit = function (CLI) {
        var submitBtn = document.getElementById("submit");
        submitBtn.addEventListener("click", function () {
            View.appendResultParagraph(CLI, CLI.submit());
            View.resetCLITextInput(CLI);
        });
    };
    Controller.submit = function (CLI) {
        var result;
        if (CLI.grading())
            result = "正解!!";
        else
            result = "不正解!!";
        View.appendResultParagraph(CLI, result);
        View.resetCLITextInput(CLI);
    };
    Controller.activateCLI = function (CLI) {
        this.callSubmit(CLI);
        this.callHistoriesByKeyDown(CLI);
        this.executeCLI(CLI);
    };
    return Controller;
}());
var cli = new CLI();
Controller.activateCLI(cli);
