import { Component, HostBinding } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from '@ionic-native/app-minimize';
import { HttpProvider } from '../providers/http/http';
import { RxjsProvider } from '../providers/rxjs/rxjs';

@Component({
	templateUrl: 'app.html',
	animations: [
	]
})
export class MyApp {
	rootPage: string = 'TabsPage';
	items: Array<any> = [
		{
			icon: 'leaf',
			name: '个人主页',
			page: 'PersonPage',
		},
		{
			icon: 'shirt',
			name: '个性装扮',
			page: 'DressPage',
		},
		{
			icon: 'star',
			name: '我的收藏',
			page: 'StarPage',
		},
		{
			icon: 'photos',
			name: '我的相册',
			page: 'PhotoPage',
		},
		{
			icon: 'folder',
			name: '我的文件',
			page: 'FolderPage',
		},
	];
	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public http: HttpProvider,
		public appMinimize: AppMinimize,
		public rxjs: RxjsProvider,
	) {
		platform.ready().then(() => {
			if (this.platform.is('android')) {
				this.http.checkUpdate();
				platform.registerBackButtonAction(() => {
					this.appMinimize.minimize();
				});
			}
			this.rxjs.listening();
		});
	}
}

