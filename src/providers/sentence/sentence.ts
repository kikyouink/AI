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
		type: ['basic', 'equip', 'trick'],
		position: ['h', 'e', 'he','j'],
	}
	replaceList: Array<any> = [
		{
			reg: '【[\u4e00-\u9fa5]+】',
			replacement: '扑克',
		}, {
			reg: '装备区|判定区',
			replacement: '区域',
		},{
			reg:'红桃|黑桃|方块|梅花',
			replacement:'花色'
		}
	]
	translationList: object = {
		'一': 1,
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
		'装备区': 'e',
		'判定区': 'j',
		'基本': 'basic',
		'锦囊': 'trick',
		'装备': 'equip',
		'杀': 'sha',
		'闪': 'shan',
		'桃': 'tao',
		'过河拆桥': 'guohe',
		'借刀杀人': 'jiedao',
		'决斗': 'juedou',
		'南蛮入侵': 'nanman',
		'顺手牵羊': 'shunshou',
		'桃园结义': 'taoyuan',
		'万箭齐发': 'wanjian',
		'五谷丰登': 'wugu',
		'无懈可击': 'wuxie',
		'无中生有': 'wuzhong',
		'闪电': 'shandian',
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
	getTranslation(word, reverse = false) {
		if (!reverse) {
			for (var i in this.translationList) {
				if (i == word || (i.indexOf('/') != -1 && i.indexOf(word) != -1)) return this.translationList[i];
			}
		} else {
			for (var i in this.translationList) {
				var ti = this.translationList[i];
				if (ti == word || i.indexOf('/') != -1 && i.indexOf(word) != -1) {
					return i.split('/')[0];
				}
			}
		}

		console.error(`没有找到【${word}】的翻译...`);
		this.rxjs.sendMsg(`没有找到【${word}】的翻译...`);
		return word;
	}
	getConversion(obj) {
		var str=this.str;
		function track(obj){
			for (var i in obj) {
				str += `${i}:`;
				if (typeof obj[i] == "function") {
					str += `${obj[i].toString()},\n`;
					str = str.replace(/^"|$"|anonymous|[\r]|/g, '').replace(/\n\)/g, ')');
				}
				else if (obj[i].constructor === Array) {
					var arr = "";
					obj[i].map((j) => {
						arr += `"${j}",`;
					})
					arr = arr.substr(0, arr.length - 1);
					str += `[${arr}],\n`;
				} else if (obj[i].constructor === Object) {
					str += '{\n';
					track(obj[i]);
					str += '},\n'
				} else if (typeof obj[i] == "number") {
					str += `${obj[i]},\n`;
				}
				else str += `"${obj[i]}",\n`;
			}
		}
		track(obj);
		str += '}'
		debugger;
		var s = str;
		str = 'skill={\n';
		return s;
	}
	getReplace(msg) {
		this.restoreList = [];
		var newMsg = msg;
		this.replaceList.map((i) => {
			var before = newMsg.match(new RegExp(i.reg, 'g'));
			if (before) {
				this.restoreList.push({
					before: before[0],
					after: i.replacement,
				})
			}
			newMsg = newMsg.replace(new RegExp(i.reg, 'g'), i.replacement);
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
			if (deprel && i.deprel.indexOf(deprel) == -1) return false;
			if (postag && i.postag.indexOf(postag) == -1) return false;
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
	getTrack(p,array) {
		var parent=[];
		if(p.constructor === Object) parent.push(p);
		else parent=this.deepCopy(p);
		parent.map((i) => {
			console.log(i);
			var children = this.getChildren(i, 'ATT', 'n');
			if (children.length){
				array.push(i);
				this.getTrack(children,array);
			}
			else{
				array.push(i);
			}
		})
	}
	getATT(item) {
		var DE = this.getChildren(item, 'DE')[0];
		if (DE) var SET = this.getChildren(DE, 'DE');
		var arr = [];
		var children=this.getChildren(item,'ATT','n');
		this.getTrack(children,arr);
		if (SET) this.getTrack(SET,arr);
		return arr;
	}
	getDeprel(deprel, array = this.json) {
		var result = array.filter((i) => {
			return i.deprel == deprel;
		})
		return result;
	}
	getFilter(deprel, postag) {
		var filter = this.json.filter((i) => {
			return i.deprel.indexOf(deprel) != -1 && i.postag.indexOf(postag) != -1;
		})
		return filter;
	}
	deepCopy(source, bool = true) {
		var sourceCopy;
		if (bool) sourceCopy = [];
		else sourceCopy = {};
		for (var item in source) {
			sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item], false) : source[item];
		}
		return sourceCopy;
	}

}

