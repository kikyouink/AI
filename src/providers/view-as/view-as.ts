import { Injectable } from '@angular/core';
import { SentenceProvider } from "../sentence/sentence"
import { KnowledgeProvider } from "../knowledge/knowledge"
@Injectable()
export class ViewAsProvider {
	constructor(
		public sentence: SentenceProvider,
		public knowledge: KnowledgeProvider,
	) { }

	getWhen() {
		var when;
		var HED = this.sentence.getHED()[0];
		var when1 = this.sentence.getChildren(HED, "VV")[0];
		var when2 = this.sentence.getSibling(when1)[0];
		if (!when2) when = this.knowledge.getTranslation(when1.word);
		else {
			var arr = [];
			arr.push(this.knowledge.getTranslation(when1.word));
			arr.push(this.knowledge.getTranslation(when2.word));
			when = arr;
		}
		console.log('时机:');
		console.log(when);
		return when;

	}
	getFilterCard() {
		// debugger;
		var main = "", filter = [];
		var card = this.sentence.getFilter('BA', 'n')[0];
		var ATT = this.sentence.getChildren(card, 'ATT', 'n');
		ATT.map((i) => {
			var type = this.knowledge.getType(i.word);
			if (type == 'suit' || type == 'color') {
				var value = this.knowledge.getTranslation(i.word);
				filter.push({
					type: type,
					value: value
				});
			}
		})
		var j = filter.length;
		while (j--) {
			var [type, value] = [filter[j].type, filter[j].value];
			main += `get.${type}(card)=='${value}'`;
			if (j) main += `&&`;
		}
		main = `return ${main}`;
		var filterCard = new Function("card", "player", main);
		console.log('卡牌条件:');
		console.log(filterCard);
		return filterCard;
	}
	getSelectCard() {
		var num = this.sentence.getDeprel('QUN')[0].word;
		var num2 = this.knowledge.getTranslation(num);
		console.log('卡牌数量:');
		console.log(num2);
		return num2;
	}
	getPosition() {
		var position;
		var card = this.sentence.getFilter('BA', 'n')[0];
		var ATT = this.sentence.getChildren(card, 'ATT', 'n');
		ATT.map((i) => {
			var type = this.knowledge.getType(i.word);
			if (type == 'position') {
				position = this.knowledge.getTranslation(i.word);
			}
		})
		if (!position) position = "he";
		console.log('卡牌区域:');
		console.log(position);
		return position;

	}
	getViewAs() {
		var HED=this.sentence.getHED()[0];
		var viewAs=this.sentence.getChildren(HED,'VOB');

	}
	getPrompt() {

	}
	compile() {

	}
	//视为技
	start() {
		console.log('开始编写视为技');
		this.getWhen();
		this.getFilterCard();
		this.getSelectCard()
		this.getPosition();
		this.getViewAs();
		this.getPrompt();
	}

}
