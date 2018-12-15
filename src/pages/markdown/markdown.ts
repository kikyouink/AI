import {
    Component,
    ChangeDetectorRef,
    ViewChild,
    ViewChildren,
    ElementRef
} from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PainterProvider } from "../../providers/painter/painter";
import { SentenceProvider } from "../../providers/sentence/sentence";
import { Clipboard } from "@ionic-native/clipboard";
import { RxjsProvider } from "../../providers/rxjs/rxjs";

declare var editormd: any;
@IonicPage()
@Component({
    selector: "page-markdown",
    templateUrl: "markdown.html",
    animations: [
        trigger("fade", [
            state(
                "show",
                style({
                    opacity: 1,
                    transform: "none"
                })
            ),
            state(
                "hide",
                style({
                    opacity: 0,
                    transform: "translateX(15px)"
                })
            ),
            transition("hide => show", [animate("0.5s ease-out")]),
            transition("show => hide", [animate("0.5s ease-out")])
        ]),
        trigger("slide", [
            state(
                "up",
                style({
                    transform: "translateY(-160px)"
                })
            ),
            state(
                "down",
                style({
                    transform: "none"
                })
            ),
            transition("up => down", [animate("0.25s ease-out")]),
            transition("down => up", [animate("0.25s ease-out")])
        ])
    ]
})
export class MarkdownPage {
    structure: boolean = false;
    abb: boolean = true;
    hide: boolean = true;
    paragraph: Array<any>;
    title: string;
    author: string;
    avatar: string;
    text: string = "";
    canvas: HTMLCanvasElement;
    mix: HTMLDivElement;
    btnBox: HTMLDivElement;
    @ViewChild("mix") mixE: ElementRef;
    @ViewChild("canvas") canvasE: ElementRef;
    @ViewChild("btnBox") btnBoxE: ElementRef;
    @ViewChildren("button") buttons: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ref: ChangeDetectorRef,
        public sentence: SentenceProvider,
        public painter: PainterProvider,
        public rxjs: RxjsProvider,
        private clipboard: Clipboard
    ) { }

    ionViewDidLoad() {
        let content = this.navParams.get("content");
        let type = this.navParams.get("type");
        if (type) {
            this.structure = true;
            this.paragraph = this.navParams.get('restore');
            var origin = '##';
            this.paragraph.map((i) => {
                origin += i.word;
            })
            origin += '\n';
            content = origin + content;
        }
        this.title = this.navParams.get("title");
        this.avatar = this.navParams.get("avatar");
        this.author = this.navParams.get("author");
        this.text = content.replace(/---/g, "```").replace(/\s{12}/g, "\n");

    }
    ionViewDidEnter() {
        let type = this.navParams.get("type");
        if (type) {
            this.canvas = this.canvasE.nativeElement;
            this.mix = this.mixE.nativeElement;
            this.btnBox = this.btnBoxE.nativeElement;
            console.log(this.btnBox);
            this.startPaint();
        }
        this.markdownToHTML();
    }
    e(i) {
        return i._elementRef.nativeElement;
    }
    scrollHandler(event: any) {
        if (event.scrollTop > 120 && this.hide == true) this.hide = false;
        else if (event.scrollTop <= 120 && this.hide == false) this.hide = true;
        this.ref.detectChanges();
    }
    markdownToHTML() {
        editormd.markdownToHTML("editormd", {
            htmlDecode: "style,script,iframe",
            onload: function () {
                this.copy();
            }
        });
    }
    copy() {
        var code = this.navParams.get("code");
        this.clipboard.copy(code);
        // this.rxjs.sendMsg('')
    }
    startPaint() {
        this.painter.resize(this.canvas, this.btnBox);
        this.painter.clear(this.canvas);
        var result = this.buttons._results;
        result.map(i => {
            var child = this.e(i);
            if (child.dataset.head != 0) {
                var parent = this.findParent(child.dataset.head);
                this.painter.start(this.canvas, child, parent);
            }
        });
    }
    jumpTo(head) {
        var parent = this.findParent(head);
        if (parent)
            parent.scrollIntoView({
                behavior: "smooth"
            });
    }
    findParent(head) {
        var parent = this.buttons._results.filter(i => {
            var button = this.e(i);
            return button.dataset.id == head;
        });
        return parent.length ? this.e(parent[0]) : null;
    }
}
