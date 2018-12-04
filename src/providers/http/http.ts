import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
	basicUrl: string = '/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
	token: string = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
	apiUrl: string = this.basicUrl + this.token;
	nodeUrl: string = "http://localhost:3000";
	constructor(public http: HttpClient) {
		console.log('Hello HttpProvider Provider');
	}
	get(){

	}
	post(text){
		var url = this.apiUrl;
		// var url = this.nodeUrl; 
		var body = {
			"text": text
		}
		var options = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		return this.http.post(url, body, options)
	}

}
