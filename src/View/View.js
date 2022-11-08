"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var View = /** @class */ (function () {
    function View() {
    }
    View.appendEchoParagraph = function (CLI) {
        CLI.getCLITextOutputDiv.innerHTML +=
            "\n            <p class=\"m-0 output-text align-top\"> \n            <span>User</span>\n            <span>@</span>\n            <span>MacBook % ".concat(CLI.getCLITextInput, "\n            </span>\n            </p>\n        ");
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
exports.View = View;
