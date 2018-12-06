import { Injectable } from '@angular/core';
import { RxjsProvider } from '../rxjs/rxjs'

@Injectable()
export class KnowledgeProvider {
	typeList: object = {
		suit: ['club', 'diamond', 'heart', 'spade'],
		color: ['red', 'black'],
		position: ['h', 'e', 'he'],
	}
	replaceList: Array<any> = [
		{
			reg: "【[\u4e00-\u9fa5]+】",
			replacement: '扑克',
		}, {
			reg: "梅花|草花|方块|方片|红桃|黑桃",
			replacement: '花色',
		}
	]
	translationList: object = {
		"一": "1",
		"两/二": 2,
		"三": 3,
		"四": 4,
		"五": 5,
		"六": 6,
		"七": 7,
		"使用": 'chooseToUse',
		"打出": "chooseToRespond",
		"和/与": '&&',
		"非": '!',
		"红色": 'red',
		"黑色": 'black',
		"梅花/草花": 'club',
		"方块/方片": 'diamond',
		"红桃": 'heart',
		"黑桃": 'spade',
		"杀": 'sha',
		"闪": "shan",
		"桃": 'tao',
		"万箭齐发": 'wanjian',
		"装备": 'e',
		"判定": 'j',
		"手": 'h',


	}
	constructor(
		public rxjs: RxjsProvider,
	) { }
	getType(word) {
		var w;
		if (/[\u4e00-\u9fa5]+/.test(word)) w = this.getTranslation(word);
		else w = word;
		for (var i in this.typeList) {
			if (this.typeList[i].includes(w)) return i;
		}
	}
	getTranslation(word) {
		for (var i in this.translationList) {
			if (i == word || (i.indexOf("/") != -1 && i.indexOf(word) != -1)) return this.translationList[i];
		}
		console.error(`啊哈，没有找到【${word}】的翻译...`);
		this.rxjs.sendMessage(`啊哈，没有找到【${word}】的翻译...`);
		return word;
	}
	getReplace(msg) {
		debugger;
		var newMsg = msg;
		this.replaceList.map((i)=>{
			newMsg = newMsg.replace(new RegExp(i.reg, "g"), i.replacement + ' ');
		})
		return newMsg;
	}
	// getRestore(arr) {
	// 	arr.map((i) => {
	// 		if (/[a-zA-z]+/g.test(i.word)) {
	// 			i.word = this.getReplace(i.word, true)
	// 		}
	// 	})
	// 	return arr;
	// }


}
