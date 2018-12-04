import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { PainterProvider } from '../providers/painter/painter';
import { HttpProvider } from '../providers/http/http';
import { CodeProvider } from '../providers/code/code';

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
	SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PainterProvider,
    HttpProvider,
    CodeProvider,
  ]
})
export class AppModule {}
