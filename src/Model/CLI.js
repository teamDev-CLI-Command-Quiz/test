"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
var FileSystem_1 = require("./FileSystem");
var CLI = /** @class */ (function () {
    function CLI() {
        this.CLITextInput = "";
        this.histories = [
            "",
        ];
        this.historiesCnt = 0;
        this.User = new FileSystem_1.FileSystems();
        this.Answer = new FileSystem_1.FileSystems();
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
exports.CLI = CLI;
