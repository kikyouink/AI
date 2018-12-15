import { Component } from "@angular/core"
import { App, IonicPage, NavController, NavParams } from "ionic-angular"
import { setDOM } from "@angular/platform-browser/src/dom/dom_adapter"

@IonicPage()
@Component({
    selector: "page-book",
    templateUrl: "book.html"
})
export class BookPage {
    imgUrl: string = '../../assets/imgs/book';
    bookList: Array<any> = [
        {
            title: "来自开发者的信",
            author: "浅",
            avatar: "qian",
            content: `
            #前言
            Hello 各位，这里是萌新一枚。很久之前，我个人由于学业与工作的原因暂时退出了无名杀这个圈子。自从老大暂时停更之后无名杀好像渐渐冷清了下来，我也由于工作基本没什么时间
            ![](${this.imgUrl}/1/cat.png)
            --- javascript
            var a1 = 0;
            var b = function (card, player) {
                console.log('你好')
            }
            ---
			`
        }
    ]
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public app: App
    ) { }

    ionViewDidLoad() {
        console.log("ionViewDidLoad BookPage")
    }
    moveTo(page, book) {
        this.app.getRootNav().push(page, {
            title: book.title,
            author: book.author,
            avatar: book.avatar,
            content: book.content
        })
    }
}
