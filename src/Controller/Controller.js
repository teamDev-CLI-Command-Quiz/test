"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var View_1 = require("../View/View");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.callHistoriesByKeyDown = function (CLI) {
        document.addEventListener("keydown", function (event) {
            if (event.key == "ArrowUp") {
                console.log(true);
                View_1.View.cursorUpToGetHistories(CLI);
            }
            else if (event.key == "ArrowDown") {
                View_1.View.cursorDownToGetHistories(CLI);
            }
        });
    };
    Controller.executeCLI = function (CLI) {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var parsedStringInputArray = CLI.commandLineParser();
                View_1.View.appendEchoParagraph(CLI);
                View_1.View.appendResultParagraph(CLI, CLI.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray));
                View_1.View.resetCLITextInput(CLI);
            }
        });
    };
    Controller.callSubmit = function (CLI) {
        var submitBtn = document.getElementById("submit");
        submitBtn.addEventListener("click", function () {
            View_1.View.appendResultParagraph(CLI, CLI.submit());
            View_1.View.resetCLITextInput(CLI);
        });
    };
    Controller.detectQuestionNumber = function () {
        var submitBtn = document.getElementById("submit");
        submitBtn.addEventListener("click", function () {
            var _a;
            var question = (_a = document.getElementById("question")) === null || _a === void 0 ? void 0 : _a.textContent;
            console.log(question);
        });
    };
    Controller.activateCLI = function (CLI) {
        this.callSubmit(CLI);
        this.callHistoriesByKeyDown(CLI);
        this.executeCLI(CLI);
        this.detectQuestionNumber();
    };
    return Controller;
}());
exports.Controller = Controller;
