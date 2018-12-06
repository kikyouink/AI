import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PainterProvider } from "../../providers/painter/painter";
import { HttpProvider } from "../../providers/http/http";
import { CodeProvider } from "../../providers/code/code";
import { SentenceProvider } from "../../providers/sentence/sentence"
import { KnowledgeProvider } from "../../providers/knowledge/knowledge"
import { RxjsProvider } from "../../providers/rxjs/rxjs";
import { ToastController } from 'ionic-angular';

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
	@ViewChildren('button') buttons: any;
	loading: boolean = false;
	received: boolean = false;
	paragraph: any;
	canvas: HTMLCanvasElement;
	mix: HTMLDivElement;
	btnBox: HTMLDivElement;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpProvider,
		public painter: PainterProvider,
		public code: CodeProvider,
		public sentence: SentenceProvider,
		public knowledge: KnowledgeProvider,
		public rxjs: RxjsProvider,
		public toastCtrl: ToastController,

	) {
		this.rxjs
			.getMessage().subscribe(message => {
				console.log(message.text);
				this.presentToast(message.text)
			});
	}

	ionViewDidLoad() {
		this.canvas = this.canvasE.nativeElement;
		this.mix = this.mixE.nativeElement;
		this.btnBox = this.btnBoxE.nativeElement;
	}
	e(i) {
		return i._elementRef.nativeElement
	}
	getData() {
		console.clear();
		var msg = this.text.nativeElement.textContent;
		msg = this.knowledge.getReplace(msg);
		this.loading = true;
		this.painter.clear(this.canvas);
		this.text.nativeElement.blur();
		this.http.post(msg).subscribe(data => {
			console.log(data);
			var p=this.deepCopy(data["items"]);
			console.log(p)
			// this.paragraph = this.knowledge.getRestore(p);
			this.paragraph =data["items"];
			this.loading = false;
			this.received = true;
			this.handleData(data["items"]);
			this.sentence.receiveJson(data["items"]);
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
					var start = this.getPoint(child);
					var end = this.getPoint(parent);
					var center = (start + end) / 2;
					this.painter.draw(this.canvas, start, center, end);
				}
			})
			this.code.create(data);
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
	getPoint(button) {
		var left = button.offsetLeft;
		var width = button.offsetWidth;
		var centerPoint = left + width / 2;
		return centerPoint;
	}
	deepCopy(source,bool=true){
		var sourceCopy;
		if(bool) sourceCopy = [];
		else sourceCopy = {};
		for (var item in source){
			sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item],false) : source[item];
		}
		return sourceCopy;
	}
	presentToast(message) {
		const toast = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		toast.present();
	}

}
