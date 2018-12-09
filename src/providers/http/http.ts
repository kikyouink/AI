import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { RxjsProvider } from '../rxjs/rxjs'
import { FileOpener } from '@ionic-native/file-opener';

@Injectable()
export class HttpProvider {
	basicUrl: string = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
	token: string = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
	apiUrl: string = this.basicUrl + this.token;
	githubUrl: string = "https://raw.githubusercontent.com/q2578443177/AI/master/";
	githubReleaseUrl: string = "https://raw.githubusercontent.com/q2578443177/AI/master/app-debug.apk";
	nodeUrl: string = "http://localhost:3000";
	plt: string;
	constructor(
		public platform: Platform,
		public http: HttpClient,
		public mhttp: HTTP,
		private file: File,
		public rxjs: RxjsProvider,
		public fileOpener: FileOpener
	) { }
	get(url) {
		return this.mhttp.get(url, {}, {});
	}
	post(text) {
		var url;
		var body = {
			"text": text
		}
		var options;
		if (this.platform.is('android')) {
			url = this.apiUrl;
			options = {
				'Content-Type': 'application/json;charset=utf-8',
			}
			this.mhttp.setDataSerializer('json');
			return this.mhttp.post(url, body, options)
		}
		else {
			url = this.nodeUrl;
			options = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			return this.http.post(url, body, options)
		}
	}
	checkVersion(v) {
		var version;
		if (!localStorage.getItem('version')) version = "0.0.0";
		else version = localStorage.getItem('version');
		v = v.split('.').join('');
		version = version.split('.').join('');
		if (parseInt(v) > parseInt(version)) return true;
		return false;

	}
	checkUpdate() {
		var url = this.githubUrl + "update.json";
		this.get(url).then(res => {
			res.data = JSON.parse(res.data);
			console.log(res.data);
			if (this.checkVersion(res.data.version)) {
				this.rxjs.sendMsg('有新版本可用，是否更新？', 'alert', () => {
					this.downloadFile('AI.apk');
				});
			}
			else console.log('无更新');

		});

	}
	downloadFile(fileName) {
		console.log(this.file.externalApplicationStorageDirectory);
		var url = this.file.externalApplicationStorageDirectory + fileName;
		this.mhttp.downloadFile(this.githubReleaseUrl, {}, {}, url).then(entry => {
			console.log(entry.fullPath);
			this.rxjs.sendMsg('下载完成，是否安装？', 'alert', () => {
				this.fileOpener.open(url, 'application/vnd.android.package-archive')
					.then(() => console.log('File is opened'))
					.catch(e => console.log('Error opening file', e));
			})
		}).catch(response => {
			console.error(response.error);
		})
	}

}
