
import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
	selector: 'page-ai',
	templateUrl: 'ai.html',
})
export class AiPage {
	@ViewChild('canvas') canvas: ElementRef;
	@ViewChild('mix') mix: ElementRef;
	@ViewChildren('part') part: any;
	basicUrl: string = '/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
	token: string = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
	apiUrl: string = this.basicUrl + this.token;
	nodeUrl: string = "http://localhost:3000";
	loading: boolean = false;
	done: boolean = false;
	list: any;
	ctx: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpClient,
	) {}

	ionViewDidLoad() {
		this.resize();
		console.log('ionViewDidLoad AiPage');
	}
	resize() {
		this.canvas.nativeElement.width = this.mix.nativeElement.offsetWidth;
	}
	clear() {
		var c = this.canvas.nativeElement;
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, this.canvas.nativeElement.width, 80);
	}
	post(text) {
		// var url=this.apiUrl;
		var url = this.nodeUrl;
		var body = {
			"text": text.textContent
		}
		var options = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		text.blur();
		this.loading = true;
		this.http.post(url, body, options).subscribe(data => {
			console.log(data);
			this.list = data["items"];
			this.loading = false;
		})
		this.clear();
		setTimeout(() => {
			// this.done=true;
			this.part._results.map((i) => {
				var child = i._elementRef.nativeElement;
				if (child.dataset.head != 0) {
					var parent = this.findParent(child.dataset.head);
					var start = this.getPoint(child);
					var end = this.getPoint(parent);
					var center = (start + end) / 2;
					console.log('start:' + start + '中点' + center + 'end' + end);
					this.paint(start, center, end);
					this.creatCode();
				}

			})
		}, 1000);
	}
	findParent(head) {
		console.log(head);
		var parent = this.part._results.filter((i) => {
			// console.log(i);
			var button = i._elementRef.nativeElement;
			console.log(button.dataset);
			return button.dataset.id == head;
		});
		console.log(parent);
		return parent[0]._elementRef.nativeElement;
	}
	getPoint(button) {
		var left = button.offsetLeft;
		var width = button.offsetWidth;
		var centerPoint = left + width / 2;
		return centerPoint;
	}
	drawA(ctx, x2, dire) {
		ctx.beginPath();
		var x;
		if (dire == "right") {
			x = x2 - 10;
			ctx.strokeStyle = "#488aff";
		}
		else {
			x = x2 + 10;
			ctx.strokeStyle = "#ff4848";
		}
		var top = {
			x: x,
			y: 45,
		}
		var bottom = {
			x: x,
			y: 35,
		}
		ctx.moveTo(top.x, top.y);
		ctx.lineTo(x2, 40);
		ctx.lineTo(bottom.x, bottom.y);
		ctx.stroke();
	}
	paint(x1, x2, x3) {
		var y1, y2, y3;
		y2 = 0;
		y1 = y3 = 80;
		var dire;
		var c = this.canvas.nativeElement;
		var ctx = c.getContext("2d");
		ctx.beginPath();
		if (x2 < x3) {
			dire = "right";
			ctx.strokeStyle = "#488aff";
		}
		else {
			dire = "left";
			ctx.strokeStyle = "#ff4848";
		}
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(x1, y1); //起始点
		//绘制二次贝塞尔曲线
		ctx.quadraticCurveTo(x2, y2, x3, y3);
		ctx.stroke();
		this.drawA(ctx, x2, dire);
	}
	creatCode(){
		
	}

}
