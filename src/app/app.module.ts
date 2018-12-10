import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { AppMinimize } from '@ionic-native/app-minimize';
import { CodePush } from '@ionic-native/code-push';

import { MyApp } from './app.component';
import { PainterProvider } from '../providers/painter/painter';
import { HttpProvider } from '../providers/http/http';
import { CodeProvider } from '../providers/code/code';
import { ViewAsProvider } from '../providers/view-as/view-as';
import { SentenceProvider } from '../providers/sentence/sentence';
import { RxjsProvider } from '../providers/rxjs/rxjs';

@NgModule({
	declarations: [
		MyApp,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
		BrowserAnimationsModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		StatusBar,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		PainterProvider,
		HttpProvider,
		CodeProvider,
		ViewAsProvider,
		SentenceProvider,
		RxjsProvider,
		HTTP,
		File,
		AppMinimize,
		CodePush
	]
})
export class AppModule { }
