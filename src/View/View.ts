import { CLI } from "../Model/CLI"

export class View{

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
