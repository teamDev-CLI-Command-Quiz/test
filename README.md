# TypeScript-CLI-Command-Quiz
## Description
TypeScriptでOOP、MVCを意識し、連結リスト、木構造や探索アルゴリズムを使ってファイルディレクトリシステムを作り、それを応用したクイズアプリケーションを作りました

## 使用技術
使用技術　HTML/CSS/TypeScript/JavaScript

## 期間
期間　第1期：2022年9月中頃の２週間JavaScriptのみで作成　第2期：2022年10月下旬からTypeScriptで改修、現在作成中　　

第1期では、私個人でCLI(<https://github.com/Hayato-Kossy/TypeScript-FileDirectorySystem>)を作成後、これをもとに４名で作成。私は主にデザイン以外を全て担当。  

第2期では、BlackJack(<https://github.com/Hayato-Kossy/BlackJack_TypeScript_MVC>)を作成後、BlackJackで学んだMVC、OOPを活かし、個人でTypeScriptを使って再開発を行いました。

## 作成の経緯
作るに至った理由としては、CLIコマンドの操作という誰もが最初は感じる敷居の高さを解決したかったからです。
仮説として、敷居の高さを感じる原因を「自前の環境で好き勝手に動かすと、取り返しがつかなくなるのではないか」という恐怖心と、「学習教材がどれもコマンドの一問一答になっていてわかりずらい」ことの2点であると思いました。そして本アプリケーションは「web上でプレイすることにより恐怖心をなくし、CLIを連結リストと木構造で再現し実際に動かしクイズを解き学習機会を提供する」ことでこれらの問題を解決できると考え、作成しました。

## こだわった点
①データ構造とアルゴリズム：CLIコマンドを作成する際には実際に連結リストと木構造で再現しています。例えばtreeコマンドでは、前順のDFSを使ってtreeコマンドを再現しています。また入力されたコマンドを採点する際には「特定のコマンドが入力されているか」だけでなく「コマンドの入力の順番」も考慮しなければならないのでスタックを採用し、解決しました。

②設計：MVCの概念を採用しました。上記のCLIと違う点としては、新しくModelにCLIクラスを作成し、CLIの入力履歴や現在開かれている問題の模範解答や解答に必要になるファイルディレクトリ構造を作成、保持する役割を与えています。またOOPを意識しクラスの設計を行なっており、変数はprivateで宣言し、getterやsetterで変数の取得、更新を行うようにしています。

③問題の作成：簡単な問題から出題し、そこで学習したことが次の問題に活きるように作成しました。

## これからの改善点、拡張案
LinekdListクラスを拡張すればGitコマンドのクイズやLinuxコマンドのクイズも作れるので継承などを使い挑戦してみようと思います。

## URL
https://teamdev-cli-command-quiz.github.io/test/

## Usage
tree、mkdir、cd、touch、ls、　pwd、print、setContent、rm、mv、cp、help、コマンドを試すことができます
helpコマンドを使えばコマンドの一覧をCLIに表示できます
またカーソルキーでコマンドの履歴から過去に使用したコマンド表示できます
ファイルディレクトリクイズでは頻出コマンドの問題を解きながらCLIコマンドを学習することができます

## Demo
![画面収録-2022-11-06-21 38 10](https://user-images.githubusercontent.com/91725975/200171362-afa70588-3f69-4578-bf92-560f06aad88b.gif)

## Note
推奨ブラウザはGoogle Chromeです。

## 資料
https://docs.google.com/presentation/d/1bzqF9CeQEM6wW6KdeSo7IGmvvG16I2_s8cJwTrkCKvg/edit?usp=sharing
