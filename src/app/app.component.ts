import { Component, ViewChild } from '@angular/core';
import { Platform, Keyboard,NavController } from 'ionic-angular';
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
			icon: 'ios-code',
			name: '关于',
			link: 'AboutPage',
		},
		{
			icon: 'logo-github',
			name: 'Github',
			link: 'https://github.com/q2578443177/AI',
		},
	];
	@ViewChild('content') nav: NavController;
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
					if(this.keyBoard.isOpen()) this.keyBoard.close();
					else if(this.nav.canGoBack()) this.nav.pop();
					else this.appMinimize.minimize();
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
	moveTo(link){
		if(/\./.test(link)){
			location.href=link;
		}
		else this.nav.push(link);
	}
}

