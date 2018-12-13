import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SentenceProvider } from "../../providers/sentence/sentence"

declare var editormd: any;
@IonicPage()
@Component({
	selector: 'page-markdown',
	templateUrl: 'markdown.html',
})
export class MarkdownPage {
	hide: boolean = true;
	title: string;
	text: string = '';
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public ref: ChangeDetectorRef,
		public sentence: SentenceProvider,
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad MarkdownPage');
		this.title = this.navParams.get('title');
		this.text += this.navParams.get('code');
		setTimeout(() => {
			this.markdownToHTML();
		}, 50)

	}
	scrollHandler(event: any) {
		if (event.scrollTop > 100 && this.hide == true) this.hide = false;
		else if (event.scrollTop <= 100 && this.hide == false) this.hide = true;
		this.ref.detectChanges();
	}
	markdownToHTML() {
		editormd.markdownToHTML("editormd", {
			htmlDecode: "style,script,iframe",
		});

	}

}
