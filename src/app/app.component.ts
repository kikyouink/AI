import { Component, HostBinding } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import VConsole from 'vconsole';
@Component({
	templateUrl: 'app.html',
	animations: [
	]
})
export class MyApp {
	rootPage: any = 'TabsPage';
	items: any;
	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		platform.ready().then(() => {
			// var vConsole = new VConsole();
			statusBar.styleDefault();
			splashScreen.hide();
			this.items = [
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
			]

		});
	}
}

