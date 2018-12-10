import { Injectable } from '@angular/core';
import {ViewAsProvider} from '../view-as/view-as'
import {SentenceProvider} from "../sentence/sentence"
import { RxjsProvider } from "../../providers/rxjs/rxjs";
import {EnableProvider} from "../../providers/enable/enable"
import {TriggerProvider} from "../../providers/trigger/trigger"
@Injectable()
export class CodeProvider {
	constructor(
		public viewAs:ViewAsProvider,
		public enable:EnableProvider,
		public trigger:TriggerProvider,
		public sentence:SentenceProvider,
		public rxjs: RxjsProvider,

	) {}

	create(json) {
		console.log('coding...');
		var type = this.judgeType(json);
		console.log(json);
		switch (type) {
			case "viewAs": this.viewAs.start(); break;
			case "enable": this.enable.start(); break;
			case "trigger": this.trigger.start(); break;
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
		this.rxjs.sendMsg('无法判断类型');
		return ;
	}


}
