import { Injectable } from '@angular/core';
import { SentenceProvider } from "../sentence/sentence";
import { RxjsProvider } from '../rxjs/rxjs';

@Injectable()
export class ViewAsProvider {
	list: any = {};
	constructor(
		public sentence: SentenceProvider,
		public rxjs: RxjsProvider,
	) { }

	getWhen() {
		var when;
		var HED = this.sentence.getHED()[0];
		var when1 = this.sentence.getChildren(HED, "VV")[0];
		var when2 = this.sentence.getSibling(when1)[0];
		if (!when2) when = this.sentence.getTranslation(when1.word);
		else {
			var arr = [];
			arr.push(this.sentence.getTranslation(when1.word));
			arr.push(this.sentence.getTranslation(when2.word));
			when = arr;
		}
		console.log('时机:');
		console.log(when);
		this.list.enable = when;
		return when;

	}
	getFilterCard() {
		// debugger;
		var main = "", filter = [];
		var card = this.sentence.getFilter('BA', 'n')[0];
		var ATT = this.sentence.getChildren(card, 'ATT', 'n');
		ATT.map((i) => {
			var type = this.sentence.getType(i.word);
			if (type == 'suit' || type == 'color') {
				var value = this.sentence.getTranslation(i.word);
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
		this.list.filterCard = filterCard;
		return filterCard;
	}
	getSelectCard() {
		var num = this.sentence.getDeprel('QUN')[0].word;
		var num2 = this.sentence.getTranslation(num);
		num2 = parseInt(num2);
		console.log('卡牌数量:');
		console.log(num2);
		if (num2 > 1) {
			this.list.selectCard = num2;
			return num2;
		}
	}
	getPosition() {
		var position;
		var card = this.sentence.getFilter('BA', 'n')[0];
		var ATT = this.sentence.getChildren(card, 'ATT', 'n');
		ATT.map((i) => {
			var type = this.sentence.getType(i.word);
			if (type == 'position') {
				position = this.sentence.getTranslation(i.word);
			}
		})
		if (!position) position = "he";
		console.log('卡牌区域:');
		console.log(position);
		this.list.position = position;
		return position;

	}
	getViewAs() {
		var HED = this.sentence.getHED()[0];
		var viewAs = this.sentence.getChildren(HED, 'VOB')[0].word.replace(/【|】/g, '');
		viewAs = this.sentence.getTranslation(viewAs);
		var v = {
			name: viewAs
		}
		console.log('视为:');
		console.log(viewAs);
		this.list.viewAs = viewAs;
		return v;

	}
	getPrompt() {
		var num=this.list['selectCard']?this.list['selectCard']:1;
		var prompt = `将${num}张牌当做${this.list["viewAs"]}使用或者打出`;
		console.log('提示:');
		console.log(prompt);
		this.list.prompt = prompt;
		return prompt;
	}
	compile() {
		this.rxjs.sendMsg({
			status: 'done',
			code: this.list,
		});
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
		this.compile();
	}

}
