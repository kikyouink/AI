import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';

@Injectable()
export class HttpProvider {
	basicUrl: string = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
	token: string = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
	apiUrl: string = this.basicUrl + this.token;
	githubUrl:string="https://raw.githubusercontent.com/q2578443177/AI/master/";
	nodeUrl: string = "http://localhost:3000";
	plt:string;
	constructor(
		public platform:Platform,
		public http:HttpClient,
		public mhttp:HTTP,
		private file: File,
	) {}
	get() { 

	}
	post(text) {
		var url;
		var body = {
			"text": text
		}
		var options;
		if(this.platform.is('android')){
			url = this.apiUrl; 
			options = {
				'Content-Type': 'application/json;charset=utf-8',
			}
			this.mhttp.setDataSerializer('json');
			return this.mhttp.post(url, body, options)
		}
		else{
			url = this.nodeUrl;
			options = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			return this.http.post(url, body, options)
		}
	}
	checkUpdate(){
		var u=document.createElement('script');
		u.src="https://raw.githubusercontent.com/q2578443177/AI/master/update.js";
		document.head.appendChild(u);

	}
	downloadFile(fileName){
		this.mhttp.downloadFile(this.githubUrl, {}, {}, this.file.externalApplicationStorageDirectory+fileName).then(function(entry) {
			// prints the filename
			console.log(entry.name);
		  
			// prints the filePath
			console.log(entry.fullPath);
		  }).catch(function(response) {
			console.error(response.error);
		  })
	}

}
