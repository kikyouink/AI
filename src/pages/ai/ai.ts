import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { PainterProvider } from "../../providers/painter/painter";
import { HttpProvider } from "../../providers/http/http";
import { CodeProvider } from "../../providers/code/code";
import { SentenceProvider } from "../../providers/sentence/sentence"
import { KnowledgeProvider } from "../../providers/knowledge/knowledge"
import { RxjsProvider } from "../../providers/rxjs/rxjs";
import { ToastController } from 'ionic-angular';

import VConsole from 'vconsole';
let v = new VConsole();

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
	plt:string;
	canvas: HTMLCanvasElement;
	mix: HTMLDivElement;
	btnBox: HTMLDivElement;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform:Platform,
		public http: HttpProvider,
		public painter: PainterProvider,
		public code: CodeProvider,
		public sentence: SentenceProvider,
		public knowledge: KnowledgeProvider,
		public rxjs: RxjsProvider,
		public toastCtrl: ToastController,
	) { }
	ionViewDidLoad() {
		this.initRxjs();
		this.checkUpdate();
	}
	initRxjs() {
		this.rxjs
			.getMessage().subscribe(message => {
				console.log(message.text);
				this.presentToast(message.text)
			});
	}
	checkUpdate() {

	}
	e(i) {
		return i._elementRef.nativeElement
	}
	prepareData(){
		console.log(this.platform.dir())
		this.plt=this.platform.is('android')?'m':'web';
		this.loading = true;
		this.canvas = this.canvasE.nativeElement;
		this.mix = this.mixE.nativeElement;
		this.btnBox = this.btnBoxE.nativeElement;
		this.painter.clear(this.canvas);
		this.text.nativeElement.blur();
	}
	getData() {
		this.prepareData();
		var data;
		var type=this.plt=='m'?'then':'subscribe';
		var msg = this.text.nativeElement.textContent;
		msg = this.knowledge.getReplace(msg);
		this.http.post(msg)[type](res => {
			if(this.plt=='m') data=JSON.parse(res.data);
			else data=res;
			console.log(data);
			var p = this.deepCopy(data["items"]);
			// this.paragraph = this.knowledge.getRestore(p);
			this.paragraph = data["items"];
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
	deepCopy(source, bool = true) {
		var sourceCopy;
		if (bool) sourceCopy = [];
		else sourceCopy = {};
		for (var item in source) {
			sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item], false) : source[item];
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
var p={
	draw(){
		console.log('draw');
		
	},
	da(){
		console.log('da');
	}
}
var b="da"
p[b]()
