
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
	selector: 'page-ai',
	templateUrl: 'ai.html',
})
export class AiPage {
	basicUrl: string = '/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
	token:string='24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
	apiUrl:string=this.basicUrl+this.token;
	nodeUrl:string="http://192.168.1.109:3000";
	loading: boolean = false;
	list: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpClient,
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AiPage');
	}
	post(text) {
		// var url=this.apiUrl;
		var url=this.nodeUrl;
		var body={
			"text":text.textContent
		}
		var options={
			headers:{
				'Content-Type':'application/json',
			},
		}
		text.blur();
		this.loading=true;
		this.http.post(url,body,options).subscribe(data => {
			console.log(data);
			this.list=data["items"];
			this.loading=false;
		})
	}

}
