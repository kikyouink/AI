import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PainterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PainterProvider {
	constructor(public http: HttpClient) { }

	clear(canvas) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	resize(canvas, parent) {
		canvas.width = parent.offsetWidth;
		canvas.height = parent.offsetHeight;
	}
	draw(canvas, x1, x2, x3) {
		var y1, y2, y3;
		y1 = y3 = 80;
		var dire;
		var ctx = canvas.getContext("2d");
		if (x2 < x3) {
			y2 = 0;
			dire = "right";
			ctx.strokeStyle = "#488aff";
		}
		else {
			y2 = 160;
			dire = "left";
			ctx.strokeStyle = "#ff4848";
		}
		ctx.lineWidth = 3;
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
			x = x2 - 10;
			top = {
				x: x,
				y: 45,
			}
			bottom = {
				x: x,
				y: 35,
			}
			ctx.strokeStyle = "#488aff";
		}
		else {
			x = x2 + 10;
			top = {
				x: x,
				y: 115,
			}
			bottom = {
				x: x,
				y: 125,
			}
			ctx.strokeStyle = "#ff4848";
		}
		ctx.moveTo(top.x, top.y);
		ctx.lineTo(x2, (top.y + bottom.y) / 2);
		ctx.lineTo(bottom.x, bottom.y);
		ctx.stroke();
	}


}
