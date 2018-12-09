import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class RxjsProvider {
	subject: any;
	constructor(
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
	) {
		this.subject = new Subject<any>();
	}

	sendMsg(msg, type = "toast",callback?) {
		this.subject.next({
			msg: msg,
			type: type,
			callback: callback,
		});
	}

	clearMsg() {
		this.subject.next();
	}

	getMsg(): Observable<any> {
		return this.subject.asObservable();
	}
	listening() {
		this.getMsg().subscribe(data => {
			if (data.type == "toast") {
				this.presentToast(data.msg);
			}
			else this.showConfirm(data.msg, data.callback)
		})
	}
	presentToast(message) {
		const toast = this.toastCtrl.create({
			message: message,
			duration: 2500
		});
		toast.present();
	}
	showConfirm(msg, callback) {
		const confirm = this.alertCtrl.create({
			title: '提示',
			message: msg,
			buttons: [
				{
					text: '取消',
					handler: () => {
					}
				},
				{
					text: '确定',
					handler: () => {
						callback();
					}
				}
			]
		})
		confirm.present();
	}
}