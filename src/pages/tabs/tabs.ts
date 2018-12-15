import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    aiRoot = 'AiPage'
    bookRoot = 'BookPage'


    constructor(public navCtrl: NavController) { }

}
