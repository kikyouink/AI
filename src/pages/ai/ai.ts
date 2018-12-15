import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, Platform } from "ionic-angular";
import { HttpProvider } from "../../providers/http/http";
import { CodeProvider } from "../../providers/code/code";
import { SentenceProvider } from "../../providers/sentence/sentence";

@IonicPage()
@Component({
    selector: "page-ai",
    templateUrl: "ai.html"
})
export class AiPage {
    plt: string;
    loading: boolean = false;
    @ViewChild("text") text: ElementRef;

    constructor(
        public platform: Platform,
        public http: HttpProvider,
        public code: CodeProvider,
        public sentence: SentenceProvider
    ) { }
    ionViewDidLoad() { }
    prepareData() {
        this.loading = true;
        this.text.nativeElement.blur();
        this.plt = this.platform.is("android") ? "m" : "web";
        this.postData();
    }
    postData() {
        var type = this.plt == "m" ? "then" : "subscribe";
        var msg = this.text.nativeElement.textContent;
        var replace = this.sentence.getReplace(msg);
        this.http.post(replace)[type](res => {
            return this.handleData(res);
        });
    }
    handleData(res) {
        var data = this.plt == "m" ? JSON.parse(res.data) : res;
        var json = this.sentence.deepCopy(data["items"]);
        json = this.sentence.getRestore(json);
        this.loading = false;
        this.code.start(json);
    }
}
