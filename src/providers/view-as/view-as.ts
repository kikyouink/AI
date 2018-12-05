import { Injectable } from '@angular/core';
import {SentenceProvider} from "../sentence/sentence"
@Injectable()
export class ViewAsProvider {
	constructor(
		public sentence:SentenceProvider,
	) {}

	getWhen() {
		var when;
		var HED=this.sentence.findHED();
		var when1=this.sentence.findChildren(HED,"VV")[0];
		var when2=this.sentence.findSibling(when1);
		if(!when2) when=this.sentence.translate(when1.word);
		else{
			var arr=[];
			arr.push(this.sentence.translate(when1.word));
			arr.push(this.sentence.translate(when2.word));
			when=arr;
		}
		console.log(when);
		return when;
		
	}
	getFilterCard() {
		var filterCard;
		
	}
	getPosition() {

	}
	getViewAs() {

	}
	getPrompt() {

	}
	compile(){

	}
	//视为技
	start() {
		console.log('开始编写视为技');
		this.getWhen();
		this.getFilterCard();
		this.getPosition();
		this.getViewAs();
		this.getPrompt();
	}

}
