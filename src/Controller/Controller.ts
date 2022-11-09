import { View } from "../View/View";
import { CLI } from "../Model/CLI";

export class Controller{

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
        let submitBtn:HTMLButtonElement = document.getElementById("submit") as HTMLButtonElement;
        submitBtn.addEventListener("click", function(){
            View.appendResultParagraph(CLI,CLI.submit())
            View.resetCLITextInput(CLI)
            Controller.detectAndSendQuestionNumber(CLI);
        })
    }

    public static detectAndSendQuestionNumber(CLI:CLI):void{
        let question:string = document.getElementById("question")?.textContent as string;
        let questionNumber:string = question.substring(0,question.indexOf("："));
        CLI.setQuestionNumber = questionNumber;
        console.log(question.substring(0,question.indexOf("：")));
    }

    public static activateCLI(CLI:CLI):void{
        this.callSubmit(CLI);
        this.callHistoriesByKeyDown(CLI);
        this.executeCLI(CLI);
    }
}