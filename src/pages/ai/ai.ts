import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PainterProvider } from "../../providers/painter/painter";
import { HttpProvider } from "../../providers/http/http";
import { CodeProvider } from "../../providers/code/code";
import { SentenceProvider } from "../../providers/sentence/sentence"
import { RxjsProvider } from "../../providers/rxjs/rxjs";

@IonicPage()
@Component({
	selector: 'page-ai',
	templateUrl: 'ai.html',
	animations: [
		trigger('fade', [
			state('show', style({
				opacity: 1,
				transform: "none",
			})),
			state('hide', style({
				opacity: 0,
				transform: "translateX(15px)",
			})),
			transition('hide => show', [
				animate('0.75s ease-out')
			]),
		])
	],
})
export class AiPage {
	@ViewChild('mix') mixE: ElementRef;
	@ViewChild('text') text: ElementRef;
	@ViewChild('canvas') canvasE: ElementRef;
	@ViewChild('btnBox') btnBoxE: ElementRef;
	@ViewChild('te') te: ElementRef;
	@ViewChildren('button') buttons: any;
	loading: boolean = false;
	received: boolean = false;
	done: boolean = false;
	c: string;
	paragraph: any;
	plt: string;
	config = {
		mode: {
			name: "javascript",
			json: true,
		},
		theme: 'night',
		indentUnit: 4,
	}
	canvas: HTMLCanvasElement;
	mix: HTMLDivElement;
	btnBox: HTMLDivElement;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		public http: HttpProvider,
		public painter: PainterProvider,
		public code: CodeProvider,
		public sentence: SentenceProvider,
		public rxjs: RxjsProvider,
	) { }
	ionViewDidLoad() {
		this.rxjs.getMsg().subscribe(data => {
			console.log(data);
			if (data.msg.status && data.msg.status == 'done') {
				this.done = true;
				let code = this.sentence.getConversion(data.msg.code);
				code = '```javascript\n' + code + '\n```\n'
				console.log(code);
				this.navCtrl.push('MarkdownPage', {
					title: '转换结果',
					prompt:data.msg.prompt,
					code: code,
				})
			}
		})

	}
	e(i) {
		return i._elementRef.nativeElement;
	}
	prepareData() {
		this.plt = this.platform.is('android') ? 'm' : 'web';
		this.loading = true;
		this.canvas = this.canvasE.nativeElement;
		this.mix = this.mixE.nativeElement;
		this.btnBox = this.btnBoxE.nativeElement;
		this.painter.clear(this.canvas);
		this.text.nativeElement.blur();
		this.getData();

	}
	getData() {
		var data;
		var type = this.plt == 'm' ? 'then' : 'subscribe';
		var msg = this.text.nativeElement.textContent;
		msg = this.sentence.getReplace(msg);
		this.http.post(msg)[type](res => {
			if (this.plt == 'm') data = JSON.parse(res.data);
			else data = res;
			console.log(data);
			var p = this.sentence.deepCopy(data["items"]);
			this.paragraph = p;
			this.paragraph = this.sentence.getRestore(p);
			this.loading = false;
			this.received = true;
			this.handleData(p);
			this.sentence.receiveJson(p);
		})
	}
	handleData(data) {
		setTimeout(() => {
			var result = this.buttons._results;
			this.painter.resize(this.canvas, this.btnBox);
			result.map((i) => {
				var child = this.e(i);
				if (child.dataset.head != 0) {
					var parent = this.findParent(child.dataset.head);
					this.painter.start(this.canvas, child, parent);
				}
			})
			this.code.start(data);
		}, 100);

	}
	skip(head) {
		var parent = this.findParent(head);
		if (parent) parent.scrollIntoView({
			behavior: "smooth"
		});
	}
	findParent(head) {
		var parent = this.buttons._results.filter((i) => {
			var button = this.e(i);
			return button.dataset.id == head;
		});
		return parent.length ? this.e(parent[0]) : null;
	}

}
