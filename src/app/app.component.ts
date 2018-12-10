import { Component, ViewChild } from '@angular/core';
import { Platform, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from '@ionic-native/app-minimize';
import { RxjsProvider } from '../providers/rxjs/rxjs';
import { CodePush } from '@ionic-native/code-push';
import VConsole from 'vconsole';

@Component({
	templateUrl: 'app.html',
	animations: [
	]
})
export class MyApp {
	rootPage: string = 'TabsPage';
	backButtonPressed: boolean = false;
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
		public appMinimize: AppMinimize,
		public rxjs: RxjsProvider,
		public codePush: CodePush,
		public keyBoard: Keyboard,
	) {
		platform.ready().then(() => {
			if (this.platform.is('android')) {
				let v = new VConsole();
				this.platform.registerBackButtonAction(() => {
					this.appMinimize.minimize();
				})
				codePush.notifyApplicationReady();
				codePush.sync().subscribe(
					(data) => { }, (err) => {
						console.log('[codePush ERROR]: ' + err);
					}
				);
			}
			// this.rxjs.listening();
		});
	}
}

