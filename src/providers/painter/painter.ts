import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PainterProvider {
	ratio:number;
	constructor(public http: HttpClient) { }

	clear(canvas) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	start(canvas,child,parent) {
		var start = this.getPoint(child);
		var end = this.getPoint(parent);
		var center = (start + end) / 2;
		this.draw(canvas, start, center, end);
	}
	getPoint(button){
		var left = button.offsetLeft;
		var width = button.offsetWidth;
		var centerPoint = left + width /2 ;
		return centerPoint*this.ratio;
	}
	resize(canvas, parent) {
		canvas.style.width = parent.offsetWidth+'px';
		canvas.style.height = parent.offsetHeight+'px'; 
		function getPixelRatio(context) {
			var backingStore = context.backingStorePixelRatio 
			|| context.webkitBackingStorePixelRatio || 1;
			return (window.devicePixelRatio || 1) / backingStore;
		};
		 
		var ctx = canvas.getContext('2d');
		this.ratio = getPixelRatio(ctx);
		canvas.width = parent.offsetWidth*this.ratio;
		canvas.height = parent.offsetHeight*this.ratio;
	}
	draw(canvas, x1, x2, x3) {
		var y1, y2, y3;
		y1 = y3 = 64*this.ratio;
		var dire;
		var ctx = canvas.getContext("2d");
		if (x2 < x3) {
			y2 = 0;
			dire = "right";
			ctx.strokeStyle = "#488aff";
		}
		else {
			y2 = 128*this.ratio;
			dire = "left";
			ctx.strokeStyle = "#ff4848";
		}
		ctx.lineWidth = 3*this.ratio;
		ctx.beginPath();
		ctx.moveTo(x1, y1); //起始点
		//绘制二次贝塞尔曲线
		ctx.quadraticCurveTo(x2, y2, x3, y3);
		ctx.stroke();
		this.drawArrow(ctx, x2, dire);
	}
	drawArrow(ctx, x2, dire) {
		ctx.beginPath();
		var x, y, top, bottom;
		if (dire == "right") {
			x = x2 - 10*this.ratio;
			top = {
				x: x,
				y: 37*this.ratio,
			}
			bottom = {
				x: x,
				y: 27*this.ratio,
			}
			ctx.strokeStyle = "#488aff";
		}
		else {
			x = x2 + 10*this.ratio;
			top = {
				x: x,
				y: 101*this.ratio,
			}
			bottom = {
				x: x,
				y: 91*this.ratio,
			}
			ctx.strokeStyle = "#ff4848";
		}
		ctx.moveTo(top.x, top.y);
		ctx.lineTo(x2, (top.y + bottom.y) / 2);
		ctx.lineTo(bottom.x, bottom.y);
		ctx.stroke();
	}
}
