import { View } from "../View/View";
import { CLI } from "../Model/CLI";

export class Controller{

    //カーソルキーの入力を受け取り、Viewクラスの入力履歴を表示するメソッドを呼び出すメソッド
    public static callHistoriesByKeyDown(CLI:CLI):void{
        document.addEventListener("keydown", function(event) {
            if (event.key == "ArrowUp"){
                View.cursorUpToGetHistories(CLI);
            } else if (event.key == "ArrowDown"){
                View.cursorDownToGetHistories(CLI);
            }
        });
    }
    //enterKeyの入力を受け取り、ViewクラスのCLIの表示や更新を司るメソッドを呼び出すメソッド
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
    //提出ボタンの入力を受け取り、Viewクラスの採点結果を描画するメソッドを呼び出すメソッド
    public static callSubmit(CLI:CLI):void{
        let submitBtn:HTMLButtonElement = document.getElementById("submit") as HTMLButtonElement;
        submitBtn.addEventListener("click", function(){
            View.appendResultParagraph(CLI,CLI.submit())
            View.resetCLITextInput(CLI)
            Controller.detectAndSendQuestionID(CLI);
        })
    }
    //問題一覧のIDをModelのCLIクラスに送り、模範解答とファイルディレクトリの初期状態を作成するメソッドを呼び出すメソッド
    public static detectAndSendQuestionID(CLI:CLI):void{
        let question:string = document.getElementById("question")?.textContent as string;
        let questionNumber:string = question.substring(0,question.indexOf("："));
        CLI.setQuestionID = questionNumber;
        console.log(question.substring(0,question.indexOf("：")));
    }
    //CLI起動用メソッド
    public static activateCLI(CLI:CLI):void{
        this.callSubmit(CLI);
        this.callHistoriesByKeyDown(CLI);
        this.executeCLI(CLI);
    }
}