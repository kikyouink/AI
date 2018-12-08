import { Injectable } from '@angular/core';
import {ViewAsProvider} from '../view-as/view-as'
import {SentenceProvider} from "../sentence/sentence"
/*
  Generated class for the CodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CodeProvider {
	constructor(
		public viewAs:ViewAsProvider,
		public sentence:SentenceProvider,
	) {}

	create(json) {
		console.log('coding...');
		var type = this.judgeType(json);
		console.log(json);
		switch (type) {
			case "viewAs": this.viewAs.start(); break;
			// case "enable": this.enable.compile(json); break;
			// case "trigger": this.trigger.compile(json); break;
			default: this.quit();
		}
	}
	getPassages() {

	}
	judgeType(json) {
		return this.judgeViewAs(json)?"viewAs":this.judgeEnable(json)?"enable":this.judgeTrigger(json)?"trigger":this.quit();

	}
	judgeViewAs(json){
		var BA = json.some((i) => {
			return i.deprel == "BA"
		});
		var HED = this.sentence.getHED()[0];
		if (BA && HED.postag == 'v') return true;
	}
	judgeEnable(json){
		return false;
	}
	judgeTrigger(json){
		return false;
	}
	quit() {

	}


}
