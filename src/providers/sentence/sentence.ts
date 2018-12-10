import { Injectable } from '@angular/core';
import { RxjsProvider } from '../rxjs/rxjs'

@Injectable()
export class SentenceProvider {
	str: string = 'skill={\n';
	json: any;
	restoreList = []
	typeList: object = {
		suit: ['club', 'diamond', 'heart', 'spade'],
		color: ['red', 'black'],
		position: ['h', 'e', 'he'],
	}
	replaceList: Array<any> = [
		{
			reg: '【[\u4e00-\u9fa5]+】',
			replacement: '扑克',
		}, {
			reg: '梅花|草花|方块|方片|红桃|黑桃',
			replacement: '花色',
		},{
			reg: '一|二|三|四|五|六|七',
			replacement: '两',
		}
	]
	translationList: object = {
		'一': '1',
		'两/二': 2,
		'三': 3,
		'四': 4,
		'五': 5,
		'六': 6,
		'七': 7,
		'使用': 'chooseToUse',
		'打出': 'chooseToRespond',
		'和/与': '&&',
		'非': '!',
		'红色': 'red',
		'黑色': 'black',
		'梅花/草花': 'club',
		'方块/方片': 'diamond',
		'红桃': 'heart',
		'黑桃': 'spade',
		'杀': 'sha',
		'闪': 'shan',
		'桃': 'tao',
		'过河拆桥':'guohe',
		'借刀杀人':'jiedao',
		'决斗':'juedou',
		'南蛮入侵':'nanman',
		'顺手牵羊':'shunshou',
		'桃园结义':'taoyuan',
		'万箭齐发': 'wanjian',
		'五谷丰登':'wugu',
		'无懈可击':'wuxie',
		'无中生有':'wuzhong',
		'闪电':'shandian',
		'装备': 'e',
		'判定': 'j',
		'手': 'h',


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
			if (i == word || (i.indexOf('/') != -1 && i.indexOf(word) != -1)) return this.translationList[i];
		}
		console.error(`没有找到【${word}】的翻译...`);
		this.rxjs.sendMsg(`没有找到【${word}】的翻译...`);
		return word;
	}
	getConversion(obj) {
		for (var i in obj) {
			this.str += `${i}:`;
			if (typeof obj[i] == "function") {
				this.str += `${obj[i].toString()},\n`;
				this.str = this.str.replace(/^"|$"|anonymous|[\r]|/g, '').replace(/\n\)/g,')')
			}
			else if (obj[i].constructor === Array) {
				var arr = "";
				obj[i].map((j) => {
					arr += `"${j}",`;
				})
				arr = arr.substr(0, arr.length - 1);
				this.str += `[${arr}],\n`;
			} else if (obj[i].constructor === Object) {
				this.str += '{\n';
				this.getConversion(obj[i]);
				this.str += '},\n'
			} else if (typeof obj[i] == "number") {
				this.str += `${obj[i]},\n`;
			}
			else this.str += `"${obj[i]}",\n`;
		}
		this.str += '}'
		var s=this.str;
		this.str='skill={\n';
		return s;
	}
	getReplace(msg) {
		this.restoreList=[];
		var newMsg = msg;
		this.replaceList.map((i) => {
			var before = newMsg.match(new RegExp(i.reg, 'g'));
			if (before) {
				this.restoreList.push({
					before: before[0],
					after: i.replacement,
				})
			}
			newMsg = newMsg.replace(new RegExp(i.reg, 'g'), i.replacement );
		})
		console.log(this.restoreList);
		return newMsg;
	}
	getRestore(arr) {
		arr.map((i) => {
			this.restoreList.map((j) => {
				i.word = i.word.replace(new RegExp(j.after, 'g'), j.before);
			})
		})
		return arr;
	}
	receiveJson(json) {
		this.json = json;
	}

	// --------------------------------------------句子成分------------------------------------------------

	//判断类型
	getHED() {
		var HED = this.json.filter((i) => {
			return i.head == 0
		})
		return HED;
	}
	getParent(item) {
		var parent = this.json.filter((i) => {
			return i.id == item.head;
		})
		return parent;
	}
	getChildren(item, deprel?, postag?) {
		var children = this.json.filter((i) => {
			if (i.head != item.id) return false;
			if (deprel && deprel != i.deprel) return false;
			if (postag && postag != i.postag) return false;
			return true;
		})
		return children;
	}
	getSibling(item) {
		var sibling = this.getChildren(item).filter((i) => {
			return i.deprel == 'COO';
		})
		return sibling;
	}
	getDeprel(deprel, array = this.json) {
		var result = array.filter((i) => {
			return i.deprel == deprel;
		})
		return result;
	}
	getFilter(deprel, postag) {
		var filter = this.json.filter((i) => {
			return i.deprel == deprel && i.postag == postag;
		})
		return filter;
	}

}

