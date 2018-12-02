
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import VConsole from 'vconsole';
var vConsole = new VConsole();
// import javascript from 'highlight.js/lib/languages/javascript';
/**
 * Generated class for the AiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-ai',
	templateUrl: 'ai.html',
})
export class AiPage {
	basicUrl: string = '/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
	token:string='24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
	code: string = '';
	show: boolean = true;
	list: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpClient,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AiPage');
	}
	post(text) {
		text.blur();
		var body={
			"text":text.textContent
		}
		// this.http.post(this.URL, val).subscribe(data => {
		// 	console.log(data);
		// 	this.list=data["items"];
		// })
		this.http.post(this.basicUrl+this.token,body,{
			headers:{
				'Content-Type':'application/json',
			},
		}).subscribe(data => {
			console.log(data);
			this.list=data["items"];
		})
	}

}
