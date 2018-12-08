import { Component, HostBinding } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

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
	) {
		platform.ready().then(() => {
			// statusBar.backgroundColorByHexString('#488aff');
			// splashScreen.hide();
		});
	}
}

