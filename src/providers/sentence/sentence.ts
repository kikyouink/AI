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
		position: ['h', 'e', 'he', 'j'],
	}
	replaceList: Array<any> = [
		{
			reg: '【[\u4e00-\u9fa5]+】',
			replacement: '扑克',
		}, {
			reg: '装备区|判定区',
			replacement: '区域',
		}, {
			reg: '红桃|黑桃|方块|梅花',
			replacement: '花色'
		}, {
			reg: '准备|判定|出牌|弃牌|结束',
			replacement: '特定'
		}
	]
	translationList: object = {
		'一/一张/一名': 1,
		'两/二': 2,
		'三': 3,
		'四': 4,
		'五': 5,
		'六': 6,
		'七': 7,
		'准备': 'phaseBegin',
		'出牌': 'phaseUse',
		'判定': 'judge',
		'弃牌': 'discard',
		'结束': 'phaseEnd',
		'你/你可以': 'player',
		'其他': 'other',
		'角色': 'target',
		'摸': 'draw',
		'弃置': 'discard',
		'获得': 'gain',
		'回复': 'recover',
		'造成': 'damage',
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
		if (!word) return null;
		var w;
		if (/[\u4e00-\u9fa5]+/.test(word)) w = this.getTranslation(word);
		else w = word;
		for (var i in this.typeList) {
			if (this.typeList[i].includes(w)) return i;
		}
	}
	getTranslation(word, reverse = false) {
		if (!word) return null;
		if (word.constructor == Object) word = word.word || word.name;
		if (word.constructor == Array) word = word[0].word || word[0].name;
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
		var str = this.str;
		function track(obj) {
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
		if (!item) return null;
		if (item.constructor == Array) item = item[0];
		var parent = this.json.filter((i) => {
			return i.id == item.head;
		})
		return parent;
	}
	getChildren(item, deprel?, postag?) {
		if (!item) return null;
		if (item.constructor == Array) item = item[0];
		var children = this.json.filter((i) => {
			if (i.head != item.id) return false;
			// var parent
			if (deprel && i.deprel.indexOf(deprel) == -1) return false;
			if (postag) {
				if (postag.indexOf('/') != -1) {
					var bool = false;
					var p = postag.split('/');
					p.map((j) => {
						if (i.postag.indexOf(j) != -1) bool = true;
					})
					return bool;
				}
				return postag && i.postag.indexOf(postag) != -1;
			}
			return true;
		})
		return children.length ? children : null;
	}
	getSibling(item) {
		if (!item) return null;
		if (item.constructor == Array) item = item[0];
		var sibling = this.getChildren(item);
		if (sibling) sibling = sibling.filter((i) => {
			return i.deprel == 'COO';
		})
		return sibling && sibling.length ? sibling : null;
	}
	getTrack(p, array) {
		var parent = [];
		if (p == null) parent = [];
		else if (p.constructor === Object) parent.push(p);
		else parent = this.deepCopy(p);
		parent.map((i) => {
			var children = this.getChildren(i, 'ATT', 'n');
			if (children) {
				array.push(i);
				this.getTrack(children, array);
			}
			else {
				array.push(i);
			}
		})
	}
	getATT(item,postag='n') {
		if (!item) return null;
		var arr = [];
		var DE = this.getChildren(item, 'DE');
		var SET = this.getChildren(DE, 'DE');
		var children = this.getChildren(item, 'ATT',postag);
		this.getTrack(children, arr);
		if (SET) this.getTrack(SET, arr);
		return arr.length ? arr : null;
	}
	getFilter(array, deprel, postag = "") {
		if (array == null || array == undefined) return null;
		if (array == '') array = this.json;
		var filter = array.filter((i) => {
			var bool = false;
			if (i.deprel.indexOf(deprel) == -1) return false;
			if (postag != "") {
				if (postag.indexOf('/') != -1) {
					var p = postag.split('/');
					p.map((j) => {
						if (i.postag.indexOf(j) != -1) bool = true;
					})
					return bool;
				}
				return i.postag.indexOf(postag) != -1;
			}
			return true;
		})
		return filter.length ? filter : null;
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

