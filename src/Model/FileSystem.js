"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystems = void 0;
var Node_1 = require("./Node");
var FileSystems = /** @class */ (function () {
    function FileSystems() {
        this.root = new Node_1.Nodes("root", "", null, "");
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
exports.FileSystems = FileSystems;
