import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
})
export class AboutPage {
	hide: boolean = true;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public ref: ChangeDetectorRef,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AboutPage');
	}
	scrollHandler(event) {
		if (event.scrollTop > 100 && this.hide == true) this.hide = false;
		else if (event.scrollTop <= 100 && this.hide == false) this.hide = true;
		this.ref.detectChanges();
	}

}
